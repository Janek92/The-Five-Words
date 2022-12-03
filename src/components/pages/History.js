import PagesTitle from "../UI/PagesTitle";
import Alert from "../UI/Alert";
import InitBtns from "../UI/InitBtns";
import { useSelector } from "react-redux";
import HistoryPreview from "../UI/HistoryPreview";
import { useState } from "react";
import { useRef } from "react";

const History = () => {
  const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

  const [viewing, setViewing] = useState(false);

  const [historyWord, setHistoryWord] = useState([]);

  const [translated, setTranslated] = useState(false);

  const initBtnRef = useRef();

  const downloadHistoryWord = () => {
    initBtnRef.current.blur();
    setTranslated(false);
    const index = Math.floor(Math.random() * endpointsHistory.length);
    const word = endpointsHistory[index];
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${word}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Nie można pobrać słówka");
        }
      })
      .then((res) => {
        const loadedWord = [];
        for (const key in res) {
          loadedWord.push({
            id: res[key].id,
            eng: res[key].eng,
            pl: res[key].pl,
            type: res[key].type,
          });
          console.log(...loadedWord);
        }
        setHistoryWord(...loadedWord);
      })
      .catch((error) => alert(error.name));
  };

  const letDisplayWord = () => {
    if (!viewing) {
      setViewing(true);
    }
  };

  const drawWordFromHistory = async () => {
    try {
      await downloadHistoryWord();
      await letDisplayWord();
    } catch {
      alert("Wystąpił problem");
    }
  };

  const onTranslate = () => {
    setTranslated(true);
  };

  return (
    <div>
      <PagesTitle>Historia</PagesTitle>
      {viewing ? (
        <HistoryPreview
          polish={historyWord.pl}
          type={historyWord.type}
          eng={historyWord.eng}
          translated={translated}
          translate={onTranslate}
        ></HistoryPreview>
      ) : null}
      {endpointsHistory.length === 0 ? (
        <Alert>brak słówek w historii</Alert>
      ) : (
        <InitBtns onClick={drawWordFromHistory} ref={initBtnRef}>
          {viewing ? "wyświetl kolejne" : "wyświetl słowo"}
        </InitBtns>
      )}
    </div>
  );
};
export default History;
