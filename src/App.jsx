import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./public/Components/ComponentsReturn";
import { Slide, ToastContainer, toast } from "react-toastify";
import Fallback from "./public/Components/Fallback.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setWelcomeToast } from "../reactRedux/showToast.js";

const Home = lazy(() => import("./public/Components/Home.jsx"));
const About = lazy(() => import("./public/Components/About.jsx"));
const Signup = lazy(() => import("./public/Components/Sign-up.jsx"));
const UserProfile = lazy(() => import("./public/Components/UserProfile.jsx"));
const SingleList = lazy(() => import("./public/Components/SingleList.jsx"));
const EditListing = lazy(() => import("./public/Components/EditListing.jsx"));
const SearchListings = lazy(() =>
  import("./public/Components/SearchListings.jsx")
);
const YourListings = lazy(() => import("./public/Components/YourListings.jsx"));
const ProtectedRoute = lazy(() =>
  import("./public/Components/ProtectedRoute.jsx")
);
const CreateListing = lazy(() =>
  import("./public/Components/CreateListing.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.persistData.user.userInfo);
  const welcomeToast = useSelector(
    (store) => store.persistData.showWelcomeToast.userAlreadySeeWelcomeToast
  );

  useEffect(() => {
    if (welcomeToast) return;
    if (user) {
      toast.info(`Welcome ${user.username}`, {
        autoClose: 2500,
        transition: Slide,
      });
      dispatch(setWelcomeToast(true));
    }
  }, [user]);
  const BasicLayout = () => {
    return (
      <>
        <div>
          <Navbar />
          <Suspense fallback={<Fallback />}>
            <Outlet />
          </Suspense>
        </div>
      </>
    );
  };
  return (
    <>
      <BrowserRouter basename="/RealEstate/">
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="search" element={<SearchListings />} />
            <Route path="signup" element={<Signup url="signup" />} />
            <Route path="signin" element={<Signup url="signin" />} />
            <Route path="userListings" element={<YourListings />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-list"
              element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              }
            />
            <Route path="listing/:listingId" element={<SingleList />} />
            <Route path="listing/update/:listingId" element={<EditListing />} />
            <Route path="*" element={<h1>No route match</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
        limit={1}
      />
    </>
  );
};
export default App;
