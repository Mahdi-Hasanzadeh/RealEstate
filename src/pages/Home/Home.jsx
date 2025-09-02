//#region Libraries

import { Container } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";

//#endregion

//#region My Modules

import Fallback from "../../Components/UI/Fallback.jsx";
import MainPageTopic from "./MainPageTopic.jsx";
import axiosInstance from "../../config/axiosConfig.js";
import {
  cellPhoneAndTablets,
  computer,
  digitalEquipment,
  estate,
} from "../../utils/utility.js";

//#endregion

//#region Lazy load component

const ProductsSlider = lazy(() =>
  import("../../Components/Slider/ProductsSlider.jsx")
);
const LatestProducts = lazy(() => import("./LatestProducts.jsx"));

//#endregion

//#region Public Fields

const numberOfListings = 4;
const offer = true;
const rent = "rent";
const sale = "sell";
const offerQuery = `category=${estate}&limit=${numberOfListings}&offer=${offer}`;
const rentQuery = `category=${estate}&limit=${numberOfListings}&type=${rent}`;
const saleQuery = `category=${estate}&limit=${numberOfListings}&type=${sale}`;
const specialListingsQuery = `category=${estate}&limit=${numberOfListings}&offer=${offer}&furnished=true&parking=true`;
const cellPhoneQuery = `category=${digitalEquipment}&subCategory=${cellPhoneAndTablets}&limit=${numberOfListings}`;
const computerQuery = `category=${digitalEquipment}&subCategory=${computer}&limit=${numberOfListings}`;

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

  const [cellPhoneListings, setCellPhoneListings] = useState([]);
  const [errorCellPhone, setErrorCellPhone] = useState(null);

  const [computerListings, setComputerListings] = useState([]);
  const [errorComputer, setErrorComputer] = useState(null);

  const [loading, setLoading] = useState(false);

  //#endregion

  //#region methods

  const fetchAllListings = async () => {
    setLoading(true);

    try {
      const [
        specialRes,
        offerRes,
        rentRes,
        saleRes,
        cellPhoneRes,
        computerRes,
      ] = await Promise.all([
        axiosInstance.get(`api/listing/get?${specialListingsQuery}`),
        axiosInstance.get(`api/listing/get?${offerQuery}`),
        axiosInstance.get(`api/listing/get?${rentQuery}`),
        axiosInstance.get(`api/listing/get?${saleQuery}`),
        axiosInstance.get(`api/listing/get?${cellPhoneQuery}`),
        axiosInstance.get(`api/listing/get?${computerQuery}`),
      ]);

      // Special Listings
      if (specialRes.data.success === false) {
        setSpecialError(specialRes.data.message);
      } else {
        setSpecialListings(specialRes.data.listings);
        setSpecialError(null);
      }

      // Offers
      if (offerRes.data.success === false) {
        setErrorOffer(offerRes.data.message);
      } else {
        setRecentOffers(offerRes.data.listings);
        setErrorOffer(null);
      }

      // Rent
      if (rentRes.data.success === false) {
        setErrorRent(rentRes.data.message);
      } else {
        setRecentRent(rentRes.data.listings);
        setErrorRent(null);
      }

      // Sale
      if (saleRes.data.success === false) {
        setErrorSale(saleRes.data.message);
      } else {
        setRecentSale(saleRes.data.listings);
        setErrorSale(null);
      }

      // Cell Phones
      if (cellPhoneRes.data.success === false) {
        setErrorCellPhone(cellPhoneRes.data.message);
      } else {
        setCellPhoneListings(cellPhoneRes.data.listings);
        setErrorCellPhone(null);
      }

      // Computers
      if (computerRes.data.success === false) {
        setErrorComputer(computerRes.data.message);
      } else {
        setComputerListings(computerRes.data.listings);
        setErrorComputer(null);
      }
    } catch (error) {
      const message = error.message || "Unknown error";
      setSpecialError(message);
      setErrorOffer(message);
      setErrorRent(message);
      setErrorSale(message);
      setErrorCellPhone(message);
      setErrorComputer(message);
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
          {specialListings.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <ProductsSlider error={specialError} listings={specialListings} />
            </Suspense>
          )}

          {recentOffers.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <LatestProducts
                title="Recent Offers"
                error={errorOffer}
                listings={recentOffers}
              />
            </Suspense>
          )}

          {recentRent.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <LatestProducts
                title="Recent Places For Rent"
                error={errorRent}
                listings={recentRent}
              />
            </Suspense>
          )}

          {recentSale.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <LatestProducts
                title="Recent Places For Sale"
                error={errorSale}
                listings={recentSale}
              />
            </Suspense>
          )}

          {cellPhoneListings.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <LatestProducts
                title="Recent CellPhones & Tablets"
                error={errorSale}
                listings={cellPhoneListings}
              />
            </Suspense>
          )}

          {computerListings.length > 0 && (
            <Suspense fallback={<Fallback />}>
              <LatestProducts
                title="Recent Computers"
                error={errorSale}
                listings={computerListings}
              />
            </Suspense>
          )}
        </>
      )}
    </>
  );
};

export default Home;
