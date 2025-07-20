//#region (libraries)

import {
  Box,
  Container,
  FormControlLabel,
  TextField,
  Checkbox,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const autoCloseTime = 3000;

//#endregion

//#region My Modules

import { BLACK, LIGHTGRAY } from "../../styles/Color.js";
import Fallback from "../../Components/UI/Fallback.jsx";
import { updateUser } from "../../redux/userSlice.js";
import { URL } from "../../config/PortConfig.js";
import { app } from "../../config/firebase.js";
import ComboBox from "../SearchListings/ComboBox.jsx";
import {
  allBrands,
  allDigitalEquipment,
  allProducts,
  CategoryItems,
  cellPhoneAndTablets,
  CellPhoneBrands,
  CellPhoneRAM,
  CellPhoneStorage,
  ColorValues,
  digitalEquipment,
  estate,
  samsung,
  StorageValues,
  SubCategoryItemsForDigitalEquiments,
  ValidateMobileNumber,
  ValidateMobileNumberLength,
} from "../../utils/utility.js";

const Wave = lazy(() => import("../../Components/WaveHeader.jsx"));

//#endregion

//#region Global Fields

const pageTitle = "Create list";

//#endregion

const CreateListing = () => {
  //#region fields

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector((store) => store.persistData.user.userInfo);

  const [mainCategory, setMainCategory] = useState(estate);
  const [subCategory, setSubCategory] = useState("");

  const [cellPhoneInfo, setCellPhoneInfo] = useState({
    brand: CellPhoneBrands[1].value, // default is samsung
    storage: CellPhoneStorage[0].value,
    color: ColorValues[0].value,
    RAM: CellPhoneRAM[0].value,
  });

  const [estateFormInfo, setEstateFormInfo] = useState({
    type: "rent",
    parking: false,
    furnished: false,
    bedrooms: 1,
    bath: 1,
  });

  const [generalFormInfo, setGeneralFormInfo] = useState({
    description: "",
    imageURLs: [],
    regularPrice: 1,
    discountPrice: 1,
    mobileNumber: "",
    offer: false,
  });

  //#endregion

  //#region useEffect

  useEffect(() => {
    // we set the sub mainCategory to a default value when the mainCategory is changed
    switch (mainCategory) {
      case digitalEquipment: {
        setSubCategory(cellPhoneAndTablets);
        break;
      }
    }
  }, [mainCategory]);

  //#endregion

  //#region methods

  const handleCategory = (event) => {
    setMainCategory(event.target.value);
  };

  const handleSubCategoryForDigitalEquipment = (event) => {
    setSubCategory(event.target.value);
  };

  const handleGeneralFormInfo = (event) => {
    setGeneralFormInfo((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const handleEstateFormInfo = (event) => {
    const attributeName = event.target.name;
    const inputType = event.target.type;

    setEstateFormInfo((prevData) => {
      if (attributeName == "type") {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      } else if (inputType == "checkbox") {
        return {
          ...prevData,
          [event.target.name]: event.target.checked,
        };
      } else {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      }
    });
  };

  const handleCellPhoneInfo = (event) => {
    setCellPhoneInfo((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const deleteImageFromlist = (item) => {
    setGeneralFormInfo((prevData) => {
      return {
        ...prevData,
        imageURLs: [...generalFormInfo.imageURLs.filter((url) => url !== item)],
      };
    });
  };

  const handleChoosenFiles = (event) => {
    if (event.target.files.length < 7) {
      setFile(event.target.files);
    }
  };

  const handleUpload = () => {
    if (file.length > 0 && file.length + generalFormInfo.imageURLs.length < 7) {
      const promises = [];
      toast.info("Uploading photo, please wait");
      setUploading(true);
      for (var i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setGeneralFormInfo((prevData) => {
            return {
              ...prevData,
              imageURLs: generalFormInfo.imageURLs.concat(urls),
            };
          });
          setUploading(true);
        })
        .then(() => {
          setUploadError(false);
        })
        .catch((error) => {
          // setUploadError("image Upload failed.Image should be 2mb ");
          toast.error("image Upload failed.Image should be 2mb ", {
            autoClose: autoCloseTime,
          });
          console.log(error.message);
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploadError("Please choose only six images for every list");
      toast.error("Please choose only six images for every list", {
        autoClose: autoCloseTime,
      });
    }
  };

  const AddUserMobileNumberToDatabase = async (
    userId,
    mobileNumber,
    accessToken
  ) => {
    try {
      const resp = await axios.put(
        `${URL}api/user/update/${userId}`,
        {
          mobileNumber: mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (resp?.data?.succeess == false) {
        return {
          success: false,
          message: resp?.data?.message,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check the general information
    if (
      !generalFormInfo.name ||
      !generalFormInfo.description ||
      !generalFormInfo.address ||
      generalFormInfo.imageURLs.length === 0
    ) {
      toast.error("Please provide the required information", {
        autoClose: autoCloseTime,
      });
      return;
    }

    // check the mobile number
    if (!currentUser.mobileNumber) {
      if (!ValidateMobileNumber(generalFormInfo.mobileNumber)) {
        toast.error("Telephone number Should Contain only numbers");
        return;
      }

      if (!ValidateMobileNumberLength(generalFormInfo.mobileNumber)) {
        toast.error("Mobile number should be 10 digits");
        return;
      }
    }

    // check the price and discount
    // if (generalFormInfo.offer) {
    //   if (
    //     parseInt(generalFormInfo.discountPrice) >=
    //     parseInt(generalFormInfo.regularPrice)
    //   ) {
    //     toast.error(
    //       "Discount price can not be bigger than or equal to regular price",
    //       {
    //         autoClose: autoCloseTime,
    //       }
    //     );
    //     return;
    //   }
    // }

    setUploading(true);
    // check that the user have mobile number or not
    if (!currentUser.mobileNumber) {
      const response = await AddUserMobileNumberToDatabase(
        currentUser.id,
        generalFormInfo.mobileNumber,
        accessToken
      );

      if (!response.success == false) {
        toast.error(response.message, {
          autoClose: autoCloseTime,
        });
        setUploadError(response.message);
        setUploading(false);
        return;
      }

      // mobile number added Successfully
      toast.success("Your mobile number updated");
      dispatch(
        updateUser({
          ...currentUser,
          mobileNumber: generalFormInfo.mobileNumber,
        })
      );
    }

    // Get Proudct object
    const productObject = CreateProductObjectBasedOnCategory(mainCategory);

    // Add Product object to database
    const response = await addProductToDatabase(productObject);

    if (response.success == false) {
      setUploading(false);
      return;
    }
    setUploading(false);
    // const params = response.data._id + "," + response.data.
    console.log(response.data._id + "," + mainCategory + "," + subCategory);
    // return;
    navigate(
      `/listing/${response.data._id + "," + mainCategory + "," + subCategory}`
    );
  };

  const CreateProductObjectBasedOnCategory = (mainCategory) => {
    // const discountPrice = generalFormInfo.offer
    //   ? generalFormInfo.discountPrice
    //   : 0;
    let productInfo = {
      mainCategory,
      // discountPrice,
      ...generalFormInfo,
    };

    switch (mainCategory) {
      case estate: {
        productInfo = {
          ...productInfo,
          ...estateFormInfo,
        };
        break;
      }
      case digitalEquipment: {
        productInfo = {
          ...productInfo,
          ...cellPhoneInfo,
          subCategory,
        };
        break;
      }
    }
    return productInfo;
  };

  const addProductToDatabase = async (product) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(`${URL}api/listing/create`, product, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.data?.succeess == false) {
        toast.error(response?.data?.message, {
          autoClose: autoCloseTime,
        });

        setUploadError(response?.data?.message);

        return {
          success: false,
          message: response?.data?.message,
        };
      }

      toast.success("Your product added successfully");
      return {
        succeess: true,
        data: response?.data,
      };
    } catch (error) {
      toast.error(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = file.name + new Date().getTime();
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          console.log("Upload is " + Math.round(progress) + "% done");
        },
        (error) => {
          console.log("eroro upload");
          toast.error(error.message, {
            autoClose: autoCloseTime,
          });
          console.log(error);
          setUploading(false);
          reject(error);
        },
        () => {
          console.log("down url");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    });
  };

  //#endregion

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          paddingBottom: 10,
        }}
      >
        <Suspense fallback={<Fallback />}>
          <Wave title={pageTitle} />
        </Suspense>

        <Grid
          container
          spacing={md ? 0 : 1}
          justifyContent={md ? "normal" : "flex-start"}
        >
          <Grid item xs={12} md={6}>
            <Box
              component={"form"}
              sx={{
                padding: 2,
              }}
            >
              {/* General information about the product and user */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 1,
                }}
              >
                <ComboBox
                  name={"Choose Category"}
                  defaultValue={"ALL PRODUCTS"}
                  value={mainCategory}
                  handleValueMethod={handleCategory}
                  items={CategoryItems.filter(
                    (item) => item.value != allProducts
                  )}
                />
                {mainCategory == digitalEquipment && (
                  <>
                    <ComboBox
                      name={"Choose Sub Category"}
                      defaultValue={allDigitalEquipment}
                      value={subCategory}
                      items={SubCategoryItemsForDigitalEquiments.filter(
                        (item) => item.value != allDigitalEquipment
                      )}
                      handleValueMethod={handleSubCategoryForDigitalEquipment}
                    />
                  </>
                )}
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={generalFormInfo.name || ""}
                  onChange={handleGeneralFormInfo}
                  required
                  size={md ? "small" : "medium"}
                />
                <TextField
                  multiline
                  fullWidth
                  maxRows={10}
                  type="text"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={generalFormInfo.description}
                  onChange={handleGeneralFormInfo}
                  required
                  size={md ? "small" : "medium"}
                />
                <TextField
                  multiline
                  fullWidth
                  maxRows={10}
                  type="text"
                  label="address"
                  variant="outlined"
                  name="address"
                  value={generalFormInfo?.address || ""}
                  onChange={handleGeneralFormInfo}
                  required
                  size={md ? "small" : "medium"}
                />
                {!currentUser.mobileNumber && (
                  <TextField
                    fullWidth
                    type="text"
                    label="Mobile"
                    variant="outlined"
                    name="mobileNumber"
                    value={generalFormInfo?.mobileNumber || ""}
                    onChange={handleGeneralFormInfo}
                    required
                    size={md ? "small" : "medium"}
                  />
                )}
              </Box>
              {/*End of General information about the product and user */}

              {/* property type: sell or rent */}
              {mainCategory == estate && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "space-between", sm: "flex-start" },
                    }}
                  >
                    <FormControlLabel
                      value="sell"
                      label="Sell"
                      labelPlacement="start"
                      name="type"
                      onChange={handleEstateFormInfo}
                      control={
                        <Checkbox
                          size={md ? "small" : "medium"}
                          checked={estateFormInfo.type === "sell"}
                        />
                      }
                    />
                    <FormControlLabel
                      value={"rent"}
                      label="Rent"
                      labelPlacement="start"
                      name="type"
                      onChange={handleEstateFormInfo}
                      control={
                        <Checkbox
                          size={md ? "small" : "medium"}
                          checked={estateFormInfo.type === "rent"}
                        />
                      }
                    />
                  </Box>
                  {/* Features of property */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "flex-start",
                      mb: 1.5,
                    }}
                  >
                    <FormControlLabel
                      value={estateFormInfo.parking}
                      label="Parking spot"
                      labelPlacement="start"
                      name="parking"
                      onChange={handleEstateFormInfo}
                      control={
                        <Checkbox
                          size={md ? "small" : "medium"}
                          checked={estateFormInfo.parking || false}
                        />
                      }
                    />
                    <FormControlLabel
                      value={true}
                      label="Furnished"
                      labelPlacement="start"
                      name="furnished"
                      onChange={handleEstateFormInfo}
                      control={
                        <Checkbox
                          size={md ? "small" : "medium"}
                          checked={estateFormInfo.furnished || false}
                        />
                      }
                    />
                  </Box>
                </>
              )}
              {mainCategory == digitalEquipment &&
                subCategory == cellPhoneAndTablets && (
                  <>
                    <ComboBox
                      name={"brand"}
                      defaultValue={samsung}
                      items={CellPhoneBrands.filter(
                        (item) => item.value != allBrands
                      )}
                      value={cellPhoneInfo.brand}
                      handleValueMethod={handleCellPhoneInfo}
                    />
                    <ComboBox
                      name={"storage"}
                      defaultValue={"Choose Storage"}
                      items={CellPhoneStorage}
                      value={cellPhoneInfo.storage}
                      handleValueMethod={handleCellPhoneInfo}
                    />
                    <ComboBox
                      name="RAM"
                      defaultValue={"Choose RAM"}
                      value={cellPhoneInfo.RAM}
                      items={CellPhoneRAM}
                      handleValueMethod={handleCellPhoneInfo}
                    />
                    <ComboBox
                      name={"color"}
                      defaultValue={"Choose Color"}
                      items={ColorValues}
                      value={cellPhoneInfo.color}
                      handleValueMethod={handleCellPhoneInfo}
                    />
                  </>
                )}
              {/* Offer input */}
              {/* 
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "flex-start",
                  mb: 1.5,
                }}
              >
                <FormControlLabel
                  value={true}
                  label="Offer"
                  labelPlacement="start"
                  name="offer"
                  onChange={handleGeneralFormInfo}
                  control={
                    <Checkbox
                      size={md ? "small" : "medium"}
                      checked={generalFormInfo.offer || false}
                    />
                  }
                />
              </Box> */}

              {/* End of Offer input */}

              {/* Price Input */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 3,
                  flexWrap: "wrap",
                  marginTop: 2,
                }}
              >
                {mainCategory == estate && (
                  <>
                    <TextField
                      type="number"
                      label="Beds"
                      size={md ? "small" : "medium"}
                      name="bedrooms"
                      value={estateFormInfo.bedrooms}
                      onChange={handleEstateFormInfo}
                    />
                    <TextField
                      type="number"
                      label="Baths"
                      size={md ? "small" : "medium"}
                      name="bath"
                      value={estateFormInfo.bath}
                      onChange={handleEstateFormInfo}
                    />
                  </>
                )}

                {/* <TextField
                  type="number"
                  label={
                    generalFormInfo.type === "rent"
                      ? "Regular Price / month"
                      : "Regular Price"
                  }
                  size={md ? "small" : "medium"}
                  name="regularPrice"
                  value={generalFormInfo.regularPrice}
                  onChange={handleEstateFormInfo}
                /> */}

                <TextField
                  type="number"
                  label={"Price"}
                  size={md ? "small" : "medium"}
                  name="regularPrice"
                  value={generalFormInfo.regularPrice}
                  onChange={handleGeneralFormInfo}
                />
                {generalFormInfo.offer && (
                  <TextField
                    type="number"
                    label="Discount"
                    size={md ? "small" : "medium"}
                    name="discountPrice"
                    value={generalFormInfo.discountPrice}
                    onChange={handleGeneralFormInfo}
                  />
                )}
              </Box>
            </Box>
          </Grid>
          {/* Upload Photo section */}

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box>
              <h3
                style={{
                  fontSize: md ? "16.5px" : "20px",
                  fontWeight: "bolder",
                  textAlign: "justify",
                }}
              >
                Images:
                <span
                  style={{
                    color: BLACK,
                  }}
                >
                  The first image will be the cover (maximum:6)
                </span>
              </h3>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  gap: 1.5,
                }}
              >
                <input
                  style={{
                    border: "1p solid aqua",
                    outline: "2px solid",
                    outlineColor: LIGHTGRAY,
                    textIndent: "4px",
                  }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChoosenFiles}
                />
                <Button
                  onClick={handleUpload}
                  variant="contained"
                  color="success"
                  size={md ? "small" : "large"}
                  disabled={uploading}
                  fullWidth
                >
                  {uploading ? "Uploading...." : "UPLOAD"}
                </Button>
              </Box>
            </Box>
            <Box className="show image section">
              <p>{uploadError && uploadError}</p>

              {generalFormInfo.imageURLs.length > 0 &&
                generalFormInfo.imageURLs.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <img
                        width={"100"}
                        height={"100"}
                        style={{
                          borderRadius: "5px",
                          objectFit: "cotain",
                        }}
                        src={item}
                        alt={item}
                      />
                      <Button
                        onClick={() => {
                          deleteImageFromlist(item);
                        }}
                        variant="text"
                        color="warning"
                      >
                        Delete
                      </Button>
                    </Box>
                  );
                })}
            </Box>
            <Button
              sx={{}}
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              size={md ? "small" : "large"}
              color="success"
              disabled={uploading ? true : false}
            >
              {uploading ? "Loading" : "Create list"}
            </Button>
          </Grid>

          {/* End of Upload Photo section */}
        </Grid>
      </Container>
    </>
  );
};

export default CreateListing;
