import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const currentUser = useSelector((store) => store.user);
  if (currentUser.userInfo) {
    return props.children;
  } else {
    // alert("redirecting to sign in page");
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;
