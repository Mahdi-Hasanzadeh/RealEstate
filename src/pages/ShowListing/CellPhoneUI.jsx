// import { Box, Typography } from "@mui/material";
// import { CellPhoneRAM, CellPhoneStorage } from "../../utils/utility.js";
// // import RAMIcon from "../../public/assets/Cell Phone Icons/icons8-ram-64.png";
// import StorageIcon from "@mui/icons-material/StorageRounded";
// import {
//   ColorLens,
//   SdStorageRounded,
//   TabletAndroid,
// } from "@mui/icons-material";

// const CellPhoneUI = ({ product }) => {
//   const RAM = CellPhoneRAM.filter((item) => item.value == product?.RAM)[0];
//   const Storage = CellPhoneStorage.filter(
//     (item) => item.value == product?.storage
//   )[0];
//   return (
//     <>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
//           gap: 2,
//         }}
//       >
//         <Typography variant="h6">
//           <TabletAndroid
//             color="primary"
//             sx={{
//               verticalAlign: "middle",
//             }}
//           />{" "}
//           Brand: {product?.brand.toUpperCase()}
//         </Typography>
//         <Typography variant="h6">
//           <ColorLens
//             color="primary"
//             sx={{
//               verticalAlign: "middle",
//             }}
//           />{" "}
//           Color: {product?.color.toUpperCase()}
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           {/* <img src={RAMIcon} alt="RAM ICON" height="38" /> */}
//           <SdStorageRounded
//             color="primary"
//             sx={{
//               verticalAlign: "middle",
//             }}
//           />{" "}
//           RAM: {RAM.name}
//         </Typography>
//         <Typography variant="h6">
//           <StorageIcon
//             color="primary"
//             sx={{
//               verticalAlign: "middle",
//             }}
//           />{" "}
//           Storage: {Storage.name}
//         </Typography>
//       </Box>
//     </>
//   );
// };

// export default CellPhoneUI;

import { Box, Stack, Typography } from "@mui/material";
import {
  ColorLens,
  SdStorageRounded,
  StorageRounded,
  TabletAndroid,
} from "@mui/icons-material";
import { CellPhoneRAM, CellPhoneStorage } from "../../utils/utility.js";

const CellPhoneUI = ({ product }) => {
  const RAM = CellPhoneRAM.find((item) => item.value == product?.RAM);
  const Storage = CellPhoneStorage.find(
    (item) => item.value == product?.storage
  );

  const features = [
    {
      icon: <TabletAndroid fontSize="large" color="success" />,
      label: `Brand: ${product?.brand?.toUpperCase()}`,
    },
    {
      icon: <ColorLens fontSize="large" color="success" />,
      label: `Color: ${product?.color?.toUpperCase()}`,
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
              bgcolor: "#d4edda", // Slightly darker green background on hover
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)", // Optional: slight lift on hover
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

export default CellPhoneUI;
