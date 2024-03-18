// import { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Navbar, Home, About } from "../public/Components/ComponentsReturn";
import { Box } from "@mui/material";
const App = () => {
  const BasicLayout = () => {
    return (
      <>
        <div>
          <Navbar />
        </div>
      </>
    );
  };
  return (
    <>
      <Box>
        <BrowserRouter basename="/RealEstate/">
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/about"
                element={
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem amet nam dolores sequi, praesentium ullam rem
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};
export default App;
