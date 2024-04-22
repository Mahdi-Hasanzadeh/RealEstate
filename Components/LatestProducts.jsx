import { Box, Container, Typography } from "@mui/material";
import { BLACK } from "../../COLOR";
import { Card } from "./ComponentsReturn";
import { Link } from "react-router-dom";

const LatestProducts = ({ title, loading, error, listings, query }) => {
  const queryaString =
    query == "offer"
      ? "offer=true"
      : query == "rent"
      ? "type=rent"
      : query == "sell"
      ? "type=sell"
      : null;
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5" color={BLACK}>
          {title}
        </Typography>
        <Link className="Link" to={`/search?${queryaString}`}>
          {title}
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 3,
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
              return <Card key={index} listing={item} />;
            })
          )}
        </Box>
      </Container>
    </>
  );
};

export default LatestProducts;
