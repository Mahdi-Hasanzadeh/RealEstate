import { AccountCircle, Menu, SearchRounded } from "@mui/icons-material";
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
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { BLACK, GRAY, LIGHTGRAY } from "../../COLOR";
const navItems = ["Home", "About", "Contact"];
const drawerWidth = 240;

const Navbar = () => {
  const renderCount = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
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

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: "#334155" }}>
                    {item}
                  </Button>
                ))}
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
          {/* <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
              quibusdam, aliquam dolore excepturi quae. Distinctio enim at
              eligendi perferendis in cum quibusdam sed quae, accusantium et
              aperiam? Quod itaque exercitationem, at ab sequi qui modi delectus
              quia corrupti alias distinctio nostrum. Minima ex dolor modi
              inventore sapiente necessitatibus aliquam fuga et. Sed numquam
              quibusdam at officia sapiente porro maxime corrupti perspiciatis
              asperiores, exercitationem eius nostrum consequuntur iure aliquam
              itaque, assumenda et! Quibusdam temporibus beatae doloremque
              voluptatum doloribus soluta accusamus porro reprehenderit eos
              inventore facere, fugit, molestiae ab officiis illo voluptates
              recusandae. Vel dolor nobis eius, ratione atque soluta, aliquam
              fugit qui iste architecto perspiciatis. Nobis, voluptatem! Cumque,
              eligendi unde aliquid minus quis sit debitis obcaecati error,
              delectus quo eius exercitationem tempore. Delectus sapiente,
              provident corporis dolorum quibusdam aut beatae repellendus est
              labore quisquam praesentium repudiandae non vel laboriosam quo ab
              perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
              commodi nihil corrupti cum non fugiat praesentium doloremque
              architecto laborum aliquid. Quae, maxime recusandae? Eveniet
              dolore molestiae dicta blanditiis est expedita eius debitis
              cupiditate porro sed aspernatur quidem, repellat nihil quasi
              praesentium quia eos, quibusdam provident. Incidunt tempore vel
              placeat voluptate iure labore, repellendus beatae quia unde est
              aliquid dolor molestias libero. Reiciendis similique
              exercitationem consequatur, nobis placeat illo laudantium! Enim
              perferendis nulla soluta magni error, provident repellat similique
              cupiditate ipsam, et tempore cumque quod! Qui, iure suscipit
              tempora unde rerum autem saepe nisi vel cupiditate iusto. Illum,
              corrupti? Fugiat quidem accusantium nulla. Aliquid inventore
              commodi reprehenderit rerum reiciendis! Quidem alias repudiandae
              eaque eveniet cumque nihil aliquam in expedita, impedit quas ipsum
              nesciunt ipsa ullam consequuntur dignissimos numquam at nisi porro
              a, quaerat rem repellendus. Voluptates perspiciatis, in pariatur
              impedit, nam facilis libero dolorem dolores sunt inventore
              perferendis, aut sapiente modi nesciunt.
            </Typography>
          </Box> */}
        </Box>
      </Box>
      <Outlet />
    </>
  );
};
export default Navbar;
