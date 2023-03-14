import React from "react";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Logic = () => {
  const REGISTER = "register";
  const LOGIN = "login";
  const [logReg, setlogReg] = useState(LOGIN);
  const [userFaculty, setuserFaculty] = useState("user");

  const handleLogRegSwitch = () => {
    logReg === LOGIN ? setlogReg(REGISTER) : setlogReg(LOGIN);
  };
  const handleUserFacultySwitch = () => {
    userFaculty === "user" ? setuserFaculty("faculty") : setuserFaculty("user");
  };
  return (
    <>
      <FormControlLabel
        onChange={() => handleLogRegSwitch()}
        control={<Switch />}
        label={logReg === LOGIN ? ('Log-in') : ('Register')}
      />
      <FormControlLabel
        onChange={() => handleUserFacultySwitch()}
        control={<Switch />}
        label={userFaculty === 'user' ? ('User') : ('Faculty')}
      />
      {userFaculty === "user" && logReg === LOGIN && <Login />}
      {userFaculty === "user" && logReg === REGISTER && <Register />}
      {userFaculty === "faculty" && logReg === LOGIN && <Login />}
      {userFaculty === "faculty" && logReg === REGISTER && <Register />}
    </>
  );
};

export default Logic;
