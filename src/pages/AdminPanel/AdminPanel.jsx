import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { PendingActions, CheckCircle, Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [pendingListings, setPendingListings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [approvedListings, setApprovedListings] = useState([]);
  const [approvedPage, setApprovedPage] = useState(1);
  const [approvedTotalPages, setApprovedTotalPages] = useState(0);

  const [rejectedListings, setRejectedListings] = useState([]);
  const [rejectedPage, setRejectedPage] = useState(1);
  const [rejectedTotalPages, setRejectedTotalPages] = useState(0);

  const [selectedListing, setSelectedListing] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingListing, setRejectingListing] = useState(null);

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("api/dashboard/listings/stats");
      setStats(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch stats");
    }
  };

  const fetchPendingListings = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get(
        `api/dashboard/listings/pending?page=${pageNumber}&limit=5`
      );
      setPendingListings(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch pending listings");
    }
  };

  const fetchApprovedListings = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get(
        `api/dashboard/listings/approved?page=${pageNumber}&limit=5`
      );
      setApprovedListings(res.data.data.items);
      setApprovedTotalPages(res.data.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch approved listings");
    }
  };

  const fetchRejectedListings = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get(
        `api/dashboard/listings/rejected?page=${pageNumber}&limit=5`
      );
      setRejectedListings(res.data.data.items);
      setRejectedTotalPages(res.data.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch rejected listings");
    }
  };

  const handleApprove = async (id, mainCategory, subCategory) => {
    try {
      const result = await axiosInstance.post(
        `api/dashboard/listings/approve`,
        {}, // no body needed
        {
          params: {
            id,
            mainCategory: mainCategory,
            subCategory: subCategory,
          },
        }
      );
      toast.success("Listing approved");
      setSelectedListing(null);
      fetchStats();
      fetchPendingListings(page);
    } catch {
      toast.error("Failed to approve listing");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Rejection reason is required");
      return;
    }
    try {
      await axiosInstance.post(
        `api/dashboard/listings/reject`,
        { reason: rejectReason }, // send reason in body
        {
          params: {
            id: rejectingListing._id,
            mainCategory: rejectingListing.mainCategoryName,
            subCategory: rejectingListing.subCategoryName,
          },
        }
      );
      toast.success("Listing rejected");
      setRejectDialogOpen(false);
      setSelectedListing(null);
      fetchStats();
      fetchPendingListings(page);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject listing");
    }
  };

  const handleShowDetails = (id, mainCategoryName, subCategoryName) => {
    console.log("admin");
    navigate(`/admin/listing/${id},${mainCategoryName},${subCategoryName}`);
  };

  useEffect(() => {
    fetchStats();
    fetchPendingListings(page);
  }, [page]);

  useEffect(() => {
    fetchApprovedListings(approvedPage);
  }, [approvedPage]);

  useEffect(() => {
    fetchRejectedListings(rejectedPage);
  }, [rejectedPage]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          background: "linear-gradient(90deg,#1a237e 0%,#534bae 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Admin Panel
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: "Pending",
            value: stats.pending,
            icon: <PendingActions />,
            color: "#F59E0B",
          },
          {
            title: "Approved",
            value: stats.approved,
            icon: <CheckCircle />,
            color: "#10B981",
          },
          {
            title: "Rejected",
            value: stats.rejected,
            icon: <Cancel />,
            color: "#EF4444",
          },
        ].map((card, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Card
              sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ bgcolor: `${card.color}22`, color: card.color, mr: 2 }}
                >
                  {card.icon}
                </Avatar>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pending Listings Table */}
      <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <CardHeader title="Pending Listings" />
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub Category</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingListings.map((listing) => (
                  <TableRow
                    key={listing._id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSelectedListing(listing)}
                  >
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.mainCategoryName}</TableCell>
                    <TableCell>{listing.subCategoryName ?? "-"}</TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {totalPages == 0 ? (
              <Typography>No Listings Exist</Typography>
            ) : (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Approved Listings Table */}

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          mt: 4,
        }}
      >
        <CardHeader title="Approved Listings" />
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub Category</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedListings.map((listing) => (
                  <TableRow key={listing._id} hover sx={{ cursor: "pointer" }}>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.mainCategoryName}</TableCell>
                    <TableCell>{listing.subCategoryName ?? "-"}</TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {approvedTotalPages === 0 ? (
              <Typography>No Listings Exist</Typography>
            ) : (
              <Pagination
                count={approvedTotalPages}
                page={approvedPage}
                onChange={(_, value) => setApprovedPage(value)}
                color="primary"
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Rejected Listings Table */}

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          mt: 4,
        }}
      >
        <CardHeader title="Rejected Listings" />
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sub Category</TableCell>
                  <TableCell>Rejected Reason</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rejectedListings.map((listing) => (
                  <TableRow key={listing._id} hover sx={{ cursor: "pointer" }}>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.mainCategoryName}</TableCell>
                    <TableCell>{listing.subCategoryName ?? "-"}</TableCell>
                    <TableCell>{listing.RejectedReason ?? "-"}</TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {rejectedTotalPages === 0 ? (
              <Typography>No Listings Exist</Typography>
            ) : (
              <Pagination
                count={rejectedTotalPages}
                page={rejectedPage}
                onChange={(_, value) => setRejectedPage(value)}
                color="primary"
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Listing Details Dialog */}
      <Dialog
        open={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Listing Details</DialogTitle>
        <DialogContent dividers>
          {selectedListing && (
            <>
              <Typography variant="h6">{selectedListing.name}</Typography>
              <Typography color="text.secondary">
                Category: {selectedListing.mainCategoryName}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedListing && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  handleShowDetails(
                    selectedListing._id,
                    selectedListing.mainCategoryName,
                    selectedListing.subCategoryName
                  )
                }
              >
                Show Details
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  handleApprove(
                    selectedListing._id,
                    selectedListing.mainCategoryName,
                    selectedListing.subCategoryName
                  )
                }
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setSelectedListing(null); // CLOSE the details dialog
                  setRejectingListing(selectedListing);
                  setRejectReason(""); // reset previous reason
                  setRejectDialogOpen(true);
                }}
              >
                Reject
              </Button>
            </>
          )}
          <Button onClick={() => setSelectedListing(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Listing</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this listing:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter rejection reason"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleReject}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
