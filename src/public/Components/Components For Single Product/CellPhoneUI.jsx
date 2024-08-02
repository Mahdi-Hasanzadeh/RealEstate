import { Box, Typography } from "@mui/material";
import { CellPhoneRAM, CellPhoneStorage } from "../../utility";
import RAMIcon from "../../assets/Cell Phone Icons/icons8-ram-64.png";
import StorageIcon from "@mui/icons-material/StorageRounded";
import {
  ColorLens,
  SdStorageRounded,
  TabletAndroid,
} from "@mui/icons-material";

const CellPhoneUI = ({ product }) => {
  const RAM = CellPhoneRAM.filter((item) => item.value == product?.RAM)[0];
  const Storage = CellPhoneStorage.filter(
    (item) => item.value == product?.storage
  )[0];
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Typography variant="h6">
          <TabletAndroid
            color="primary"
            sx={{
              verticalAlign: "middle",
            }}
          />{" "}
          Brand: {product?.brand.toUpperCase()}
        </Typography>
        <Typography variant="h6">
          <ColorLens
            color="primary"
            sx={{
              verticalAlign: "middle",
            }}
          />{" "}
          Color: {product?.color.toUpperCase()}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* <img src={RAMIcon} alt="RAM ICON" height="38" /> */}
          <SdStorageRounded
            color="primary"
            sx={{
              verticalAlign: "middle",
            }}
          />{" "}
          RAM: {RAM.name}
        </Typography>
        <Typography variant="h6">
          <StorageIcon
            color="primary"
            sx={{
              verticalAlign: "middle",
            }}
          />{" "}
          Storage: {Storage.name}
        </Typography>
      </Box>
    </>
  );
};

export default CellPhoneUI;
