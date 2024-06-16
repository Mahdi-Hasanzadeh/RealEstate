//#region Libraries
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
//#endregion

//#region My Modules
import { URL } from "../../../PortConfig";
import Fallback from "./Fallback.jsx";
import styleModule from "../../style.module.css";
import { yellow } from "@mui/material/colors";
import Loader from "../styleComponents/loader.jsx";
const CardItem = lazy(() => import("./Card.jsx"));
const NotFound = lazy(() => import("./InfoComponents/NotFound.jsx"));
const ComboBox = lazy(() => import("../Utility/ComboBox.jsx"));
const CellPhone_TabletsFilter = lazy(() =>
  import("./SubCategories/CellPhone&TabletsFilters.jsx")
);
//#endregion

//#region Constant Fields

const estate = "estate";
const allProducts = "all_products";
const digitalEquipment = "digital_equipment";
const transportation = "transportation";

const allDigitalEquipment = "all_digital_equipment";
const cellPhoneAndTablets = "cellPhone_tablets";
const computer = "computer";
const entertainmentConsole = "console";

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

const CategoryItems = [
  {
    name: "ALL PRODUCTS",
    value: allProducts,
  },
  {
    name: "ESTATE",
    value: estate,
  },
  {
    name: "DIGITAL EQUIPMENT",
    value: digitalEquipment,
  },
  {
    name: "TRANSPORTATION",
    value: transportation,
  },
];
const SubCategoryItems = [
  {
    name: "ALL DIGITAL EQUIPMENTS",
    value: allDigitalEquipment,
  },
  {
    name: "CELL PHONE & TABLETS",
    value: cellPhoneAndTablets,
  },
  {
    name: "COMPUTER",
    value: computer,
  },
  {
    name: "CONSOLE",
    value: entertainmentConsole,
  },
];

var delay = 0;
//#endregion

const SearchListings = () => {
  //#region hooks

  const [subCategory, setSubCategory] = useState(allDigitalEquipment);

  const [category, setCategory] = useState(allProducts);

  const [formData, setFormData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "desc",
    order: "createdAt",
  });

  const [price, setPrice] = useState({
    minimumPrice: 0,
    maximumPrice: 0,
  });

  const [cellPhoneBrand, setCellPhoneBrand] = useState("all_brands");

  const [checkedStorage, setCheckedStorage] = useState({
    mb512: false,
    gb1: false,
    gb2: false,
    gb3: false,
    gb4: false,
    gb5: false,
    gb6: false,
    gb8: false,
    gb10: false,
    gb12: false,
    gb13: false,
    gb16: false,
    gb20: false,
    gb32: false,
    gb64: false,
    gb128: false,
    gb256: false,
    gb512: false,
    gb640: false,
    tb1: false,
  });

  const [checkedRAM, setCheckedRAM] = useState({
    mb512: false,
    gb1: false,
    gb2: false,
    gb3: false,
    gb4: false,
    gb5: false,
    gb6: false,
    gb8: false,
    gb10: false,
    gb12: false,
    gb16: false,
    gb18: false,
  });

  const [checkedColor, setCheckedColor] = useState({
    black: false,
    white: false,
    green: false,
    red: false,
    gray: false,
    gold: false,
    silver: false,
    pink: false,
    blue: false,
    yellow: false,
    brown: false,
    purple: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const [listings, setListings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showFilterSection, setShowFilterSection] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  //#endregion

  //#region methods

  const handlePriceValue = (event) => {
    if (!(event.target.value < 0)) {
      setPrice((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  const handleCategory = (event) => {
    // set the category
    setCategory(event.target.value);

    ResetPrice();
    ResetColor();
    ResetStorage();
    ResetRAM();
    ResetSubCategoryForDigitalEquipments();
  };

  const handleSubCategory = (event) => {
    // Set the sub category
    setSubCategory(event.target.value);
    ResetColor();
    ResetStorage();
    ResetRAM();
    ResetPrice();
  };

  const handleFormData = (event) => {
    setFormData((prevData) => {
      if (event.target.name === "sort_order") {
        const order = event.target.value.split("_")[0];
        const sort = event.target.value.split("_")[1];
        // entertainmentConsole.log(order, sort);
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
      // entertainmentConsole.log(response.data.listings);
      if (response.data.listings.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(response.data.listings);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const ResetPrice = () => {
    setPrice({ minimumPrice: 0, maximumPrice: 0 });
  };

  const ResetSubCategoryForDigitalEquipments = () => {
    setSubCategory(allDigitalEquipment);
  };

  const ResetColor = () => {
    setCheckedColor({
      black: false,
      white: false,
      green: false,
      red: false,
      gray: false,
      gold: false,
      silver: false,
      pink: false,
      blue: false,
      yellow: false,
      brown: false,
      purple: false,
    });
  };

  const ResetStorage = () => {
    setCheckedStorage({
      mb512: false,
      gb1: false,
      gb2: false,
      gb3: false,
      gb4: false,
      gb5: false,
      gb6: false,
      gb8: false,
      gb10: false,
      gb12: false,
      gb13: false,
      gb16: false,
      gb20: false,
      gb32: false,
      gb64: false,
      gb128: false,
      gb256: false,
      gb512: false,
      gb640: false,
      tb1: false,
    });
  };

  const ResetRAM = () => {
    setCheckedRAM({
      mb512: false,
      gb1: false,
      gb2: false,
      gb3: false,
      gb4: false,
      gb5: false,
      gb6: false,
      gb8: false,
      gb10: false,
      gb12: false,
      gb16: false,
      gb18: false,
    });
  };
  //#endregion

  //#region style objects

  const gridStyle = {
    position: md ? "static" : "fixed",
    width: "100%",
    paddingRight: theme.spacing(2),
    padding: md ? 0.5 : 2,
    borderRight: md ? "0px" : "1px solid gray",
    // minHeight: md ? 0 : "93vh",
    height: "93vh",
    overflowY: "auto", // Allow vertical scrolling if content exceeds height
  };

  //#endregion

  //#region useEffect

  useEffect(() => {
    // Get Category from URL
    const categoryOfURL = searchParams.get("category");
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
    setCategory(categoryOfURL == null ? "all_products" : categoryOfURL);
    delay = 0;
    fetchListings();
  }, [location.search]);

  useEffect(() => {
    if (!md) {
      setShowFilterSection(true);
    }
  }, [md]);

  //#endregion

  return (
    <>
      <Box className={styleModule.backgroundcolor}>
        <Grid container>
          {/* search section */}
          {showFilterSection && (
            <Zoom
              in={showFilterSection}
              mountOnEnter
              unmountOnExit
              style={{
                transitionDelay: showFilterSection ? "500ms" : "0ms",
              }}
            >
              <Grid sx={gridStyle} item xs={12} md={3}>
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

                {/* Category Section */}

                <ComboBox
                  name={"Category"}
                  defaultValue={"ALL PRODUCTS"}
                  value={category}
                  handleValueMethod={handleCategory}
                  items={CategoryItems}
                />

                {/* End-Category Section */}

                {/* Estate Filters */}

                {category == estate && (
                  <>
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
                  </>
                )}

                {/* End of Estate Filters */}

                {/* digital Equipment filters */}

                {category == digitalEquipment && (
                  <>
                    <Suspense>
                      <ComboBox
                        name={"Sub Category"}
                        defaultValue={"ALL DIGITAL EQUIPMENTS"}
                        value={subCategory}
                        handleValueMethod={handleSubCategory}
                        items={SubCategoryItems}
                      />
                    </Suspense>
                    {subCategory == cellPhoneAndTablets && (
                      <>
                        <Suspense>
                          <CellPhone_TabletsFilter
                            setCellPhoneBrand={setCellPhoneBrand}
                            checkedStorage={checkedStorage}
                            setCheckedStorage={setCheckedStorage}
                            checkedRAM={checkedRAM}
                            setCheckedRAM={setCheckedRAM}
                            checkedColor={checkedColor}
                            setCheckedColor={setCheckedColor}
                          />
                        </Suspense>
                      </>
                    )}
                  </>
                )}

                {/* end of digital Equipment filters */}

                {/* Price Section for all products */}

                <Typography
                  mt={2}
                  mb={1}
                  component={"label"}
                  display={"block"}
                  mr={0.5}
                >
                  Price:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    mb: 1.5,
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "baseline",
                      gap: 1,
                    }}
                  >
                    <Typography ml={0.4}>Minimum</Typography>
                    <Input
                      name="minimumPrice"
                      type="number"
                      fullWidth
                      placeholder="Example:100 AFG"
                      onChange={handlePriceValue}
                      value={price.minimumPrice}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "baseline",
                      gap: 1,
                    }}
                  >
                    <Typography>Maximum</Typography>
                    <Input
                      name="maximumPrice"
                      type="number"
                      fullWidth
                      placeholder="Example:200 AFG"
                      onChange={handlePriceValue}
                      value={price.maximumPrice}
                    />
                  </Box>
                </Box>

                {/* end of Price Section for all products */}

                {/* sort section for all products*/}

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

                {/* end of sort section for all products*/}

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
                mt: showFilterSection ? 0 : 2,
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
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20%",
                  }}
                >
                  <Loader />
                </Typography>
              ) : error !== null ? (
                <Typography textAlign={"center"}>{error}</Typography>
              ) : listings.length == 0 ? (
                <Suspense fallback={<Fallback />}>
                  <NotFound />
                </Suspense>
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
                        delay = 500 + index * 100;
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
                    <Button
                      variant="outlined"
                      sx={{
                        mb: 5,
                      }}
                      onClick={fetchMoreListings}
                    >
                      Show more...
                    </Button>
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
