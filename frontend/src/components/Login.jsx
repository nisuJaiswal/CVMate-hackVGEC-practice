import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../redux/auth/authSlice";
import Spinner from "./Spinner";

const theme = createTheme();

export default function SignIn() {
  const [userFaculty, setuserFaculty] = useState("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleUserFacultySwitch = () => {
    userFaculty === "user" ? setuserFaculty("faculty") : setuserFaculty("user");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("on submit called");
    const formData = {
      email,
      password,
    };
    dispatch(login(formData));
  };

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess || user) {
  //     navigate("/");
  //   }

  //   dispatch(reset());
  // }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form method="post">
            <FormControlLabel
              onChange={() => handleUserFacultySwitch()}
              control={<Switch />}
              label={userFaculty === "user" ? "User" : "Faculty"}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => e.target.value}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => e.target.value}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/register")}
                >
                  <Link
                    fullWidth
                    style={{ textDecoration: "none", color: "grey" }}
                    to="/register"
                    variant="body2"
                  >
                    {"Don't have an account? Sign up"}
                  </Link>
                </Button>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
