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
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import { Suspense, forwardRef, lazy, useEffect, useState } from "react";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { BLACK, GRAY, LIGHTGRAY } from "../../../COLOR";
import { useDispatch, useSelector } from "react-redux";
import profilePicture from "../assets/profile.png";
import Styles from "../../style.module.css";
import { setWelcomeToast } from "../../../reactRedux/showToast";
import { deleteUser } from "../../../reactRedux/userSlice";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import MyTooltip from "./Tooltip.jsx";
import Fallback from "./Fallback.jsx";

const MobileDrawer = lazy(() => import("./MobileDrawer.jsx"));

import { navItems } from "../utility.js";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openProfileTooltip, setOpenProfileTooltip] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearcTerm] = useState("");
  const user = useSelector((store) => store.persistData.user.userInfo);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const Listing = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 1,
          rowGap: 2,
          width: 110,
        }}
      >
        <Link
          onClick={handleMouseLeave}
          className={`${Styles.tooltipLink}`}
          to="/create-list"
        >
          New Listing
        </Link>
        <Link
          onClick={handleMouseLeave}
          className={`${Styles.tooltipLink}`}
          to="/search"
        >
          Search Listings
        </Link>
        <Link
          onClick={handleMouseLeave}
          className={`${Styles.tooltipLink}`}
          to="/userListings"
        >
          Your Listings
        </Link>
      </Box>
    );
  };

  const ProfileTooltip = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 1,
          rowGap: 2,
          width: 110,
        }}
      >
        <Link
          onClick={handleProfileTooltipMouseLeave}
          className={`${Styles.tooltipLink}`}
          to="/profile"
        >
          Account
        </Link>
        <Link
          onClick={() => {
            setOpenDialog(true);
            handleProfileTooltipMouseLeave();
          }}
          className={`${Styles.tooltipLink}`}
        >
          Sign-out
        </Link>
      </Box>
    );
  };

  const signoutUser = () => {
    // first we remove access token from the local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    // then we delete the user from state of application
    dispatch(setWelcomeToast(false));
    dispatch(deleteUser());
    navigate("/signin");
  };

  const handleMouseEnter = () => {
    setOpenTooltip(true);
  };

  const handleMouseLeave = () => {
    setOpenTooltip(false);
  };

  const handleProfileTooltipMouseEnter = () => {
    setOpenProfileTooltip(true);
  };

  const handleProfileTooltipMouseLeave = () => {
    setOpenProfileTooltip(false);
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

    setSearcTerm(term || "");
  }, [location.search]);

  useEffect(() => {
    if (md) {
      setMobileOpen(false);
    }
    setOpenTooltip(false);
  }, [md]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
              {/* Menu icon for screen sizes */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <Menu />
              </IconButton>
              {/* Website name */}
              <Typography
                onClick={() => {
                  navigate("/");
                }}
                variant="h6"
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: BLACK,
                  cursor: "pointer",
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
              {/* Navbar in medium size */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: 1,
                }}
              >
                {navItems.map((item, index) => {
                  if (item.name === "Sign in") {
                    if (user === null) {
                      return (
                        <Tooltip key={index} title={item.name}>
                          <NavLink to={item.link} className={"Navlink"}>
                            <Button sx={{ color: "#334155" }}>
                              {item.name}
                            </Button>
                          </NavLink>
                        </Tooltip>
                      );
                    }
                  } else if (item.name === "profile") {
                    if (user !== null) {
                      return (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                          }}
                        >
                          <IconButton
                            onMouseEnter={handleProfileTooltipMouseEnter}
                            onMouseLeave={handleProfileTooltipMouseLeave}
                            size="small"
                            sx={{
                              fontSize: "15px",
                              color: "#334155",
                              "&:hover": {
                                borderRadius: 1,
                              },
                            }}
                          >
                            <NavLink to={item.link} className={"Navlink"}>
                              <img
                                srcSet={
                                  user.avatar ? user.avatar : profilePicture
                                }
                                alt={user.username}
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: 50,
                                }}
                              />
                            </NavLink>
                          </IconButton>

                          <MyTooltip
                            show={openProfileTooltip}
                            mouseEnter={handleProfileTooltipMouseEnter}
                            mouseLeave={handleProfileTooltipMouseLeave}
                            content={<ProfileTooltip />}
                            position={"bottom"}
                          />
                        </Box>
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
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
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
                          </IconButton>

                          <MyTooltip
                            show={openTooltip}
                            mouseEnter={handleMouseEnter}
                            mouseLeave={handleMouseLeave}
                            content={<Listing />}
                            position={"bottom"}
                          />
                        </Box>
                      );
                    }
                  } else {
                    return (
                      <Tooltip key={index} title={item.name}>
                        <NavLink
                          to={item.link}
                          key={index}
                          className={"Navlink"}
                        >
                          <Button sx={{ color: "#334155" }}>{item.name}</Button>
                        </NavLink>
                      </Tooltip>
                    );
                  }
                })}
              </Box>
            </Toolbar>
          </AppBar>
          {/* drawer in mobile size */}
          <nav>
            {md && (
              <Suspense fallback={<Fallback />}>
                <MobileDrawer
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                  setMobileOpen={setMobileOpen}
                  user={user}
                />
              </Suspense>
            )}
          </nav>
        </Box>

        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setOpenDialog(!openDialog);
          }}
        >
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>
              "Are your to sign out from your account"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(false);
                signoutUser();
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default Navbar;
