import { LocationCityRounded } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BLACK, CAPTIONLIGHTGRAY } from "../../COLOR";
import { formatDistanceToNow } from "date-fns";

const CardItem = ({ listing }) => {
  return (
    <>
      <Link to={`/listing/${listing?._id}`} className="cardLink">
        <Card
          sx={{
            minWidth: 245,
            maxWidth: 345,
          }}
        >
          <CardMedia
            component={"img"}
            alt={listing?.name}
            height={145}
            srcSet={listing?.imageURLs[0]}
          />
          <CardContent>
            <Typography variant="h5" component={"div"}>
              {listing?.name}
            </Typography>
            <Typography
              variant="caption"
              fontSize={15}
              color={CAPTIONLIGHTGRAY}
              display={"flex"}
              alignItems={"center"}
            >
              <LocationCityRounded color="success" /> {listing?.address}
            </Typography>
            <Typography variant="body1" fontSize={"15"} component={"div"}>
              {listing?.description.substring(0, 90)}...
            </Typography>
            <Typography variant="h6" color={BLACK}>
              {listing?.regularPrice}AFG{" "}
              {listing?.type === "rent" ? "/month" : null}
            </Typography>

            <Box display={"flex"} justifyContent={"flex-start"} mt={1} gap={2}>
              <Typography variant="body2" color={BLACK}>
                {listing?.bedrooms} Bed{listing?.bedrooms !== 1 ? "s" : ""}
              </Typography>
              <Typography variant="body2" color={BLACK}>
                {listing?.bath} Bath{listing?.bath !== 1 ? "s" : ""}
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body2" color={BLACK}>
                {/* {listing?.createdAt.toString()} */}
                {listing?.createdAt &&
                  formatDistanceToNow(new Date(listing?.createdAt))}{" "}
                ago
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CardItem;
