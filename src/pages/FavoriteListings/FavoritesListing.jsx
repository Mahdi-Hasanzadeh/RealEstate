//#region Imports

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { URL } from "../../config/PortConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import NotFound from "../../Components/UI/NotFound";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ErrorState from "../../Components/UI/ErrorState";
import ItemCard from "../../Components/CustomizedCard/ItemCard";
import ConfirmDialog from "../../Components/UI/ConfirmDialog";
import Fallback from "../../Components/UI/Fallback";
import axiosInstance from "../../config/axiosConfig";

//#endregion

const FavoritesListing = () => {
  //#region State

  const [open, setOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const navigate = useNavigate();

  //#endregion

  //#region Handlers

  const handleClose = () => setOpen(false);

  const handleConfirmDelete = () => {
    if (listingToDelete?.id) {
      deleteFromFavorites(listingToDelete.id);
      setOpen(false);
    }
  };

  const handleDeleteClick = (item) => {
    setListingToDelete({ id: item._id, name: item.name });
    setOpen(true);
  };

  const handleViewClick = (item) => {
    const path = `/listing/${item._id},${item.mainCategoryName},${
      item.subCategoryName || "null"
    }`;
    navigate(path);
  };

  //#endregion

  //#region API Calls

  const fetchFavoritesListing = async () => {
    setLoading(true);
    try {
      const { data: userData } = await axiosInstance.get(
        `${URL}api/user/userInfo/${currentUser.id}`
      );

      if (!userData?.favorites?.length) {
        setFavorites([]);
        setError(null);
        return;
      }

      const listingsIds = userData.favorites.join(",");
      const { data: favoriteItems } = await axiosInstance.get(
        `${URL}api/listing/favoriteListings?ListingsId=${listingsIds}`
      );

      setFavorites(favoriteItems);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      toast.error(err.message || "Failed to fetch favorites.");
    } finally {
      setLoading(false);
    }
  };

  const deleteFromFavorites = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${URL}api/user/update/${currentUser.id}/favorites`,
        {
          favorites: id,
          removeFavorites: true,
        }
      );

      if (!response.data) {
        throw new Error("Failed to remove from favorites.");
      }

      toast.success("Removed from favorites.");
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  //#endregion

  //#region Lifecycle

  useEffect(() => {
    fetchFavoritesListing();
  }, []);

  //#endregion

  //#region Render

  if (loading) {
    return <Fallback />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <ErrorState />
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <NotFound
          message="No Favorites"
          description="You haven’t saved anything yet."
          icon={
            <SentimentDissatisfiedIcon
              sx={{ fontSize: 80, color: "grey.500", mb: 2 }}
            />
          }
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 6 }}>
      <Typography variant="h5" align="center" sx={{ color: "green", mb: 4 }}>
        Your Favorites
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
          p: 2,
          pb: 8,
        }}
      >
        {favorites.map((item, index) => (
          <ItemCard
            key={item._id || index}
            item={item}
            onDeleteClick={() => handleDeleteClick(item)}
            showView={true}
            onViewClick={handleViewClick}
          />
        ))}
      </Box>

      <ConfirmDialog
        open={open}
        title="Warning"
        message={`Are you sure to delete listing (${listingToDelete?.name})?`}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        cancelText="Disagree"
        confirmText="Agree"
      />
    </Container>
  );

  //#endregion
};

export default FavoritesListing;
