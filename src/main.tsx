import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat/Chat";
import Chatbox from "./pages/Chat/Chatbox/Chatbox";
import Introduction from "./pages/Chat/Introduction";
import Landing from "./pages/Landing";
import { getRoom } from "./services/fakeApi";
import theme from "./utils/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/chat",
    element: <Chat />,
    children: [
      {
        path: "",
        element: <Introduction />,
      },
      {
        path: ":id",
        element: <Chatbox />,
        loader: async ({ params }) => {
          const { id } = params;
          return await getRoom(id as string);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
