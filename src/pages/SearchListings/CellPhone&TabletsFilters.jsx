import { Suspense, lazy, useState } from "react";
import {
  allBrands,
  CellPhoneBrands,
  ColorValues,
  RAMValues,
  StorageValues,
} from "../../utils/utility.js";

//#region My Modules

const ComboBox = lazy(() => import("./ComboBox.jsx"));
const CheckBoxesGroup = lazy(() => import("./CheckBoxesGroup.jsx"));

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
        items={CellPhoneBrands}
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
