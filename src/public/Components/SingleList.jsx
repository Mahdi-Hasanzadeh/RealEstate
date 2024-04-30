import axios from "axios";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../PortConfig";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Checkbox,
  Tooltip,
} from "@mui/material";
import {
  BathroomRounded,
  BedroomParentRounded,
  Bookmark,
  BookmarkBorder,
  ChairRounded,
  LocalParkingRounded,
  LocationCityRounded,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { addLocationHistory } from "../../../reactRedux/userLocationHistory";

import { formatDistanceToNow } from "date-fns";
import { BLACK, LIGHTGRAY } from "../../../COLOR";
import MobileStepper from "@mui/material/MobileStepper";

import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Fallback from "./Fallback";
import { toast } from "react-toastify";
import { fetchUserListing } from "../../../reactRedux/userListing.js";
const autoCloseTime = 3000;
const ContactUser = lazy(() => import("./ContactUser.jsx"));
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SingleList = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const userListing = useSelector((store) => store.userListing);

  const [favoriteChecked, setFavoriteChecked] = useState(null);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);

  const [show, setShow] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const maxSteps = userListing?.data?.imageURLs?.length || 0;
  // const fetchUserFavorites = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${URL}api/listing/userListing/${userListing._id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     );
  //     if (response.data.success === false) {
  //       throw new Error(response.data.message);
  //     }

  //     // setListing(response.data);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchUserListing({ listingId, currentUserId: currentUser.id }));
    // fetchUserFavorites();
  }, []);

  const handleFavoriteChecked = async () => {
    setFavoriteDisabled(true);
    try {
      const response = await axios.put(
        `${URL}api/user/update/${currentUser.id}`,
        {
          favorites: userListing.data._id,
          removeFavorites: favoriteChecked
            ? true
            : favoriteChecked == false
            ? false
            : userListing?.data?.favorites.find((item) => item == listingId)
            ? true
            : false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.data) {
        throw new Error("Add to favorites Failed");
      }
      if (favoriteChecked == null) {
        if (userListing?.data?.favorites.find((item) => item == listingId)) {
          toast.error("Removed from favorites", {
            autoClose: 2000,
          });
        } else {
          toast.success("Added to favorites", {
            autoClose: 2000,
          });
        }
        setFavoriteChecked(
          userListing?.data?.favorites.find((item) => item == listingId)
            ? false
            : true
        );
      } else {
        if (favoriteChecked) {
          toast.error("Removed from favorites", {
            autoClose: 2000,
          });
        } else {
          toast.success("Added to favorites", {
            autoClose: 2000,
          });
        }
        setFavoriteChecked(!favoriteChecked);
      }
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, {
        autoClose: 3000,
      });
    } finally {
      setFavoriteDisabled(false);
    }
  };

  const toggle = () => {
    setShow(false);
  };

  const priceAfterDiscount = (regularPrice, discountPrice) => {
    return regularPrice - discountPrice;
  };

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
  // console.log(currentUser.favorites);
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
      ) : userListing.loading ? (
        <div
          style={{
            position: "relative",
            top: 50,
            textAlign: "center",
          }}
        >
          <h2>Loading...</h2>
        </div>
      ) : userListing.success == false ? (
        <div
          style={{
            position: "relative",
            top: 50,
            textAlign: "center",
          }}
        >
          <h2>{userListing.error}</h2>
        </div>
      ) : (
        userListing.success &&
        userListing.error == false && (
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
                  <Typography>{userListing.data.name}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {userListing.data?.imageURLs.map((step, index) => (
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
                  {userListing.data?.name}{" "}
                </Typography>
                <Typography variant="h5" fontWeight={"bold"}>
                  {userListing.data?.discountPrice == 0
                    ? userListing.data?.regularPrice
                    : userListing.data?.discountPrice}{" "}
                  {userListing.data?.type === "rent" ? "/ month" : null}
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
                <Typography variant="body1">
                  {userListing.data?.address}
                </Typography>{" "}
              </Box>
              {/* type of property section */}
              <Box
                mt={1.5}
                mb={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
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
                  {userListing.data?.type == "rent" ? "Rent" : "Sell"}
                </Typography>
                {userListing.data?.offer && (
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
                    {"AFG " +
                      priceAfterDiscount(
                        userListing.data?.regularPrice,
                        userListing.data?.discountPrice
                      )}
                  </Typography>
                )}
                {currentUser.id !== userListing.data.userRef && (
                  <Tooltip title="Add to Favorites">
                    <Checkbox
                      disabled={favoriteDisabled}
                      icon={<BookmarkBorder />}
                      checkedIcon={<Bookmark />}
                      checked={
                        favoriteChecked == true
                          ? true
                          : favoriteChecked == false
                          ? false
                          : userListing?.data?.favorites.find(
                              (item) => item == listingId
                            )
                          ? true
                          : false
                      }
                      onClick={handleFavoriteChecked}
                    />
                  </Tooltip>
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
                  {userListing.data?.description}
                </Typography>
              </Box>
              <Box mt={1} mb={1}>
                <Typography variant="body2" color={BLACK}>
                  {/* {listing?.createdAt.toString()} */}
                  {userListing.data?.createdAt &&
                    formatDistanceToNow(
                      new Date(userListing.data?.createdAt)
                    )}{" "}
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
                  {userListing.data?.bedrooms} bed
                  {userListing.data?.bedrooms !== 1 && "s"}
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
                  {userListing.data?.bath} bath
                  {userListing.data?.bath !== 1 && "s"}
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
                  {userListing.data?.parking ? "Parking spot" : "No Parking"}
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
                  {userListing.data?.furnished ? "Furnished" : "Unfurnished"}
                </Typography>
              </Box>

              <Suspense fallback={<Fallback />}>
                {!show && (
                  <Box
                    sx={{
                      mt: 2.5,
                    }}
                  >
                    <ContactUser
                      userRef={userListing.data.userRef}
                      name={userListing.data.name}
                      isSmall={isSmall}
                    />
                  </Box>
                )}
              </Suspense>

              <Suspense fallback={<Fallback />}>
                {currentUser.id !== userListing.data.userRef && show && (
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
              </Suspense>
            </Container>
          </main>
        )
      )}
    </>
  );
};

export default SingleList;
