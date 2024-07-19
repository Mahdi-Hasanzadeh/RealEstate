//#region Libraries

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";

//#endregion

//#region My Modules
import { GRAY, LIGHTGRAY, BLACK } from "../../../../COLOR.js";
import MyTooltip from "../Tooltip.jsx";
import profilePicture from "../../assets/profile.png";
import { navItems } from "../../utility.js";
import ListingTabContent from "./ListingTabContent.jsx";

//#endregion

const MobileDrawer = ({
  mobileOpen,
  handleDrawerToggle,
  setMobileOpen,
  user,
}) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const navigate = useNavigate();

  const handleTooltipToggle = () => {
    setOpenTooltip(!openTooltip);
  };

  const handleMouseEnter = () => {
    setOpenTooltip(true);
  };

  const handleMouseLeave = () => {
    setOpenTooltip(false);
  };

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: LIGHTGRAY,
          borderRadius: 1,
          width: { xs: "90%", sm: "50%" },
        },
      }}
    >
      <Box ml={2}>
        <Typography
          onClick={() => {
            setMobileOpen(false);
            navigate("/");
          }}
          variant="body1"
          sx={{ my: 2, cursor: "pointer" }}
        >
          HASANZADEH
          <Typography variant="body1" component={"span"} color={GRAY}>
            ESTATE
          </Typography>
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            mt: 2,
          }}
        >
          {navItems.map((item, index) => {
            if (item.name === "Sign in") {
              if (user === null) {
                return (
                  <NavLink
                    onClick={handleDrawerToggle}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "blue" : BLACK,
                      };
                    }}
                    to={item.link}
                    key={index}
                    className={"Navlink"}
                  >
                    <Button sx={{ color: "#334155" }}>{item.name}</Button>
                  </NavLink>
                );
              }
            } else if (item.name === "profile") {
              if (user !== null) {
                return (
                  <NavLink
                    key={index}
                    onClick={handleDrawerToggle}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "blue" : BLACK,
                      };
                    }}
                    to={item.link}
                    className={"Navlink"}
                  >
                    <img
                      srcSet={user.avatar ? user.avatar : profilePicture}
                      alt={user.username}
                      // title={"profile"}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: 50,
                        objectFit: "cover",
                      }}
                    />
                  </NavLink>
                );
              }
            } else if (item.name === "Listings") {
              if (user !== null) {
                return (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <IconButton
                      onClick={handleTooltipToggle}
                      size="small"
                      sx={{
                        fontSize: "15px",
                        color: "#334155",
                        "&:hover": {
                          borderRadius: 1,
                        },
                      }}
                    >
                      LISTINGS
                      {openTooltip ? (
                        <ArrowDropUpRounded />
                      ) : (
                        <ArrowDropDownRounded />
                      )}
                    </IconButton>

                    <MyTooltip
                      show={openTooltip}
                      mouseEnter={handleMouseEnter}
                      mouseLeave={handleMouseLeave}
                      content={
                        <ListingTabContent
                          handleMouseLeave={handleMouseLeave}
                          handleDrawerToggle={handleDrawerToggle}
                        />
                      }
                      position={"rigth"}
                    />
                  </Box>
                );
              }
            } else {
              return (
                <NavLink
                  onClick={handleDrawerToggle}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red !important" : BLACK,
                    };
                  }}
                  to={item.link}
                  key={index}
                  className={"Navlink"}
                >
                  <Button sx={{ color: "#334155" }}>{item.name}</Button>
                </NavLink>
              );
            }
          })}
        </Box>
      </Box>
    </Drawer>
  );
};
export default MobileDrawer;
