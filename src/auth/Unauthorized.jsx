import { Box, Button, Typography, Stack } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { addLocationHistory } from "../redux/userLocationHistory.js";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    const currentLocation =
      "/" + location.pathname.split("/").slice(2).join("/");
    dispatch(addLocationHistory(location));

    if (path === "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <LockPersonIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Access Restricted
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Please log in to your account or create a new one to continue.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          onClick={() => handleNavigate("login")}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PersonAddAltIcon />}
          onClick={() => handleNavigate("signup")}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default Unauthorized;
