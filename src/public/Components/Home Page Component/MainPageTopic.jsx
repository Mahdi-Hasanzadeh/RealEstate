import { Box, Typography } from "@mui/material";
import { BLACK, CAPTIONLIGHTGRAY, GRAY } from "../../../../COLOR.js";
import { Link } from "react-router-dom";

const MainPageTopic = ({ isLaptop, isMobile }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: { xs: 0, md: 5 },
      }}
    >
      {/* Main page Header */}
      <Box>
        <Typography
          variant={isLaptop ? "h2" : isMobile ? "h5" : "h3"}
          color={GRAY}
          component={"div"}
          sx={{
            maxWidth: isLaptop ? 600 : isMobile ? 200 : 400,
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
          product with ease
        </Typography>
      </Box>
      {/* End of Main page header */}
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
          Sell Website will help you to find your{" "}
          <Typography variant={"h6"} component={"span"} color={BLACK}>
            products
          </Typography>{" "}
          fast,easy and comfortable.
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
          to="/search?category=estate"
        >
          Let's Start Now...
        </Link>
      </Box>
    </Box>
  );
};

export default MainPageTopic;
