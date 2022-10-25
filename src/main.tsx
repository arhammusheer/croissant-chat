import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat/Chat";
import Chatbox from "./pages/Chat/Chatbox/Chatbox";
import Introduction from "./pages/Chat/Introduction";
import Landing from "./pages/Landing";
import { getRoom, getUser } from "./services/fakeApi";
import theme from "./utils/theme";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./configs/firebase.config";
import Login from "./pages/auth/Login";
import _404 from "./pages/errors/_404";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <_404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat />,
    loader: async () => {
      const user = await getUser();

      if (!user) {
        return redirect("/login");
      }

      return user;
    },
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
