import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import useError from "../hooks/useError";
import basicWordsList from "../../data/words";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import HistoryPreview from "../UI/HistoryPreview";
import { get, child } from "firebase/database";
import { dbRef } from "../../firebase";

const History = () => {
  const initBtnRef = useRef();
  const { retriveError, turnOnMalfunction } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [historyWord, setHistoryWord] = useState([]);

  const endpointsHistory = useSelector((state) => state.words.endpointsHistory);
  const eventDelay = useSelector((state) => state.words.eventDelay);

  const downloadHistoryWord = () => {
    setIsLoading(true);
    initBtnRef.current.blur();
    setTranslated(false);
    const index = Math.floor(Math.random() * endpointsHistory.length);
    const nr = endpointsHistory[index];
    const word = basicWordsList[nr];

    get(child(dbRef, `initial/${word}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const loadedWord = [];
          loadedWord.push({
            id: res.id,
            eng: res.eng,
            pl: res.pl,
            type: res.type,
          });
          setHistoryWord(...loadedWord);
        } else {
          console.log("No data available");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        retriveError(error);
        turnOnMalfunction();
      });
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
