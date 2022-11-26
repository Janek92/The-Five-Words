import { useState, useEffect } from "react";
import PagesTitle from "../UI/PagesTitle";
import InitBtns from "../UI/InitBtns";
import DailyPreview from "../UI/DailyPreview";

const Daily = () => {
  let dailyLocalStorage = JSON.parse(localStorage.getItem("daily"));
  dailyLocalStorage === null
    ? (dailyLocalStorage = [])
    : (dailyLocalStorage = dailyLocalStorage);

  const [dailyWords, setDailyWords] = useState([...dailyLocalStorage]);

  const [endpoints, setEndpoints] = useState([]);

  const downloadEndpoints = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Nie można pobrać "moich słówek"');
        }
      })
      .then((res) => {
        const myWordsTotal = [...res];
        let myWordsCut = [];
        if (myWordsTotal.length <= 5) {
          setEndpoints([...myWordsTotal]);
        } else {
          myWordsCut = myWordsTotal.slice(0, 5);
          setEndpoints([...myWordsCut]);
        }
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    downloadEndpoints();
  }, []);

  useEffect(() => {
    localStorage.setItem("daily", JSON.stringify(dailyWords));
  }, [dailyWords]);

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

  const getWords = async () => {
    endpoints.map((word) => downloadMyWord(word));
  };

  const onInit = async () => {
    try {
      await getWords();
    } catch {
      alert("Wystąpił błąd");
    }
  };

  //Metody dla dodawania do historii:

  const delFromLs = () => {
    localStorage.removeItem("daily");
    setDailyWords([]);
    //usunąć i wrzucic do daily
    //usunięte wrzucic do historii
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
        <button onClick={delFromLs}>dodaj do historii</button>
      ) : null}
    </div>
  );
};
export default Daily;
