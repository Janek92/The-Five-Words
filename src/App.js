import { lazy, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadEndpoints,
  downloadEndpointsDaily,
  downloadEndpointsHistory,
  downloadPractice,
} from "./store/words-actions";
import PageLoading from "./components/UI/reusable/PageLoading";

function App() {
  const Login = lazy(() => import("./components/pages/Login"));
  const Navigation = lazy(() => import("./components/pages/Navigation"));
  const Main = lazy(() => import("./components/pages/Main"));
  const NewWords = lazy(() => import("./components/pages/NewWords"));
  const Daily = lazy(() => import("./components/pages/Daily"));
  const History = lazy(() => import("./components/pages/History"));
  const HowToUse = lazy(() => import("./components/pages/HowToUse"));

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

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
  }, [currentUser]);

  return (
    <>
      <Suspense fallback={<PageLoading />}>
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
