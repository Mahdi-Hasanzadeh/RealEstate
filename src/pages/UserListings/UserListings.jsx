//#region Imports

import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import NotFound from "../../Components/UI/NotFound.jsx";
import Fallback from "../../Components/UI/Fallback.jsx";
import ItemCard from "../../Components/CustomizedCard/ItemCard.jsx";
import axiosInstance from "../../config/axiosConfig.js";
import {
  cellPhoneAndTablets,
  computer,
  digitalEquipment,
} from "../../utils/utility.js";
import DeleteDialog from "../../Components/UI/DeleteDialog.jsx";

//#endregion

const UserListings = () => {
  //#region State & Hooks
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingToDelete, setListingToDelete] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteReason, setDeleteReason] = useState("");

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
      const response = await axiosInstance.get(`api/listing/${currentUser.id}`);

      if (response.data.succeess === false) {
        toast.error(response?.data?.message);
        return;
      }
      setListings(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    try {
      const listToDelete = listings.filter((item) => item._id == id)[0];
      await axiosInstance.delete(`api/listing/${id}`, {
        data: {
          mainCategoryName: listToDelete.mainCategoryName,
          subCategoryName: listToDelete.subCategoryName,
          reason: deleteReason,
        },
      });

      toast.success("Listing Deleted Successfully");
      const filteredListings = listings.filter((item) => item._id != id);
      setListings(filteredListings);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  //#endregion

  //#region Navigation
  const updateListing = (listing) => {
    const mainCategory = listing?.mainCategoryName;
    const subCategory = listing?.subCategoryName;
    if (mainCategory.toLowerCase() == "estate") {
      navigate(`/listing/update/${listing?._id},${listing?.mainCategoryName}`);
    } else if (mainCategory == digitalEquipment) {
      if (subCategory == cellPhoneAndTablets) {
        navigate(`/cellphone/update/${listing?._id}`);
      } else if (subCategory == computer) {
        navigate(`/computer/update/${listing?._id}`);
      }
    }
  };
  //#endregion

  //#region Effect
  useEffect(() => {
    fetchUserListing();
  }, []);
  //#endregion

  //#region Render
  if (loading) {
    return <Fallback />;
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
              showStatus={true}
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

      <DeleteDialog
        open={open}
        title="Warning"
        message={`Are you sure to delete listing (${listingToDelete?.name})?`}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        cancelText="Disagree"
        confirmText="Agree"
        reason={deleteReason}
        setReason={setDeleteReason}
      />
    </>
  );

  //#endregion
};

export default UserListings;
