import { Box, Container, Typography } from "@mui/material";
import { BLACK } from "../../COLOR";
import { Card } from "./ComponentsReturn";
import { Link } from "react-router-dom";
const RecentProductSection = ({ title }) => {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5" color={BLACK}>
          {title}
        </Typography>
        <Link className="Link" to="/search">
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
          <Card />
          <Card />
          <Card />
          <Card />
        </Box>
      </Container>
    </>
  );
};

export default RecentProductSection;
