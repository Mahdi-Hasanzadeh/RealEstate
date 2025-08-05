import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorUI = ({ error }) => {
  return (
    <Box
      sx={{
        height: "90dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
        textAlign: "center",
        color: "error.main",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        {error}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 360 }}></Typography>
    </Box>
  );
};

export default ErrorUI;
