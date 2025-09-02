import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LIGHTGRAY = "#f5f5f5";

const ItemCard = ({
  item,
  onDeleteClick,
  onEditClick,
  onViewClick,
  showEdit = false,
  showView = false,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 400,
        backgroundColor: LIGHTGRAY,
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" mb={1.5}>
          {item.name}
        </Typography>

        <Link
          to={`/listing/${item?._id},${item?.mainCategoryName},${
            item?.subCategoryName || null
          }`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            image={item.imageURLs[0]}
            alt={item.name}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Link>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}
        >
          {/* Delete always shows */}
          <IconButton
            size="small"
            onClick={() => onDeleteClick(item)}
            color="error"
            sx={{
              border: "1px solid",
              borderColor: "error.light",
              "&:hover": {
                bgcolor: "error.light",
                color: "error.contrastText",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          {/* Conditionally show Edit or View Product */}
          {showEdit && (
            <IconButton
              size="small"
              onClick={() => onEditClick(item)}
              color="primary"
              sx={{
                border: "1px solid",
                borderColor: "primary.light",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}

          {showView && (
            <IconButton
              size="small"
              onClick={() => {
                if (onViewClick) {
                  onViewClick(item);
                } else {
                  // fallback: navigate to listing page
                  navigate(
                    `/listing/${item?._id},${item?.mainCategoryName},${
                      item?.subCategoryName || null
                    }`
                  );
                }
              }}
              color="primary"
              sx={{
                border: "1px solid",
                borderColor: "primary.light",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ItemCard;
