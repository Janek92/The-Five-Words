import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadEndpoints,
  downloadEndpointsDaily,
  downloadEndpointsHistory,
} from "./store/words-actions";
//pages:
import Login from "./components/pages/Login";
import Navigation from "./components/pages/Navigation";
import Main from "./components/pages/Main";
import NewWords from "./components/pages/NewWords";
import Daily from "./components/pages/Daily";
import History from "./components/pages/History";
import HowToUse from "./components/pages/HowToUse";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.draw.currentUser);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  //Chowanie menu na scroll --->
  const [close, setClose] = useState(false);
  const showingMenu = () => {
    setClose(true);
  };
  const closeDefault = () => {
    setClose(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", showingMenu);
    return () => {
      window.removeEventListener("scroll", showingMenu);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  //<---
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    dispatch(downloadEndpoints(currentUser.uid));
    dispatch(downloadEndpointsDaily(currentUser.uid));
    dispatch(downloadEndpointsHistory(currentUser.uid));
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <Navigation close={close} closeDefault={closeDefault} />
      ) : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path="/new"
          element={
            <RequireAuth>
              <NewWords />
            </RequireAuth>
          }
        />
        <Route
          path="/daily"
          element={
            <RequireAuth>
              <Daily />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/how-to-use"
          element={
            <RequireAuth>
              <HowToUse />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
