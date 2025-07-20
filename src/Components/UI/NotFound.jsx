import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NotFound = ({
  message = "Not Found",
  description = "We couldn't find what you're looking for.",
  icon = <SearchOffIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />,
}) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      {icon}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default NotFound;
