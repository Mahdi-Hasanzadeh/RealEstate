//#region Libraries

import { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

//#endregion

//#region My Modules

import Navbar from "./pages/Navbar/Navbar.jsx";
import Fallback from "./Components/UI/Fallback.jsx";
import { setWelcomeToast } from "./redux/showToast.js";
import styleModule from "./styles/style.module.css";

//#endregion

//#region Lazy Load Components

const Home = lazy(() => import("./pages/Home/Home.jsx"));

const Dashboard = lazy(() => import("./pages/Dashboard/AdminDashboard.jsx"));

const About = lazy(() => import("./pages/About/About.jsx"));

const Signup = lazy(() => import("./pages/Account/Sign-up.jsx"));

const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile.jsx"));
const ShowListing = lazy(() => import("./pages/ShowListing/ShowListing.jsx"));
const EditListing = lazy(() => import("./pages/EditListing/EditListing.jsx"));
const FavoritesListing = lazy(() =>
  import("./pages/FavoriteListings/FavoritesListing.jsx")
);
const SearchListings = lazy(() =>
  import("./pages/SearchListings/SearchListings.jsx")
);
const UserListings = lazy(() =>
  import("./pages/UserListings/UserListings.jsx")
);
// const YourListings = lazy(() => import("./pages/YourListings.jsx"));
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute.jsx"));
const CreateListing = lazy(() =>
  import("./pages/CreateListing/CreateListing.jsx")
);

//#endregion

const App = () => {
  //#region fields

  const dispatch = useDispatch();
  const user = useSelector((store) => store.persistData.user.userInfo);
  const welcomeToast = useSelector(
    (store) => store.persistData.showWelcomeToast.userAlreadySeeWelcomeToast
  );

  //#endregion

  //#region Hooks
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

  //#endregion

  //#region Layout of the page

  const BasicLayout = () => {
    return (
      <div
        className={styleModule.backgroundcolor}
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </div>
    );
  };

  //#endregion

  return (
    <>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchListings />} />
          <Route path="/signup" element={<Signup url="signup" />} />
          <Route path="/signin" element={<Signup url="signin" />} />
          <Route
            path="/userListings"
            element={
              <ProtectedRoute>
                <UserListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoriteListings"
            element={
              <ProtectedRoute>
                <FavoritesListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-list"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route path="/listing/:listingId" element={<ShowListing />} />
          <Route
            path="/listing/update/:listingId"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <h1
                style={{
                  marginTop: "100px",
                }}
              >
                No route match
              </h1>
            }
          />
        </Route>
      </Routes>

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

// Based on project, what folder structure should be used?

// The folder structure should be organized to separate components, pages, and utilities for better maintainability and scalability. Here's a suggested structure:
// public/
// ├── Components/
// │   ├── Common/          # Reusable components like buttons, cards, etc.
// │   ├── InfoComponents/  # Components that display information, like empty states
// │   ├── Home Page Component/ # Components specific to the home page
// │   ├── Dashboard/       # Components related to the admin dashboard
// │   ├── UserProfile/     # Components for user profile management
// │   ├── CreateListing/   # Components for creating listings
// │   ├── EditListing/     # Components for editing listings
// │   ├── SingleList/      # Components for displaying a single listing
// │   ├── SearchListings/  # Components for searching listings
// │   ├── FavoritesListing/ # Components for displaying favorite listings
// │   ├── YourListings/    # Components for displaying user's listings
// │   ├── ProtectedRoute/  # Components for protected routes
// │   └── Navbar/          # Navigation bar component
// ├── styleComponents/     # Components for styling, like NotFound, ErrorState
// ├── App.jsx              # Main application component
// ├── index.js             # Entry point of the application
// ├── style.module.css     # Global styles
// └── reactRedux/          # Redux-related files, like store configuration and actions
// └── utils/               # Utility functions and constants
