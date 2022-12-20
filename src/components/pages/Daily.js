import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import DailyPreview from "../UI/DailyPreview";
import Spinner from "../UI/reusable/Spinner";

const Daily = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.draw.currentUser);

  let dailyLocalStorage = JSON.parse(
    localStorage.getItem(`daily-${currentUser.uid}`)
  );
  dailyLocalStorage === null
    ? (dailyLocalStorage = [])
    : (dailyLocalStorage = dailyLocalStorage);
  //5 or less words directly rendering
  const [dailyWords, setDailyWords] = useState([...dailyLocalStorage]);

  const eventDelay = useSelector((state) => state.draw.eventDelay);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

  const [dailyToRender, setDailyToRender] = useState([]);

  const [dailyToSend, setDailyToSend] = useState([]);

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
  useEffect(() => {
    prepareToSendAndRender();
  }, []);

  //Function for put 'words to display' into localStorage
  useEffect(() => {
    localStorage.setItem(
      `daily-${currentUser.uid}`,
      JSON.stringify(dailyWords)
    );
  }, [dailyWords]);

  //Function for download single word. It will be used in loop
  const downloadMyWord = async (word) => {
    setIsLoading(true);
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${word}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => {
        const word = [];
        for (const key in res) {
          word.push({
            eng: res[key].eng,
            pl: res[key].pl,
            id: res[key].id,
            type: res[key].type,
          });
        }
        setDailyWords((prev) => [...prev, ...word]);
      })
      .catch((error) => {
        alert(error.name);
        setIsLoading(false);
      });
  };

  //Loop for download proper words
  const getWords = async () => {
    dailyToRender.map((word) => downloadMyWord(word));
  };

  //Update daily endpoints in redux and send it to database
  const updateAndSendDaily = async () => {
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/daily.json`,
      { method: "PUT", body: JSON.stringify(dailyToSend) }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          dispatch(drawWordsActions.saveDaily(dailyToSend));
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((error) => {
        alert(error.name);
        setIsLoading(false);
      });
  };

  //This function handles displaying words from init button
  const onInit = () => {
    setTimeout(async () => {
      await getWords();
      await updateAndSendDaily();
    }, [eventDelay]);
  };

  const finishRepeats = () => {
    setTimeout(async () => {
      const newWordsToHistory = dailyWords.map((word) => word.eng);
      const historyToSend = [...endpointsHistory, ...newWordsToHistory];
      await fetch(
        `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/history.json`,
        {
          method: "PUT",
          body: JSON.stringify(historyToSend),
        }
      )
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem(`daily-${currentUser.uid}`);
            setDailyWords([]);
            dispatch(drawWordsActions.saveHistory(historyToSend));
            return res.json();
          } else {
            throw new Error(res.status);
          }
        })
        .catch((error) => alert(error.name));
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
        <InitBtns onClick={finishRepeats} disabled={isLoading}>
          dodaj do historii
        </InitBtns>
      ) : null}
    </PageContent>
  );
};
export default Daily;
