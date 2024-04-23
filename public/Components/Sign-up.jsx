import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BLACK } from "../../COLOR";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { GoogleAuth } from "./ComponentsReturn";
import { useSelector, useDispatch } from "react-redux";
import { signInFailed, signInSuccess } from "../../reactRedux/userSlice";
import Wave from "../styleComponents/Wave";
import { URL } from "../../PortConfig";
import { addLocationHistory } from "../../reactRedux/userLocationHistory";

const signUp = ({ url }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userInfo = useSelector((store) => store.persistData.user.userInfo);
  const userLocationHistory = useSelector(
    (store) => store.locationHistory.locationHistory
  );

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleFormData = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (url === "signup") {
      if (!formData.username || !formData.email || !formData.password) {
        // toastContainer
        console.log("Please provide credentials");
        return;
      }
      try {
        setLoading(true);
        // create account for the user
        const res = await axios.post(URL + "api/user/signup", formData);

        // login the user after creatting the account
        const response = await axios.post(`${URL}api/user/signin`, formData);
        localStorage.setItem("accessToken", response.data.accessToken);

        dispatch(
          signInSuccess({
            ...response.data,
            email: formData.email,
          })
        );

        if (userLocationHistory) {
          navigate(userLocationHistory);
        } else {
          navigate("/");
        }
        // user login finished

        setErrorMessage("");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!formData.email || !formData.password) {
        // toastContainer
        console.log("Please provide credentials");
        return;
      }
      try {
        setLoading(true);
        // login the user
        const res = await axios.post(`${URL}api/user/signin`, formData);
        localStorage.setItem("accessToken", res.data.accessToken);

        dispatch(
          signInSuccess({
            ...res.data,
            email: formData.email,
          })
        );
        if (userLocationHistory) {
          navigate(userLocationHistory);
        } else {
          navigate("/");
        }

        //login finished
      } catch (error) {
        if (error.response?.data?.message) {
          console.log(error?.response?.data?.message);
          setErrorMessage(error.response.data.message);

          dispatch(signInFailed(error.response.data.message));
        } else {
          console.log(error.message);
          setErrorMessage(error.message);
          dispatch(signInFailed(error.message));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (userInfo) {
    return <Navigate to={userLocationHistory ? userLocationHistory : "/"} />;
  }
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          top: 50,
        }}
      >
        <Typography variant={isMobile ? "body1" : "h6"}>
          {url === "signup" ? (
            <Wave title="Sign Up" />
          ) : (
            <Wave title="Sign in" />
          )}
        </Typography>
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
          {url === "signup" && (
            <TextField
              type="text"
              fullWidth
              size={isMobile ? "small" : "medium"}
              variant="outlined"
              label="Username"
              value={formData.username}
              onChange={handleFormData}
              name="username"
            />
          )}

          <TextField
            type="email"
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Email"
            value={formData.email}
            onChange={handleFormData}
            name="email"
          />
          <TextField
            type={visibility ? "text" : "password"}
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            label="Password"
            value={formData.password}
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
          {errorMessage ? (
            <Typography color="red" variant={isMobile ? "body2" : "body1"}>
              {errorMessage}
            </Typography>
          ) : null}
          <Button
            fullWidth
            size={isMobile ? "small" : "medium"}
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
            {loading ? "Loading..." : url === "signin" ? "SIGN IN" : "SIGN UP"}
          </Button>
          <GoogleAuth isMobile={isMobile} />

          {url === "signup" ? (
            <Typography variant={isMobile ? "body2" : "h6"}>
              Have an account?
              <Link
                to="/signin"
                style={{
                  marginLeft: 5,
                }}
                className="Link"
              >
                Sign in
              </Link>
            </Typography>
          ) : (
            <Typography variant={isMobile ? "body2" : "h6"}>
              Don't have an account?
              <Link
                to="/signup"
                style={{
                  marginLeft: 5,
                }}
                className="Link"
              >
                Create one
              </Link>
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default signUp;
