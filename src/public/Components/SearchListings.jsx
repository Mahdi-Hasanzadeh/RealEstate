//#region Libraries
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
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
import qs from "qs";
//#endregion

//#region My Modules
import { URL } from "../../../PortConfig";
import Fallback from "./Fallback.jsx";
import styleModule from "../../style.module.css";
import Loader from "../styleComponents/loader.jsx";
import ErrorUI from "../styleComponents/Error.jsx";
import { toast } from "react-toastify";
import {
  allBrands,
  allDigitalEquipment,
  allProducts,
  CategoryItems,
  cellPhoneAndTablets,
  digitalEquipment,
  estate,
  filterProdcutsBy,
  SubCategoryItemsForDigitalEquiments,
  transportation,
} from "../utility.js";
const CardItem = lazy(() => import("./Card.jsx"));
const ComboBox = lazy(() => import("../Utility/ComboBox.jsx"));
const CellPhone_TabletsFilter = lazy(() =>
  import("./SubCategories/CellPhone&TabletsFilters.jsx")
);
//#endregion

//#region Constant Fields

var delay = 0;

//#endregion

const SearchListings = () => {
  //#region hooks

  const [searchTerm, setSearchTerm] = useState("");
  const [sortProduct, setSortProduct] = useState("desc");
  const [orderOfProduct, setOrderOfProduc] = useState("createdAt");

  const [subCategory, setSubCategory] = useState(cellPhoneAndTablets);

  const [category, setCategory] = useState(estate);

  const [estateFormData, setEstateFormData] = useState({
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
  });

  const [price, setPrice] = useState({
    minimumPrice: 0,
    maximumPrice: 0,
  });

  const [cellPhoneBrand, setCellPhoneBrand] = useState(allBrands);

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

  const filterObjectBasedOnValue = (items) => {
    //* method 1

    // return Object.entries(items)
    //   .filter(([key, value]) => value === true)
    //   .reduce((acc, [key, value]) => {
    //     acc[key] = value;
    //     return acc;
    //   }, {});

    //* method 2

    return Object.keys(items).filter((key) => items[key] === true);
  };

  const handleSortAndOrderOfProduct = (event) => {
    const order = event.target.value.split("_")[0];
    const sort = event.target.value.split("_")[1];
    setSortProduct(sort);
    setOrderOfProduc(order);
  };
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

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
    // todo Write a better code for this part
    setEstateFormData((prevData) => {
      if (
        event.target.name === "offer" ||
        event.target.name === "parking" ||
        event.target.name === "furnished"
      ) {
        return {
          ...prevData,
          [event.target.name]:
            event.target.name === "offer"
              ? !estateFormData.offer
              : event.target.name === "parking"
              ? !estateFormData.parking
              : !estateFormData.furnished,
        };
      }
      if (event.target.name === "type") {
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
      // console.log(response.data.listings);
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

  const removeQueriesFromURL = () => {
    var params = [];
    for (var key of searchParams.keys()) {
      // console.log(key);
      params.push(key);
    }
    params.map((item) => searchParams.delete(item));

    // console.log(searchParams.size, "size");
  };

  //* set an object to the URL

  const setObjectToURL = (name, obj) => {
    const trueValuesOfObj = filterObjectBasedOnValue(obj);
    const stringifyValues = qs.stringify(trueValuesOfObj);
    searchParams.set(name, stringifyValues);
  };

  const handleSearch = () => {
    //* remove all queries from the URL
    removeQueriesFromURL();

    searchParams.set("category", category);
    switch (category) {
      case allProducts: {
        // * all products section
        break;
      }
      case estate: {
        // * set filters into the URL
        // console.log("estate");
        searchParams.set("type", estateFormData.type);
        searchParams.set("parking", estateFormData.parking);
        searchParams.set("furnished", estateFormData.furnished);
        searchParams.set("offer", estateFormData.offer);
        break;
      }
      case digitalEquipment: {
        // * set the sub category to the URL
        const selectedSubCategory = subCategory;
        searchParams.set("subCategory", selectedSubCategory);

        switch (selectedSubCategory) {
          case allDigitalEquipment: {
            break;
          }
          case cellPhoneAndTablets: {
            // console.log(cellPhoneAndTablets);

            //* set the brand,storage,RAM and color to the URL
            searchParams.set("brand", cellPhoneBrand);

            //* set storage to the url
            setObjectToURL("storage", checkedStorage);

            //* set RAM to the url
            setObjectToURL("RAM", checkedRAM);

            //* set COLOR to the url
            setObjectToURL("color", checkedColor);

            break;
          }
          case computer: {
            // console.log(computer);
            break;
          }
          case console: {
            // console.log(console);
            break;
          }
        }
        break;
      }
      case transportation: {
        // * transportation's filter section
        break;
      }
    }

    //* check the price
    const min_price = Number(price.minimumPrice);
    const max_price = Number(price.maximumPrice);

    if (max_price <= min_price) {
      if (max_price != 0 && min_price != 0) {
        toast.error("Maximum price should be higher than the minimum price");
        return;
      }
    }

    //* put the price of product to the URL
    searchParams.set(
      "minimumPrice",
      price.minimumPrice.length == 0 ? 0 : price.minimumPrice
    );
    searchParams.set(
      "maximumPrice",
      price.maximumPrice.length == 0 ? 0 : price.maximumPrice
    );

    //* put the searchTerm into the URL
    searchParams.set("searchTerm", searchTerm);

    //* put the sort and order filters into the URL
    //* sort: asc || desc

    searchParams.set("sort", sortProduct);
    searchParams.set("order", orderOfProduct);

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

  const setURLQueriesToLocalState = (params, name) => {
    const parsedValue = qs.parse(params);
    const values = Object.values(parsedValue);
    if (name == "storage") {
      setCheckedStorage((prevData) => {
        const obj = {};
        values.map((item) => (obj[item] = true));
        return {
          ...prevData,
          ...obj,
        };
      });
    } else if (name == "RAM") {
      setCheckedRAM((prevData) => {
        const obj = {};
        values.map((item) => (obj[item] = true));
        return {
          ...prevData,
          ...obj,
        };
      });
    } else if (name == "color") {
      setCheckedColor((prevData) => {
        const obj = {};
        values.map((item) => (obj[item] = true));
        return {
          ...prevData,
          ...obj,
        };
      });
    }
  };

  //#endregion

  //#region style objects

  const gridStyle = {
    position: md ? "static" : "fixed",
    overflowY: "auto", // Allow vertical scrolling if content exceeds height
    width: "100%",
    height: md ? "" : "100dvh",
    paddingRight: theme.spacing(2),
    padding: md ? 0.5 : 2,
    borderRight: md ? "0px" : "1px solid gray",
    minHeight: md ? 0 : "93vh",
    paddingBottom: md ? 0 : 15,
  };

  //#endregion

  //#region useEffect

  useEffect(() => {
    // Get Category from URL
    const categoryOfURL = searchParams.get("category");

    //* put the searchTerm from URL to the input
    const term = searchParams.get("searchTerm");
    setSearchTerm(term == null ? "" : term);

    //* put the sort and orderOfProducts from URL to the sortProduct variable
    const sort = searchParams.get("sort");
    setSortProduct(sort == null ? "desc" : sort);
    const order = searchParams.get("order");
    setOrderOfProduc(order == null ? "createdAt" : order);

    // * get the price from the URL
    const min_price = searchParams.get("minimumPrice");
    const max_price = searchParams.get("maximumPrice");

    setPrice({
      minimumPrice: min_price == null || min_price.length == 0 ? 0 : min_price,
      maximumPrice: max_price == null || max_price.length == 0 ? 0 : max_price,
    });

    // * fetch the products based on the category value
    // console.log(categoryOfURL);

    setCategory(categoryOfURL == null ? "all_products" : categoryOfURL);
    switch (categoryOfURL) {
      case allProducts: {

        const subCategory = searchParams.get("subCategory");
        console.log(subCategory)
        setSubCategory(subCategory);

        // todo
        const brand = searchParams.get("brand");
        setCellPhoneBrand(brand == null ? "all_brands" : brand);

        const storage = searchParams.get("storage");
        const RAM = searchParams.get("RAM");
        const color = searchParams.get("color");

        setURLQueriesToLocalState(storage, "storage");
        setURLQueriesToLocalState(RAM, "RAM");
        setURLQueriesToLocalState(color, "color");
        fetchListings();
        break;
      }
      case estate: {
        const type = searchParams.get("type");
        const parking = searchParams.get("parking");
        const furnished = searchParams.get("furnished");
        const offer = searchParams.get("offer");
        setEstateFormData({
          type: type == null ? "all" : type,
          parking: parking == null || parking == "false" ? false : true,
          furnished: furnished == null || furnished == "false" ? false : true,
          offer: offer == null || offer == "false" ? false : true,
        });
        fetchListings();
        break;
      }
      case digitalEquipment: {
        const subCategory = searchParams.get("subCategory");
        setSubCategory(subCategory);

        // todo
        const brand = searchParams.get("brand");
        setCellPhoneBrand(brand == null ? "all_brands" : brand);

        const storage = searchParams.get("storage");
        const RAM = searchParams.get("RAM");
        const color = searchParams.get("color");

        setURLQueriesToLocalState(storage, "storage");
        setURLQueriesToLocalState(RAM, "RAM");
        setURLQueriesToLocalState(color, "color");

        fetchListings();
        break;
      }
      case transportation: {
        break;
      }
    }
    // * end of fetching the products
    delay = 0;
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
                    value={searchTerm}
                    onChange={handleSearchTerm}
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
                            checked={estateFormData.type === "all"}
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
                            checked={estateFormData.type === "rent"}
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
                            checked={estateFormData.type === "sell"}
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
                        value={estateFormData.offer}
                        label="Offer"
                        labelPlacement="end"
                        name="offer"
                        onChange={handleFormData}
                        control={
                          <Checkbox
                            size={md ? "small" : "medium"}
                            checked={estateFormData?.offer ? true : false}
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
                        value={estateFormData.parking}
                        label="Parking"
                        labelPlacement="end"
                        name="parking"
                        onChange={handleFormData}
                        control={
                          <Checkbox
                            size={md ? "small" : "medium"}
                            checked={estateFormData.parking}
                          />
                        }
                      />

                      <FormControlLabel
                        value={estateFormData.furnished}
                        label="furnished"
                        labelPlacement="end"
                        name="furnished"
                        onChange={handleFormData}
                        control={
                          <Checkbox
                            size={md ? "small" : "medium"}
                            checked={estateFormData.furnished}
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
                        defaultValue={"CELL PHONE & TABLETS"}
                        value={subCategory}
                        handleValueMethod={handleSubCategory}
                        items={SubCategoryItemsForDigitalEquiments}
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
                    value={`${orderOfProduct}_${sortProduct}`}
                    size="small"
                    fullWidth
                    onChange={handleSortAndOrderOfProduct}
                  >
                    {filterProdcutsBy.map((item, index) => {
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
          {/* End of search section */}

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

          {/* Products Section */}
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
                // Loading component
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20%",
                  }}
                >
                  <Loader />
                </Box>
              ) : error !== null ? (
                <ErrorUI error={error} />
              ) : listings.length == 0 ? (
                <Suspense fallback={<Fallback />}>
                  <ErrorUI error={"Not Found"} />
                </Suspense>
              ) : (
                <>
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      justifyContent: "space-around",
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
          {/* End of Products Section */}
        </Grid>
      </Box>
    </>
  );
};

export default SearchListings;
