import {
  Box,
  Container,
  FormControlLabel,
  TextField,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import { BLACK, LIGHTGRAY } from "../../COLOR";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../src/firebase";
import Wave from "../styleComponents/Wave";
import axios from "axios";
import { localURL } from "../../PortConfig";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken);
    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      formData.imageURLs.length === 0
    ) {
      console.log("Fill out the form");
      return;
    }
    try {
      setUploading(true);
      const response = await axios.post(
        `${localURL}api/listing/create`,
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
      console.log(response.data);
      if (response.data.succeess == false) {
        console.log(response.data.message);
      }
      navigate(`/listing/${response.data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const [file, setFile] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [uploading, setUploading] = useState(false);

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
        })
        .then(() => {
          setUploadError(false);
        })
        .catch((error) => {
          setUploadError("image Upload failed.Image should be 2mb ");
          console.log(error.message);
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploadError("Please choose only six images for every list");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      setUploading(true);
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
          reject(error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
            setUploading(false);
          });
        }
      );
    });
  };
  // console.log(formData);
  return (
    <>
      <Container maxWidth="md">
        <Wave title={"Create list"} />

        <Grid container spacing={1}>
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
                  gap: 2,
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
                />
              </Box>

              <Box>
                <FormControlLabel
                  value="sell"
                  label="Sell"
                  labelPlacement="start"
                  name="type"
                  onChange={handleFormData}
                  control={<Checkbox checked={formData.type === "sell"} />}
                />
                <FormControlLabel
                  value={"rent"}
                  label="Rent"
                  labelPlacement="start"
                  name="type"
                  onChange={handleFormData}
                  control={<Checkbox checked={formData.type === "rent"} />}
                />
              </Box>
              <Box>
                <FormControlLabel
                  value={true}
                  label="Parking spot"
                  labelPlacement="start"
                  name="parking"
                  onChange={handleFormData}
                  control={<Checkbox checked={formData.parking || false} />}
                />
                <FormControlLabel
                  value={true}
                  label="Furnished"
                  labelPlacement="start"
                  name="furnished"
                  onChange={handleFormData}
                  control={<Checkbox checked={formData.furnished || false} />}
                />
                <FormControlLabel
                  value={true}
                  label="Offer"
                  labelPlacement="start"
                  name="offer"
                  onChange={handleFormData}
                  control={<Checkbox checked={formData.offer || false} />}
                />
              </Box>
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
                  size="small"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleFormData}
                />
                <TextField
                  type="number"
                  label="Baths"
                  size="small"
                  name="bath"
                  value={formData.bath}
                  onChange={handleFormData}
                />
                <TextField
                  type="number"
                  label="Regular Price / month"
                  size="small"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleFormData}
                />
                {formData.offer && (
                  <TextField
                    type="number"
                    label="Discount Price / month"
                    size="small"
                    name="discountPrice"
                    value={
                      formData.discountPrice < formData.regularPrice
                        ? formData.discountPrice
                        : formData.regularPrice
                    }
                    onChange={handleFormData}
                  />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <h3>
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
                  gap: 1,
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
                  size="large"
                  disabled={uploading}
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
                      <Button variant="text" color="warning">
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
              size="large"
              color="success"
              disabled={uploading ? true : false}
            >
              {uploading ? "Loading" : "Create list"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateListing;
