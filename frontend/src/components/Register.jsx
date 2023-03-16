import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../redux/auth/authSlice";
import Spinner from "./Spinner";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [userFaculty, setuserFaculty] = useState("user");
  const [firstname, setFirstname] = useState();
  const [username, setUsername] = useState();
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setcPassword] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [image, setImage] = useState();
  const [isImgChanged, setIsImgChanged] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleUserFacultySwitch = () => {
    userFaculty === "user" ? setuserFaculty("faculty") : setuserFaculty("user");
  };

  const dataChanged = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
        setIsImgChanged(true);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const openFile = () => {
    fileInput.current.click();
  };

  function handleOnSubmit(e) {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Passwords not Matched", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const formData = new FormData();

      formData.set("username", username);
      formData.set("password", password);
      formData.set("firstName", firstname);
      formData.set("lastName", lastname);
      formData.set("uploadFile", avatar);
      formData.set("aboutMe", aboutMe);
      dispatch(register(formData));
    }
  }

  const fileInput = useRef(null);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form method="post" encType="multipart/form-data">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={isImgChanged ? avatarPreview : image}
              alt="User"
              loading="lazy"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "999px",
                textalign: "center",
              }}
            />
            <input
              type="file"
              name="uploadFile"
              ref={fileInput}
              onChange={dataChanged}
              accept="images/*"
              style={{ display: "none" }}
            />

            <AddAPhoto
              onClick={openFile}
              style={{
                cursor: "pointer",
                transform: "translateX(250%) translateY(-50%)",
              }}
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <FormControlLabel
              onChange={() => handleUserFacultySwitch()}
              control={<Switch />}
              label={userFaculty === "user" ? "User" : "Faculty"}
            />
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    value={firstname}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    value={lastname}
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    value={username}
                    label="User Name"
                    name="username"
                    autoComplete="email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    value={cPassword}
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={(e) => setcPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    maxRows={4}
                    fullWidth
                    id="aboutMe"
                    value={aboutMe}
                    label="About Me"
                    name="aboutMe"
                    autoComplete="about-me"
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleOnSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/login")}
                >
                  <Link
                    style={{ textDecoration: "none", color: "grey" }}
                    to="/login"
                    variant="body2"
                  >
                    {"Already have an account? Log In"}
                  </Link>
                </Button>
              </Grid>
            </Box>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
}
