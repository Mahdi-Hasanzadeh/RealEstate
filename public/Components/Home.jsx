import { Box, Container, Typography } from "@mui/material";
import { BLACK, CAPTIONLIGHTGRAY, GRAY } from "../../COLOR";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductsSlider, RecentProductsSection } from "./ComponentsReturn";

const Home = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          paddingTop: 10,
          //   backgroundColor: LIGHTGRAY,
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
            <Link className="Link" to="/search">
              Let's Start Now...
            </Link>
          </Box>
        </Box>
      </Container>
      {/* Products Slider */}
      <ProductsSlider />

      {/* Recent Offers */}
      <RecentProductsSection title="Recent Offers" />
      <RecentProductsSection title="Recent places for rent" />
      <RecentProductsSection title="Recent places for sale" />
    </>
  );
};
export default Home;
