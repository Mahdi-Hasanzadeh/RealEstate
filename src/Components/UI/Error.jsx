import { Box, Typography } from "@mui/material";

const ErrorUI = ({ error }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90dvh",
      }}
    >
      <Typography
        variant="h4"
        color="red"
        sx={{
          textAlign: "center",
        }}
      >
        {error}
      </Typography>
    </Box>
  );
};

export default ErrorUI;
