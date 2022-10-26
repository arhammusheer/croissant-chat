import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React, { useContext } from "react";
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
import theme from "./utils/theme";

import LoginWithPassword from "./pages/auth/LoginWithPassword";
import _404 from "./pages/errors/_404";
import { getUser } from "./apis/user";

export const GlobalContext = React.createContext({
  user: null,
  token: "",
  setUser: (user: any) => {},
  setToken: (token: any) => {},
} as {
  user: any;
  token: string;
  setUser: (user: any) => void;
  setToken: (token: any) => void;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <_404 />,
  },
  {
    path: "/login",
    element: <LoginWithPassword />,
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
          // return await getRoom(id as string);
        },
      },
    ],
  },
]);

const App = () => {
  const [user, setUser] = React.useState<any>(null);
  const [token, setToken] = React.useState("");

  return (
    <GlobalContext.Provider value={{ user, token, setUser, setToken }}>
      <RouterProvider router={router} />;
    </GlobalContext.Provider>
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
