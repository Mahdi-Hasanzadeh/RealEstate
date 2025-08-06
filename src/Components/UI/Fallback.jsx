import { Box, CircularProgress, Typography } from "@mui/material";

const Fallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <CircularProgress size={48} thickness={4} />
      <Typography variant="h6" color="text.primary">
        Loading, please wait...
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Bringing your content in just a moment.
      </Typography>
    </Box>
  );
};

export default Fallback;
