//#region import (libraries)
import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { formatDistanceToNow } from "date-fns";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { toast } from "react-toastify";

//#endregion

//#region import (My Modules)

import { addLocationHistory } from "../../../reactRedux/userLocationHistory";
import { BLACK, LIGHTGRAY } from "../../../COLOR";
import Fallback from "./Fallback";
import { fetchUserListing } from "../../../reactRedux/userListing.js";
import { URL } from "../../../PortConfig";
import Loader from "../styleComponents/loader.jsx";
const ContactUser = lazy(() => import("./ContactUser.jsx"));
//#endregion

//#region globale variable

const autoCloseTime = 3000;
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//#endregion

const SingleList = () => {
  //#region fields (use hook)

  const [activeStep, setActiveStep] = useState(0);
  //get the id of the current product from the url
  const { listingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //bring the current user all listings with it's favorites listings
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const userListing = useSelector((store) => store.userListing);
  const [favoriteChecked, setFavoriteChecked] = useState(null);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);
  const [show, setShow] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const maxSteps = userListing?.data?.imageURLs?.length || 0;
  //#endregion

  //#region Use Effect hook

  useEffect(() => {
    if (currentUser) {
      //* get the single product that the user selected and the current user information
      //* to check if the current user have this single product in it's favorties list or not
      //?fetchUserListing return the single product information and the favorites list of current user
      dispatch(fetchUserListing({ listingId, currentUserId: currentUser.id }));
    }
  }, []);

  //#endregion

  //#region Methods

  //* add or remove a product to/from favorties list
  // ! find a better solution
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

  // Calculate the price of product with discount
  const priceAfterDiscount = (regularPrice, discountPrice) => {
    return regularPrice - discountPrice;
  };

  const handleNavigate = (to) => {
    // getting the user location
    const currentLocation =
      "/" + location.pathname.split("/").slice(2).join("/");

    dispatch(addLocationHistory(location));

    // console.log(location.pathname.split("/").slice(2).join("/"));
    if (to == "login") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  //#region Methods for slider
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  //#endregion

  //#endregion

  //#region Styles Objects

  const styleForSliderImage = {
    height: { sm: 450, md: 500 },
    display: "block",
    width: "100%",
    overflow: "hidden",
    objectFit: { xs: "contain", sm: "fill" },
    objectPosition: "center",
  };

  const ContactLandlordButtonStyle = {
    backgroundColor: "GrayText",
    width: "50%",
    mt: 3,
    mb: 3,
  };

  //#endregion

  //#region fields

  const isFavoriteChecked =
    favoriteChecked == true
      ? true
      : favoriteChecked == false
      ? false
      : userListing?.data?.favorites.find((item) => item == listingId)
      ? true
      : false;
  //#endregion

  //#region Components

  const Slider = () => {
    return (
      <>
        <Paper
          square
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: LIGHTGRAY,
            mt: 5,
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
                  sx={styleForSliderImage}
                  src={step}
                  alt={step}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          style={{
            background: LIGHTGRAY,
            borderRadius: "5px",
          }}
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
      </>
    );
  };

  // show login form when the user is not login
  const Login = () => {
    return (
      <Box padding={2}>
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
    );
  };

  const ProductDescriptions = () => {
    return (
      <>
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
          }
          <Typography variant="body1">{userListing.data?.address}</Typography>
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
                checked={isFavoriteChecked}
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
            </span>
            {userListing.data?.description}
          </Typography>
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="body2" color={BLACK}>
            {/* {listing?.createdAt.toString()} */}
            {userListing.data?.createdAt &&
              formatDistanceToNow(new Date(userListing.data?.createdAt))}
            ago
          </Typography>
        </Box>
        {/* Home Features */}
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
            {
              <BedroomParentRounded
                sx={{
                  verticalAlign: "middle",
                }}
              />
            }
            {userListing.data?.bedrooms} bed
            {userListing.data?.bedrooms !== 1 && "s"}
          </Typography>

          <Typography color={"green"} variant="body1">
            {
              <BathroomRounded
                sx={{
                  verticalAlign: "middle",
                }}
              />
            }
            {userListing.data?.bath} bath
            {userListing.data?.bath !== 1 && "s"}
          </Typography>
          <Typography color={"green"} variant="body1">
            {
              <LocalParkingRounded
                sx={{
                  verticalAlign: "middle",
                }}
              />
            }
            {userListing.data?.parking ? "Parking spot" : "No Parking"}
          </Typography>
          <Typography color={"green"} variant="body1">
            {
              <ChairRounded
                sx={{
                  verticalAlign: "middle",
                }}
              />
            }
            {userListing.data?.furnished ? "Furnished" : "Unfurnished"}
          </Typography>
        </Box>
      </>
    );
  };
  //#endregion

  return (
    <>
      {currentUser == null ? (
        <Login />
      ) : userListing.loading ? (
        <div
          style={{
            textAlign: "center",
          }}
        >
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
        </div>
      ) : userListing.success == false ? (
        <div
          style={{
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
                <Slider />
              </Container>
            </div>
            <Container
              maxWidth="lg"
              sx={{
                pb: 5,
              }}
            >
              <ProductDescriptions />
              <Suspense fallback={<Fallback />}>
                {!show && (
                  <Box
                    sx={{
                      mt: 2.5,
                    }}
                  >
                    {/* Contact user Form */}
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
                      sx={ContactLandlordButtonStyle}
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
