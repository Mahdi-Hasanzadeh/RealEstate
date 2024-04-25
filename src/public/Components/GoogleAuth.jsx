import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { signInSuccess } from "../../../reactRedux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../PortConfig";
import { toast } from "react-toastify";
import { setWelcomeToast } from "../../../reactRedux/showToast";

const GoogleAuth = ({ isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationHistory = useSelector(
    (store) => store.locationHistory.locationHistory
  );
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result.user);
      const { displayName, email, photoURL } = result.user;
      // console.log(displayName, email, photoURL);
      // we should write the post method here to send these data to save in our database
      const response = await axios.post(`${URL}api/user/google`, {
        name: displayName,
        email,
        avatar: photoURL,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      const { accessToken, ...rest } = response.data;
      dispatch(
        signInSuccess({
          ...rest,
          email,
        })
      );

      if (locationHistory) {
        // toast container redirecting
        toast.info(`Welcome ${response.data.username}`);
        dispatch(setWelcomeToast(true));
        navigate(locationHistory);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      type="button"
      fullWidth
      size={isMobile ? "small" : "medium"}
      color="error"
      variant="contained"
    >
      CONTINUE WITH GOOGLE
    </Button>
  );
};

export default GoogleAuth;
