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

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
  });
  const handleFormData = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          event.target.type === "text"
            ? event.target.value
            : event.target.name === "type"
            ? event.target.value
            : event.target.checked,
      };
    });
  };
  console.log(formData);
  return (
    <>
      <Container maxWidth="lg">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Create a listing
        </h1>

        <Grid container spacing={1}>
          <Grid item xs={10} md={6}>
            <Box
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
                />
                <TextField
                  multiline
                  fullWidth
                  maxRows={2}
                  type="text"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleFormData}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="address"
                  variant="outlined"
                  name="address"
                  value={formData?.address || ""}
                  onChange={handleFormData}
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
                  label="Offet"
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
                  sx={
                    {
                      // width: 100,
                    }
                  }
                />
                <TextField
                  type="number"
                  label="Baths"
                  size="small"
                  sx={
                    {
                      // width: 200,
                    }
                  }
                />
                <TextField
                  type="number"
                  label="Regular Price / month"
                  size="small"
                  sx={
                    {
                      // width: 200,
                    }
                  }
                />
                <TextField
                  type="number"
                  label="Discount Price / month"
                  size="small"
                  sx={
                    {
                      // width: 200,
                    }
                  }
                />
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
                <TextField type="file" />
                <Button variant="contained" color="success" size="large">
                  UPLOAD
                </Button>
              </Box>
            </Box>
            <Box className="show image section"></Box>
            <Button variant="contained" fullWidth size="large" color="success">
              Create list
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateListing;
