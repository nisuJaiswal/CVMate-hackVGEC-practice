import {
  AppBar,
  Button,
  CssBaseline,
  GlobalStyles,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { logout, reset } from "../redux/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Cv Maker
          </Typography>
          {user && (
            <Button
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={onLogout}
            >
              <FaSignOutAlt /> Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
