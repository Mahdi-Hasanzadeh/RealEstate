import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Typography variant="h4" color={"red"} textAlign={"center"}>
        No result found
      </Typography>
    </Box>
  );
};
export default NotFound;
