import { Box, Button, Typography } from "@mui/material";
import { addLocationHistory } from "../../../reactRedux/userLocationHistory";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const LoginUI = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    // getting the user location
    const currentLocation =
      "/" + location.pathname.split("/").slice(2).join("/");

    dispatch(addLocationHistory(location));

    if (path == "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        minHeight: "90dvh",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          mb: 1.5,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
        variant="h5"
      >
        Please first login to your account or create a new one
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            handleNavigate("login");
          }}
          size="small"
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleNavigate("signup");
          }}
          size="small"
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginUI;
