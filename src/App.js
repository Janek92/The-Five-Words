import { useEffect, Suspense } from "react";
import { Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadEndpoints,
  downloadEndpointsDaily,
  downloadEndpointsHistory,
  downloadPractice,
  getCurrentUser,
} from "./store/words-actions";
import { renderRoutes, Navigation } from "./config/routing";
import { PageLoading } from "./components/UI/reusable/reusable";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

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
        <Routes>{renderRoutes(currentUser)}</Routes>
      </Suspense>
    </>
  );
}

export default App;
