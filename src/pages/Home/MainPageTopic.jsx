// import { Box, Typography } from "@mui/material";
// import { BLACK, CAPTIONLIGHTGRAY, GRAY } from "../../styles/Color.js";
// import { Link } from "react-router-dom";

// const MainPageTopic = ({ isLaptop, isMobile }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         ml: { xs: 0, md: 5 },
//       }}
//     >
//       {/* Main page Header */}
//       <Box>
//         <Typography
//           variant={isLaptop ? "h2" : isMobile ? "h5" : "h3"}
//           color={GRAY}
//           component={"div"}
//           sx={{
//             maxWidth: isLaptop ? 600 : isMobile ? 200 : 400,
//             wordWrap: "break-word",
//           }}
//         >
//           Find your next{" "}
//           <Typography
//             variant={isLaptop ? "h2" : isMobile ? "h5" : "h3"}
//             component={"span"}
//             color={BLACK}
//           >
//             perfect
//           </Typography>{" "}
//           product with ease
//         </Typography>
//       </Box>
//       {/* End of Main page header */}
//       <Box>
//         <Typography
//           color={CAPTIONLIGHTGRAY}
//           variant={isLaptop ? "body1" : "caption"}
//           component={"div"}
//           sx={{
//             wordWrap: "break-word",
//             mt: 1.5,
//           }}
//         >
//           Smart Trade Website will help you to find your{" "}
//           <Typography variant={"h6"} component={"span"} color={BLACK}>
//             products
//           </Typography>{" "}
//           fast,easy and comfortable.
//         </Typography>
//       </Box>

//       <Box>
//         <Typography
//           color={CAPTIONLIGHTGRAY}
//           variant={isLaptop ? "body1" : "caption"}
//           component={"div"}
//           sx={{
//             wordWrap: "break-word",
//           }}
//         >
//           Our expert support are always available.
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           mt: 1,
//         }}
//       >
//         <Link
//           style={{
//             fontSize: "1.5em",
//           }}
//           className="Link"
//           to="/search?category=estate"
//         >
//           Let's Start Now...
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default MainPageTopic;

import { Box, Typography, Button } from "@mui/material";
import { BLACK, GRAY } from "../../styles/Color.js";
import { Link as RouterLink } from "react-router-dom";

const MainPageTopic = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: { xs: 0, md: 5 },
        mr: { xs: 2, md: 0 },
        mt: { xs: 4, md: 0 },
        maxWidth: { xs: "100%", md: 600 },
        gap: 3,
      }}
    >
      {/* Main Heading */}
      <Typography
        variant="h2"
        // color={GRAY}
        component="h1"
        sx={{
          wordBreak: "break-word",
          fontSize: { xs: "1.8rem", md: "3rem" },
          lineHeight: 1.1,
          fontWeight: 600,
        }}
      >
        Find your next{" "}
        <Typography
          component="span"
          // color={BLACK}
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", md: "3rem" },
            lineHeight: 1.1,
          }}
        >
          perfect
        </Typography>{" "}
        product with ease
      </Typography>

      {/* Description paragraphs */}
      <Typography
        color="#6c757d"
        variant="body1"
        component="p"
        sx={{
          wordBreak: "break-word",
          fontSize: { xs: "1rem", md: "1.425rem" },
          lineHeight: 1.7,
          mb: 2,
          maxWidth: "100%",
        }}
      >
        Smart Trade Website will help you find your products fast, easy, and
        comfortable. Our expert support team is always available to assist you.
      </Typography>

      {/* Call to Action Button */}
      <Button
        component={RouterLink}
        to="/search?category=estate"
        variant="outlined"
        sx={{
          alignSelf: { xs: "center", md: "flex-start" },
          px: 6,
          py: 1.75,
          fontWeight: 700,
          fontSize: { xs: "1rem", md: "1.3rem" },
          borderRadius: 2,
          textTransform: "none",
          color: "primary.main",
          borderColor: "primary.main",
          backgroundColor: "transparent",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.1)", // subtle primary color background
            borderColor: "primary.main",
            boxShadow: "none",
          },
        }}
        aria-label="Start searching products"
      >
        Let's Start Now
      </Button>
    </Box>
  );
};

export default MainPageTopic;
