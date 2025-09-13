import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const LIGHTGRAY = "#f5f5f5";

const ItemCard = ({
  item,
  onDeleteClick,
  onEditClick,
  onViewClick,
  showEdit = false,
  showView = false,
  showStatus = false, // 👈 new prop
}) => {
  const navigate = useNavigate();
  const [openReason, setOpenReason] = useState(false);

  const renderStatusChip = () => {
    if (!showStatus) return null;

    if (item.isRejected) {
      return (
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            icon={<CancelIcon />}
            label="Rejected"
            size="small"
            sx={{
              fontWeight: "bold",
              bgcolor: "#fdecea",
              color: "#d32f2f",
              "& .MuiChip-icon": {
                color: "#d32f2f",
              },
            }}
          />
          <IconButton
            size="small"
            color="error"
            onClick={() => setOpenReason(true)}
            sx={{
              border: "1px solid",
              borderColor: "error.light",
              "&:hover": {
                bgcolor: "error.light",
                color: "error.contrastText",
              },
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      );
    }

    if (item.isApproved) {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Approved"
          size="small"
          sx={{
            mt: 1,
            fontWeight: "bold",
            bgcolor: "#e8f5e9",
            color: "#2e7d32",
            "& .MuiChip-icon": {
              color: "#2e7d32",
            },
          }}
        />
      );
    }

    return (
      <Chip
        icon={<AccessTimeIcon />}
        label="Pending"
        size="small"
        sx={{
          mt: 1,
          fontWeight: "bold",
          bgcolor: "#fff4e5",
          color: "#ed6c02",
          "& .MuiChip-icon": {
            color: "#ed6c02",
          },
        }}
      />
    );
  };

  return (
    <>
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

          {/* Image */}
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

          {/* 👇 status badge */}
          {renderStatusChip()}

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              justifyContent: "center",
            }}
          >
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

      {/* Dialog for rejection reason */}
      <Dialog
        open={openReason}
        onClose={() => setOpenReason(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rejection Reason</DialogTitle>
        <DialogContent>
          <Typography>
            {item.RejectedReason || "No reason provided."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReason(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemCard;
