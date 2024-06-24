import { Box, Container, Typography, css, keyframes } from "@mui/material";
import { BLACK } from "../../../COLOR";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import Fallback from "./Fallback.jsx";
const Card = lazy(() => import("./Card.jsx"));

const LatestProducts = ({
  title,
  loading,
  error,
  listings,
  query,
  category,
}) => {
  //#region Fields
  var queryString = `category=${category}&`;
  queryString +=
    query == "offer"
      ? "offer=true"
      : query == "rent"
      ? "type=rent"
      : query == "sell"
      ? "type=sell"
      : null;
  //#endregion

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          py: 2,
        }}
        className="scroll-animation"
      >
        <Typography variant="h5" color={BLACK}>
          {title}
        </Typography>
        <Link
          className="Link"
          style={{
            color: "purple",
          }}
          to={`/search?${queryString}`}
        >
          {title}
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: { xs: 0, sm: 1 },
            mt: 2,
            mb: 2,
          }}
        >
          {loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            listings?.length > 0 &&
            error == null &&
            listings.map((item, index) => {
              return (
                <Suspense key={index} fallback={<Fallback />}>
                  <Card listing={item} />
                </Suspense>
              );
            })
          )}
        </Box>
      </Container>
    </>
  );
};

export default LatestProducts;
