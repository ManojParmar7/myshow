import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
  Hidden,
  Drawer,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Brightness2, Brightness5, Home, ExitToApp, Favorite } from "@mui/icons-material";
import ShowsContext from "../context/shows/showsContext";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme, darkMode, auth, favorite, logout } = useContext(ShowsContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleFavoritesClick = () => {
    navigate("/favorite");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    logout([]);
  };

  const handleLogin = () => {
    navigate("/");
  };

  const countFavoritesForCurrentUser = () => {
    const userFavorites = favorite.filter((show) => show.userId === auth.id);
    return userFavorites.length;
  };

  useEffect(() => {}, [favorite, auth]);

  const ListItem = ({ icon, text, onClick }) => (
    <MuiListItem button onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </MuiListItem>
  );

  return (
    <div className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">TV Show App</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Hidden mdUp>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>

            <Hidden smDown>
              <IconButton color="inherit" onClick={handleHomeClick}>
                <Home />
              </IconButton>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {darkMode ? <Brightness5 /> : <Brightness2 />}
              </IconButton>
              {auth && auth.length === 0 ? (
                <></>
              ) : (
                <IconButton color="inherit" onClick={handleFavoritesClick}>
                  <Badge badgeContent={countFavoritesForCurrentUser()} color="secondary">
                    <Favorite />
                  </Badge>
                </IconButton>
              )}

              {auth && auth.length === 0 ? (
                <Button color="inherit" startIcon={<LockOpenIcon />} onClick={handleLogin}>
                  Log in
                </Button>
              ) : (
                <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
                  Log out
                </Button>
              )}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <div className="drawerCloseIcon">
    <IconButton onClick={() => setDrawerOpen(false)}>
      <CloseIcon />
    </IconButton>
  </div>
        <List>
          <ListItem icon={<Home />} text="Home" onClick={handleHomeClick} />
          <ListItem icon={darkMode ? <Brightness5 /> : <Brightness2 />} text="Toggle Theme" onClick={handleThemeToggle} />
          {auth && auth.length !== 0 && (
            <>
              <ListItem
                icon={
                  <Badge badgeContent={countFavoritesForCurrentUser()} color="secondary">
                    <Favorite />
                  </Badge>
                }
                text="Favorites"
                onClick={handleFavoritesClick}
              />
              <ListItem icon={<ExitToApp />} text="Log out" onClick={handleLogout} />
            </>
          )}
          {auth && auth.length === 0 && <ListItem icon={<LockOpenIcon />} text="Log in" onClick={handleLogin} />}
        </List>

      </Drawer>
    </div>
  );
};

export default Navbar;
