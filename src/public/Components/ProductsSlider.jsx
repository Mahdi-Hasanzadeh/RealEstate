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
import { LIGHTGRAY } from "../../../COLOR";
import { useNavigate } from "react-router-dom";
import Loader from "../styleComponents/loader";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductsSlider = ({ loading, error, listings }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = listings.length;

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
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : error ? (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          {error}
        </h2>
      ) : (
        listings?.length > 0 &&
        error == null && (
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
              <Typography>{listings[activeStep].name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {listings.map((step, index) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      onClick={() => {
                        navigate(`/listing/${step?._id},estate`);
                      }}
                      sx={{
                        height: { sm: 450, md: 500 },
                        display: "block",
                        width: "100%",
                        overflow: "hidden",
                        objectFit: { xs: "fill", sm: "fill" },
                        objectPosition: "center",
                        cursor: "pointer",
                      }}
                      src={step.imageURLs[0]}
                      alt={step.name}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              style={{
                background: LIGHTGRAY,
                borderRadius: "5px",
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
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
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
        )
      )}
    </>
  );
};

export default ProductsSlider;
