// import { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import {
  Navbar,
  Home,
  About,
  Signup,
} from "../public/Components/ComponentsReturn";
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
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<h1>No route match</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
