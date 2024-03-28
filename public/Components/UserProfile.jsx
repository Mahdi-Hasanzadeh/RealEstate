import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import profilePicture from "../../assets/profile.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BLACK } from "../../COLOR";
import { Link, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../src/firebase";
import axios from "axios";
import { deleteUser, updateUser } from "../../reactRedux/userSlice";
import Wave from "../styleComponents/Wave.jsx";
// import { jwtDecode } from "jwt-decode";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Profile = () => {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((store) => store.user.userInfo);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const myRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadingError, setUploadingError] = useState("");
  const [formData, setFormData] = useState({});
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [signOut, setSingOut] = useState(false);
  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOutUser = () => {
    // first we remove access token from the local storage
    localStorage.removeItem("accessToken");

    navigate("/signin");
    // then we delete the user from state of application
    dispatch(deleteUser());
  };

  const handleDeleteUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8000/api/user/delete/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        console.log("user deleted");
        setOpen(false);
        navigate("/signup");
        dispatch(deleteUser());
      } else {
        console.log("user not deleted,please try again later");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("Form Data: ", formData);
  const handleSubmit = async (event) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8000/api/user/update/${currentUser.id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("Update failed");
      }
      dispatch(
        updateUser({
          ...formData,
        })
      );
      setUpdateError("");
      setUpdateSuccess("Updated Successfully");
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message) {
        setUpdateError(error.response.data.message);
        setUpdateSuccess("");
      } else {
        setUpdateError(error.message);
        setUpdateSuccess("");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFormData = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
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
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // create a randomName to avoid duplicatio.
    // console.log(fileName);
    const storageRef = ref(storage, fileName); //
    // console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);
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
        setUploadingError(error.message);
        setLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        // console.log("get Download URL");
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
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
        {<Wave title={"Profile"} />}

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
          {updateError && (
            <Typography
              sx={{
                color: "red",
              }}
              variant="body1"
            >
              {updateError}
            </Typography>
          )}
          {updateSuccess && (
            <Typography
              sx={{
                color: "green",
              }}
              variant="body1"
            >
              {updateSuccess}
            </Typography>
          )}
        </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {signOut
                ? "Are your to sign out from your account"
                : "Are you sure to delete your account?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                if (signOut) {
                  handleSignOutUser();
                } else {
                  handleDeleteUser();
                }
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Profile;
