import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginWithPassword from "./pages/auth/LoginWithPassword";
import Register from "./pages/auth/Register";
import Chat from "./pages/Chat/Chat";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import _404 from "./pages/errors/_404";
import { AppDispatch, RootState } from "./redux/store";
import { userActions } from "./redux/slices/user.slice";
import { locationActions } from "./redux/slices/location.slice";

const Routing = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [user.isLoggedIn, navigate]);

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
          <Route index path="/" element={<Chat />} />
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
