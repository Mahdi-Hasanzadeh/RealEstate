// const SearchSection = () => {
//   return (
//     <>
//       <Grid
//         sx={{
//           padding: 2,
//           borderRight: "1px solid gray",
//           minHeight: "91.2vh",
//           overflowY: "hidden",
//         }}
//         item
//         xs={12}
//         md={3}
//       >
//         {/* Search input */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Typography component={"label"}>Search:</Typography>
//           <TextField
//             variant="outlined"
//             size="small"
//             name="searchTerm"
//             value={formData.searchTerm}
//             onChange={handleFormData}
//           >
//             Search
//           </TextField>
//         </Box>
//         {/* Type of the property */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             flexWrap: "wrap",
//             flexDirection: { xs: "column", sm: "row" },
//             alignItems: "center",
//             mb: 1.5,
//           }}
//         >
//           <Typography component={"label"} mr={0.5}>
//             Type:
//           </Typography>
//           <FormControlLabel
//             value={"all"}
//             label="Rent & Sell"
//             labelPlacement="end"
//             name="type"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData.type === "all"}
//               />
//             }
//           />
//           <FormControlLabel
//             value={"rent"}
//             label="Rent"
//             labelPlacement="end"
//             name="type"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData.type === "rent"}
//               />
//             }
//           />
//           <FormControlLabel
//             value={"sell"}
//             label="Sell"
//             labelPlacement="end"
//             name="type"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData.type === "sell"}
//               />
//             }
//           />
//         </Box>
//         {/* Offer checkbox */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             flexWrap: "wrap",
//             flexDirection: { xs: "column", sm: "row" },
//             alignItems: "center",
//             mb: 1.5,
//           }}
//         >
//           <Typography component={"label"} mr={0.5}>
//             Offer:
//           </Typography>

//           <FormControlLabel
//             value={formData.offer}
//             label="Offer"
//             labelPlacement="end"
//             name="offer"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData?.offer ? true : false}
//               />
//             }
//           />
//         </Box>
//         {/* Amenties section */}
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             flexDirection: { xs: "column", sm: "row" },
//             alignItems: "center",
//             mb: 1.5,
//             justifyContent: "flex-start",
//           }}
//         >
//           <Typography component={"label"} mr={0.5}>
//             Amenties:
//           </Typography>

//           <FormControlLabel
//             value={formData.parking}
//             label="Parking"
//             labelPlacement="end"
//             name="parking"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData.parking}
//               />
//             }
//           />

//           <FormControlLabel
//             value={formData.furnished}
//             label="furnished"
//             labelPlacement="end"
//             name="furnished"
//             onChange={handleFormData}
//             control={
//               <Checkbox
//                 size={md ? "small" : "medium"}
//                 checked={formData.furnished}
//               />
//             }
//           />
//         </Box>
//         {/* sort section */}
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             flexDirection: { xs: "column", sm: "row" },
//             alignItems: "center",
//             mb: 1.5,
//             justifyContent: "flex-start",
//           }}
//         >
//           <Typography component={"label"} mr={0.5}>
//             Sort:
//           </Typography>
//           <Select
//             id="demo-simple-select"
//             name="sort_order"
//             defaultValue={orderValues[0].value}
//             size="small"
//             fullWidth
//             onChange={handleFormData}
//           >
//             {orderValues.map((item) => {
//               return <MenuItem value={item.value}>{item.name}</MenuItem>;
//             })}
//           </Select>
//         </Box>
//         <Box>
//           <Button onClick={handleSearch} fullWidth variant="contained">
//             Search
//           </Button>
//         </Box>
//       </Grid>
//     </>
//   );
// };

// export default SearchSection;
