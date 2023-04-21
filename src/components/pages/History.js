import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import wordsList from "../../data/wordsList";
import {
  PagesTitle,
  PagesContent,
  InitBtns,
  Alert,
} from "../UI/reusable/reusable";
import HistoryPreview from "../UI/HistoryPreview";

const History = () => {
  const ref = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [historyWord, setHistoryWord] = useState([]);

  const endpointsHistory = useSelector((state) => state.endpointsHistory);
  const eventDelay = useSelector((state) => state.eventDelay);

  const viewHistoryWord = () => {
    ref.current.blur();
    setTranslated(false);
    const index = Math.floor(Math.random() * endpointsHistory.length);
    const nr = endpointsHistory[index];
    const value = wordsList[nr];

    if (value) {
      const loadedWord = [];
      loadedWord.push({
        id: value.id,
        eng: value.eng,
        pl: value.pl,
        type: value.type,
      });
      setHistoryWord(...loadedWord);
    } else {
      console.log("No data available");
    }
    setIsLoading(false);
  };

  const letDisplayWord = () => {
    if (!viewing) {
      setViewing(true);
    }
  };

  const drawWordFromHistory = () => {
    setTimeout(() => {
      viewHistoryWord();
      letDisplayWord();
    }, [eventDelay]);
  };

  const onTranslate = () => {
    setTimeout(() => {
      setTranslated(true);
    }, [eventDelay]);
  };

  return (
    <PagesContent>
      <PagesTitle>Już znam</PagesTitle>
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
        <InitBtns onClick={drawWordFromHistory} ref={ref} disabled={isLoading}>
          {viewing ? "wyświetl kolejne" : "wyświetl słowo"}
        </InitBtns>
      )}
    </PagesContent>
  );
};
export default History;
