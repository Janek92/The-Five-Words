import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import useError from "../hooks/useError";
import basicWordsList from "../data/words";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import DailyPreview from "../UI/DailyPreview";
import Spinner from "../UI/reusable/Spinner";
import { set, ref, get, child } from "firebase/database";
import { db, dbRef } from "../../firebase";

const Daily = () => {
  const dispatch = useDispatch();
  const { retriveError, turnOnMalfunction } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [dailyToRender, setDailyToRender] = useState([]);
  const [dailyToSend, setDailyToSend] = useState([]);
  const [dailyWords, setDailyWords] = useState([]);

  const currentUser = useSelector((state) => state.draw.currentUser);
  const wordsToPractice = useSelector((state) => state.draw.wordsToPractice);
  const eventDelay = useSelector((state) => state.draw.eventDelay);
  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);
  const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

  //Manipulate the daily endpoints in order to prepare the earliest 5 added amongst of them to display (or all if total is less or equal 5)
  const prepareToSendAndRender = () => {
    const endpoints = [...endpointsDaily];
    if (endpoints.length <= 5) {
      setDailyToRender([...endpoints]);
      setDailyToSend([]);
    } else {
      const wordsToRender = endpoints.slice(0, 5);
      setDailyToRender([...wordsToRender]);
      const wordsToSendBack = endpoints.slice(5, endpoints.length);
      setDailyToSend(wordsToSendBack);
    }
  };

  //Function for download single word. It will be used in loop
  const downloadMyWord = async (nr) => {
    const specifiedWord = basicWordsList[nr];
    get(child(dbRef, `initial/${specifiedWord}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const word = [];
          word.push({
            eng: res.eng,
            pl: res.pl,
            id: res.id,
            type: res.type,
          });
          setDailyWords((prev) => [...prev, ...word]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        retriveError(error);
        turnOnMalfunction();
      });
  };

  useEffect(() => {
    prepareToSendAndRender();
    if (dailyWords.length !== 0) return;
    wordsToPractice.map((nr) => downloadMyWord(nr));
  }, []);

  //Loop for download proper words
  const getWords = async () => {
    setIsLoading(true);
    dailyToRender.map((nr) => downloadMyWord(nr));
  };

  const sendToPractice = async (object) => {
    set(ref(db, `users/${currentUser.uid}/practice`), {
      ...object,
    })
      .then(() => {
        dispatch(drawWordsActions.savePractice(object));
        localStorage.setItem(`practice`, JSON.stringify(object));
      })
      .catch((error) => {
        setIsLoading(false);
        retriveError(error);
        turnOnMalfunction();
      });
  };

  //Update daily endpoints in redux and send it to database
  const updateAndSendDaily = async () => {
    set(ref(db, `users/${currentUser.uid}/daily`), {
      ...dailyToSend,
    })
      .then(() => {
        setIsLoading(false);
        dispatch(drawWordsActions.saveDaily(dailyToSend));
        localStorage.setItem(`daily`, JSON.stringify(dailyToSend));
      })
      .catch((error) => {
        setIsLoading(false);
        retriveError(error);
        turnOnMalfunction();
      });
  };

  //This function handles displaying words from init button
  const onInit = () => {
    setTimeout(async () => {
      await getWords();
      await sendToPractice(dailyToRender);
      await updateAndSendDaily();
    }, [eventDelay]);
  };

  const finishRepeats = () => {
    setTimeout(async () => {
      // const newWordsToHistory = dailyWords.map((word) => word.eng);
      const newWordsToHistory = dailyWords.map((word) => word.id);
      const historyToSend = [...endpointsHistory, ...newWordsToHistory];

      await set(ref(db, `users/${currentUser.uid}/history`), {
        ...historyToSend,
      })
        .then(() => {
          // localStorage.removeItem(`daily-${currentUser.uid}`);
          setDailyWords([]);
          dispatch(drawWordsActions.saveHistory(historyToSend));
          localStorage.setItem(`history`, JSON.stringify(historyToSend));
        })
        .catch((error) => {
          retriveError(error);
          turnOnMalfunction();
        });

      await sendToPractice([]);
      await prepareToSendAndRender();
    }, [eventDelay]);
  };

  return (
    <PageContent>
      <PagesTitle>Dzisiejsze</PagesTitle>
      {isLoading ? (
        <Spinner />
      ) : endpointsDaily.length === 0 && dailyWords.length === 0 ? (
        <Alert>brak słów w powtórkach</Alert>
      ) : dailyWords.length === 0 ? (
        <InitBtns onClick={onInit} disabled={isLoading}>
          pobierz słowa
        </InitBtns>
      ) : (
        dailyWords.map((el) => (
          <DailyPreview
            key={Math.random().toFixed(5)}
            polish={el.pl}
            english={el.eng}
            type={el.type}
          />
        ))
      )}
      {dailyWords.length !== 0 ? (
        <InitBtns moreColumns onClick={finishRepeats} disabled={isLoading}>
          dodaj do historii
        </InitBtns>
      ) : null}
    </PageContent>
  );
};
export default Daily;
