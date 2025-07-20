import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorState = ({ error }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "error.main",
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1">{error}</Typography>
    </Box>
  );
};

export default ErrorState;
