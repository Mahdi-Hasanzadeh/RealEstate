import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmptyListings = () => {
  const navigate = useNavigate();
  const navigateToCreateListing = () => {
    navigate("/create-list");
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Your listing's collection is empty</h2>
      {window.location.pathname != "/RealEstate/profile" && (
        <Button
          onClick={navigateToCreateListing}
          color="success"
          variant="contained"
        >
          Create Listing
        </Button>
      )}
    </div>
  );
};
export default EmptyListings;
