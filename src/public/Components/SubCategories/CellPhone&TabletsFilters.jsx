import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";
import { Box, Checkbox, FormLabel, Typography } from "@mui/material";
import { Suspense, lazy, useState } from "react";

//#region My Modules
const ComboBox = lazy(() => import("../../Utility/ComboBox.jsx"));
const CheckBoxesGroup = lazy(() => import("../../Utility/CheckBoxesGroup.jsx"));
//#endregion
const iphone = "iphone";
const samsung = "samsung";
const shiaomi = "shiaomi";
const allBrands = "all_brands";
//#region Constants
const BrandItems = [
  {
    name: "ALL BRANDS",
    value: allBrands,
  },
  {
    name: "IPHONE",
    value: iphone,
  },
  {
    name: "SAMSUNG",
    value: samsung,
  },
  {
    name: "SHIAOMI",
    value: shiaomi,
  },
];
// storage of mobiles in GB
const StorageValues = [
  {
    name: "mb512",
    value: 0.5,
  },
  {
    name: "gb1",
    value: 1,
  },
  {
    name: "gb2",
    value: 2,
  },
  {
    name: "gb3",
    value: 3,
  },
  {
    name: "gb4",
    value: 4,
  },
  {
    name: "gb5",
    value: 5,
  },
  {
    name: "gb6",
    value: 6,
  },
  {
    name: "gb8",
    value: 8,
  },
  {
    name: "gb10",
    value: 10,
  },
  {
    name: "gb12",
    value: 12,
  },
  {
    name: "gb13",
    value: 13,
  },
  {
    name: "gb16",
    value: 16,
  },
  {
    name: "gb20",
    value: 20,
  },
  {
    name: "gb32",
    value: 32,
  },

  {
    name: "gb64",
    value: 64,
  },
  {
    name: "gb128",
    value: 128,
  },
  {
    name: "gb256",
    value: 256,
  },
  {
    name: "gb512",
    value: 512,
  },

  {
    name: "gb640",
    value: 640,
  },
  {
    name: "tb1",
    value: 1024,
  },
];

const RAMValues = [
  {
    name: "mb512",
    value: 0.5,
  },
  {
    name: "gb1",
    value: 1,
  },
  {
    name: "gb2",
    value: 2,
  },
  {
    name: "gb3",
    value: 3,
  },
  {
    name: "gb4",
    value: 4,
  },
  {
    name: "gb5",
    value: 5,
  },
  {
    name: "gb6",
    value: 6,
  },
  {
    name: "gb8",
    value: 8,
  },
  {
    name: "gb10",
    value: 10,
  },
  {
    name: "gb12",
    value: 12,
  },
  {
    name: "gb16",
    value: 16,
  },
  {
    name: "gb18",
    value: 18,
  },
];

const ColorValues = [
  {
    name: "black",
    value: "BLACK",
  },
  {
    name: "white",
    value: "WHITE",
  },
  {
    name: "green",
    value: "GREEN",
  },
  {
    name: "red",
    value: "RED",
  },
  {
    name: "gray",
    value: "GRAY",
  },
  {
    name: "gold",
    value: "GOLD",
  },
  {
    name: "silver",
    value: "SILVER",
  },
  {
    name: "pink",
    value: "PINK",
  },
  {
    name: "blue",
    value: "BLUE",
  },
  {
    name: "yellow",
    value: "YELLOW",
  },
  {
    name: "brown",
    value: "BROWN",
  },
  {
    name: "purple",
    value: "PURPLE",
  },
];

//#endregion

const CellPhone_TabletsFilter = ({
  setCellPhoneBrand,
  setCheckedStorage,
  checkedStorage,
  checkedRAM,
  setCheckedRAM,
  checkedColor,
  setCheckedColor,
}) => {
  //#region Hooks

  const [brand, setBrand] = useState(allBrands);

  //#endregion

  //#region Methods

  const handleCellPhoneBrand = (event) => {
    setCellPhoneBrand(event.target.value);
    setBrand(event.target.value);
  };

  //#endregion

  return (
    <>
      {/* Brands */}
      <ComboBox
        name="Brand"
        value={brand}
        defaultValue={allBrands}
        handleValueMethod={handleCellPhoneBrand}
        items={BrandItems}
      />
      {/* End-Brands */}

      {/* Storage */}

      <Suspense>
        <CheckBoxesGroup
          name={"Storage"}
          items={StorageValues}
          handleCheckBoxValue={setCheckedStorage}
          checkedValues={checkedStorage}
        />
      </Suspense>

      {/* End-Storage */}

      {/* RAM */}
      <Suspense>
        <CheckBoxesGroup
          name={"RAM"}
          items={RAMValues}
          handleCheckBoxValue={setCheckedRAM}
          checkedValues={checkedRAM}
        />
      </Suspense>
      {/* End-RAM */}

      {/* Color */}
      <CheckBoxesGroup
        name={"COLOR"}
        items={ColorValues}
        handleCheckBoxValue={setCheckedColor}
        checkedValues={checkedColor}
        color={true}
      />
      {/* End-Color */}
    </>
  );
};

export default CellPhone_TabletsFilter;
