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

  // const downloadEndpoints = () => {
  //   fetch(
  //     "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json"
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error('Nie można pobrać "moich słówek"');
  //       }
  //     })
  //     .then((res) => {
  //       const myWordsTotal = [...res];
  //       let myWordsCut = [];
  //       if (myWordsTotal.length <= 5) {
  //         setDailyToRender([...myWordsTotal]);
  //         setDailyToSend([]);
  //       } else {
  //         myWordsCut = myWordsTotal.slice(0, 5);
  //         setDailyToRender([...myWordsCut]);
  //         const wordsCut = myWordsTotal.slice(
  //           myWordsTotal.length - 1,
  //           myWordsTotal.length
  //         );
  //         setDailyToSend(wordsCut);
  //       }
  //     })
  //     .catch((error) => alert(error));
  // };

  useEffect(() => {
    // downloadEndpoints();endpointsDaily
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
    dailyToRender.map((word) => downloadMyWord(word));
  };

  const sendFilteredDaily = async () => {
    console.log(dailyToSend);
    //Tutaj dispatchować daily oraz wysłać do database do daily dailyToSend:
    // dispatch(drawWordsActions.saveDaily(dailyToSend));
  };

  const onInit = async () => {
    try {
      await getWords();
      await sendFilteredDaily();
    } catch {
      alert("Wystąpił błąd");
    }
  };

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
