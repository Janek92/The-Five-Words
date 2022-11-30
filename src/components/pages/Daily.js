import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import PagesTitle from "../UI/PagesTitle";
import InitBtns from "../UI/InitBtns";
import DailyPreview from "../UI/DailyPreview";

const Daily = () => {
  const dispatch = useDispatch();
  let dailyLocalStorage = JSON.parse(localStorage.getItem("daily"));
  dailyLocalStorage === null
    ? (dailyLocalStorage = [])
    : (dailyLocalStorage = dailyLocalStorage);

  const [dailyWords, setDailyWords] = useState([...dailyLocalStorage]);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);
  const [dailyToRender, setDailyToRender] = useState([]);

  const [dailyToSend, setDailyToSend] = useState([]);

  const [historyEndpoints, setHistoryEndpoints] = useState([]);

  const [historyToSend, setHistoryToSend] = useState([]);

  //Manipulate the daily endpoints in order to prepare the earliest added of them to display
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

  //Function for set words to display into localStorage
  useEffect(() => {
    localStorage.setItem("daily", JSON.stringify(dailyWords));
  }, [dailyWords]);

  //Function for download single word
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
        console.log(error.name);
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
  //--Zająć się dodawaniem do historii
  const delFromLs = () => {
    localStorage.removeItem("daily");
    setDailyWords([]);
  };

  return (
    <div>
      <PagesTitle>Dzisiejsze</PagesTitle>
      {dailyWords.length === 0 ? (
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
        <InitBtns onClick={delFromLs}>dodaj do historii</InitBtns>
      ) : null}
    </div>
  );
};
export default Daily;
