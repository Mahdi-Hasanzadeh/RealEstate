import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URL } from "../../../PortConfig";
import Fallback from "./Fallback.jsx";

const CardItem = lazy(() => import("./Card.jsx"));

const orderValues = [
  {
    name: "LATEST", // this field return the newest products
    value: "createdAt_desc",
  },
  {
    name: "OLDEST",
    value: "createdAt_asc",
  },
  {
    name: "PRICE LOW TO HIGH",
    value: "regularPrice_asc",
  },
  {
    name: "PRICE HIGH TO LOW",
    value: "regularPrice_desc",
  },
];

var delay = 0;

const SearchListings = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "desc",
    order: "createdAt",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const [listings, setListings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const handleFormData = (event) => {
    setFormData((prevData) => {
      if (event.target.name === "sort_order") {
        const order = event.target.value.split("_")[0];
        const sort = event.target.value.split("_")[1];
        // console.log(order, sort);
        return {
          ...prevData,
          sort,
          order,
        };
      }
      if (
        event.target.name === "offer" ||
        event.target.name === "parking" ||
        event.target.name === "furnished"
      ) {
        return {
          ...prevData,
          [event.target.name]:
            event.target.name === "offer"
              ? !formData.offer
              : event.target.name === "parking"
              ? !formData.parking
              : !formData.furnished,
        };
      }
      if (event.target.name === "type") {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      }
      if (event.target.name === "searchTerm") {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      }
    });
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}api/listing/get?${searchParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(response.data.listings);
      if (response.data.listings.length > 8) {
        setShowMore(true);
      }
      setListings(response.data.listings);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const term = searchParams.get("searchTerm");
    const type = searchParams.get("type");
    const parking = searchParams.get("parking");
    const furnished = searchParams.get("furnished");
    const order = searchParams.get("order");
    const sort = searchParams.get("sort");
    const offer = searchParams.get("offer");
    setFormData({
      searchTerm: term == null ? "" : term,
      type: type == null ? "all" : type,
      parking: parking == null || parking == "false" ? false : true,
      furnished: furnished == null || furnished == "false" ? false : true,
      order: order == null ? "createdAt" : order,
      sort: sort == null ? "desc" : sort,
      offer: offer == null || offer == "false" ? false : true,
    });
    delay = 0;
    fetchListings();
  }, [location.search]);
  const handleSearch = () => {
    searchParams.set("searchTerm", formData.searchTerm);
    searchParams.set("type", formData.type);
    searchParams.set("parking", formData.parking);
    searchParams.set("furnished", formData.furnished);
    searchParams.set("offer", formData.offer);
    searchParams.set("sort", formData.sort);
    searchParams.set("order", formData.order);
    // order: field
    // sort: asc || desc
    navigate(`/search?${searchParams.toString()}`);
  };

  const fetchMoreListings = async () => {
    // console.log(searchParams.toString());
    // searchParams.set("startIndex", listings.length);

    const response = await axios.get(
      `${URL}api/listing/get?${searchParams.toString()}&startIndex=${
        listings.length
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    delay = 0;
    setListings([...listings, ...response.data.listings]);
    if (response.data.listings.length < 9) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    if (!md) {
      setShowFilterSection(true);
    }
  }, [md]);
  // console.log("length", listings.length);
  return (
    <>
      <Box>
        <Grid container>
          {/* search form section */}
          {showFilterSection && (
            <Zoom
              in={showFilterSection}
              mountOnEnter
              unmountOnExit
              style={{
                transitionDelay: showFilterSection ? "500ms" : "0ms",
              }}
            >
              <Grid
                sx={{
                  position: md ? "static" : "fixed",
                  top: 70,
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  overflowY: "auto", // Allow vertical scrolling if content exceeds height
                  paddingRight: theme.spacing(2),
                  padding: md ? 0.5 : 2,
                  borderRight: md ? "0px" : "1px solid gray",
                  minHeight: md ? 0 : "91.2vh",
                }}
                item
                xs={12}
                md={3}
              >
                {/* Search input */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography component={"label"}>Search:</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="searchTerm"
                    value={formData.searchTerm}
                    onChange={handleFormData}
                    placeholder="type here..."
                  >
                    Search
                  </TextField>
                </Box>
                {/* Type of the property */}

                <Typography mt={2} component={"label"} display={"block"}>
                  Type:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    // flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <FormControlLabel
                    value={"all"}
                    label="Rent & Sale"
                    labelPlacement="end"
                    name="type"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.type === "all"}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"rent"}
                    label="Rent"
                    labelPlacement="end"
                    name="type"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.type === "rent"}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"sell"}
                    label="Sell"
                    labelPlacement="end"
                    name="type"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.type === "sell"}
                      />
                    }
                  />
                </Box>
                {/* Offer checkbox */}
                <Typography mt={2} component={"label"} display={"block"}>
                  Special:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    // flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <FormControlLabel
                    value={formData.offer}
                    label="Offer"
                    labelPlacement="end"
                    name="offer"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData?.offer ? true : false}
                      />
                    }
                  />
                </Box>
                {/* Amenties section */}
                <Typography mt={2} component={"label"} display={"block"}>
                  Amenties:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    // flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    mb: 1.5,
                    justifyContent: "flex-start",
                  }}
                >
                  <FormControlLabel
                    value={formData.parking}
                    label="Parking"
                    labelPlacement="end"
                    name="parking"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.parking}
                      />
                    }
                  />

                  <FormControlLabel
                    value={formData.furnished}
                    label="furnished"
                    labelPlacement="end"
                    name="furnished"
                    onChange={handleFormData}
                    control={
                      <Checkbox
                        size={md ? "small" : "medium"}
                        checked={formData.furnished}
                      />
                    }
                  />
                </Box>
                {/* sort section */}
                <Typography
                  mt={2}
                  mb={1}
                  component={"label"}
                  display={"block"}
                  mr={0.5}
                >
                  Sort:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    // flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    mb: 1.5,
                    justifyContent: "flex-start",
                  }}
                >
                  <Select
                    id="demo-simple-select"
                    name="sort_order"
                    defaultValue={`createdAt_desc`}
                    value={`${formData.order}_${formData.sort}`}
                    size="small"
                    fullWidth
                    onChange={handleFormData}
                  >
                    {orderValues.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Box>
                  <Button onClick={handleSearch} fullWidth variant="contained">
                    Search
                  </Button>
                </Box>
              </Grid>
            </Zoom>
          )}

          {md && (
            <Button
              size="small"
              sx={{
                mt: showFilterSection ? 0 : 10,
                color: showFilterSection ? "red" : "green",
              }}
              onClick={() => {
                setShowFilterSection(!showFilterSection);
              }}
            >
              {showFilterSection
                ? "Close Filter Section"
                : "Open Filter Section"}
            </Button>
          )}
          {/* Filter listing section */}
          <Grid
            sx={{
              position: md ? "static" : "relative",
              top: 70,
              marginLeft: "auto", // Ensure content doesn't overlap with fixed section
              paddingLeft: md ? 0 : theme.spacing(3), // Add left padding to align with fixed section
              width: "100%",
              overflowY: "auto",
            }}
            item
            xs={12}
            md={9}
          >
            <Box>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : error !== null ? (
                <Typography>{error}</Typography>
              ) : listings.length === 0 ? (
                <Box
                  sx={{
                    padding: 3,
                  }}
                >
                  <Typography variant="h4" color={"red"} textAlign={"center"}>
                    No result found
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    {listings.length > 0 &&
                      listings.map((listing, index) => {
                        delay = delay + 20;
                        return (
                          <Suspense key={index} fallback={<Fallback />}>
                            <CardItem
                              listing={listing}
                              transition={true}
                              delay={delay}
                            />
                          </Suspense>
                        );
                      })}
                  </Box>
                  {showMore && (
                    <Button onClick={fetchMoreListings}>Show more...</Button>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SearchListings;
