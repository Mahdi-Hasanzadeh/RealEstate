import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../src/firebase";
import { signInSuccess } from "../../reactRedux/userSlice";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuth = ({ isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const { displayName, email, photoURL } = result.user;
      console.log(displayName, email, photoURL);
      // we should write the post method here to send these data to save in our database
      const response = await axios.post(
        "http://localhost:8000/api/user/google",
        {
          name: displayName,
          email,
          avatar: photoURL,
        }
      );
      console.log("response gg:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      const { accessToken, ...rest } = response.data;
      console.log(response.data);
      dispatch(
        signInSuccess({
          ...rest,
          email,
        })
      );
      navigate("/");
    } catch (error) {
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
