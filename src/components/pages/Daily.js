import { useState } from "react";
import PagesTitle from "../UI/PagesTitle";
import InitBtns from "../UI/InitBtns";
import DailyPreview from "../UI/DailyPreview";

const Daily = () => {
  let dailyLocalStorage = JSON.parse(localStorage.getItem("daily"));
  dailyLocalStorage === null
    ? (dailyLocalStorage = [])
    : (dailyLocalStorage = dailyLocalStorage);

  const [dailyWords, setDailyWords] = useState([...dailyLocalStorage]);

  const downloadMyWords = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/my-words.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Nie można pobrać "moich słówek"');
        }
      })
      .then((res) => {
        console.log(res);
        const myWordsTotal = [];
        let myWordsCut = [];
        for (const key in res) {
          myWordsTotal.push({
            eng: res[key].eng,
            id: res[key].id,
            pl: res[key].pl,
            type: res[key].type,
          });
        }
        if (myWordsTotal.length < 5) {
          localStorage.setItem("daily", JSON.stringify(myWordsTotal));
          setDailyWords([...myWordsTotal]);
        } else {
          myWordsCut = myWordsTotal.slice(
            myWordsTotal.length - 5,
            myWordsTotal.length
          );
          localStorage.setItem("daily", JSON.stringify(myWordsCut));
          setDailyWords([...myWordsCut]);
        }
      })
      .catch((error) => alert(error));
  };

  const delFromLs = () => {
    localStorage.removeItem("daily");
    setDailyWords([]);
  };

  return (
    <div>
      <PagesTitle>Dzisiejsze</PagesTitle>
      {dailyWords.length === 0 ? (
        <InitBtns onClick={downloadMyWords}>pobierz słowa</InitBtns>
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
