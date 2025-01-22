import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { tmdbApi } from "./api/index.js";
import GlobalContextProvider from "./context/globalContext.js";
import ThemeProvider from "./context/themeContext.js";
import App from "./App.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={tmdbApi}>
        <ThemeProvider>
          <GlobalContextProvider>
            <LazyMotion features={domAnimation}>
              <App />
            </LazyMotion>
          </GlobalContextProvider>
        </ThemeProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
