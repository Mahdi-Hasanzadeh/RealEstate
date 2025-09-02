import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";

const ErrorUI = ({ error }) => {
  const message =
    error === "Listing Not Found"
      ? "The listing was not found or has been deleted."
      : error;

  return (
    <Box
      sx={{
        minHeight: "90dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#FFF9E6",
          color: "#B00020",
          borderRadius: 3,
          p: 3,
          mb: 4,
          width: "100%", // full width
          maxWidth: 450, // constrain max width
          boxSizing: "border-box", // ensure padding doesn't cause overflow
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          wordBreak: "break-word", // wrap long text
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 50, mb: 2 }} />

        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          {message}
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            bgcolor: "#B00020",
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#8A0018",
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorUI;
