import { Box, Container, Typography, Link } from "@mui/material";
import { BLACK } from "../../styles/Color.js";
import { Suspense, lazy } from "react";
import Fallback from "../../Components/UI/Fallback.jsx";
import { Link as RouterLink } from "react-router-dom";

const Card = lazy(() =>
  import("../../Components/CustomizedCard/SearchResultCard.jsx")
);

const LatestProducts = ({ title, loading, error, listings }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
      }}
      // className="scroll-animation"
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

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
          <Typography variant="h6">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          listings?.length > 0 &&
          !error &&
          listings.map((item, index) => (
            <Suspense key={index} fallback={<Fallback />}>
              <Card listing={item} />
            </Suspense>
          ))
        )}
      </Box>
    </Container>
  );
};

export default LatestProducts;
