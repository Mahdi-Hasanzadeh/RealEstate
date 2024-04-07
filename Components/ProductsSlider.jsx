import { Container } from "@mui/material";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { LIGHTGRAY } from "../../COLOR";
import { getImageUrl } from "../../Utility/CreateImageUrl";
import img1 from "../assets/house1.jpg";
import img2 from "../assets/house2.jpg";
import img3 from "../assets/house3.jpg";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// import image from "../../assets/house1.jpg";
const images = [
  {
    label: "LUXURY HOUSE",
    // imgPath: "./assets/house1.jpg",
    // imgPath: "../../assets/house1.jpg",
    imgPath: img1,
  },
  {
    label: "LUXURY HOUSE",
    imgPath: img2,
  },
  {
    label: "Bali, Indonesia",
    imgPath: img3,
  },
  {
    label: "Goč, Serbia",
    imgPath: img2,
  },
  {
    label: "Goč, Serbia",
    imgPath: img1,
  },
  {
    label: "Goč, Serbia",
    imgPath: img3,
  },
];
const path = "../assets/";
const ProductsSlider = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
      }}
    >
      <Paper
        square
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: LIGHTGRAY,
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: { sm: 550 },
                  display: "block",
                  width: "100%",
                  overflow: "hidden",
                  objectFit: { xs: "contain", sm: "cover" },
                  objectPosition: "center",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Container>
  );
};

export default ProductsSlider;