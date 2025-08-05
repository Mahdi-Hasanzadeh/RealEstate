// src/components/ImageSlider.jsx

import React, { useState } from "react";
import { Box, Paper, Typography, Button, MobileStepper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageSlider = ({ images = [], title = "", bgColor = "#f5f5f5" }) => {
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const [activeStep, setActiveStep] = useState(0);
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

  const styleForSliderImage = {
    height: { sm: 450, md: 500 },
    display: "block",
    width: "100%",
    overflow: "hidden",
    objectFit: { xs: "contain", sm: "fill" },
    objectPosition: "center",
    borderRadius: 2,
  };

  return (
    <>
      <Paper
        square
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "auto", // allow height to grow with text
          minHeight: 50, // keep at least 50px height
          pl: 2,
          pr: 2,
          bgcolor: bgColor,
          borderRadius: 1,
          flexWrap: "wrap", // support multi-line
        }}
      >
        <Typography
          sx={{
            wordBreak: "break-word",
            whiteSpace: "normal", // allow wrapping
          }}
        >
          {title}
        </Typography>
      </Paper>

      <AutoPlaySwipeableViews
        axis={isRtl ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((src, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={styleForSliderImage}
                src={src}
                alt={`slide-${index}`}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        style={{
          background: bgColor,
          borderRadius: 1,
        }}
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
            {isRtl ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {isRtl ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </>
  );
};

export default React.memo(ImageSlider);
