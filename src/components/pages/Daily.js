import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Alert from "../UI/reusable/Alert";
import InitBtns from "../UI/reusable/InitBtns";
import DailyPreview from "../UI/DailyPreview";

const Daily = () => {
  const dispatch = useDispatch();

  let dailyLocalStorage = JSON.parse(localStorage.getItem("daily"));
  dailyLocalStorage === null
    ? (dailyLocalStorage = [])
    : (dailyLocalStorage = dailyLocalStorage);

  const [dailyWords, setDailyWords] = useState([...dailyLocalStorage]);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

  //5 or less endpoints directly rendering
  const [dailyToRender, setDailyToRender] = useState([]);

  const [dailyToSend, setDailyToSend] = useState([]);

  // const [historyToSend, setHistoryToSend] = useState([]);

  //Manipulate the daily endpoints in order to prepare the earliest 5 added amongst of them to display (or all if total is less or equal 5)
  useEffect(() => {
    const myWordsTotal = [...endpointsDaily];
    let myWordsCut = [];
    if (myWordsTotal.length <= 5) {
      setDailyToRender([...myWordsTotal]);
      setDailyToSend([]);
    } else {
      myWordsCut = myWordsTotal.slice(0, 5);
      setDailyToRender([...myWordsCut]);
      const wordsCut = myWordsTotal.slice(
        myWordsTotal.length - 1,
        myWordsTotal.length
      );
      setDailyToSend(wordsCut);
    }
  }, []);

  //Function for put 'words to display' into localStorage
  useEffect(() => {
    localStorage.setItem("daily", JSON.stringify(dailyWords));
  }, [dailyWords]);

  //Function for download single word. It will be used in loop
  const downloadMyWord = async (word) => {
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${word}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Probem przy pobraniu słówka");
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
      .catch((error) => alert(error.name));
  };

  //Loop for download proper words
  const getWords = async () => {
    dailyToRender.map((word) => downloadMyWord(word));
  };

  //Update daily endpoints in redux and send it to database
  const updateAndSendDaily = async () => {
    dispatch(drawWordsActions.saveDaily(dailyToSend));
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json`,
      { method: "PUT", body: JSON.stringify(dailyToSend) }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy wysyłaniu");
        }
      })
      .catch((error) => {
        alert(error.name);
      });
  };

  //This function handles displaying words from init button
  const onInit = async () => {
    try {
      await getWords();
      await updateAndSendDaily();
    } catch {
      alert("Wystąpił błąd");
    }
  };

  const finishRepeats = () => {
    localStorage.removeItem("daily");
    setDailyWords([]);
    const newWordsToHistory = dailyWords.map((word) => word.eng);
    const historyToSend = [...endpointsHistory, ...newWordsToHistory];
    dispatch(drawWordsActions.saveHistory(historyToSend));
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/history.json",
      {
        method: "PUT",
        body: JSON.stringify(historyToSend),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Nie udało się wysłać");
        }
      })
      .then((res) => console.log(res))
      .catch((error) => alert(error.name));
  };

  return (
    <PageContent>
      <PagesTitle>Dzisiejsze</PagesTitle>
      {endpointsDaily.length === 0 && dailyWords.length === 0 ? (
        <Alert>brak słów w powtórkach</Alert>
      ) : dailyWords.length === 0 ? (
        <InitBtns onClick={onInit}>pobierz słowa</InitBtns>
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
        <InitBtns onClick={finishRepeats}>dodaj do historii</InitBtns>
      ) : null}
    </PageContent>
  );
};
export default Daily;
//Zrobić opóźnienia aktywacji funkcji po wciśnięciu przycisków w tym komponencie
