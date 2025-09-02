import { Container, Typography, Box } from "@mui/material";
import styleModule from "../../styles/style.module.css";
import { GRAY } from "../../styles/Color.js";

const About = () => {
  return (
    <Box className={styleModule.backgroundcolor} py={6}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          About{" "}
          <Typography
            component="span"
            variant="h4"
            fontWeight="bold"
            color={GRAY}
          >
            SmartTrade
          </Typography>
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Welcome to{" "}
          <Typography component="span" fontWeight="bold" color="text.primary">
            SmartTrade
          </Typography>
          , a modern platform designed to revolutionize the buying and selling
          of digital equipment and real estate. Our mission is to create a
          seamless, secure, and efficient experience for users—whether you're
          listing your products or exploring new opportunities.
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          At{" "}
          <Typography component="span" fontWeight="bold" color="text.primary">
            SmartTrade
          </Typography>
          , we take pride in delivering powerful features: advanced listings,
          real-time search tools, and a modern, intuitive user interface.
          Whether you're a seller or a buyer, our platform makes every
          transaction smooth, reliable, and fast.
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Built with innovation in mind, our system serves a diverse range of
          users— from professional investors to first-time buyers. With a strong
          focus on transparency and security, we ensure you trade with
          confidence and ease.
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={6}>
          Start exploring today and discover the future of online trading with{" "}
          <Typography component="span" fontWeight="bold" color="text.primary">
            SmartTrade
          </Typography>
          . Your success is our priority.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
