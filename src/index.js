import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Web3Provider } from "./context/useWeb3";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <ColorModeScript />
        <App />
      </Web3Provider>
    </ChakraProvider>
  </React.StrictMode>
);
