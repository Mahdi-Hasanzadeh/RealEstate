import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Styles from "../../styles/style.module.css";

const ListingContent = ({ handleMouseLeave, handleDrawerToggle }) => {
  const handleListingClick = () => {
    handleMouseLeave();
    if (handleDrawerToggle) {
      handleDrawerToggle();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 1,
        rowGap: 2,
        width: 110,
      }}
    >
      <Link
        onClick={handleListingClick}
        className={`${Styles.tooltipLink}`}
        to="/create-list"
      >
        New Listing
      </Link>
      <Link
        onClick={handleListingClick}
        className={`${Styles.tooltipLink}`}
        to="/search"
      >
        Search Listings
      </Link>
      <Link
        onClick={handleListingClick}
        className={`${Styles.tooltipLink}`}
        to="/userListings"
      >
        Your Listings
      </Link>
      <Link
        onClick={handleListingClick}
        className={`${Styles.tooltipLink}`}
        to="/favoriteListings"
      >
        Your favorites
      </Link>
    </Box>
  );
};

export default ListingContent;
