import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginWithPassword from "./pages/auth/LoginWithPassword";
import Register from "./pages/auth/Register";
import Chat from "./pages/Chat/Chat";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import _404 from "./pages/errors/_404";
import { AppDispatch, RootState } from "./redux/store";
import { userActions } from "./redux/slices/user.slice";
import { locationActions } from "./redux/slices/location.slice";
import Chatbox from "./pages/Chat/Chatbox/Chatbox";
import Introduction from "./pages/Chat/Introduction";
import { WS } from "./utils/defaults";
import { roomActions } from "./redux/slices/rooms.slice";

const Routing = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [subs, setSubs] = useState<string[]>([]);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const navigate = useNavigate();

  const subscribe = (id: string) => {
    if (ws && !subs.includes(id)) {
      ws.send(
        JSON.stringify({
          type: "join",
          roomId: id,
        })
      );
      setSubs([...subs, id]);
    }
  };

  const unsubscribe = (id: string) => {
    if (ws && subs.includes(id)) {
      ws.send(
        JSON.stringify({
          type: "leave",
          roomId: id,
        })
      );
      setSubs(subs.filter((sub) => sub !== id));
    }
  };

  const unsubscribeAll = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "leaveAll",
        })
      );
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/chat")) {
      const id = location.pathname.split("/")[2];
      if (id) {
        subscribe(id);
        subs.forEach((sub) => {
          if (sub !== id) {
            unsubscribe(sub);
          }
        });
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user.isLoggedIn && !location.pathname.startsWith("/chat")) {
      navigate("/chat");
    }
  }, [user.isLoggedIn, navigate]);

  useEffect(() => {
    if (user.isLoggedIn) {
      const ws = new WebSocket(`${WS}/ws`);

      ws.onopen = () => {
        console.log("Connected to websocket");
      };

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);

        if (user.profile?.id !== data.userId) {
          dispatch(roomActions.addMessage(data));
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from websocket");
      };

      setWs(ws);

      return () => {
        ws.close();
      };
    }
  }, [user.isLoggedIn]);

  // Initialize user profile
  useEffect(() => {
    dispatch(userActions.getProfile());
    dispatch(locationActions.updateLocation());
  }, [dispatch]);

  if (user.loading) {
    return <Loading />;
  }

  return (
    <Routes>
      {user.isLoggedIn ? (
        <>
          <Route path="/chat" element={<Chat />}>
            <Route path="" element={<Introduction />} />
            <Route path=":id" element={<Chatbox />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginWithPassword />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="*" element={<_404 />} />
    </Routes>
  );
};

export default Routing;
