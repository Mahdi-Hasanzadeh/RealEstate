import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { GRAY, LIGHTGRAY, BLACK } from "../../styles/Color.js";
import { navItems } from "../../utils/utility.js";
import ListingTabContent from "./ListingTabContent.jsx";

import { styled } from "@mui/material/styles";

// Add left margin to submenu for better visual hierarchy
const SubMenuWrapper = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(3),
}));

const MobileDrawer = ({
  mobileOpen,
  handleDrawerToggle,
  setMobileOpen,
  user,
}) => {
  const [listingsOpen, setListingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleListingsToggle = () => {
    setListingsOpen((prev) => !prev);
  };

  const closeDrawerAndNavigate = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: LIGHTGRAY,
          borderRadius: 1,
          width: { xs: "60%", sm: "50%" },
          p: 2,
        },
      }}
    >
      <Box mb={2}>
        <Typography
          variant="h6"
          onClick={() => closeDrawerAndNavigate("/")}
          sx={{ cursor: "pointer", fontWeight: "bold", color: BLACK }}
        >
          SMART
          <Typography variant="h6" component="span" color={GRAY}>
            TRADE
          </Typography>
        </Typography>
      </Box>

      <Divider />

      <List>
        {navItems.map((item, index) => {
          // 🔹 Sign in only visible if user is null
          if (item.name === "Sign in") {
            if (user === null) {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.link}
                    onClick={handleDrawerToggle}
                    sx={({ isActive }) => ({
                      color: isActive ? "blue" : BLACK,
                      fontWeight: "medium",
                    })}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          }

          // 🔹 Profile only visible if user is logged in
          if (item.name === "profile") {
            if (user !== null) {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.link}
                    onClick={handleDrawerToggle}
                    sx={({ isActive }) => ({
                      color: isActive ? "blue" : BLACK,
                      fontWeight: "medium",
                    })}
                  >
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          }

          // 🔹 Listings only visible if user is logged in
          if (item.name === "Listings") {
            if (user !== null) {
              return (
                <Box key={index}>
                  <ListItemButton onClick={handleListingsToggle}>
                    <ListItemText
                      primary="Listings"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        color: BLACK,
                      }}
                    />
                    {listingsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse in={listingsOpen} timeout="auto" unmountOnExit>
                    <SubMenuWrapper>
                      <ListingTabContent
                        handleDrawerToggle={handleDrawerToggle}
                      />
                    </SubMenuWrapper>
                  </Collapse>
                </Box>
              );
            }
            return null;
          }

          // Dashboard only for Admin
          if (item.name === "Dashboard") {
            if (user?.role === "Admin") {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.link}
                    onClick={handleDrawerToggle}
                    sx={({ isActive }) => ({
                      color: isActive ? "red" : BLACK,
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          }
          if (item.name == "Admin Panel") {
            if (user?.role == "Admin") {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.link}
                    onClick={handleDrawerToggle}
                    sx={({ isActive }) => ({
                      color: isActive ? "red" : BLACK,
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          }

          // 🔹 Default links
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.link}
                onClick={handleDrawerToggle}
                sx={({ isActive }) => ({
                  color: isActive ? "red" : BLACK,
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
