//#region Import Section

import { Box, Button, Container, Typography, Zoom } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../PortConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LIGHTGRAY } from "../../../COLOR";

//#endregion

const favoritesListing = () => {
  //#region Fields

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  //#endregion

  //#region Methods

  // get the current user favorites list
  const fetchFavoritesListing = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL}api/user/userInfo/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.favorites.length == 0) {
        setFavorites([]);
        setError(null);
        return;
      }

      // * find all products that is in favorites list of current user
      // ? in oder to send several ids to the backend, we can use join method
      const listingsIds = response.data.favorites.join(",").toString();
      //api/listing/favoriteListings
      const response1 = await axios.get(
        `${URL}api/listing/favoriteListings?ListingsId=${listingsIds}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setFavorites(response1.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete a specific product from the current user favorites list
  const deleteFromFavorites = async (id) => {
    try {
      const response = await axios.put(
        `${URL}api/user/update/${currentUser.id}`,
        {
          favorites: id,
          removeFavorites: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to remove from favorites");
      }
      toast.success("Removed from favorites");
      setFavorites(favorites.filter((item) => item._id != id));
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, {
        autoClose: 3000,
      });
    }
  };

  //#endregion

  //#region Hook

  useEffect(() => {
    fetchFavoritesListing();
  }, []);

  //#endregion

  //#region style Objects

  const StyleForProductBox = {
    maxWidth: 400,
    width: 400,
    heigth: 400,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: LIGHTGRAY,
    borderRadius: 3,
    gap: 1.5,
    flexWrap: { xs: "wrap", sm: "nowrap" },
  };

  const StyleFormImage = {
    width: "100%",
    height: "200px",
    objectPosition: "center",
    objectFit: "fill",
    borderRadius: "5px",
  };

  const StyleForButtonsBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 2,
    mt: 2,
  };

  //#endregion

  return (
    <Container maxWidth="xl">
      <h2
        style={{
          color: "green",
          textAlign: "center",
        }}
      >
        Your Favorites
      </h2>
      {loading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : error != null ? (
        <div>
          <h3>{error}</h3>
        </div>
      ) : favorites.length == 0 ? (
        <div>
          <h3>No Favorites</h3>
        </div>
      ) : (
        favorites.length > 0 &&
        error == null && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {
              //#region show all favorites product of current user
              favorites.map((item, index) => {
                return (
                  <Zoom
                    key={index}
                    in={true}
                    style={{
                      transitionDelay: `${500 + index * 200}ms`,
                    }}
                  >
                    <Box className="color" sx={StyleForProductBox}>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: "center",
                            mb: 1,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Link
                          style={{
                            padding: 0,
                            margin: 0,
                          }}
                          to={`/listing/${item?._id},${
                            item?.mainCategoryName
                          },${item?.subCategoryName || null}`}
                          // to={`/listing/${item._id}`}
                        >
                          <img
                            className="cardImage"
                            srcSet={item.imageURLs[0]}
                            alt={item.name}
                            style={StyleFormImage}
                          />
                        </Link>
                        <Box sx={StyleForButtonsBox}>
                          <Button
                            onClick={() => {
                              deleteFromFavorites(item._id);
                            }}
                            variant="outlined"
                            color="error"
                            size="small"
                          >
                            Delete from favorites
                          </Button>
                          <Button
                            onClick={() => {
                              navigate(`/listing/${item._id}`);
                            }}
                            variant="outlined"
                            color="primary"
                            size="small"
                          >
                            View Product
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Zoom>
                );
              })
              //#endregion
            }
          </Box>
        )
      )}
    </Container>
  );
};

export default favoritesListing;
