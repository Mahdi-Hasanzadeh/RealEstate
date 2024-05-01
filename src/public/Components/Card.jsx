import { LocationOnRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BLACK } from "../../../COLOR";
import { formatDistanceToNow } from "date-fns";

const CardItem = ({ listing, transition, delay }) => {
  console.log("delay: ", delay);
  return (
    <>
      <Zoom
        in={transition || true}
        style={{
          transitionDelay: transition ? `${delay ? delay : 500}ms` : "0ms",
        }}
        mountOnEnter
        unmountOnExit
      >
        <Link to={`/listing/${listing?._id}`} className="cardLink">
          <Card
            sx={{
              minWidth: 245,
              width: 280,
              height: 400,
              maxWidth: 345,
              py: 2,
            }}
            className="cardHover"
          >
            <CardMedia
              component={"img"}
              alt={listing?.name}
              height={145}
              srcSet={listing?.imageURLs[0]}
              sx={{
                borderRadius: 2,
              }}
              className="cardImage"
            />
            <CardContent>
              <Typography variant="h5" component={"div"}>
                {listing?.name.substring(0, 20)}{" "}
                {listing?.name.length > 20 ? "..." : null}
              </Typography>
              <Typography
                variant="caption"
                fontSize={15}
                color={BLACK}
                display={"flex"}
                alignItems={"center"}
                mb={1}
              >
                <LocationOnRounded fontSize="small" color="info" />{" "}
                {listing?.address}
              </Typography>
              <Typography
                variant="body1"
                whiteSpace={"wrap"}
                height={"5rem"}
                fontSize={"15"}
                component={"div"}
              >
                {listing?.description.substring(0, 90)}
                {listing?.description.length > 90 ? "..." : null}
              </Typography>
              <Typography variant="h6" color={BLACK}>
                {listing?.regularPrice}AFG{" "}
                {listing?.type === "rent" ? "/month" : null}
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                mt={1}
                gap={2}
              >
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
      </Zoom>
    </>
  );
};

export default CardItem;
