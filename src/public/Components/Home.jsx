import { Box, Container, Typography } from "@mui/material";
import { BLACK, CAPTIONLIGHTGRAY, GRAY } from "../../../COLOR";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../PortConfig";
import styleModule from "../../style.module.css";
import Fallback from "./Fallback";

const ProductsSlider = lazy(() => import("./ProductsSlider"));
const LatestProducts = lazy(() => import("./LatestProducts"));

const numberOfListings = 4;
const offer = true;
const rent = "rent";
const sale = "sell";
const offerQuery = `limit=${numberOfListings}&offer=${offer}`;
const rentQuery = `limit=${numberOfListings}&type=${rent}`;
const saleQuery = `limit=${numberOfListings}&type=${sale}`;
const specialListingsQuery = `limit=${numberOfListings}&offer=${offer}&furnished=true&parking=true`;

const Home = () => {
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

  const [specialListingsLoading, setSpecialListingsLoading] = useState(false);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const [loadingRent, setLoadingRent] = useState(false);
  const [loadingSale, setLoadingSale] = useState(false);

  const fetchSpecialListings = async () => {
    try {
      setSpecialListingsLoading(true);
      const response = await axios.get(
        `${URL}api/listing/get?${specialListingsQuery}`
      );

      if (response.data.success == false) {
        setSpecialError(response.data.message);
        return;
      }
      setSpecialListings(response.data.listings);
      setSpecialError(null);
      // Calling next function to load the data
      fetchRecentOffers();
    } catch (error) {
      setSpecialError(error.message);
    } finally {
      setSpecialListingsLoading(false);
    }
  };

  const fetchRecentOffers = async () => {
    try {
      setLoadingOffer(true);
      const response = await axios.get(`${URL}api/listing/get?${offerQuery}`);

      if (response.data.success == false) {
        setErrorOffer(response.data.message);
        return;
      }
      setRecentOffers(response.data.listings);
      setErrorOffer(null);
      // Calling next function to load the data
      fetchRecentRent();
    } catch (error) {
      setErrorOffer(error.message);
    } finally {
      setLoadingOffer(false);
    }
  };

  const fetchRecentRent = async () => {
    try {
      setLoadingRent(true);
      const response = await axios.get(`${URL}api/listing/get?${rentQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success == false) {
        setErrorRent(response.data.message);
        return;
      }
      setRecentRent(response.data.listings);
      setErrorRent(null);
      // Calling next function to load the data
      fetchRecentSale();
    } catch (error) {
      setErrorRent(error.message);
    } finally {
      setLoadingRent(false);
    }
  };

  const fetchRecentSale = async () => {
    try {
      setLoadingSale(true);
      const response = await axios.get(`${URL}api/listing/get?${saleQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success == false) {
        setErrorSale(response.data.message);
        return;
      }
      setRecentSale(response.data.listings);
      setErrorSale(null);
    } catch (error) {
      setErrorSale(error.message);
    } finally {
      setLoadingSale(false);
    }
  };

  useEffect(() => {
    fetchSpecialListings();
  }, []);

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: { xs: 0, md: 5 },
          }}
        >
          <Box>
            <Typography
              variant={isLaptop ? "h2" : isMobile ? "h5" : "h3"}
              color={GRAY}
              component={"div"}
              sx={{
                maxWidth: isLaptop ? 600 : isMobile ? 200 : 400,
                // backgroundColor: "red",
                wordWrap: "break-word",
              }}
            >
              Find your next{" "}
              <Typography
                variant={isLaptop ? "h2" : isMobile ? "h5" : "h3"}
                component={"span"}
                color={BLACK}
              >
                perfect
              </Typography>{" "}
              place with ease
            </Typography>
          </Box>
          <Box>
            <Typography
              color={CAPTIONLIGHTGRAY}
              variant={isLaptop ? "body1" : "caption"}
              component={"div"}
              sx={{
                wordWrap: "break-word",
                mt: 1.5,
              }}
            >
              Hasanzadeh Estate will help you to find your home fast,easy and
              comfortable.
            </Typography>
          </Box>

          <Box>
            <Typography
              color={CAPTIONLIGHTGRAY}
              variant={isLaptop ? "body1" : "caption"}
              component={"div"}
              sx={{
                wordWrap: "break-word",
              }}
            >
              Our expert support are always available.
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 1,
            }}
          >
            <Link
              style={{
                fontSize: "1.5em",
              }}
              className="Link"
              to="/search"
            >
              Let's Start Now...
            </Link>
          </Box>
        </Box>
      </Container>
      {/* Slider */}
      <Suspense fallback={<Fallback />}>
        <ProductsSlider
          loading={specialListingsLoading}
          error={specialError}
          listings={specialListings}
        />
      </Suspense>

      {/* Recent Offers */}
      <Suspense fallback={<Fallback />}>
        <LatestProducts
          query={"offer"}
          title="Recent Offers"
          loading={loadingOffer}
          error={errorOffer}
          listings={recentOffers}
        />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <LatestProducts
          query={"rent"}
          title="Recent Places For Rent"
          loading={loadingRent}
          error={errorRent}
          listings={recentRent}
        />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <LatestProducts
          query={"sell"}
          title="Recent Places For Sale"
          loading={loadingSale}
          error={errorSale}
          listings={recentSale}
        />
      </Suspense>
    </>
  );
};
export default Home;
