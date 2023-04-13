import {
  default as AccountCircle,
  default as AccountCircleIcon,
} from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import DrawerCart from "../cart/DrawerCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logoutUser } from "../../redux/reducers/userReducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cartReducer);
  const userInfo = useAppSelector((state) => state.userReducer);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCart, setOpenCart] = useState(false);

  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(anchorEl);
  const pages = [
    { name: "Home", link: "" },
    { name: "Product", link: "products" },
    { name: "About", link: "about" },
  ];
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logoutUser());
    navigate("/login");
  };

  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo.isLoggedIn && userInfo.isAdmin && (
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to="/products/list"
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          Product List
        </MenuItem>
      )}
      {userInfo.isLoggedIn && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
      )}
      {userInfo.isLoggedIn && (
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      )}
      {!userInfo.isLoggedIn && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/register">
          Create an account
        </MenuItem>
      )}
      {!userInfo.isLoggedIn && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/login">
          Sign In
        </MenuItem>
      )}
    </Menu>
  );

  const renderCartMenu = (
    <Drawer open={openCart} anchor={"right"} onClose={() => setOpenCart(false)}>
      <DrawerCart setOpenCart={setOpenCart} />
    </Drawer>
  );

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
                flexGrow: 0,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={`../../../logo.png`}
                alt={"Logo"}
                loading="lazy"
                className="header-logo"
              />
              TryCatch
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Search sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              {/* <IconButton
                size="large"
                aria-label="Change Theme"
                color="inherit"
              >
                <LightModeIcon />
              </IconButton> */}
              <IconButton
                size="large"
                aria-label="Cart"
                color="inherit"
                onClick={() => setOpenCart(true)}
              >
                <Badge badgeContent={`${cartItems.count}`} color="info">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="Account menus"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {userInfo.isLoggedIn && userInfo.currentUser ? (
                  <img
                    className="user-icon"
                    src={userInfo.currentUser.avatar ?? "../../../user-icon.png"}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
      {renderCartMenu}
    </Box>
  );
};
export default Header;
