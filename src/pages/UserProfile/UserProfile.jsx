import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../config/firebase.js";
import { deleteUser, updateUser } from "../../redux/userSlice.js";
import { setWelcomeToast } from "../../redux/showToast.js";
import { toast } from "react-toastify";
import Fallback from "../../Components/UI/Fallback.jsx";
import ConfirmDialog from "../../Components/UI/ConfirmDialog.jsx";
import axiosInstance from "../../config/axiosConfig.js";
import profilePicture from "../../public/assets/profile.png";
import { BLACK } from "../../styles/Color.js";
import { URL } from "../../config/PortConfig.js";

const Wave = lazy(() => import("../../Components/WaveHeader.jsx"));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector((store) => store.persistData.user.userInfo);

  const fileInputRef = useRef(null);
  const uploadTaskRef = useRef(null);

  const [formData, setFormData] = useState({ ...currentUser, password: "" });
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "signOut" | "delete"

  // Toggle password visibility
  const toggleVisibility = () => setVisibility(!visibility);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "password" && value === "" ? currentUser.password : value,
    }));
  };

  // Open file picker
  const openFilePicker = () => fileInputRef.current.click();

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files[0]) handleFileUpload(e.target.files[0]);
  };

  // Upload avatar to Firebase
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTaskRef.current = uploadTask;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(progress);
        setLoading(true);
      },
      (error) => {
        setUploadError(error.message);
        setLoading(false);
        toast.error(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        setLoading(false);
        toast.success("Avatar uploaded successfully! Click update to save.");
      }
    );
  };

  // Sign out or delete account
  const handleConfirmAction = async () => {
    if (confirmAction === "signOut") return handleSignOut();
    if (confirmAction === "delete") return handleDeleteUser();
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    dispatch(deleteUser());
    dispatch(setWelcomeToast(false));
    navigate("/signin");
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axiosInstance.delete(
        `${URL}api/user/delete/${currentUser.id}`
      );
      if (response.data) {
        toast.success("User deleted successfully");
        handleSignOut();
        navigate("/signup");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error(error?.message || "Server error");
    }
  };

  // Update user profile
  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      return toast.error("Username and email are required");
    }

    const phoneReg = /^\d{10}$/;
    if (!phoneReg.test(formData.mobileNumber)) {
      setMobileNumberError("Mobile number should be 10 digits");
      return toast.error("Mobile number should be 10 digits");
    }

    if (
      currentUser.username === formData.username &&
      currentUser.email === formData.email &&
      currentUser.avatar === formData.avatar &&
      currentUser.mobileNumber === formData.mobileNumber &&
      (!formData.password || formData.password === currentUser.password)
    ) {
      return toast.info("No changes detected");
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `${URL}api/user/update/${currentUser.id}`,
        formData
      );
      dispatch(updateUser({ ...formData, password: undefined }));
      toast.success("Profile updated successfully");
      setUploadPercentage(0);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      setMobileNumberError("");
    }
  };

  // Circular progress component with label
  const CircularProgressWithLabel = ({ value }) => (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Suspense fallback={<Fallback />}>
        <Wave title="Profile" />
      </Suspense>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileSelect}
      />

      <Grid
        container
        spacing={4}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        {/* Left Column: Avatar + Upload */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={formData.avatar || currentUser.avatar || profilePicture}
            alt={currentUser.username || "user image"}
            onClick={openFilePicker}
            style={{
              cursor: "pointer",
              width: 150,
              height: 150,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <Box sx={{ width: "100%", textAlign: "center" }}>
            {uploadPercentage > 0 && uploadPercentage < 100 && (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Uploading...
                </Typography>
                <CircularProgressWithLabel value={uploadPercentage} />
              </>
            )}
            {uploadPercentage === 100 && (
              <Typography color="success.main" variant="body2">
                Upload complete! Press update.
              </Typography>
            )}
            {uploadError && (
              <Typography color="error.main" variant="body2">
                {uploadError}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Right Column: Form */}
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 2, boxShadow: 1 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 2, boxShadow: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              type={visibility ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 2, boxShadow: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibility}>
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber || ""}
              onChange={handleChange}
              error={!!mobileNumberError}
              helperText={mobileNumberError}
              fullWidth
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 2, boxShadow: 1 }}
            />

            <Button
              fullWidth
              size={isMobile ? "small" : "large"}
              variant="contained"
              sx={{
                backgroundColor: BLACK,
                borderRadius: 2,
                "&:hover": { opacity: 0.9 },
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "UPDATE"}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                mt: 1,
              }}
            >
              {/* <Button
                color="warning"
                variant="outlined"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  setConfirmAction("delete");
                  setConfirmOpen(true);
                }}
              >
                Delete Account
              </Button> */}
              <Button
                color="warning"
                variant="outlined"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  setConfirmAction("signOut");
                  setConfirmOpen(true);
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Warning"
        message={
          confirmAction === "signOut"
            ? "Are you sure you want to sign out?"
            : "Are you sure you want to delete your account?"
        }
        cancelText="Disagree"
        confirmText="Agree"
        onConfirm={handleConfirmAction}
      />
    </Container>
  );
};

export default Profile;
