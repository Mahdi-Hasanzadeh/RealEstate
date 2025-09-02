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
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { BLACK, LIGHTGRAY } from "../../styles/Color.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../config/firebase.js";
import axios from "axios";
import { URL } from "../../config/PortConfig.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Fallback from "../../Components/UI/Fallback.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from "../../config/axiosConfig.js";
import { estate } from "../../utils/utility.js";

const EditListing = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const { listingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    description: "",
    imageURLs: [],
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: "",
    bath: "",
    regularPrice: "",
    discountPrice: "",
  });

  const [error, setError] = useState(null);

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
        setError(response.data.message);
        toast.error(response.data.message);
        return;
      }
      setFormData(response.data);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListing();
  }, []);

  // update the user listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      formData.imageURLs.length === 0
    ) {
      toast.error("Please provide the required information");
      return;
    }

    const beds = parseFloat(formData.bedrooms);
    const bath = parseFloat(formData.bath);
    const price = parseFloat(formData.regularPrice);
    const discount = parseFloat(formData.discountPrice);

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

    if (formData.offer) {
      if (isNaN(discount) || discount <= 0) {
        toast.error("Discount price must be greater than zero");
        return;
      }

      if (discount >= price) {
        toast.error("Discount must be smaller than the regular price");
        return;
      }
    }

    try {
      setUploading(true);
      const response = await axiosInstance.put(`api/listing/${formData._id}`, {
        ...formData,
        discountPrice: formData.offer ? formData.discountPrice : 0,
      });
      if (response.data.succeess == false) {
        setUploadError(response.data.message);
        toast.error(response.data.succeess);
        return;
      }
      toast.success("Listing updated successfully");
      // setFormData(response.data.updatedListing);
      navigate(`/listing/${listingId + "," + estate}`);
      setError(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteImageFromlist = (item) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        imageURLs: [...formData.imageURLs.filter((url) => url !== item)],
      };
    });
  };

  // const handleFormData = (event) => {
  //   // console.log(event.target.value);
  //   if (
  //     event.target.name == "parking" ||
  //     event.target.name == "furnished" ||
  //     event.target.name == "offer"
  //   ) {
  //     setFormData((prevData) => {
  //       return {
  //         ...prevData,
  //         [event.target.name]:
  //           event.target.name == "parking"
  //             ? !formData.parking
  //             : event.target.name == "furnished"
  //             ? !formData.furnished
  //             : !formData.offer,
  //       };
  //     });
  //   } else {
  //     setFormData((prevData) => {
  //       return {
  //         ...prevData,
  //         [event.target.name]:
  //           event.target.type == "text" || "number"
  //             ? event.target.value
  //             : event.target.name == "type"
  //             ? event.target.value
  //             : event.target.checked,
  //       };
  //     });
  //   }
  // };

  const handleFormData = useCallback((event) => {
    const { name, type, value, checked } = event.target;
    // If it's a checkbox (true/false values)
    if (type === "checkbox") {
      if (name == "type") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
      return;
    }

    // For all other types (text, number, radio, etc.)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleChoosenFiles = (event) => {
    if (event.target.files.length < 7) {
      setFile(event.target.files);
    }
  };

  const handleUpload = () => {
    if (file.length > 0 && file.length + formData.imageURLs.length < 7) {
      const promises = [];
      console.log("upload photo");
      setUploading(true);
      for (var i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData((prevData) => {
            return {
              ...prevData,
              imageURLs: formData.imageURLs.concat(urls),
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
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploadError("Please choose only six images for every list");
      toast.error("Please choose only six images for every list");
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
          // console.log(progress);
          // console.log("Upload is " + Math.round(progress) + "% done");
        },
        (error) => {
          toast.error(error.message);
          console.log(error);
          setUploading(false);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            // console.log(downloadURL);
          });
        }
      );
    });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Suspense fallback={<Fallback />}>
          {/* <Wave title={"Edit"} /> */}
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Edit Listing
          </Typography>
        </Suspense>

        {loading ? (
          <Typography variant="h4" textAlign="center" mt={4}>
            <Fallback />
          </Typography>
        ) : error ? (
          <Typography variant="h5" color="error" textAlign="center" mt={4}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {/* ROW 1: Full-width form */}
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
                      <TextField
                        fullWidth
                        type="text"
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleFormData}
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
                        value={formData.description || ""}
                        onChange={handleFormData}
                        required
                        size={md ? "small" : "medium"}
                      />
                      <TextField
                        multiline
                        fullWidth
                        maxRows={10}
                        type="text"
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleFormData}
                        required
                        size={md ? "small" : "medium"}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>

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
                          value={formData.type}
                          onChange={handleFormData}
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
                                checked={formData.parking || false}
                                onChange={handleFormData}
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
                                checked={formData.furnished || false}
                                onChange={handleFormData}
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
                          value={formData.bedrooms}
                          onChange={handleFormData}
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Baths"
                          type="number"
                          name="bath"
                          value={formData.bath}
                          onChange={handleFormData}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

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
                              checked={formData.offer || false}
                              onChange={handleFormData}
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
                          value={formData.regularPrice}
                          onChange={handleFormData}
                          size="small"
                        />
                      </Grid>

                      {formData.offer && (
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Discount Price"
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleFormData}
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
                      {formData.imageURLs.map((item, index) => (
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
                  {uploading ? "Loading..." : "Update Listing"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );

  // return (
  //   <>
  //     <Container
  //       maxWidth="md"
  //       sx={{
  //         paddingBottom: 10,
  //       }}
  //     >
  //       <Suspense fallback={<Fallback />}>
  //         <Wave title={"Edit List"} />
  //       </Suspense>

  //       {loading ? (
  //         <h2>Loading...</h2>
  //       ) : error ? (
  //         <h3>{error}</h3>
  //       ) : (
  //         <Grid
  //           container
  //           spacing={md ? 0 : 1}
  //           justifyContent={md ? "normal" : "flex-start"}
  //         >
  //           <Grid item xs={12} md={6}>
  //             <Box
  //               component={"form"}
  //               sx={{
  //                 padding: 2,
  //               }}
  //             >
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   gap: 1.5,
  //                 }}
  //               >
  //                 <TextField
  //                   fullWidth
  //                   type="text"
  //                   label="Name"
  //                   variant="outlined"
  //                   name="name"
  //                   value={formData.name || ""}
  //                   onChange={handleFormData}
  //                   required
  //                   size={md ? "small" : "medium"}
  //                 />
  //                 <TextField
  //                   multiline
  //                   fullWidth
  //                   maxRows={10}
  //                   type="text"
  //                   label="Description"
  //                   variant="outlined"
  //                   name="description"
  //                   value={formData.description}
  //                   onChange={handleFormData}
  //                   required
  //                   size={md ? "small" : "medium"}
  //                 />
  //                 <TextField
  //                   fullWidth
  //                   maxRows={10}
  //                   multiline
  //                   type="text"
  //                   label="address"
  //                   variant="outlined"
  //                   name="address"
  //                   value={formData?.address || ""}
  //                   onChange={handleFormData}
  //                   required
  //                   size={md ? "small" : "medium"}
  //                 />
  //               </Box>
  //               {/* property type: sell or rent */}
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: { xs: "space-between", sm: "flex-start" },
  //                 }}
  //               >
  //                 <FormControlLabel
  //                   value="sell"
  //                   label="Sell"
  //                   labelPlacement="start"
  //                   name="type"
  //                   onChange={handleFormData}
  //                   control={
  //                     <Checkbox
  //                       size={md ? "small" : "medium"}
  //                       checked={formData.type === "sell"}
  //                     />
  //                   }
  //                 />
  //                 <FormControlLabel
  //                   value={"rent"}
  //                   label="Rent"
  //                   labelPlacement="start"
  //                   name="type"
  //                   onChange={handleFormData}
  //                   control={
  //                     <Checkbox
  //                       size={md ? "small" : "medium"}
  //                       checked={formData.type === "rent"}
  //                     />
  //                   }
  //                 />
  //               </Box>
  //               {/* Features of property */}
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   flexWrap: "wrap",
  //                   flexDirection: { xs: "column", sm: "row" },
  //                   alignItems: "flex-start",
  //                   mb: 1.5,
  //                 }}
  //               >
  //                 <FormControlLabel
  //                   value={true}
  //                   label="Parking spot"
  //                   labelPlacement="start"
  //                   name="parking"
  //                   onChange={handleFormData}
  //                   control={
  //                     <Checkbox
  //                       size={md ? "small" : "medium"}
  //                       checked={formData.parking || false}
  //                     />
  //                   }
  //                 />
  //                 <FormControlLabel
  //                   value={true}
  //                   label="Furnished"
  //                   labelPlacement="start"
  //                   name="furnished"
  //                   onChange={handleFormData}
  //                   control={
  //                     <Checkbox
  //                       size={md ? "small" : "medium"}
  //                       checked={formData.furnished || false}
  //                     />
  //                   }
  //                 />
  //                 <FormControlLabel
  //                   value={true}
  //                   label="Offer"
  //                   labelPlacement="start"
  //                   name="offer"
  //                   onChange={handleFormData}
  //                   control={
  //                     <Checkbox
  //                       size={md ? "small" : "medium"}
  //                       checked={formData.offer || false}
  //                     />
  //                   }
  //                 />
  //               </Box>
  //               {/* Price of the property */}
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: "flex-start",
  //                   gap: 3,
  //                   flexWrap: "wrap",
  //                 }}
  //               >
  //                 <TextField
  //                   type="number"
  //                   label="Beds"
  //                   size={md ? "small" : "medium"}
  //                   name="bedrooms"
  //                   value={formData.bedrooms}
  //                   onChange={handleFormData}
  //                 />
  //                 <TextField
  //                   type="number"
  //                   label="Baths"
  //                   size={md ? "small" : "medium"}
  //                   name="bath"
  //                   value={formData.bath}
  //                   onChange={handleFormData}
  //                 />
  //                 <TextField
  //                   type="number"
  //                   label="Regular Price / month"
  //                   size={md ? "small" : "medium"}
  //                   name="regularPrice"
  //                   value={formData.regularPrice}
  //                   onChange={handleFormData}
  //                 />
  //                 {formData.offer && (
  //                   <TextField
  //                     type="number"
  //                     label="Discount Price / month"
  //                     size={md ? "small" : "medium"}
  //                     name="discountPrice"
  //                     value={formData.discountPrice}
  //                     onChange={handleFormData}
  //                   />
  //                 )}
  //               </Box>
  //             </Box>
  //           </Grid>
  //           {/* Upload Photo section */}
  //           <Grid
  //             item
  //             xs={12}
  //             md={6}
  //             sx={{
  //               display: "flex",
  //               flexDirection: "column",
  //               gap: 1,
  //             }}
  //           >
  //             <Box>
  //               <h3
  //                 style={{
  //                   fontSize: md ? "16.5px" : "20px",
  //                   fontWeight: "bolder",
  //                   textAlign: "justify",
  //                 }}
  //               >
  //                 Images:
  //                 <span
  //                   style={{
  //                     color: BLACK,
  //                   }}
  //                 >
  //                   The first image will be the cover (maximum:6)
  //                 </span>
  //               </h3>
  //               <Box
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: "flex-start",
  //                   flexWrap: "wrap",
  //                   gap: 1.5,
  //                 }}
  //               >
  //                 <input
  //                   style={{
  //                     border: "1p solid aqua",
  //                     outline: "2px solid",
  //                     outlineColor: LIGHTGRAY,
  //                     textIndent: "4px",
  //                   }}
  //                   type="file"
  //                   accept="image/*"
  //                   multiple
  //                   onChange={handleChoosenFiles}
  //                 />
  //                 <Button
  //                   onClick={handleUpload}
  //                   variant="contained"
  //                   color="success"
  //                   size={md ? "small" : "large"}
  //                   disabled={uploading}
  //                   fullWidth
  //                 >
  //                   {uploading ? "Uploading...." : "UPLOAD"}
  //                 </Button>
  //               </Box>
  //             </Box>
  //             <Box className="show image section">
  //               <p>{uploadError && uploadError}</p>

  //               {formData.imageURLs.length > 0 &&
  //                 formData.imageURLs.map((item, index) => {
  //                   return (
  //                     <Box
  //                       key={index}
  //                       sx={{
  //                         display: "flex",
  //                         justifyContent: "space-between",
  //                         alignItems: "center",
  //                         mb: 1,
  //                       }}
  //                     >
  //                       <img
  //                         width={"100"}
  //                         height={"100"}
  //                         style={{
  //                           borderRadius: "5px",
  //                           objectFit: "cotain",
  //                         }}
  //                         src={item}
  //                         alt={item}
  //                       />
  //                       <Button
  //                         onClick={() => {
  //                           deleteImageFromlist(item);
  //                         }}
  //                         variant="text"
  //                         color="warning"
  //                       >
  //                         Delete
  //                       </Button>
  //                     </Box>
  //                   );
  //                 })}
  //             </Box>
  //             <Button
  //               type="submit"
  //               onClick={handleSubmit}
  //               variant="contained"
  //               fullWidth
  //               size={md ? "small" : "large"}
  //               color="success"
  //               disabled={uploading ? true : false}
  //             >
  //               {uploading ? "Loading" : "Edit List"}
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       )}
  //     </Container>
  //   </>
  // );
};

export default EditListing;
