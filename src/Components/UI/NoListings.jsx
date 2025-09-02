import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoListingsUI = ({ message }) => {
  const displayMessage =
    message ||
    "We couldn't find any listings that match your search or filters. Try adjusting your filters or search term.";

  return (
    <Box
      sx={{
        height: "90dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
        mx: "auto",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#E8F0FE",
          color: "#1A73E8",
          borderRadius: 3,
          p: { xs: 2, sm: 4 }, // smaller padding on small screens
          mb: 4,
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          wordBreak: "break-word", // ensures long text wraps
        }}
      >
        <SearchOffIcon sx={{ fontSize: 60, mb: 2 }} />

        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          No Listings Found
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          {displayMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoListingsUI;
