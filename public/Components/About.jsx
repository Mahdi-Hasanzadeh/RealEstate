import { Box, Container, Typography } from "@mui/material";
import { GRAY } from "../../COLOR";

const About = () => {
  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          position: "relative",
          top: 45,
        }}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"24px"}
          variant="h6"
          sx={{ my: 5, ml: 1 }}
        >
          ABOUT HASANZADEH'S REAL ESTATE
        </Typography>
        <Typography
          sx={{
            whiteSpace: "wrap",
            wordBreak: "break-word",
          }}
          mb={2}
        >
          Welcome to{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            Hasanzadeh's{" "}
          </span>{" "}
          Real Estate World I am{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Mahdi Hasanzadeh
          </span>{" "}
          , a dedicated professional in the dynamic realm of real estate. With a
          passion for properties and a commitment to client satisfaction, I
          specialize in residential sales, commercial leasing, property
          management, etc.
        </Typography>
        <Typography mb={2}>
          My journey in real estate began with a profound interest in
          architecture and investment opportunities. Over the years, I have
          cultivated expertise in first-time homebuyers, relocation services,
          etc. I believe in providing personalized service tailored to each
          client's unique needs, whether they are buying, selling, or investing.
        </Typography>
        <Typography mb={2}>
          At
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {" "}
            Hasanzadeh's{" "}
          </span>{" "}
          Real Estate, integrity, transparency, and professionalism are the
          cornerstones of our practice. I am here to guide you through every
          step of your real estate journey, ensuring a smooth and successful
          transaction.
        </Typography>
        <Typography mb={10}>
          Feel free to explore our listings and resources. Whether you are a
          seasoned investor or a first-time home seeker, I look forward to
          assisting you in achieving your real estate goals.
        </Typography>
      </Container>
    </>
  );
};
export default About;
