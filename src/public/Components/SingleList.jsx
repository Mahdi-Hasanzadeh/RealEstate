//#region import (libraries)
import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import {
  BathroomRounded,
  BedroomParentRounded,
  Bookmark,
  BookmarkBorder,
  ChairRounded,
  LocalParkingRounded,
  LocationCityRounded,
  LocationOnRounded,
  PunchClock,
  TimelineRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { toast } from "react-toastify";

//#endregion

//#region import (My Modules)

import { LIGHTGRAY } from "../../../COLOR";
import Fallback from "./Fallback";
import { fetchUserListing } from "../../../reactRedux/userListing.js";
import { URL } from "../../../PortConfig";
import Loader from "../styleComponents/loader.jsx";
import { cellPhoneAndTablets, estate } from "../utility.js";
import CellPhoneUI from "./Components For Single Product/CellPhoneUI.jsx";
import TimePassed from "../Utility/Time.jsx";
import ErrorUI from "../styleComponents/Error.jsx";
import LoginUI from "../Utility/Login.jsx";
const ContactUser = lazy(() => import("./ContactUser.jsx"));
//#endregion

//#region globale variable

const autoCloseTime = 3000;
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

//#endregion

const SingleList = () => {
  //#region fields (use hook)

  const [activeStep, setActiveStep] = useState(0);
  const { listingId } = useParams();
  const dispatch = useDispatch();

  //get the current user's all listings with it's favorites listings
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
      const split = listingId.split(",");
      const id = split[0];
      const mainCategory = split[1];
      const subCategory = split[2];
      console.log("heelo");
      console.log(mainCategory);
      console.log(subCategory);
      //* get the single product that the user selected and the current user information
      //* to check if the current user have this single product in it's favorties list or not
      //?fetchUserListing return the single product information and the favorites list of current user
      dispatch(
        fetchUserListing({
          id,
          mainCategory,
          subCategory,
          currentUserId: currentUser.id,
        })
      );
    }
  }, []);

  //#endregion

  //#region Methods

  const toggle = () => {
    setShow(false);
  };

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

  // const priceAfterDiscount = (regularPrice, discountPrice) => {
  //   return regularPrice - discountPrice;
  // };

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

  const ProductDescriptions = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 1.5,
          }}
        >
          {/* <Typography variant="h5" fontWeight={"bold"}>
            {userListing.data?.name}{" "}
          </Typography> */}

          <Typography variant="h5" fontWeight={"bold"}>
            {userListing.data?.regularPrice} AF
            {userListing?.data?.mainCategoryName == estate &&
            userListing.data?.type === "rent"
              ? "/ month"
              : null}
          </Typography>

          <TimePassed date={userListing?.data?.createdAt} />

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

          {/* <Typography variant="h5" fontWeight={"bold"}>
            {userListing.data?.discountPrice == 0
              ? userListing.data?.regularPrice
              : userListing.data?.discountPrice}{" "}
            {userListing.data?.type === "rent" ? "/ month" : null}
          </Typography> */}
        </Box>
        {/* End of Name,Price and TimePassed for products */}

        <Box mt={2} display={"flex"} alignItems={"flex-end"} gap={1}>
          <LocationOnRounded
            color="success"
            sx={{
              verticalAlign: "middle",
            }}
          />

          <Typography variant="body1">{userListing.data?.address}</Typography>
        </Box>
        {/*End of Address  */}

        <Box
          mt={1.5}
          mb={1}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {userListing?.data?.mainCategoryName == estate && (
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
          )}

          {/* {userListing.data?.offer && (
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
          )} */}
        </Box>
        {/*End of type of property (sell or rent)*/}

        <Box>
          <Typography
            variant="body1"
            width={"80%"}
            sx={{
              wordWrap: "break-word",
              textAlign: "justify",
              fontFamily: "sans-serif",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Description:{" "}
            </span>
            {userListing.data?.description}
          </Typography>
        </Box>
        {/* End 0f Description */}

        <Divider
          sx={{
            my: 2,
          }}
        />

        {userListing?.data?.mainCategoryName == estate && (
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
        )}
        {/*End of Home Features */}

        {userListing?.data?.subCategoryName == cellPhoneAndTablets && (
          <CellPhoneUI product={userListing?.data} />
        )}
        {/* End of Cell Phone Info */}

        <Divider
          sx={{
            my: 2,
          }}
        />
      </>
    );
  };

  //#endregion

  // if user is not logged in show login form
  if (currentUser == null) {
    return <LoginUI />;
  }

  return (
    <>
      {userListing.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90dvh",
          }}
        >
          <Loader />
        </Box>
      ) : userListing.success == false ? (
        <ErrorUI error={userListing?.error} />
      ) : (
        userListing.success &&
        userListing.error == false && (
          <Container maxWidth="lg">
            <Box
              sx={{
                mt: 4,
              }}
            >
              <Slider />
            </Box>
            <Box
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
            </Box>
          </Container>
        )
      )}
    </>
  );
};

export default SingleList;
