import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../PortConfig";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import {
  BathroomRounded,
  BedroomParentRounded,
  ChairRounded,
  LocalParkingRounded,
  LocationCityRounded,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { addLocationHistory } from "../../reactRedux/userLocationHistory";
import ContactUser from "./ContactUser";

import { formatDistanceToNow } from "date-fns";
import { BLACK, LIGHTGRAY } from "../../COLOR";
import MobileStepper from "@mui/material/MobileStepper";

import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SingleList = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [listings, setListing] = useState(null);
  const maxSteps = listings?.imageURLs?.length || 0;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUserListing = async () => {
    if (currentUser == null) {
      console.log("Please login");
      return;
    }
    setLoading(true);
    try {
      // dispatch(addLocationHistory(null));
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

  // console.log(listings);

  const priceAfterDiscount = (regularPrice, discountPrice) => {
    return regularPrice - discountPrice;
  };

  useEffect(() => {
    fetchUserListing();
  }, []);

  const handleNavigate = (to) => {
    // getting the user location
    const location =
      "/" + window.location.pathname.split("/").slice(2).join("/");

    dispatch(addLocationHistory(location));

    // console.log(location.pathname.split("/").slice(2).join("/"));
    if (to == "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      {currentUser == null ? (
        <Box
          sx={{
            position: "relative",
            top: 50,
          }}
          padding={2}
        >
          <Typography
            sx={{
              textAlign: "center",
              mb: 1.5,
            }}
            variant="body1"
          >
            Please first login to your account or create a new one
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              columnGap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleNavigate("login");
              }}
              size="small"
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleNavigate("signup");
              }}
              size="small"
            >
              Sign up
            </Button>
          </Box>
        </Box>
      ) : loading ? (
        <main
          style={{
            position: "relative",
            top: 50,
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
              <Container
                maxWidth="lg"
                sx={{
                  mt: 4,
                }}
              >
                <Paper
                  square
                  elevation={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: LIGHTGRAY,
                    mt: 10,
                  }}
                >
                  <Typography>{listings.name}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {listings?.imageURLs.map((step, index) => (
                    <div key={index}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: { sm: 450, md: 500 },
                            display: "block",
                            width: "100%",
                            overflow: "hidden",
                            objectFit: { xs: "contain", sm: "fill" },
                            objectPosition: "center",
                          }}
                          src={step}
                          alt={step}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Container>
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
                  {priceAfterDiscount(
                    listings?.regularPrice,
                    listings?.discountPrice
                  )}{" "}
                  {listings?.type === "rent" ? "/ month" : null}
                </Typography>
              </Box>
              {/* Address section */}
              <Box mt={2} display={"flex"} alignItems={"flex-end"} gap={1}>
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
                mt={1.5}
                mb={1}
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
                {listings?.offer && (
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
                    {"AFG" + listings?.discountPrice}
                  </Typography>
                )}
              </Box>

              {/* Description Section */}
              <Box>
                <Typography
                  variant="body1"
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
              <Box mt={1} mb={1}>
                <Typography variant="body2" color={BLACK}>
                  {/* {listing?.createdAt.toString()} */}
                  {listings?.createdAt &&
                    formatDistanceToNow(new Date(listings?.createdAt))}{" "}
                  ago
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
