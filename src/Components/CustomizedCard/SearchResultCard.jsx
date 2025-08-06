import { LocationOnRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BLACK } from "../../styles/Color";
import { formatDistanceToNow } from "date-fns";

const SearchResultCard = ({ listing, transition, delay }) => {
  return (
    <Zoom
      in={transition || true}
      style={{
        transitionDelay: transition ? `${delay || 500}ms` : "0ms",
      }}
      mountOnEnter
      unmountOnExit
    >
      <Link
        to={`/listing/${listing?._id},${listing?.mainCategoryName},${
          listing?.subCategoryName || "unknown"
        }`}
        className="cardLink"
        style={{ textDecoration: "none" }}
      >
        <Card
          className="color"
          sx={{
            width: 280,
            height: 420,
            maxWidth: 345,
            p: 2,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transition: "0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={listing?.imageURLs[0]}
            alt={listing?.name}
            sx={{
              borderRadius: 2,
              objectFit: "cover",
              mb: 2,
            }}
            className="cardImage"
          />

          <CardContent sx={{ flex: 1, p: 0 }}>
            {/* Title */}
            <Typography variant="h6" noWrap fontWeight={600} gutterBottom>
              {listing?.name}
            </Typography>

            {/* Address */}
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              alignItems="center"
              noWrap
              mb={1}
            >
              <LocationOnRounded
                fontSize="small"
                color="info"
                sx={{ mr: 0.5 }}
              />
              {listing?.address}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 2,
                minHeight: "3.5rem",
              }}
            >
              {listing?.description || "No description available."}
            </Typography>

            {/* Price + Offer Badge */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              mb={1}
            >
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                {/* Offer Badge with Tooltip */}
                {listing?.offer && (
                  <Tooltip title="Limited-time offer!" arrow>
                    <Chip
                      label="Offer"
                      color="info"
                      size="small"
                      sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                    />
                  </Tooltip>
                )}

                {/* Discounted Price with Tooltip */}
                {listing?.offer && (
                  <Tooltip title="Discounted Price" arrow>
                    <Typography
                      variant="h6"
                      color="success.main"
                      fontWeight={600}
                    >
                      {listing.discountPrice} AFG{" "}
                    </Typography>
                  </Tooltip>
                )}

                {/* Regular Price with Tooltip (strikethrough if there's a discount) */}
                <Tooltip
                  title={listing?.offer ? "Original Price" : "Price"}
                  arrow
                >
                  <Typography
                    variant="body1"
                    color={listing?.offer ? "text.secondary" : "text.primary"}
                    sx={{
                      textDecoration: listing?.offer ? "line-through" : "none",
                      fontWeight: listing?.offer ? 500 : 600,
                      fontSize: listing?.offer ? "0.875rem" : "1.125rem",
                    }}
                  >
                    {listing.regularPrice} AFG{" "}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            {/* Beds / Baths */}
            <Box display="flex" gap={2} mb={1}>
              <Typography variant="body2" color="text.primary">
                {listing?.bedrooms} Bed{listing?.bedrooms !== 1 ? "s" : ""}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {listing?.bath} Bath{listing?.bath !== 1 ? "s" : ""}
              </Typography>
            </Box>

            {/* Posted Time */}
            <Typography variant="caption" color="text.secondary">
              {listing?.createdAt &&
                `${formatDistanceToNow(new Date(listing?.createdAt))} ago`}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Zoom>
  );
};

export default SearchResultCard;
