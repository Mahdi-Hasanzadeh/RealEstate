import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const MainPageTopic = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // stacked on small, side-by-side on large
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        ml: { xs: 0, md: 5 },
        mr: { xs: 2, md: 5 },
        mt: { xs: 4, md: 0 },
        gap: { xs: 3, md: 0 }, // no gap on desktop, space-between handles spacing
        width: "100%",
      }}
    >
      {/* Left Column - Text */}
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "65%" }, // make text column wider
          flexGrow: 1,
          maxWidth: { xs: "100%", md: "65%" },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            wordBreak: "break-word",
            fontSize: { xs: "1.8rem", md: "3rem" },
            lineHeight: 1.1,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Find your next{" "}
          <Typography
            component="span"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", md: "3rem" },
              lineHeight: 1.1,
            }}
          >
            perfect
          </Typography>{" "}
          product with ease
        </Typography>

        <Typography
          color="#6c757d"
          variant="body1"
          component="p"
          sx={{
            wordBreak: "break-word",
            fontSize: { xs: "1rem", md: "1.425rem" },
            lineHeight: 1.7,
            maxWidth: "100%",
          }}
        >
          Smart Trade Website will help you find your products fast, easy, and
          comfortable.
        </Typography>
      </Box>

      {/* Right Column - Button */}
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "30%" }, // narrow button column
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          mt: { xs: 2, md: 0 },
        }}
      >
        <Button
          component={RouterLink}
          to="/search?category=estate"
          variant="outlined"
          sx={{
            px: 6,
            py: 1.75,
            fontWeight: 700,
            fontSize: { xs: "1rem", md: "1.3rem" },
            borderRadius: 2,
            textTransform: "none",
            color: "primary.main",
            borderColor: "primary.main",
            backgroundColor: "transparent",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              borderColor: "primary.main",
              boxShadow: "none",
            },
          }}
          aria-label="Start searching products"
        >
          Let's Start Now
        </Button>
      </Box>
    </Box>
  );
};

export default MainPageTopic;
