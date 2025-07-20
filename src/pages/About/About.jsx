import { Container, Typography } from "@mui/material";
import styleModule from "../../styles/style.module.css";
import { GRAY } from "../../styles/Color.js";

const About = () => {
  return (
    <div className={styleModule.backgroundcolor}>
      <Container maxWidth={"lg"}>
        <Typography
          fontWeight={"bold"}
          fontSize={"24px"}
          variant="h6"
          sx={{ my: 5, ml: 1 }}
        >
          ABOUT SAMRT
          <Typography
            fontWeight={"bold"}
            fontSize={"24px"}
            variant="h6"
            component={"span"}
            color={GRAY}
          >
            TRADE
          </Typography>
        </Typography>
        <Typography
          sx={{
            whiteSpace: "wrap",
            wordBreak: "break-word",
          }}
          mb={2}
        >
          Welcome to{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            SmartTrade
          </span>
          , a modern platform designed to revolutionize the buying and selling
          of digital equipment and real estate. Our mission is to create a
          seamless, secure, and efficient experience for users, whether they are
          looking to list their products or explore new opportunities.
        </Typography>
        <Typography mb={2}>
          At{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            SmartTrade
          </span>
          , we pride ourselves on offering advanced features, including
          comprehensive listings, powerful search tools, and a user-friendly
          design. Whether you are a seller showcasing your products or a buyer
          searching for the perfect deal, we aim to make every transaction
          smooth and successful.
        </Typography>
        <Typography mb={2}>
          With a focus on innovation and reliability, our platform is built to
          cater to a diverse audience, from seasoned investors to first-time
          buyers. Security, transparency, and professionalism are the core
          values that drive everything we do.
        </Typography>
        <Typography mb={10}>
          Start exploring our listings and resources today. Discover the future
          of trading with{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            SmartTrade
          </span>
          , where your success is our priority.
        </Typography>
      </Container>
    </div>
  );
};
export default About;
