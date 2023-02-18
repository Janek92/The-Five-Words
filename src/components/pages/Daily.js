import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../../store/words-slice";
import useError from "../../hooks/useError";
import wordsList from "../../data/wordsList";
import {
  PagesTitle,
  Spinner,
  PagesContent,
  TestInitBtns,
  Alert,
} from "../UI/reusable/reusable";
import DailyPreview from "../UI/DailyPreview";
import { set, ref } from "firebase/database";
import { firebase } from "../../firebase";

const Daily = () => {
  const dispatch = useDispatch();
  const { setError, setMalfunction } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [dailyToRender, setDailyToRender] = useState([]);
  const [dailyToSend, setDailyToSend] = useState([]);
  const [dailyWords, setDailyWords] = useState([]);

  const currentUser = useSelector((state) => state.currentUser);
  const wordsToPractice = useSelector((state) => state.wordsToPractice);
  const eventDelay = useSelector((state) => state.eventDelay);
  const endpointsDaily = useSelector((state) => state.endpointsDaily);
  const endpointsHistory = useSelector((state) => state.endpointsHistory);

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

  //Function for retrive single word. It will be used in loop
  const downloadMyWord = (nr) => {
    const value = wordsList[nr];
    if (value) {
      const word = [];
      word.push({
        eng: value.eng,
        pl: value.pl,
        id: value.id,
        type: value.type,
      });
      setDailyWords((prev) => [...prev, ...word]);
    } else {
      console.log("No data available");
    }
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
    set(ref(firebase.db, `users/${currentUser.uid}/practice`), {
      ...object,
    })
      .then(() => {
        dispatch(wordsActions.savePractice(object));
        localStorage.setItem(`practice`, JSON.stringify(object));
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setMalfunction();
      });
  };

  //Update daily endpoints in redux and send it to database
  const updateAndSendDaily = async () => {
    set(ref(firebase.db, `users/${currentUser.uid}/daily`), {
      ...dailyToSend,
    })
      .then(() => {
        setIsLoading(false);
        dispatch(wordsActions.saveDaily(dailyToSend));
        localStorage.setItem(`daily`, JSON.stringify(dailyToSend));
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setMalfunction();
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

      await set(ref(firebase.db, `users/${currentUser.uid}/history`), {
        ...historyToSend,
      })
        .then(() => {
          // localStorage.removeItem(`daily-${currentUser.uid}`);
          setDailyWords([]);
          dispatch(wordsActions.saveHistory(historyToSend));
          localStorage.setItem(`history`, JSON.stringify(historyToSend));
        })
        .catch((error) => {
          setError(error);
          setMalfunction();
        });

      await sendToPractice([]);
      await prepareToSendAndRender();
    }, [eventDelay]);
  };

  return (
    <PagesContent>
      <PagesTitle>Dzisiejsze</PagesTitle>
      {isLoading ? (
        <Spinner />
      ) : endpointsDaily.length === 0 && dailyWords.length === 0 ? (
        <Alert>brak słów w powtórkach</Alert>
      ) : dailyWords.length === 0 ? (
        <TestInitBtns onClick={onInit} disabled={isLoading}>
          pobierz słowa
        </TestInitBtns>
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
        <TestInitBtns
          version="more columns"
          onClick={finishRepeats}
          disabled={isLoading}
        >
          dodaj do historii
        </TestInitBtns>
      ) : null}
    </PagesContent>
  );
};
export default Daily;

// version="more columns"
