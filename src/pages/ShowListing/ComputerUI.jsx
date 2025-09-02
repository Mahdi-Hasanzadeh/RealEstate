import { Box, Stack, Typography } from "@mui/material";
import {
  SdStorageRounded,
  StorageRounded,
  LaptopMac,
} from "@mui/icons-material";
import {
  ComputerRAMOptions,
  ComputerStorageOptions,
} from "../../utils/utility.js";

const ComputerUI = ({ product }) => {
  const RAM = ComputerRAMOptions.find((item) => item.value == product?.RAM);
  const Storage = ComputerStorageOptions.find(
    (item) => item.value == product?.storage
  );

  const features = [
    {
      icon: <LaptopMac fontSize="large" color="success" />,
      label: `Brand: ${product?.brand?.toUpperCase()}`,
    },
    {
      icon: <SdStorageRounded fontSize="large" color="success" />,
      label: `RAM: ${RAM?.name || "N/A"}`,
    },
    {
      icon: <StorageRounded fontSize="large" color="success" />,
      label: `Storage: ${Storage?.name || "N/A"}`,
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      flexWrap="wrap"
      justifyContent="flex-start"
      mb={3}
    >
      {features.map(({ icon, label }, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#e6f4ea",
            p: 1.5,
            borderRadius: 2,
            minWidth: 160,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            cursor: "pointer",
            transition:
              "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            "&:hover": {
              bgcolor: "#d4edda",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {icon}
          <Typography fontWeight="600" variant="body1" color="success.main">
            {label}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default ComputerUI;
