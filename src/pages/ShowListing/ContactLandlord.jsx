import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { URL } from "../../config/PortConfig";
import axiosInstance from "../../config/axiosConfig";

const afghanistanCodeNumber = "+93";
const userAgent = navigator.userAgent.toLowerCase();

const ContactLandlord = ({ userRef, name, isSmall }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const isMobile = /mobile/.test(userAgent);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL}api/user/userInfo/${userRef}`
        );
        setUserInfo(response.data);
      } catch (err) {
        setError(err.message || "Failed to load user info");
      }
    };
    fetchUserInfo();
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        maxWidth: 700,
        mx: "auto",
        bgcolor: "#f5f5f5",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: error || !userInfo ? "center" : "flex-start",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {error ? (
        <Typography
          variant="h6"
          color="error"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {error}
        </Typography>
      ) : !userInfo ? (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Loading contact info...
          </Typography>
          {/* Optional: You can add a small spinner here */}
        </>
      ) : (
        <>
          {/* Mobile Number & Call Button */}
          {userInfo.mobileNumber && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%", mb: 3 }}
            >
              <Typography variant="subtitle1" fontWeight="600" noWrap>
                Mobile Number: {afghanistanCodeNumber}-
                {userInfo.mobileNumber.slice(1)}
              </Typography>

              <Button
                component="a"
                href={`tel:+93${userInfo.mobileNumber.slice(1)}`}
                variant="contained"
                color="success"
                size={isSmall ? "small" : "medium"}
                sx={{ whiteSpace: "nowrap" }}
              >
                Call
              </Button>
            </Stack>
          )}

          {/* Contact Intro */}
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "text.primary",
              fontWeight: 500,
              width: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Contact{" "}
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {userInfo.username}
            </Box>{" "}
            regarding{" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {name || ""}
            </Box>
            .
          </Typography>

          {/* Message Input */}
          <TextField
            variant="outlined"
            multiline
            rows={7}
            placeholder="Enter your message here..."
            value={message}
            onChange={handleMessageChange}
            fullWidth
            size={isSmall ? "small" : "medium"}
            sx={{
              mb: 4,
              maxWidth: isSmall ? "100%" : 700,
              mx: "auto",
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                padding: "14px 16px",
                minHeight: 140,
                borderRadius: 2,
                backgroundColor: "#fafafa",
              },
            }}
          />

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            {isMobile && (
              <Button
                component="a"
                href={`sms:${afghanistanCodeNumber}${userInfo.mobileNumber.slice(
                  1
                )}?&body=${encodeURIComponent(message)}`}
                variant="contained"
                color="success"
                fullWidth={isSmall}
                size={isSmall ? "small" : "medium"}
                sx={{ flexGrow: isSmall ? 1 : 0 }}
              >
                Send Message via SMS
              </Button>
            )}

            <Button
              component="a"
              href={`mailto:${userInfo.email}?subject=${encodeURIComponent(
                `Regarding ${name}`
              )}&body=${encodeURIComponent(message)}`}
              variant="contained"
              color="success"
              fullWidth={!isSmall}
              size={isSmall ? "small" : "medium"}
              sx={{ flexGrow: 1 }}
            >
              Send Message via E-mail
            </Button>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default ContactLandlord;
