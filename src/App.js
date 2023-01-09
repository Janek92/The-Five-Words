import { lazy, useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadEndpoints,
  downloadEndpointsDaily,
  downloadEndpointsHistory,
  downloadPractice,
} from "./store/words-actions";
import Spinner from "./components/UI/reusable/Spinner";
//pages:
// import Login from "./components/pages/Login";
// import Navigation from "./components/pages/Navigation";
// import Main from "./components/pages/Main";
// import NewWords from "./components/pages/NewWords";
// import Daily from "./components/pages/Daily";
// import History from "./components/pages/History";
// import HowToUse from "./components/pages/HowToUse";

function App() {
  //pages:
  const Login = lazy(() => import("./components/pages/Login"));
  const Navigation = lazy(() => import("./components/pages/Navigation"));
  const Main = lazy(() => import("./components/pages/Main"));
  const NewWords = lazy(() => import("./components/pages/NewWords"));
  const Daily = lazy(() => import("./components/pages/Daily"));
  const History = lazy(() => import("./components/pages/History"));
  const HowToUse = lazy(() => import("./components/pages/HowToUse"));

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.draw.currentUser);
  const words = useSelector((state) => state.draw.endpoints);
  // console.log(words);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    localStorage.setItem("user", JSON.stringify(currentUser));
    dispatch(downloadEndpoints(currentUser.uid));
    dispatch(downloadEndpointsDaily(currentUser.uid));
    dispatch(downloadEndpointsHistory(currentUser.uid));
    dispatch(downloadPractice(currentUser.uid));
    console.log("dispatche w App.js");
  }, [currentUser]);

  return (
    <>
      <Suspense fallback={<Spinner pageLoading />}>
        {currentUser ? <Navigation /> : null}
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
      </Suspense>
    </>
  );
}

export default App;
