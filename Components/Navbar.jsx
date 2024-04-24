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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { BLACK, GRAY, LIGHTGRAY } from "../../COLOR";
import { useSelector } from "react-redux";
import profilePicture from "../assets/profile.png";

const navItems = [
  {
    name: "Home",
    link: "/",
  },

  {
    name: "Sign in",
    link: "/signin",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "profile",
    link: "/profile",
  },
];

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const renderCount = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearcTerm] = useState("");
  const user = useSelector((store) => store.persistData.user.userInfo);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearchTerm = (event) => {
    setSearcTerm(event.target.value);
  };

  const handleSearch = () => {
    // console.log(window.location.search);
    searchParams.set("searchTerm", searchTerm);
    // console.log(searchParams.toString());
    navigate(`/search?${searchParams.toString()}`);
  };

  useEffect(() => {
    const term = searchParams.get("searchTerm");
    if (term) {
      setSearcTerm(term);
    }
  }, [location.search]);
  // console.log(user);

  useEffect(() => {
    if (md) {
      setMobileOpen(false);
    }
  }, [md]);
  const drawer = (
    <Box onClick={handleDrawerToggle} ml={2}>
      <Typography variant="body1" sx={{ my: 2 }}>
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
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "blue" : BLACK,
                    };
                  }}
                  to={item.link}
                  className={"Navlink"}
                >
                  {/* <Button sx={{ color: "#334155" }}>{item.name}</Button> */}
                  <img
                    srcSet={user.avatar ? user.avatar : profilePicture}
                    alt={user.username}
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
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "blue !important" : BLACK,
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
      {/* <List
        sx={{
          display: "flex",
          margin: "0 auto",
          flexDirection: "column",
        }}
      >
        {navItems.map((item, index) => {
          if (item.name === "Sign in") {
            if (user === null) {
              return (
                <ListItem key={index} disablePadding>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "blue" : BLACK,
                        textDecoration: "none",
                        textAlign: "center",
                      };
                    }}
                    to={item.link}
                  >
                    <ListItemButton>
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
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "blue" : BLACK,
                        textDecoration: "none",
                      };
                    }}
                    to={item.link}
                  >
                    <ListItemButton> */}
      {/* <img
                        srcSet={user.avatar}
                        title={"profile"}
                        style={{
                          width: "33px",
                          borderRadius: 15,
                        }}
                      /> */}
      {/* <ListItemText primary={item.name} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            }
          } else {
            return (
              <ListItem key={index} disablePadding>
                <NavLink
                  to={item.link}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "blue" : BLACK,
                      textDecoration: "none",
                    };
                  }}
                >
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText sx={{}} primary={item.name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          }
        })}
      </List> */}
    </Box>
  );
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
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
                  value={searchTerm}
                  onChange={handleSearchTerm}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleSearch}>
                          <SearchRounded />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
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
                            alt={user.username}
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
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  backgroundColor: LIGHTGRAY,
                  borderRadius: 1,
                  width: "75%",
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
