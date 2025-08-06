//#region Libraries

import { Container } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";

//#endregion

//#region My Modules

import Fallback from "../../Components/UI/Fallback.jsx";
import MainPageTopic from "./MainPageTopic.jsx";
import axiosInstance from "../../config/axiosConfig.js";

//#endregion

//#region Lazy load component

const ProductsSlider = lazy(() =>
  import("../../Components/Slider/ProductsSlider.jsx")
);
const LatestProducts = lazy(() => import("./LatestProducts.jsx"));

//#endregion

//#region Public Fields

const category = "estate";

const numberOfListings = 4;
const offer = true;
const rent = "rent";
const sale = "sell";
const offerQuery = `category=${category}&limit=${numberOfListings}&offer=${offer}`;
const rentQuery = `category=${category}&limit=${numberOfListings}&type=${rent}`;
const saleQuery = `category=${category}&limit=${numberOfListings}&type=${sale}`;
const specialListingsQuery = `category=estate&limit=${numberOfListings}&offer=${offer}&furnished=true&parking=true`;

//#endregion

const Home = () => {
  //#region state

  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [specialListings, setSpecialListings] = useState([]);
  const [recentOffers, setRecentOffers] = useState([]);
  const [recentRent, setRecentRent] = useState([]);
  const [recentSale, setRecentSale] = useState([]);

  const [specialError, setSpecialError] = useState(null);
  const [errorOffer, setErrorOffer] = useState(null);
  const [errorRent, setErrorRent] = useState(null);
  const [errorSale, setErrorSale] = useState(null);

  const [loading, setLoading] = useState(false);

  //#endregion

  //#region methods

  const fetchAllListings = async () => {
    setLoading(true);

    try {
      const [specialRes, offerRes, rentRes, saleRes] = await Promise.all([
        axiosInstance.get(`api/listing/get?${specialListingsQuery}`),
        axiosInstance.get(`api/listing/get?${offerQuery}`),
        axiosInstance.get(`api/listing/get?${rentQuery}`),
        axiosInstance.get(`api/listing/get?${saleQuery}`),
      ]);

      if (specialRes.data.success === false) {
        setSpecialError(specialRes.data.message);
      } else {
        setSpecialListings(specialRes.data.listings);
        setSpecialError(null);
      }

      if (offerRes.data.success === false) {
        setErrorOffer(offerRes.data.message);
      } else {
        setRecentOffers(offerRes.data.listings);
        setErrorOffer(null);
      }

      if (rentRes.data.success === false) {
        setErrorRent(rentRes.data.message);
      } else {
        setRecentRent(rentRes.data.listings);
        setErrorRent(null);
      }

      if (saleRes.data.success === false) {
        setErrorSale(saleRes.data.message);
      } else {
        setRecentSale(saleRes.data.listings);
        setErrorSale(null);
      }
    } catch (error) {
      const message = error.message || "Unknown error";
      setSpecialError(message);
      setErrorOffer(message);
      setErrorRent(message);
      setErrorSale(message);
    } finally {
      setLoading(false);
    }
  };

  //#endregion

  //#region useEffect

  useEffect(() => {
    fetchAllListings();
  }, []);

  //#endregion

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <MainPageTopic isLaptop={isLaptop} isMobile={isMobile} />
      </Container>

      {loading ? (
        <Fallback />
      ) : (
        <>
          <Suspense fallback={<Fallback />}>
            <ProductsSlider
              loading={false}
              error={specialError}
              listings={specialListings}
            />
          </Suspense>

          <Suspense fallback={<Fallback />}>
            <LatestProducts
              query={"offer"}
              title="Recent Offers"
              loading={false}
              error={errorOffer}
              listings={recentOffers}
              category={category}
            />
          </Suspense>

          <Suspense fallback={<Fallback />}>
            <LatestProducts
              query={"rent"}
              title="Recent Places For Rent"
              loading={false}
              error={errorRent}
              listings={recentRent}
              category={category}
            />
          </Suspense>

          <Suspense fallback={<Fallback />}>
            <LatestProducts
              query={"sell"}
              title="Recent Places For Sale"
              loading={false}
              error={errorSale}
              listings={recentSale}
              category={category}
            />
          </Suspense>
        </>
      )}
    </>
  );
};

export default Home;
