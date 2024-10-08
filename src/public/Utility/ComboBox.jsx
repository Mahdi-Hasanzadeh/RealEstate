import { Box, MenuItem, Select, Typography } from "@mui/material";

const ComboBox = ({ name, defaultValue, value, handleValueMethod, items }) => {
  return (
    <>
      <Typography mt={2} mb={1} component={"label"} display={"block"} mr={0.5}>
        {name}:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 1.5,
          justifyContent: "flex-start",
        }}
      >
        <Select
          name={name}
          defaultValue={defaultValue}
          value={value}
          size="small"
          fullWidth
          onChange={handleValueMethod}
        >
          {items.map((item, index) => {
            return (
              <MenuItem disabled={item.disabled} key={index} value={item.value}>
                {item.name.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export default ComboBox;
