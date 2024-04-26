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
import { BLACK, LIGHTGRAY } from "../../../COLOR";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import { URL } from "../../../PortConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Fallback from "./Fallback.jsx";

const Wave = lazy(() => import("../styleComponents/Wave.jsx"));

const autoCloseTime = 3000;
const EditListing = () => {
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
    bedrooms: 1,
    bath: 1,
    regularPrice: 1,
    discountPrice: 1,
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
        console.log(response.data.message);
        setError(response.data.message);
        toast.error(response.data.message, {
          autoClose: autoCloseTime,
        });
        return;
      }
      setFormData(response.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        autoClose: autoCloseTime,
      });
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
      console.log("Fill out the form");
      toast.error("Please fill out the form", {
        autoClose: autoCloseTime,
      });
      return;
    }
    if (parseInt(formData.discountPrice) >= parseInt(formData.regularPrice)) {
      toast.success(
        "Discount price can not be bigger than or equal to regular price",
        {
          autoClose: autoCloseTime,
        }
      );
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    try {
      setUploading(true);
      const response = await axios.put(
        `${URL}api/listing/${formData._id}`,
        {
          ...formData,
          discountPrice: formData.offer ? formData.discountPrice : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.succeess == false) {
        console.log(response.data.message);
        setUploadError(response.data.message);
        toast.error(response.data.succeess, {
          autoClose: autoCloseTime,
        });
        return;
      }

      // console.log("listing is updated");react toastify
      toast.success("Listing updated successfully");
      setFormData(response.data.updatedListing);
      setError(null);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        autoClose: autoCloseTime,
      });
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

  const handleFormData = (event) => {
    // console.log(event.target.value);
    if (
      event.target.name == "parking" ||
      event.target.name == "furnished" ||
      event.target.name == "offer"
    ) {
      setFormData((prevData) => {
        return {
          ...prevData,
          [event.target.name]:
            event.target.name == "parking"
              ? !formData.parking
              : event.target.name == "furnished"
              ? !formData.furnished
              : !formData.offer,
        };
      });
    } else {
      setFormData((prevData) => {
        return {
          ...prevData,
          [event.target.name]:
            event.target.type == "text" || "number"
              ? event.target.value
              : event.target.name == "type"
              ? event.target.value
              : event.target.checked,
        };
      });
    }
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

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          top: 50,
          mb: 20,
        }}
      >
        <Suspense fallback={<Fallback />}>
          <Wave title={"Edit List"} />
        </Suspense>

        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Grid
            container
            spacing={md ? 0 : 1}
            justifyContent={md ? "normal" : "flex-start"}
          >
            <Grid item xs={10} md={6}>
              <Box
                component={"form"}
                sx={{
                  padding: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
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
                    maxRows={2}
                    type="text"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleFormData}
                    required
                    size={md ? "small" : "medium"}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="address"
                    variant="outlined"
                    name="address"
                    value={formData?.address || ""}
                    onChange={handleFormData}
                    required
                    size={md ? "small" : "medium"}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="mobile"
                    variant="outlined"
                    name="mobile"
                    value={formData?.address || ""}
                    onChange={handleFormData}
                    required
                    size={md ? "small" : "medium"}
                  />
                </Box>
                {/* property type: sell or rent */}
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
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.type === "sell"}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"rent"}
                    label="Rent"
                    labelPlacement="start"
                    name="type"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.type === "rent"}
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
                    value={true}
                    label="Parking spot"
                    labelPlacement="start"
                    name="parking"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.parking || false}
                      />
                    }
                  />
                  <FormControlLabel
                    value={true}
                    label="Furnished"
                    labelPlacement="start"
                    name="furnished"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.furnished || false}
                      />
                    }
                  />
                  <FormControlLabel
                    value={true}
                    label="Offer"
                    labelPlacement="start"
                    name="offer"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.offer || false}
                      />
                    }
                  />
                </Box>
                {/* Price of the property */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: 3,
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    type="number"
                    label="Beds"
                    size={md ? "small" : "medium"}
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleFormData}
                  />
                  <TextField
                    type="number"
                    label="Baths"
                    size={md ? "small" : "medium"}
                    name="bath"
                    value={formData.bath}
                    onChange={handleFormData}
                  />
                  <TextField
                    type="number"
                    label="Regular Price / month"
                    size={md ? "small" : "medium"}
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleFormData}
                  />
                  {formData.offer && (
                    <TextField
                      type="number"
                      label="Discount Price / month"
                      size={md ? "small" : "medium"}
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleFormData}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            {/* Upload Photo section */}
            <Grid
              item
              xs={10}
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

                {formData.imageURLs.length > 0 &&
                  formData.imageURLs.map((item, index) => {
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
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                size={md ? "small" : "large"}
                color="success"
                disabled={uploading ? true : false}
              >
                {uploading ? "Loading" : "Edit List"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default EditListing;
