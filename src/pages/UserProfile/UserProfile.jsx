import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import profilePicture from "../../public/assets/profile.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BLACK } from "../../styles/Color.js";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, forwardRef, lazy, useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../config/firebase.js";
import axios from "axios";
import { deleteUser, updateUser } from "../../redux/userSlice.js";
import { URL } from "../../config/PortConfig.js";
import { setShowListings } from "../../redux/showListings.js";
import { setWelcomeToast } from "../../redux/showToast.js";
import { toast } from "react-toastify";
import Fallback from "../../Components/UI/Fallback.jsx";
import ConfirmDialog from "../../Components/UI/ConfirmDialog.jsx";

const Wave = lazy(() => import("../../Components/WaveHeader.jsx"));
const autoCloseTime = 3000;

const Profile = () => {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const myRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const uploadTaskRef = useRef(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadingError, setUploadingError] = useState("");
  const [formData, setFormData] = useState(currentUser);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [signOut, setSingOut] = useState(false);
  const handleVisibility = () => {
    setVisibility(!visibility);
  };
  const [open, setOpen] = useState(false);
  // const [showListings, setShowListings] = useState(false);
  const showListings = useSelector((store) => store.showListings.show);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowListing = () => {
    dispatch(setShowListings(!showListings));
  };
  // sign out user
  const handleSignOutUser = () => {
    // first we remove access token from the local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    navigate("/signin");
    // then we delete the user from state of application
    dispatch(setWelcomeToast(false));
    dispatch(deleteUser());
  };
  // delete user profile
  const handleDeleteUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `${URL}api/user/delete/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        toast.success("User deleted Successfully", {
          autoClose: 3000,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("persist:root");
        setOpen(false);
        navigate("/signup");
        dispatch(setWelcomeToast(false));
        dispatch(deleteUser());
      } else {
        toast.error("user not deleted", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
      });
    }
  };
  // console.log(formData);
  // console.log(currentUser);
  // update user profile
  const handleSubmit = async (event) => {
    if (
      currentUser.username == formData?.username &&
      currentUser.email == formData?.email &&
      currentUser.mobileNumber == formData?.mobileNumber &&
      currentUser.avatar == formData?.avatar &&
      currentUser.password == formData?.password
    ) {
      toast.info("No changes detected");
      return;
    }
    if (!formData?.username || !formData?.email) {
      toast.error("Username or email is empty");
      return;
    }
    const reg = /^\d+$/;
    if (!reg.test(formData?.mobileNumber)) {
      toast.error("Telephone number Should Contain only numbers");
      setMobileNumberError("Telephone number Should Contain only numbers");
      return;
      // errors.telNumber = "Telephone number Should Contain only numbers ";
    }
    if (
      formData?.mobileNumber.length < 10 ||
      formData?.mobileNumber.length > 10
    ) {
      toast.error("Mobile number should be 10 digits");
      setMobileNumberError("Mobile number should be 10 digits");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${URL}api/user/update/${currentUser.id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("Update failed");
      }
      const { password, ...rest } = formData;
      dispatch(
        updateUser({
          ...rest,
        })
      );
      // setUpdateError("");
      // setUpdateSuccess("");
      toast.success("Profile Updated Successfully", {
        autoClose: 3000,
      });
      setUploadPercentage(0);
    } catch (error) {
      toast.error(error?.response?.data.message, {
        autoClose: autoCloseTime,
      });
      // console.log(error.response.data.message);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data.message, {
          autoClose: 3000,
        });
        // setUpdateError(error.response.data.message);
        // setUpdateSuccess("");
      } else {
        toast.error(error.message, {
          autoClose: 3000,
        });
        // setUpdateError(error.message);
        // setUpdateSuccess("");
      }
    } finally {
      setMobileNumberError("");
      setLoading(false);
    }
  };
  const handleFormData = (event) => {
    if (event.target.name == "password") {
      setFormData((prevData) => {
        return {
          ...prevData,
          password:
            event.target.value == ""
              ? currentUser.password
              : event.target.value,
        };
      });
    } else {
      setFormData((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  const openFile = () => {
    myRef.current.click();
  };

  const getFile = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]); // we set the first image in the file variable
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }

    // Clean-up function: cancel upload if component unmounts or route changes
    return () => {
      if (uploadTaskRef.current) {
        uploadTaskRef.current.cancel();
        console.log("Upload canceled due to route change.");
      }
    };
  }, [file]);

  // upload user image
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // create a randomName to avoid duplicatio.
    // console.log(fileName);
    const storageRef = ref(storage, fileName); //
    // console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTaskRef.current = uploadTask;

    // console.log(uploadTask);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress);
        // console.log("Upload is " + Math.round(progress) + "% done");
        setUploadPercentage(progress);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message, {
          autoClose: autoCloseTime,
        });
        setUploadingError(error.message);
        setLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // console.log("get Download URL");
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);
          // console.log("CurrentUser: ", currentUser.id);
          setFormData((prevData) => {
            return {
              ...prevData,
              avatar: downloadURL,
            };
          });
          setLoading(false);
          // try {
          //   const accessToken = localStorage.getItem("accessToken");
          //   // console.log("access: ", accessToken);
          //   // Decode the access token
          //   const decodedToken = jwtDecode(accessToken);
          //   // console.log("decoded", decodedToken);
          //   // const { id, username, avatar } = decodedToken.user;
          //   const response = await axios.put(
          //     `http://localhost:8000/api/user/updateProfileImage/${currentUser.id}`,
          //     {
          //       avatar: downloadURL,
          //     },
          //     {
          //       headers: {
          //         Authorization: `Bearer ${accessToken}`,
          //       },
          //     }
          //   );
          //   // console.log(response.data);
          //   dispatch(updatePhotoURL(downloadURL));
          //   setFormData((prevData) => {
          //     return {
          //       ...prevData,
          //       avatar: downloadURL,
          //     };
          //   });
          //   navigate("/profile");
          // } catch (error) {
          //   console.log(error.message);
          // }
        });
      }
    );
  };

  const handleConfirm = () => {
    if (signOut) {
      handleSignOutUser();
    } else {
      handleDeleteUser();
    }
  };

  // progress bar with label
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
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
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
        }}
      >
        <Suspense fallback={<Fallback />}>
          <Wave title={"Profile"} />
        </Suspense>

        <input
          onChange={getFile}
          type="file"
          ref={myRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={openFile}
          src={
            formData.avatar
              ? formData.avatar
              : currentUser?.avatar
              ? currentUser.avatar
              : profilePicture
          }
          title={currentUser?.username ? currentUser.username : "user image"}
          style={{
            cursor: "pointer",
            width: "120px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 50,
          }}
        />
        <Box>
          {uploadPercentage > 0 && uploadPercentage < 100 ? (
            <>
              <Typography>Uploading ...</Typography>
              <CircularProgressWithLabel value={uploadPercentage} />
            </>
          ) : uploadingError ? (
            <Typography variant="body1" color={theme.palette.error}>
              {uploadingError}
            </Typography>
          ) : (
            uploadPercentage === 100 && (
              <Typography variant="body1" color={theme.palette.success}>
                Uploaded Successfully,Please press the update button to save
                changes
              </Typography>
            )
          )}
        </Box>
        <Box
          component={"div"}
          sx={{
            mx: "auto",
            mt: 5,
            width: { xs: "99%", sm: "65%", md: "60%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            type="text"
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Username"
            defaultValue={currentUser.username}
            onChange={handleFormData}
            name="username"
          />

          <TextField
            type="email"
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Email"
            defaultValue={currentUser.email}
            onChange={handleFormData}
            name="email"
          />
          <TextField
            type={visibility ? "text" : "password"}
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Password"
            defaultValue={""}
            onChange={handleFormData}
            name="password"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleVisibility}>
                  <InputAdornment position="start">
                    {visibility ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility />
                    )}
                  </InputAdornment>
                </IconButton>
              ),
            }}
          />
          {!currentUser?.mobileNumber && (
            <Typography
              sx={{
                color: "red",
              }}
            >
              Please Add your mobile number
            </Typography>
          )}
          <TextField
            error={mobileNumberError ? true : false}
            type="text"
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Mobile Number"
            defaultValue={currentUser?.mobileNumber || ""}
            onChange={handleFormData}
            name="mobileNumber"
            helperText={mobileNumberError ? mobileNumberError : null}
          />

          <Button
            fullWidth
            size={isMobile ? "small" : "large"}
            variant="contained"
            // color="success"
            sx={{
              backgroundColor: BLACK,
              "&:hover": {
                opacity: 0.9,
                backgroundColor: BLACK,
              },
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "UPDATE"}
          </Button>
          <Link
            style={{
              width: "100%",
            }}
            className="Link"
            to="/create-list"
          >
            <Button
              fullWidth
              size={isMobile ? "small" : "large"}
              variant="contained"
              color={"success"}
            >
              Create listing
            </Button>
          </Link>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="text"
              color="warning"
              size={isMobile ? "small" : "large"}
              onClick={() => {
                setSingOut(false);
                handleOpen();
              }}
            >
              Delete Account
            </Button>

            <Button
              variant="text"
              color="warning"
              size={isMobile ? "small" : "large"}
              onClick={() => {
                setSingOut(true);
                handleOpen();
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>

        <ConfirmDialog
          open={open}
          onClose={handleClose}
          title="Warning"
          message={
            signOut
              ? "Are you sure you want to sign out from your account?"
              : "Are you sure you want to delete your account?"
          }
          cancelText="Disagree"
          confirmText="Agree"
          onConfirm={handleConfirm}
        />
      </Container>
    </>
  );
};

export default Profile;
