import { Suspense, lazy, useState } from "react";
import {
  allBrands,
  ComputerBrands,
  ComputerStorageValues,
  ComputerRAMValues,
} from "../../utils/utility.js";

//#region My Modules
const ComboBox = lazy(() => import("./ComboBox.jsx"));
const CheckBoxesGroup = lazy(() => import("./CheckBoxesGroup.jsx"));
//#endregion

const ComputerFilter = ({
  setComputerBrand,
  setCheckedStorage,
  checkedStorage,
  setCheckedRAM,
  checkedRAM,
}) => {
  //#region Hooks
  const [brand, setBrand] = useState(allBrands);
  //#endregion

  //#region Methods
  const handleComputerBrand = (event) => {
    setComputerBrand(event.target.value);
    setBrand(event.target.value);
  };
  //#endregion

  return (
    <>
      {/* Brands */}
      <ComboBox
        name="Brand"
        label="Brand"
        value={brand}
        defaultValue={allBrands}
        handleValueMethod={handleComputerBrand}
        items={ComputerBrands}
      />
      {/* End-Brands */}

      {/* Storage */}
      <Suspense>
        <CheckBoxesGroup
          name="Storage"
          items={ComputerStorageValues}
          handleCheckBoxValue={setCheckedStorage}
          checkedValues={checkedStorage}
        />
      </Suspense>
      {/* End-Storage */}

      {/* RAM */}
      <Suspense>
        <CheckBoxesGroup
          name="RAM"
          items={ComputerRAMValues}
          handleCheckBoxValue={setCheckedRAM}
          checkedValues={checkedRAM}
        />
      </Suspense>
      {/* End-RAM */}
    </>
  );
};

export default ComputerFilter;
