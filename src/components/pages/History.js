import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import useError from "../../hooks/useError";
import wordsList from "../../data/wordsList";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import HistoryPreview from "../UI/HistoryPreview";

const History = () => {
  const initBtnRef = useRef();
  const { retriveError, turnOnMalfunction } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [historyWord, setHistoryWord] = useState([]);

  const endpointsHistory = useSelector((state) => state.endpointsHistory);
  const eventDelay = useSelector((state) => state.eventDelay);

  const downloadHistoryWord = () => {
    initBtnRef.current.blur();
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

  const drawWordFromHistory = async () => {
    setTimeout(async () => {
      await downloadHistoryWord();
      await letDisplayWord();
    }, [eventDelay]);
  };

  const onTranslate = () => {
    setTimeout(() => {
      setTranslated(true);
    }, [eventDelay]);
  };

  return (
    <PageContent>
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
        <InitBtns
          onClick={drawWordFromHistory}
          ref={initBtnRef}
          disabled={isLoading}
        >
          {viewing ? "wyświetl kolejne" : "wyświetl słowo"}
        </InitBtns>
      )}
    </PageContent>
  );
};
export default History;
