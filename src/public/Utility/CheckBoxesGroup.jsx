import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";
import { Box, FormLabel, Typography, Checkbox } from "@mui/material";
import { useState } from "react";

const CheckboxesGroup = ({
  name,
  items,
  checkedValues,
  handleCheckBoxValue,
  color,
}) => {
  const [showStorage, setShowStorage] = useState(false);

  const handleShowStorage = () => {
    setShowStorage(!showStorage);
  };

  const handleChecked = (event) => {
    handleCheckBoxValue((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.checked,
      };
    });
  };

  return (
    <>
      <Typography
        sx={{
          mt: 2,
          mb: 1,
          display: "block",
          mr: 0.5,
        }}
        component={"label"}
      >
        {name}
        {showStorage ? (
          <ArrowDropUpRounded
            color="error"
            sx={{
              verticalAlign: "middle",
            }}
            onClick={handleShowStorage}
          />
        ) : (
          <ArrowDropDownRounded
            color="info"
            sx={{
              verticalAlign: "middle",
            }}
            onClick={handleShowStorage}
          />
        )}
      </Typography>

      {showStorage && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr 1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gridTemplateRows: "1fr 1fr",
            // overflow: "auto",
            // height: 200,
          }}
        >
          {items.map((item, index) => {
            // console.log(typeof checkedValues[item.name]);
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  sx={{
                    flexBasis: 60,
                  }}
                >
                  {color
                    ? item.value
                    : item.value == 0.5
                    ? "512 MB"
                    : item.value == 1024
                    ? "1TB"
                    : `${item.value} GB`}
                </FormLabel>
                <Checkbox
                  name={item.name}
                  onChange={handleChecked}
                  checked={checkedValues[item.name]}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default CheckboxesGroup;
