import { Container } from "@mui/material";
import UserListings from "./UserListings";

const YourListings = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        top: 50,
      }}
    >
      <UserListings />
    </Container>
  );
};

export default YourListings;
