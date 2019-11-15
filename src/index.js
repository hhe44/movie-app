import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { rem } from "polished";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

export const theme = {
  borderRadius: rem(4),
  fonts: {
    tiny: rem(8),
    small: rem(16),
    medium: rem(24),
    large: rem(32),
    xLarge: rem(40),
    xxLarge: rem(80),
    title: rem(64)
  },
  sizes: {
    tiny: rem(8),
    small: rem(16),
    medium: rem(24),
    large: rem(32),
    xLarge: rem(64),
    xxLarge: rem(128),
    xxxLarge: rem(256),
    navHeight: rem(96),
  },
  colors: {
    mainBG: "#141414",
    red: "#e50914",
    grey: "#92908e",
    white: "#ffffff",
    gradient: `-webkit-linear-gradient(#B81C23, #fc014f)`
  }
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
