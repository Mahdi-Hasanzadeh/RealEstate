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
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  Radio,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
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
  // allDigitalEquipment,
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
import axiosInstance from "../../config/axiosConfig.js";

const Wave = lazy(() => import("../../Components/WaveHeader.jsx"));

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
    bedrooms: "",
    bath: "",
  });

  const [generalFormInfo, setGeneralFormInfo] = useState({
    description: "",
    imageURLs: [],
    regularPrice: "",
    discountPrice: "",
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
    setGeneralFormInfo((prevDate) => {
      return {
        ...prevDate,
        offer: false,
      };
    });
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

  const handleEstateFormInfo = useCallback((event) => {
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
  }, []);

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
          toast.error("image Upload failed.Image should be 2mb ");
          console.log(error.message);
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploadError("Please choose only six images for every list");
      toast.error("Please choose only six images for every list");
    }
  };

  const AddUserMobileNumberToDatabase = async (userId, mobileNumber) => {
    try {
      const resp = await axiosInstance.put(`api/user/update/${userId}`, {
        mobileNumber: mobileNumber,
      });

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

  const addProductToDatabase = async (product) => {
    try {
      const response = await axiosInstance.post(`api/listing/create`, {
        ...product,
        discountPrice: generalFormInfo.offer
          ? generalFormInfo.discountPrice
          : 0,
      });

      if (response?.data?.succeess == false) {
        toast.error(response?.data?.message);
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
    } finally {
      setUploading(false);
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
      toast.error("Please provide the required information");
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

    const discount = parseFloat(generalFormInfo.discountPrice);
    const price = parseFloat(generalFormInfo.regularPrice);
    if (mainCategory === "estate") {
      const beds = parseFloat(estateFormInfo.bedrooms);
      const bath = parseFloat(estateFormInfo.bath);

      if (isNaN(beds) || beds <= 0) {
        toast.error("Beds must be greater than zero");
        return;
      }

      if (isNaN(bath) || bath <= 0) {
        toast.error("Bath must be greater than zero");
        return;
      }

      if (isNaN(price) || price <= 0) {
        toast.error("Price must be greater than zero");
        return;
      }
    }
    // else if (mainCategory === "Digital_Equipment") {
    //   if (
    //     !generalFormInfo.regularPrice ||
    //     parseFloat(generalFormInfo.regularPrice) <= 0
    //   ) {
    //     toast.error("Price must be greater than zero");
    //     return;
    //   }
    // }

    if (generalFormInfo.offer) {
      if (isNaN(discount) || discount <= 0) {
        toast.error("Discount price must be greater than zero");
        return;
      }

      if (discount >= price) {
        toast.error("Discount must be smaller than the regular price");
        return;
      }
    }

    setUploading(true);
    // check that the user have mobile number or not
    if (!currentUser.mobileNumber) {
      const response = await AddUserMobileNumberToDatabase(
        currentUser.id,
        generalFormInfo.mobileNumber
      );

      if (response.success == false) {
        toast.error(response.message);
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

    navigate(
      `/listing/${response.data._id + "," + mainCategory + "," + subCategory}`
    );
  };

  const CreateProductObjectBasedOnCategory = (mainCategory) => {
    let productInfo = {
      mainCategory,
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
        },
        (error) => {
          toast.error(error.message);
          setUploading(false);
          reject(error);
        },
        () => {
          console.log("down url");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  //#endregion

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Suspense fallback={<Fallback />}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Create Listing
        </Typography>
      </Suspense>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500}>
                  General Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <ComboBox
                    name="Choose Category"
                    defaultValue="ALL PRODUCTS"
                    value={mainCategory}
                    handleValueMethod={handleCategory}
                    items={CategoryItems.filter(
                      (item) => item.value !== allProducts
                    )}
                  />
                  {mainCategory === digitalEquipment && (
                    <ComboBox
                      name="Choose Sub Category"
                      defaultValue={cellPhoneAndTablets}
                      value={subCategory}
                      items={SubCategoryItemsForDigitalEquiments}
                      handleValueMethod={handleSubCategoryForDigitalEquipment}
                    />
                  )}
                  <TextField
                    label="Name"
                    name="name"
                    value={generalFormInfo.name || ""}
                    onChange={handleGeneralFormInfo}
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    name="description"
                    multiline
                    maxRows={6}
                    value={generalFormInfo.description || ""}
                    onChange={handleGeneralFormInfo}
                    fullWidth
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={generalFormInfo.address || ""}
                    onChange={handleGeneralFormInfo}
                    fullWidth
                  />
                  {!currentUser?.mobileNumber && (
                    <TextField
                      label="Mobile"
                      name="mobileNumber"
                      value={generalFormInfo.mobileNumber || ""}
                      onChange={handleGeneralFormInfo}
                      fullWidth
                    />
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            {mainCategory === estate && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight={500}>
                    Property Details
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* Type: Sell / Rent */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={500} mb={1}>
                        Type
                      </Typography>
                      <RadioGroup
                        row
                        name="type"
                        value={estateFormInfo.type}
                        onChange={handleEstateFormInfo}
                        sx={{ flexWrap: "wrap" }} // wrap on small screens
                      >
                        <FormControlLabel
                          value="sell"
                          control={<Radio size="small" />}
                          label="Sell"
                          sx={{ mr: 2 }}
                        />
                        <FormControlLabel
                          value="rent"
                          control={<Radio size="small" />}
                          label="Rent"
                          sx={{ mr: 2 }}
                        />
                      </RadioGroup>
                    </Grid>

                    {/* Options: Parking, Furnished */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={500} mb={1}>
                        Options
                      </Typography>
                      <FormGroup row sx={{ flexWrap: "wrap" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={estateFormInfo.parking || false}
                              onChange={handleEstateFormInfo}
                              name="parking"
                            />
                          }
                          label="Parking Spot"
                          sx={{ mr: 2 }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={estateFormInfo.furnished || false}
                              onChange={handleEstateFormInfo}
                              name="furnished"
                            />
                          }
                          label="Furnished"
                          sx={{ mr: 2 }}
                        />
                      </FormGroup>
                    </Grid>

                    {/* Beds and Baths */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Beds"
                        type="number"
                        name="bedrooms"
                        value={estateFormInfo.bedrooms}
                        onChange={handleEstateFormInfo}
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Baths"
                        type="number"
                        name="bath"
                        value={estateFormInfo.bath}
                        onChange={handleEstateFormInfo}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}

            {mainCategory === digitalEquipment &&
              subCategory === cellPhoneAndTablets && (
                <Accordion
                  sx={{
                    overflow: "hidden",
                    bgcolor: "background.paper",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight={500}>
                      Device Details
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 3, py: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="Brand"
                          name="brand"
                          defaultValue="Samsung"
                          value={cellPhoneInfo.brand}
                          items={CellPhoneBrands.filter(
                            (b) => b.name != "ALL BRANDS"
                          )}
                          handleValueMethod={handleCellPhoneInfo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="Storage"
                          name="storage"
                          defaultValue="Choose Storage"
                          value={cellPhoneInfo.storage}
                          items={CellPhoneStorage}
                          handleValueMethod={handleCellPhoneInfo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="RAM"
                          name="RAM"
                          defaultValue="Choose RAM"
                          value={cellPhoneInfo.RAM}
                          items={CellPhoneRAM}
                          handleValueMethod={handleCellPhoneInfo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="Color"
                          name="color"
                          defaultValue="Choose Color"
                          value={cellPhoneInfo.color}
                          items={ColorValues}
                          handleValueMethod={handleCellPhoneInfo}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500}>
                  Pricing
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Offer Checkbox */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={generalFormInfo.offer || false}
                          onChange={handleGeneralFormInfo}
                          name="offer"
                        />
                      }
                      label="This listing has an offer"
                    />
                  </Grid>

                  {/* Pricing */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Regular Price"
                      type="number"
                      name="regularPrice"
                      value={generalFormInfo.regularPrice}
                      onChange={handleGeneralFormInfo}
                      size="small"
                    />
                  </Grid>

                  {generalFormInfo.offer && (
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Discount Price"
                        type="number"
                        name="discountPrice"
                        value={generalFormInfo.discountPrice}
                        onChange={handleGeneralFormInfo}
                        size="small"
                        color="success"
                      />
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500}>
                  Upload Images
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  The first image will be the cover (maximum: 6)
                </Typography>

                {/* File Input + Upload Button */}
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={8}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleChoosenFiles}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={handleUpload}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </Grid>
                </Grid>

                {/* Upload Error */}
                {uploadError && (
                  <Typography color="error" variant="body2" mb={2}>
                    {uploadError}
                  </Typography>
                )}

                {/* Uploaded Images */}
                <Grid container spacing={2} mb={2}>
                  {generalFormInfo.imageURLs.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <img
                        src={item}
                        alt={`uploaded-${index}`}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 5,
                          objectFit: "contain",
                        }}
                      />
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => deleteImageFromlist(item)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Submit Button */}
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={uploading}
              sx={{
                mt: 4,
                width: { xs: "100%", sm: "auto" }, // full width on mobile, auto on larger
                px: 4, // horizontal padding
                py: 1.5, // vertical padding
                fontSize: { xs: "0.9rem", sm: "1rem" },
                alignSelf: "center", // center when not full width
                display: "block", // ensures margin auto works
                mx: { sm: "auto" }, // center horizontally on larger screens
              }}
            >
              {uploading ? "Loading..." : "Create Listing"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateListing;
