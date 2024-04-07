import { Typography, TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { localURL } from "../../PortConfig";
import { Link } from "react-router-dom";
const ContactUser = ({ userRef, name, isSmall }) => {
  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const fetchUserInfo = async () => {
    try {
      const user = await axios.get(`${localURL}api/user/userInfo/${userRef}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUserInfo(user.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Typography
            sx={{
              textAlign: "justify",
            }}
            variant="body1"
          >
            Contact{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {userInfo?.username}
            </span>{" "}
            for
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {" "}
              {name || ""}
            </span>{" "}
          </Typography>

          <TextField
            name="message"
            value={message}
            onChange={handleMessage}
            variant="outlined"
            size="small"
            multiline
            rows={4}
            placeholder="Enter your message here..."
            sx={{
              width: isSmall ? "100%" : "50%",
              mt: 0.3,
            }}
          />
          <Box>
            <Link
              to={`mailto:${userInfo?.email}?subject=Regarding ${name}&body=${message}`}
            >
              <Button
                size={isSmall ? "small" : "medium"}
                variant="contained"
                sx={{
                  backgroundColor: "GrayText",
                  width: isSmall ? "100%" : "50%",
                  mt: 3,
                }}
              >
                Send Message
              </Button>
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactUser;
