import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import useWindowDimensions from "./components/hooks/useWindowDimensions";
import wordsData from "./components/data/words";
//pages:
import Navigation from "./components/pages/Navigation";
import Main from "./components/pages/Main";
import NewWords from "./components/pages/NewWords";
import Daily from "./components/pages/Daily";
import History from "./components/pages/History";
import HowToUse from "./components/pages/HowToUse";

function App() {
  const { height, width } = useWindowDimensions();
  // console.log(wordsData);

  return (
    <>
      <Navigation />
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
