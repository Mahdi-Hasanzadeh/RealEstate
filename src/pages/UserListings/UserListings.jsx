//#region Imports

import axios from "axios";
import { useEffect, useState, Suspense, lazy } from "react";
import { URL } from "../../config/PortConfig.js";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import Loader from "../../Components/UI/loader.jsx";
import NotFound from "../../Components/UI/NotFound.jsx";
import Fallback from "../../Components/UI/Fallback.jsx";
import ItemCard from "../../Components/CustomizedCard/ItemCard.jsx";
import ConfirmDialog from "../../Components/UI/ConfirmDialog.jsx";

//#endregion

//#region Constants
const autoCloseTime = 3000;

//#endregion

const UserListings = () => {
  //#region State & Hooks
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingToDelete, setListingToDelete] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //#endregion

  //#region Handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteListing(listingToDelete?.id);
    setOpen(false);
  };
  //#endregion

  //#region API Calls
  const fetchUserListing = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}api/listing/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.succeess === false) {
        toast.error(response?.data?.message, { autoClose: autoCloseTime });
        return;
      }
      setListings(response.data);
    } catch (error) {
      toast.error(error.message, { autoClose: autoCloseTime });
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    try {
      const response = await axios.delete(`${URL}api/listing/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success == false) {
        console.log(response.data.message);
        toast.error(response?.data?.message, { autoClose: autoCloseTime });
        return;
      }

      toast.error("Listing Deleted", { autoClose: autoCloseTime });
      setListings((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { autoClose: autoCloseTime });
    }
  };
  //#endregion

  //#region Navigation
  const updateListing = (listing) => {
    navigate(
      `/listing/update/${listing?._id},${listing?.mainCategoryName},${
        listing?.subCategoryName || null
      }`
    );
  };
  //#endregion

  //#region Effect
  useEffect(() => {
    fetchUserListing();
  }, []);
  //#endregion

  //#region Render
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (listings.length === 0) {
    return (
      <Suspense fallback={<Fallback />}>
        <NotFound
          message="No Listings"
          description="You haven’t created any listings yet."
          icon={
            <SentimentDissatisfiedIcon
              sx={{ fontSize: 80, color: "grey.500", mb: 2 }}
            />
          }
        />
      </Suspense>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <h2 style={{ color: "green", textAlign: "center" }}>
          Your Listings ({listings.length})
        </h2>
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
            pb: 10,
          }}
        >
          {listings.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              onDeleteClick={() => {
                setOpen(true);
                setListingToDelete({ id: item._id, name: item.name });
              }}
              onEditClick={() => updateListing(item)}
              showEdit={true}
            />
          ))}
        </Box>
      </Container>

      <ConfirmDialog
        open={open}
        title="Warning"
        message={`Are you sure to delete listing (${listingToDelete?.name})?`}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        cancelText="Disagree"
        confirmText="Agree"
      />
    </>
  );

  //#endregion
};

export default UserListings;
