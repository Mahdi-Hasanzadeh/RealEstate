import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Suspense, useEffect, useState } from "react";
import Fallback from "../../Components/UI/Fallback.jsx";
import {
  computer,
  ComputerBrands,
  ComputerRAMOptions,
  ComputerStorageOptions,
  digitalEquipment,
} from "../../utils/utility.js";
import axiosInstance from "../../config/axiosConfig.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../../config/firebase.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ComboBox from "../SearchListings/ComboBox.jsx";

const EditComputer = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    imageURLs: [],
    regularPrice: "",
    discountPrice: "",
    offer: false,
  });
  const [deviceInfo, setDivceInfo] = useState({
    brand: ComputerBrands[1].value,
    storage: ComputerStorageOptions[0].value,
    RAM: ComputerRAMOptions[0].value,
  });

  const handleFormData = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const handleDeviceInfo = (event) => {
    setDivceInfo((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check the general information
    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      formData.imageURLs.length === 0
    ) {
      toast.error("Please provide the required information");
      return;
    }

    const price = parseFloat(formData.regularPrice);
    const discount = parseFloat(formData.discountPrice);

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

      const updatedProduct = {
        ...formData,
        ...deviceInfo,
        discountPrice: formData.offer ? formData.discountPrice : 0,
      };

      await axiosInstance.put(
        `api/listing/computer/${listingId}`,
        updatedProduct
      );

      toast.success(
        "Your changes have been saved. The listing will be reviewed by admin shortly."
      );
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

  const fetchComputer = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/listing/computer/${listingId}`
      );

      const data = response.data.data;

      setFormData({
        name: data.name,
        description: data.description,
        address: data.address,
        imageURLs: data.imageURLs,
        regularPrice: data.regularPrice,
        discountPrice: data.discountPrice,
        offer: data.offer,
      });

      setDivceInfo({
        brand: data.brand,
        storage: data.storage,
        RAM: data.RAM,
      });
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComputer();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingBottom: 10 }}>
        <Suspense fallback={<Fallback />}>
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
                {/* General Info Accordion */}
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

                {/* Device Details Accordion */}
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
                          defaultValue="DELL"
                          value={deviceInfo.brand}
                          items={ComputerBrands.filter(
                            (b) => b.name != "ALL BRANDS"
                          )}
                          handleValueMethod={handleDeviceInfo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="Storage"
                          name="storage"
                          defaultValue="Choose Storage"
                          value={deviceInfo.storage}
                          items={ComputerStorageOptions}
                          handleValueMethod={handleDeviceInfo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ComboBox
                          label="RAM"
                          name="RAM"
                          defaultValue="Choose RAM"
                          value={deviceInfo.RAM}
                          items={ComputerRAMOptions}
                          handleValueMethod={handleDeviceInfo}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Pricing Accordion */}
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

                    {/* Submit Button */}
                  </AccordionDetails>
                </Accordion>
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
                  {uploading ? "Loading..." : "Update"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default EditComputer;
