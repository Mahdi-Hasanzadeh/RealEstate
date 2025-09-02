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
  Checkbox,
  Tooltip,
  Divider,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import {
  BathroomRounded,
  BedroomParentRounded,
  Bookmark,
  BookmarkBorder,
  ChairRounded,
  LocalParkingRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

//#endregion

//#region import (My Modules)

import Fallback from "../../Components/UI/Fallback.jsx";
import { fetchUserListing } from "../../redux/userListing.js";
import { URL } from "../../config/PortConfig.js";
import Loader from "../../Components/UI/loader.jsx";
import {
  calculateDiscountPercentage,
  cellPhoneAndTablets,
  computer,
  estate,
} from "../../utils/utility.js";
import CellPhoneUI from "./CellPhoneUI.jsx";
import TimePassed from "../../Components/TimePassed.jsx";
import ErrorUI from "../../Components/UI/Error.jsx";
import Unauthorized from "../../auth/Unauthorized.jsx";
import ImageSlider from "./ImageSlider.jsx";
import ComputerUI from "./ComputerUI.jsx";
import axiosInstance from "../../config/axiosConfig.js";
const ContactUser = lazy(() => import("./ContactLandlord.jsx"));
//#endregion

//#region globale variable

const ContactLandlordButtonStyle = {
  backgroundColor: "GrayText",
  width: "50%",
  mt: 3,
  mb: 3,
};
//#endregion

const ShowListing = () => {
  //#region fields (use hook)

  const { listingId } = useParams();
  const dispatch = useDispatch();

  //get the current user's all listings with it's favorites listings
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const userListing = useSelector((store) => store.userListing);
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);
  const [favoriteDisabled, setFavoriteDisabled] = useState(false);
  const [show, setShow] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  //#endregion

  //#region Use Effect hook

  useEffect(() => {
    if (currentUser) {
      const split = listingId.split(",");
      const id = split[0];
      const mainCategory = split[1]?.toLowerCase();
      const subCategory = split[2]?.toLowerCase();

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

  useEffect(() => {
    if (userListing?.data && listingId) {
      const id = listingId.split(",")[0];
      const isFavorited = userListing.data.favorites?.includes(id);
      setIsFavoriteChecked(isFavorited);
    }
  }, [userListing?.data, listingId]);

  //#endregion

  //#region Methods

  //* add or remove a product to/from favorties list
  const handleFavoriteChecked = async () => {
    setFavoriteDisabled(true);
    const id = listingId.split(",")[0];

    try {
      const response = await axiosInstance.put(
        `${URL}api/user/update/${currentUser.id}/favorites`,
        {
          favorites: userListing.data._id,
          removeFavorites: isFavoriteChecked,
        }
      );

      if (!response.data) throw new Error("Failed to update favorites");

      toast["success"](
        isFavoriteChecked ? "Removed from favorites" : "Added to favorites"
      );

      setIsFavoriteChecked((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
    } finally {
      setFavoriteDisabled(false);
    }
  };

  //#endregion

  //#region Components

  // const ProductDescriptions = () => {
  //   return (
  //     <>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexWrap: "wrap",
  //           alignItems: { xs: "flex-start", md: "center" },
  //           gap: 1.5,
  //         }}
  //       >
  //         <Typography variant="h5" fontWeight={"bold"}>
  //           {userListing.data?.regularPrice} AF
  //           {userListing?.data?.mainCategoryName == estate &&
  //           userListing.data?.type === "rent"
  //             ? "/ month"
  //             : null}
  //         </Typography>

  //         <TimePassed date={userListing?.data?.createdAt} />

  //         {currentUser.id !== userListing.data.userRef && (
  //           <Tooltip title="Add to Favorites">
  //             <Checkbox
  //               disabled={favoriteDisabled}
  //               icon={<BookmarkBorder />}
  //               checkedIcon={<Bookmark />}
  //               checked={isFavoriteChecked}
  //               onClick={handleFavoriteChecked}
  //             />
  //           </Tooltip>
  //         )}
  //       </Box>
  //       {/* End of Name,Price and TimePassed for products */}

  //       <Box mt={2} display={"flex"} alignItems={"flex-end"} gap={1}>
  //         <LocationOnRounded
  //           color="success"
  //           sx={{
  //             verticalAlign: "middle",
  //           }}
  //         />

  //         <Typography variant="body1">{userListing.data?.address}</Typography>
  //       </Box>
  //       {/*End of Address  */}

  //       <Box
  //         mt={1.5}
  //         mb={1}
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: 1,
  //         }}
  //       >
  //         {userListing?.data?.mainCategoryName == estate && (
  //           <Typography
  //             variant="body1"
  //             sx={{
  //               backgroundColor: "red",
  //               width: "200px",
  //               textAlign: "center",
  //               color: "white",
  //               fontSize: "19px",
  //               borderRadius: 5,
  //             }}
  //           >
  //             {userListing.data?.type == "rent" ? "Rent" : "Sell"}
  //           </Typography>
  //         )}

  //         {/* {userListing.data?.offer && (
  //           <Typography
  //             variant="body1"
  //             sx={{
  //               backgroundColor: "green",
  //               width: "200px",
  //               textAlign: "center",
  //               color: "white",
  //               fontSize: "19px",
  //               borderRadius: 5,
  //             }}
  //           >
  //             {"AFG " +
  //               priceAfterDiscount(
  //                 userListing.data?.regularPrice,
  //                 userListing.data?.discountPrice
  //               )}
  //           </Typography>
  //         )} */}
  //       </Box>
  //       {/*End of type of property (sell or rent)*/}

  //       <Box>
  //         <Typography
  //           variant="body1"
  //           width={"80%"}
  //           sx={{
  //             wordWrap: "break-word",
  //             textAlign: "justify",
  //             fontFamily: "sans-serif",
  //           }}
  //         >
  //           <span
  //             style={{
  //               fontWeight: "bold",
  //             }}
  //           >
  //             Description:{" "}
  //           </span>
  //           {userListing.data?.description}
  //         </Typography>
  //       </Box>
  //       {/* End 0f Description */}

  //       <Divider
  //         sx={{
  //           my: 2,
  //         }}
  //       />

  //       {userListing?.data?.mainCategoryName.toLowerCase() == estate && (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "flex-start",
  //             gap: 2,
  //             alignItems: "center",
  //             flexWrap: "wrap-reverse",
  //           }}
  //         >
  //           <Typography color={"green"} variant="body1">
  //             {
  //               <BedroomParentRounded
  //                 sx={{
  //                   verticalAlign: "middle",
  //                 }}
  //               />
  //             }
  //             {userListing.data?.bedrooms} bed
  //             {userListing.data?.bedrooms !== 1 && "s"}
  //           </Typography>
  //           <Typography color={"green"} variant="body1">
  //             {
  //               <BathroomRounded
  //                 sx={{
  //                   verticalAlign: "middle",
  //                 }}
  //               />
  //             }
  //             {userListing.data?.bath} bath
  //             {userListing.data?.bath !== 1 && "s"}
  //           </Typography>
  //           <Typography color={"green"} variant="body1">
  //             {
  //               <LocalParkingRounded
  //                 sx={{
  //                   verticalAlign: "middle",
  //                 }}
  //               />
  //             }
  //             {userListing.data?.parking ? "Parking spot" : "No Parking"}
  //           </Typography>
  //           <Typography color={"green"} variant="body1">
  //             {
  //               <ChairRounded
  //                 sx={{
  //                   verticalAlign: "middle",
  //                 }}
  //               />
  //             }
  //             {userListing.data?.furnished ? "Furnished" : "Unfurnished"}
  //           </Typography>
  //         </Box>
  //       )}
  //       {/*End of Home Features */}

  //       {userListing?.data?.subCategoryName == cellPhoneAndTablets && (
  //         <CellPhoneUI product={userListing?.data} />
  //       )}
  //       {/* End of Cell Phone Info */}

  //       <Divider
  //         sx={{
  //           my: 2,
  //         }}
  //       />
  //     </>
  //   );
  // };

  // //#endregion

  // if (currentUser == null) {
  //   return <Unauthorized />;
  // }

  // return (
  //   <>
  //     {userListing.loading ? (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "90dvh",
  //         }}
  //       >
  //         <Loader />
  //       </Box>
  //     ) : userListing.success == false ? (
  //       <ErrorUI error={userListing?.error} />
  //     ) : (
  //       userListing.success &&
  //       userListing.error == false && (
  //         <Container maxWidth="lg">
  //           <Box
  //             sx={{
  //               mt: 4,
  //             }}
  //           >
  //             <ImageSlider
  //               images={userListing.data?.imageURLs || []}
  //               title={userListing.data?.name}
  //             />
  //           </Box>
  //           <Box
  //             sx={{
  //               pb: 5,
  //             }}
  //           >
  //             <ProductDescriptions />

  //             <Suspense fallback={<Fallback />}>
  //               {!show && (
  //                 <Box
  //                   sx={{
  //                     mt: 2.5,
  //                   }}
  //                 >
  //                   {/* Contact user Form */}
  //                   <ContactUser
  //                     userRef={userListing.data.userRef}
  //                     name={userListing.data.name}
  //                     isSmall={isSmall}
  //                   />
  //                 </Box>
  //               )}
  //             </Suspense>

  //             {currentUser.id !== userListing.data.userRef && show && (
  //               <Box>
  //                 <Button
  //                   onClick={() => setShow(false)}
  //                   variant="contained"
  //                   fullWidth
  //                   size={isSmall ? "small" : "medium"}
  //                   sx={ContactLandlordButtonStyle}
  //                 >
  //                   Contact Seller
  //                 </Button>
  //               </Box>
  //             )}
  //           </Box>
  //         </Container>
  //       )
  //     )}
  //   </>
  // );

  const ProductDescriptions = () => {
    //Estate
    const isEstate =
      userListing?.data?.mainCategoryName?.toLowerCase() === "estate";
    const isRent = userListing?.data?.type === "rent";

    // cellPhone
    const isCellPhone =
      userListing?.data?.subCategoryName === cellPhoneAndTablets;
    const offer = userListing?.data?.offer;

    // Calculate discount percentage
    const discountPercentage = offer
      ? calculateDiscountPercentage(
          userListing.data?.regularPrice,
          userListing.data?.discountPrice
        )
      : 0;

    const isComputer = userListing?.data?.subCategoryName === computer;

    return (
      <Paper
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Price + Date + Favorite */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
              {offer ? (
                <>
                  <Typography
                    variant="h5"
                    component="span"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {userListing.data?.regularPrice} AF
                  </Typography>

                  <Typography
                    variant="h4"
                    component="span"
                    color="success.main"
                    fontWeight={600}
                  >
                    {userListing.data?.discountPrice} AF
                  </Typography>

                  {isEstate && isRent && (
                    <Typography component="span" color="text.secondary">
                      / month
                    </Typography>
                  )}

                  {/* Offer Chip */}
                  <Chip
                    label={`${discountPercentage}% Off`}
                    color="info"
                    size="small"
                    sx={{ ml: 1, fontWeight: 500 }}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    component="span"
                    color="primary.main"
                    fontWeight={500}
                  >
                    {userListing.data?.regularPrice} AF
                  </Typography>

                  {isEstate && isRent && (
                    <Typography component="span" color="text.secondary">
                      / month
                    </Typography>
                  )}
                </>
              )}

              {/* Time Passed */}
              <Box ml={2}>
                <TimePassed date={userListing?.data?.createdAt} />
              </Box>
            </Box>

            {isEstate && (
              <Chip
                label={isEstate ? (isRent ? "For Rent" : "For Sale") : ""}
                color={isRent ? "warning" : "success"}
                size="medium"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mt: 0.5,
                  borderRadius: 2,
                }}
              />
            )}
          </Box>

          {currentUser.id !== userListing.data.userRef && (
            <Tooltip
              title={
                isFavoriteChecked ? "Remove from Favorites" : "Add to Favorites"
              }
            >
              <Checkbox
                disabled={favoriteDisabled}
                icon={<BookmarkBorder />}
                checkedIcon={<Bookmark color="primary" />}
                checked={isFavoriteChecked}
                onChange={handleFavoriteChecked}
                size="large"
                sx={{ ml: { md: 2 } }}
                inputProps={{ "aria-label": "add to favorites" }}
              />
            </Tooltip>
          )}
        </Stack>

        {/* Location */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mt={3}
          flexWrap="wrap" // ensures text wraps instead of overflowing
          maxWidth="100%" // prevent overflow beyond container
        >
          <LocationOnRounded color="success" fontSize="medium" />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={600}
            sx={{ wordBreak: "break-word" }} // helps break long words
          >
            {userListing.data?.address}
          </Typography>
        </Stack>

        {/* Description */}
        <Box
          mt={4}
          sx={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#555",
            overflowWrap: "break-word", // important for long words or URLs
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            Description:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {userListing.data?.description || "No description available."}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Estate Features */}
        {isEstate && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            flexWrap="wrap"
            justifyContent="start"
            mb={3}
          >
            {[
              {
                icon: <BedroomParentRounded fontSize="large" color="success" />,
                label: `${userListing.data?.bedrooms} bed${
                  userListing.data?.bedrooms !== 1 ? "s" : ""
                }`,
              },
              {
                icon: <BathroomRounded fontSize="large" color="success" />,
                label: `${userListing.data?.bath} bath${
                  userListing.data?.bath !== 1 ? "s" : ""
                }`,
              },
              {
                icon: <LocalParkingRounded fontSize="large" color="success" />,
                label: userListing.data?.parking
                  ? "Parking spot"
                  : "No Parking",
              },
              {
                icon: <ChairRounded fontSize="large" color="success" />,
                label: userListing.data?.furnished
                  ? "Furnished"
                  : "Unfurnished",
              },
            ].map(({ icon, label }, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#e6f4ea",
                  p: 1.5,
                  borderRadius: 2,
                  minWidth: 140,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    bgcolor: "#d4edda", // Slightly darker green background on hover
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)", // Optional: slight lift on hover
                  },
                }}
              >
                {icon}
                <Typography
                  fontWeight="600"
                  variant="body1"
                  color="success.main"
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        {/* Cell Phone Info */}
        {isCellPhone && <CellPhoneUI product={userListing?.data} />}

        {isComputer && <ComputerUI product={userListing?.data} />}

        <Divider sx={{ my: 3 }} />
        {currentUser.id !== userListing.data.userRef && show && (
          <Box sx={{ mt: 2, textAlign: "left" }}>
            <Button
              onClick={() => setShow(false)}
              variant="contained"
              size="small"
              sx={{
                borderRadius: 2,
                fontWeight: "bold",
                py: 1,
                px: 3,
                background:
                  "linear-gradient(90deg, rgba(21,101,192,1) 0%, rgba(25,118,210,1) 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(17,83,160,1) 0%, rgba(21,101,192,1) 100%)",
                },
                boxShadow: "0 3px 10px rgb(25 118 210 / 0.4)",
              }}
            >
              Contact Seller
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  if (!currentUser) {
    return <Unauthorized />;
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
      ) : userListing.success && !userListing.error ? (
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Box mb={4}>
            <ImageSlider
              images={userListing.data?.imageURLs || []}
              title={userListing.data?.name}
            />
          </Box>

          <ProductDescriptions />

          <Suspense fallback={<Fallback />}>
            {!show && (
              <Box mt={4}>
                <ContactUser
                  userRef={userListing.data.userRef}
                  name={userListing.data.name}
                  isSmall={isSmall}
                />
              </Box>
            )}
          </Suspense>
        </Container>
      ) : userListing.success === false ? (
        <ErrorUI error={userListing?.error} />
      ) : null}
    </>
  );
};

export default ShowListing;
