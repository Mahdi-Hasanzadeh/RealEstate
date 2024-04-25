import { Container } from "@mui/material";
import { Suspense, lazy } from "react";
import Fallback from "./Fallback.jsx";

const UserListings = lazy(() => import("./UserListings.jsx"));

const YourListings = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        top: 50,
      }}
    >
      <Suspense fallback={<Fallback />}>
        <UserListings />
      </Suspense>
    </Container>
  );
};

export default YourListings;
