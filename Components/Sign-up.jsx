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
import { Link, useNavigate } from "react-router-dom";
import { BLACK, LIGHTGRAY } from "../../COLOR";
import { useState } from "react";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffRounded,
} from "@mui/icons-material";
import axios from "axios";

const signUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    setLoading(true);
    if (!formData.username || !formData.email || !formData.password) {
      // toastContainer
      console.log("Please provide credentials");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/signup",
        formData
      );
      console.log(res.data);
      //   navigate("/");

      //   const res = await fetch("http://localhost:8000/api/user/signup", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="md">
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
          <Typography variant={isMobile ? "h6" : "h4"}>Sign Up</Typography>
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
            {loading ? "Loading..." : "SIGN UP"}
          </Button>
          <Button
            fullWidth
            size={isMobile ? "small" : "medium"}
            color="error"
            variant="contained"
          >
            CONTINUE WITH GOOGLE
          </Button>

          <Typography variant={isMobile ? "body2" : "h6"}>
            Have an account ?
            <Link to="" className="Link">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default signUp;
