import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../PortConfig";

import image1 from "../assets/house1.jpg";
import image2 from "../assets/house4.jpg";
import ProductsSlider from "./ProductsSlider";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  BathroomRounded,
  BedroomParentRounded,
  ChairRounded,
  LocalParkingRounded,
  LocationCityRounded,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import ContactUser from "./ContactUser";

// const listings = {
//   userRef: "6605354eef735ae7fe854a7f",
//   offer: true,
//   type: "sell",
//   parking: true,
//   furnished: true,
//   bedrooms: 1,
//   address: "Herat",
//   bath: 2,
//   description: "this is a good house",
//   regularPrice: 100,
//   discountPrice: 90,
//   name: "Hotel Hasanzadeh",
//   imageURLs: [image1, image2],
// };

const SingleList = () => {
  const { listingId } = useParams();
  const currentUser = useSelector((store) => store.user.userInfo);
  console.log("currentUser: ", currentUser);
  const [listings, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUserListing = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URL}api/listing/userListing/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.success === false) {
        console.log(response.data.message);
        setError(response.data.message);
        return;
      }
      setListing(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggle = () => {
    setShow(false);
  };

  console.log(listings);

  const priceAfterDiscount = (regularPrice, discountPrice) => {
    return regularPrice - discountPrice;
  };

  useEffect(() => {
    fetchUserListing();
  }, []);

  return (
    <>
      {loading ? (
        <main
          style={{
            textAlign: "center",
          }}
        >
          <h2>Loading...</h2>
        </main>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        listings && (
          <main>
            <div>
              <ProductsSlider
                images={listings?.imageURLs.map((item) => {
                  return {
                    label: listings?.name,
                    imgPath: item,
                  };
                })}
              />
            </div>
            <Container
              maxWidth="lg"
              sx={{
                mb: 10,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 1.5,
                }}
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  {listings?.name}{" "}
                </Typography>
                <Typography variant="h5" fontWeight={"bold"}>
                  $
                  {priceAfterDiscount(
                    listings?.regularPrice,
                    listings?.discountPrice
                  )}{" "}
                  / month
                </Typography>
              </Box>
              {/* Address section */}
              <Box mt={3} display={"flex"} alignItems={"flex-end"} gap={1}>
                {
                  <LocationCityRounded
                    color="success"
                    sx={{
                      verticalAlign: "middle",
                    }}
                  />
                }{" "}
                <Typography variant="body1">{listings?.address}</Typography>{" "}
              </Box>
              {/* type of property section */}
              <Box
                mt={1}
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor: "red",
                    width: "200px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "19px",
                    borderRadius: 5,
                  }}
                >
                  {listings?.type == "rent" ? "Rent" : "Sell"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor: "green",
                    width: "200px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "19px",
                    borderRadius: 5,
                  }}
                >
                  {"$ " + listings?.discountPrice}
                </Typography>
              </Box>

              {/* Description Section */}
              <Box p={1.5}>
                <Typography
                  variant="body2"
                  width={"80%"}
                  sx={{
                    wordWrap: "break-word",
                    textAlign: "justify",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Description -
                  </span>{" "}
                  {listings?.description}
                </Typography>
              </Box>
              {/* Home Properties */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap-reverse",
                }}
              >
                <Typography color={"green"} variant="body1">
                  {" "}
                  {
                    <BedroomParentRounded
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  {listings?.bedrooms} bed{listings?.bedrooms !== 1 && "s"}
                </Typography>

                <Typography color={"green"} variant="body1">
                  {" "}
                  {
                    <BathroomRounded
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  {listings?.bath} bath{listings?.bath !== 1 && "s"}
                </Typography>
                <Typography color={"green"} variant="body1">
                  {" "}
                  {
                    <LocalParkingRounded
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  {listings?.parking ? "Parking spot" : "No Parking"}
                </Typography>
                <Typography color={"green"} variant="body1">
                  {" "}
                  {
                    <ChairRounded
                      sx={{
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  {listings?.furnished ? "Furnished" : "Unfurnished"}
                </Typography>
              </Box>

              {!show && (
                <Box
                  sx={{
                    mt: 2.5,
                  }}
                >
                  <ContactUser
                    userRef={listings.userRef}
                    name={listings.name}
                    isSmall={isSmall}
                  />
                </Box>
              )}

              {currentUser.id !== listings.userRef && show && (
                <Box>
                  <Button
                    onClick={toggle}
                    variant="contained"
                    fullWidth
                    size={isSmall ? "small" : "medium"}
                    sx={{
                      backgroundColor: "GrayText",
                      width: "50%",
                      mt: 3,
                    }}
                  >
                    Contact Landlord
                  </Button>
                </Box>
              )}
            </Container>
          </main>
        )
      )}
    </>
  );
};

export default SingleList;