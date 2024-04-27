import { Typography, TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../PortConfig";
import { Link } from "react-router-dom";

const afghanistanCodeNumber = "+93";

const ContactUser = ({ userRef, name, isSmall }) => {
  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const fetchUserInfo = async () => {
    try {
      const user = await axios.get(`${URL}api/user/userInfo/${userRef}`, {
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
          {userInfo?.mobileNumber && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 1,
                alignItems: "center",
                mb: 2,
                justifyContent: { xs: "center", sm: "normal" },
              }}
            >
              <Typography
                variant="body1"
                fontWeight={"bold"}
                fontSize={"1.1em"}
              >
                Mobile Number: {afghanistanCodeNumber}-
                {userInfo?.mobileNumber.slice(1)}
              </Typography>
              <Link to={`tel:+93${userInfo?.mobileNumber.slice(1)}`}>
                <Button size={"small"} variant="contained" color="success">
                  Call
                </Button>
              </Link>
            </Box>
          )}

          <Typography
            sx={{
              textAlign: "justify",
              fontSize: "1.1em",
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
            rows={5}
            placeholder="Enter your message here..."
            sx={{
              width: isSmall ? "100%" : "50%",
              mt: 0.3,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
            }}
          >
            <Box>
              <Link
                to={`sms:${afghanistanCodeNumber}${userInfo?.mobileNumber.slice(
                  1
                )}?&body=${message}`}
              >
                <Button
                  size={isSmall ? "small" : "medium"}
                  variant="contained"
                  color="success"
                  sx={{
                    width: isSmall ? "100%" : "100%",
                  }}
                >
                  Send Message via SMS
                </Button>
              </Link>
            </Box>

            <Box>
              <Link
                to={`mailto:${userInfo?.email}?subject=Regarding ${name}&body=${message}`}
              >
                <Button
                  fullWidth
                  size={isSmall ? "small" : "medium"}
                  variant="contained"
                  color="success"
                  sx={{
                    width: isSmall ? "100%" : "100%",
                  }}
                >
                  Send Message via E-mail
                </Button>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ContactUser;
