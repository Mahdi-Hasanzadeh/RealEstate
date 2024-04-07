// import { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import {
  Navbar,
  Home,
  About,
  Signup,
  UserProfile,
  ProtectedRoute,
  CreateListing,
} from "../public/Components/ComponentsReturn";
import Counter from "../public/Components/counter";
import SingleList from "../public/Components/SingleList";
import EditListing from "../public/Components/EditListing";
const App = () => {
  const BasicLayout = () => {
    return (
      <>
        <div>
          <Navbar />
          <Outlet />
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
            <Route path="signup" element={<Signup url="signup" />} />
            <Route path="signin" element={<Signup url="signin" />} />
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
            <Route path="counter" element={<Counter />} />
            <Route path="*" element={<h1>No route match</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
