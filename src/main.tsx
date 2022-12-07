import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  redirect,
  Routes,
} from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat/Chat";
import Chatbox from "./pages/Chat/Chatbox/Chatbox";
import Introduction from "./pages/Chat/Introduction";
import Landing from "./pages/Landing";
import theme from "./utils/theme";

import { Provider } from "react-redux";
import { getUser } from "./apis/user";
import LoginWithPassword from "./pages/auth/LoginWithPassword";
import _404 from "./pages/errors/_404";
import store from "./redux/store";
import Routing from "./Routes";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
