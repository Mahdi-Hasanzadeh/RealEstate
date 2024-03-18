import { LocationCityRounded } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BLACK, CAPTIONLIGHTGRAY } from "../../COLOR";
import Image from "../../assets/house1.jpg";
const CardItem = () => {
  const description =
    " Lorem, ipsum dolor sit amet consectetur adipisicing elit.Laborum veniam vero eum accusamus deserunt aspernatur corporis, incidunt saepe! Aliquid ullam modi exercitationem sint quampossimus adipisci, repudiandae officia. Quia ipsum quas";

  return (
    <>
      <Link to="/search" className="cardLink">
        <Card
          sx={{
            maxWidth: 345,
          }}
        >
          <CardMedia
            component={"img"}
            alt="image"
            height={145}
            // image={require("../../assets/house5.png")}
            image={Image}
          />
          <CardContent>
            <Typography variant="h5" component={"div"}>
              {" "}
              Tranquil Lakeside Retreat
            </Typography>
            <Typography
              variant="caption"
              fontSize={15}
              color={CAPTIONLIGHTGRAY}
              display={"flex"}
              alignItems={"center"}
            >
              <LocationCityRounded color="success" /> Herat, Esmail khan street
            </Typography>
            <Typography variant="body1" fontSize={"15"} component={"div"}>
              {description.substring(0, 90)}...
            </Typography>

            <Typography variant="h6" color={BLACK}>
              500$
            </Typography>
            <Box display={"flex"} justifyContent={"flex-start"} gap={2}>
              <Typography variant="body2" color={BLACK}>
                2 Beds
              </Typography>
              <Typography variant="body2" color={BLACK}>
                4 Baths
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CardItem;
