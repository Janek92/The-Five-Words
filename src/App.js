import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  downloadEndpoints,
  downloadEndpointsDaily,
  downloadEndpointsHistory,
} from "./store/words-actions";
//pages:
import Navigation from "./components/pages/Navigation";
import Main from "./components/pages/Main";
import NewWords from "./components/pages/NewWords";
import Daily from "./components/pages/Daily";
import History from "./components/pages/History";
import HowToUse from "./components/pages/HowToUse";

function App() {
  const dispatch = useDispatch();

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
    //Download endpoints (to draw):
    dispatch(downloadEndpoints());
    //Download endpointsDaily (added to learn):
    dispatch(downloadEndpointsDaily());
    //Download endpointsHistory
    dispatch(downloadEndpointsHistory());
  }, [dispatch]);

  return (
    <>
      <Navigation close={close} closeDefault={closeDefault} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<NewWords />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/history" element={<History />} />
        <Route path="/how-to-use" element={<HowToUse />} />
      </Routes>
    </>
  );
}

export default App;
