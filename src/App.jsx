// import { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

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
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/about"
              element={
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem amet nam dolores sequi, praesentium ullam rem
                  eum in, minima fugit odio facilis quibusdam. Omnis nam
                  possimus corrupti vitae cum maxime iste iure laboriosam culpa
                  eligendi deleniti delectus assumenda inventore alias est
                  ducimus, dolore distinctio perferendis placeat et sapiente.
                  Excepturi similique sed in reiciendis, magnam debitis
                  doloremque. Reiciendis officia ea hic eligendi, at
                  exercitationem sunt nesciunt sequi consequuntur soluta nemo
                  nihil voluptatum numquam doloribus? Dolores sed asperiores
                  ullam tenetur exercitationem labore est expedita alias modi
                  magnam deleniti omnis ad laboriosam ea eveniet, cum,
                  voluptatum totam! Odio adipisci unde veniam quo temporibus!
                </div>
              }
            />
          </Route>
        </Routes>
      </Box>
    </>
  );
};
export default App;
