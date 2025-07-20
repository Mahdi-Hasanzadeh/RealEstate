import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLocationHistory } from "../redux/userLocationHistory";
import { Box, Button, Typography } from "@mui/material";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.persistData.user);
  const handleNavigate = (to) => {
    const currentLocation = location.pathname;
    console.log("current Location: ", currentLocation);
    dispatch(addLocationHistory(location));
    if (to == "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  if (currentUser.userInfo) {
    return props.children;
  } else {
    // const currentLocation =
    //   "/" + location.pathname.split("/").slice(2).join("/");

    // alert("redirecting to sign in page");
    return (
      <Box padding={2}>
        <Typography
          sx={{
            textAlign: "center",
            mb: 1.5,
          }}
          variant="body1"
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
              handleNavigate("/login");
            }}
            size="small"
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleNavigate("/signup");
            }}
            size="small"
          >
            Sign up
          </Button>
        </Box>
      </Box>
    );
  }
};

export default ProtectedRoute;
