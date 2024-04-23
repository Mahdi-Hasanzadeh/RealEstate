import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../PortConfig";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { LIGHTGRAY } from "../../COLOR";
import { Link, useNavigate } from "react-router-dom";

const UserListings = () => {
  const currentUser = useSelector((store) => store.persistData.user.userInfo);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchUserListing = async () => {
    try {
      const response = await axios.get(`${URL}api/listing/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.succeess === false) {
        console.log(response.data.message);
        return;
      }
      //   console.table(response.data);
      setListings(response.data);
    } catch (error) {}
  };

  // console.log(listings);

  const deleteListing = async (id) => {
    try {
      console.log("start deleting");
      const response = await axios.delete(`${URL}api/listing/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success == false) {
        console.log(response.data.success);
        return;
      }
      console.log("Listing Deleted");

      // instead of fetching database, we just update the state of app
      // fetchUserListing();
      setListings((prevData) => {
        return [...prevData.filter((item) => item._id !== id)];
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateListing = (id) => {
    navigate(`/listing/update/${id}`);
  };

  useEffect(() => {
    fetchUserListing();
  }, []);
  // console.log("use listing");
  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "100%",
        py: 1,
      }}
    >
      <h2
        style={{
          color: "green",
        }}
      >
        Your Listings
      </h2>
      {listings.length > 0 &&
        listings.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: LIGHTGRAY,
                borderRadius: 3,
                gap: 1.5,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                mb: 10,
              }}
            >
              <div>
                <Link className="" to={`/listing/${item._id}`}>
                  <img
                    srcSet={item.imageURLs[0]}
                    alt={item.name}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: "5px",
                    }}
                  />
                </Link>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  columnGap: { xs: 2, sm: 0 },
                  rowGap: { xs: 0, sm: 2 },

                  mt: 1,
                }}
              >
                <Button
                  onClick={() => {
                    deleteListing(item._id);
                  }}
                  color="error"
                  type="button"
                  variant="contained"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    updateListing(item._id);
                  }}
                  color="primary"
                  type="button"
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default UserListings;
