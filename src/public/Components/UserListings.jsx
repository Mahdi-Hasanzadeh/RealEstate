import axios from "axios";
import { useEffect, useState, forwardRef, Suspense, lazy } from "react";
import { URL } from "../../../PortConfig";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Zoom,
} from "@mui/material";
import { LIGHTGRAY } from "../../../COLOR";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Fallback from "./Fallback";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const EmptyListings = lazy(() => import("./InfoComponents/EmptyListings.jsx"));

const autoCloseTime = 3000;
const UserListings = () => {
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [listings, setListings] = useState([]);
  const [listingToDelete, setListingToDelete] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const fetchUserListing = async () => {
    try {
      const response = await axios.get(`${URL}api/listing/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.succeess === false) {
        console.log(response.data.message);
        toast.error(response?.data?.message, {
          autoClose: autoCloseTime,
        });
        return;
      }
      //   console.table(response.data);
      setListings(response.data);
    } catch (error) {
      toast.error(error.message, {
        autoClose: autoCloseTime,
      });
    }
  };

  // console.log(listings);

  const deleteListing = async (id) => {
    try {
      const response = await axios.delete(`${URL}api/listing/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success == false) {
        console.log(response.data.message);
        toast.error(response?.data?.message, {
          autoClose: autoCloseTime,
        });
        return;
      }
      // console.log("Listing Deleted");
      toast.error("Listing Deleted", {
        autoClose: autoCloseTime,
      });
      // instead of fetching database, we just update the state of app
      // fetchUserListing();
      setListings((prevData) => {
        return [...prevData.filter((item) => item._id !== id)];
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        autoClose: autoCloseTime,
      });
    }
  };

  const updateListing = (id) => {
    navigate(`/listing/update/${id}`);
  };

  useEffect(() => {
    fetchUserListing();
  }, []);
  // console.log("use listing");
  return (
    <Box>
      <h2
        style={{
          color: "green",
          textAlign: "center",
        }}
      >
        Your Listings({listings.length})
      </h2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          rowGap: 3,
        }}
      >
        {listings.length == 0 ? (
          <Suspense fallback={<Fallback />}>
            <EmptyListings />
          </Suspense>
        ) : (
          listings.length > 0 &&
          listings.map((item, index) => {
            return (
              <Box
                key={index}
                className="color"
                sx={{
                  maxWidth: 400,
                  width: 400,
                  heigth: 400,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: LIGHTGRAY,
                  borderRadius: 3,
                  gap: 1.5,
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  sx={{
                    width: 250,
                    height: 250,
                  }}
                >
                  <Typography variant="body1" mb={1}>
                    {item.name}
                  </Typography>
                  <Link
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    // to={`/listing/${item._id}`}
                    to={`/listing/${item?._id},${item?.mainCategoryName},${
                      item?.subCategoryName || null
                    }`}
                  >
                    <img
                      className="cardImage"
                      srcSet={item.imageURLs[0]}
                      alt={item.name}
                      width={"250px"}
                      height={"200px"}
                      style={{
                        objectPosition: "center",
                        objectFit: "fill",
                        borderRadius: "5px",
                      }}
                    />
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                    columnGap: { xs: 2, sm: 0 },
                    rowGap: { xs: 0, sm: 2 },

                    mt: 1,
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setListingToDelete({ id: item._id, name: item.name });
                    }}
                    sx={{
                      color: "red",
                    }}
                    type="button"
                    variant="contained"
                    className="color"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      updateListing(item._id);
                    }}
                    sx={{
                      color: "green",
                    }}
                    color="primary"
                    type="button"
                    variant="contained"
                    className="color"
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure to delete listing (${listingToDelete?.name})?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              deleteListing(listingToDelete?.id);
              setOpen(false);
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserListings;
