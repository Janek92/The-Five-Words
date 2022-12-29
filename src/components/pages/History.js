import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import HistoryPreview from "../UI/HistoryPreview";
import { set, ref, get, child } from "firebase/database";
import { db } from "../../firebase";

const History = () => {
  const [isLoading, setIsLoading] = useState(false);

  const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

  const eventDelay = useSelector((state) => state.draw.eventDelay);

  const [viewing, setViewing] = useState(false);

  const [historyWord, setHistoryWord] = useState([]);

  const [translated, setTranslated] = useState(false);

  const initBtnRef = useRef();

  const downloadHistoryWord = () => {
    setIsLoading(true);
    initBtnRef.current.blur();
    setTranslated(false);
    const index = Math.floor(Math.random() * endpointsHistory.length);
    const word = endpointsHistory[index];

    const dbRef = ref(db);
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
          setIsLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        alert(error.name);
        setIsLoading(false);
      });

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${word}.json`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error(res.status);
    //     }
    //   })
    //   .then((res) => {
    //     const loadedWord = [];
    //     loadedWord.push({
    //       id: res.id,
    //       eng: res.eng,
    //       pl: res.pl,
    //       type: res.type,
    //     });
    //     setHistoryWord(...loadedWord);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     alert(error.name);
    //     setIsLoading(false);
    //   });
  };

  const letDisplayWord = () => {
    if (!viewing) {
      setViewing(true);
    }
  };

  const drawWordFromHistory = async () => {
    setTimeout(async () => {
      try {
        await downloadHistoryWord();
        await letDisplayWord();
      } catch {
        alert("Wystąpił problem");
      }
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
