import { Box, Container, Typography, Zoom } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../PortConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LIGHTGRAY } from "../../../COLOR";

const favoritesListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    fetchFavoritesListing();
  }, []);

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
            {favorites.map((item, index) => {
              return (
                <Zoom
                  key={index}
                  in={true}
                  style={{
                    transitionDelay: `${500 + index * 200}ms`,
                  }}
                >
                  <Box
                    className="color"
                    sx={{
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
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                        }}
                        mb={1}
                      >
                        {item.name}
                      </Typography>
                      <Link
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                        to={`/listing/${item._id}`}
                      >
                        <img
                          className="cardImage"
                          srcSet={item.imageURLs[0]}
                          alt={item.name}
                          width={"100%"}
                          height={"200px"}
                          style={{
                            objectPosition: "center",
                            objectFit: "fill",
                            borderRadius: "5px",
                          }}
                        />
                      </Link>
                    </Box>
                    {/* <Box
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
                        color="error"
                        type="button"
                        variant="contained"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          updateListing(item._id);
                        }}
                        color="primary"
                        type="button"
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </Box> */}
                  </Box>
                </Zoom>
              );
            })}
          </Box>
        )
      )}
    </Container>
  );
};

export default favoritesListing;
