/*eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import { Brightness2, Brightness5,Home, ExitToApp, Favorite } from "@mui/icons-material";
import ShowsContext from "../context/shows/showsContext";

const Navbar = () => {
  const authId = JSON.parse(localStorage.getItem("auth")) || [];
  const favorite1 = JSON.parse(localStorage.getItem("favorite")) || [];

  const [data,setdata] = useState(favorite1)

  const navigate = useNavigate();
  const { toggleTheme, darkMode,  } = useContext(ShowsContext);

  const handleThemeToggle = () => {
    toggleTheme();
  };
const handleFavoritesClick=()=>{

  navigate("/favorite");

}
const handleHomeClick = () => {
  navigate("/");
};
  const handleLogout = () => {
    localStorage.removeItem("auth");

    navigate("/login");

  };

  const handleLogin = () => {
    navigate("/");
  };
useEffect(()=>{
 

}, [data])
  return (
    <div className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <AppBar position="static">
        <Toolbar>
       
          <Typography variant="h6">TV Show App</Typography>
          <div style={{ marginLeft: "auto" }}>
          <IconButton color="inherit" onClick={handleHomeClick}>
            <Home />
          </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness5 /> : <Brightness2 />}
            </IconButton>
            <IconButton color="inherit" onClick={handleFavoritesClick}>
              <Badge badgeContent={data && data.length } color="secondary">
                <Favorite />
              </Badge>
            </IconButton>


            {authId && authId.length == 0 ? <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogin}>
              Log in
            </Button> : <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
              Log out
            </Button>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
