import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#CCC",
  //   },
  // },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
