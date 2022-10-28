import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React, { useEffect } from "react";
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

import { getUser } from "./apis/user";
import LoginWithPassword from "./pages/auth/LoginWithPassword";
import _404 from "./pages/errors/_404";
import useGeoLocation from "./hooks/useGeoLocation";

export const GlobalContext = React.createContext({
  user: null,
  setUser: (user: any) => {},

  rooms: [],
  setRooms: (rooms: any[]) => {},

  location: {
    lat: 0,
    lng: 0,
  },

  setLocation: (location: { lat: number; lng: number }) => {},
} as {
  user: any;
  setUser: (user: any) => void;

  rooms: {
    id: string;
    name: string;
    distance: number;
    createdAt: string;
  }[];
  setRooms: (rooms: any[]) => void;

  location: {
    lat: number;
    lng: number;
  };
  setLocation: (location: { lat: number; lng: number }) => void;
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
      try {
        const data = await getUser();
        return data.user;
      } catch (e) {
        return redirect("/login");
      }
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
  const [rooms, setRooms] = React.useState<any>([]);
  const [location, setLocation] = React.useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getUser().then((data) => {
      setUser(data.user);
    });

    const localLocation = localStorage.getItem("location");
    if (localLocation) {
      const { lat, lng } = JSON.parse(localLocation);
      setLocation({ lat, lng });
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, rooms, setRooms, location, setLocation }}
    >
      <RouterProvider router={router} />
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
