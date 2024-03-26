import { Menu, SearchRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  CardMedia,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BLACK, GRAY, LIGHTGRAY } from "../../COLOR";
import { useSelector } from "react-redux";
import profilePicture from "../../assets/profile.png";
const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Sign in",
    link: "/signin",
  },
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "Counter",
    link: "/counter",
  },
];
const drawerWidth = 240;

const Navbar = () => {
  const renderCount = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((store) => store.user.userInfo);
  // console.log(user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  useEffect(() => {
    renderCount.current += 1;
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => {
          if (item.name === "Sign in") {
            if (user === null) {
              return (
                <ListItem key={index} disablePadding>
                  <NavLink
                    to={item.link}
                    className="Link"
                    style={{
                      color: "red",
                    }}
                  >
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            }
          } else if (item.name === "profile") {
            if (user !== null) {
              return (
                <ListItem key={index} disablePadding>
                  <NavLink to={item.link} className="Link">
                    <ListItemButton sx={{ textAlign: "center" }}>
                      {/* <img
                        srcSet={user.avatar}
                        title={"profile"}
                        style={{
                          width: "33px",
                          borderRadius: 15,
                        }}
                      /> */}
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            }
          } else {
            return (
              <ListItem
                sx={{
                  width: "100%",
                }}
                key={index}
                disablePadding
              >
                <NavLink to={item.link} className="Link">
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText
                      sx={{
                        color: "red",
                      }}
                      primary={item.name}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="sticky"
            component="nav"
            sx={{
              backgroundColor: LIGHTGRAY,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "space-around" },
                // flexWrap: "wrap",
                rowGap: 1,
                margin: "0 10px",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: BLACK,
                }}
              >
                HASANZADEH
                <Typography variant="h6" component={"span"} color={GRAY}>
                  ESTATE
                </Typography>
              </Typography>
              <Box>
                <TextField
                  label="Search"
                  size="small"
                  sx={{
                    width: { xs: 150, sm: 250 },
                  }}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 1,
                }}
              >
                {navItems.map((item, index) => {
                  if (item.name === "Sign in") {
                    if (user === null) {
                      return (
                        <NavLink
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
                          to={item.link}
                          key={index}
                          className={"Navlink"}
                        >
                          {/* <Button sx={{ color: "#334155" }}>{item.name}</Button> */}
                          <img
                            srcSet={user.avatar ? user.avatar : profilePicture}
                            // title={"profile"}
                            style={{
                              width: "30px",
                              borderRadius: 15,
                              objectFit: "cover",
                            }}
                          />
                        </NavLink>
                      );
                    }
                  } else {
                    return (
                      <NavLink to={item.link} key={index} className={"Navlink"}>
                        <Button sx={{ color: "#334155" }}>{item.name}</Button>
                      </NavLink>
                    );
                  }
                })}
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Box>
      </Box>
    </>
  );
};
export default Navbar;
