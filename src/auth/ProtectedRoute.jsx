import { Box, Button, Typography, Stack } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLocationHistory } from "../redux/userLocationHistory";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.persistData.user);

  const handleNavigate = (to) => {
    dispatch(addLocationHistory(location));
    if (to === "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  if (currentUser.userInfo) {
    return props.children;
  }

  // ✨ Beautiful fallback UI for unauthenticated access
  return (
    <Box
      sx={{
        height: "70dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" mb={2} fontWeight="bold">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Please log in to your account or sign up to access this page.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
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
            startIcon={<PersonAddIcon />}
            onClick={() => handleNavigate("signup")}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProtectedRoute;
