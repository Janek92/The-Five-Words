import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import WordPreview from "../UI/WordPreview";
import PagesTitle from "../UI/PagesTitle";
import InitBtns from "../UI/InitBtns";

const NewWords = () => {
  const dispatch = useDispatch();

  const endpoints = useSelector((state) => state.draw.endpoints);

  const [endpointsFiltered, setEndpointsFiltered] = useState([]);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  const [fetchedWord, setFetchedWord] = useState([]);

  const [translated, setTranslated] = useState(false);

  const btnAddRef = useRef();

  const btnRejectRef = useRef();

  //Function to send endpoints without added or rejected word
  const sendNewEndpoints = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/for-draw.json",
      {
        method: "PUT",
        body: JSON.stringify(endpointsFiltered),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy wysyłaniu");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Drawing endpoint index. For use as argument in function "whichWord"
  const drawIndex = (endpointsArray) => {
    const nr = Math.floor(Math.random() * endpointsArray.length);
    return nr;
  };

  //Return proper endpoint regarding on drawn index
  const whichWord = (value, endpointsArray) => {
    return endpointsArray[value];
  };

  //Fetch specific word depending on drawn endpoint
  const takeSpecificWord = (value, endpointsArray) => {
    setTranslated(false);
    const filtered = endpointsArray.filter((el) => el !== value);
    setEndpointsFiltered(filtered);
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${value}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Problem z pobraniem słowa");
        }
      })
      .then((res) => {
        const loadedWord = [];
        for (const key in res) {
          loadedWord.push({
            id: res[key].id,
            eng: res[key].eng,
            pl: res[key].pl,
            type: res[key].type,
          });
        }
        setFetchedWord(...loadedWord);
      })
      .catch((error) => alert(error.name));
  };

  //Update daily endpoints in redux and send it to database
  const addMyWord = async () => {
    setTranslated(false);
    const dailyWords = [...endpointsDaily];
    dailyWords.push(fetchedWord.eng);
    dispatch(drawWordsActions.saveDaily(dailyWords));
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json`,
      {
        method: "PUT",
        body: JSON.stringify(dailyWords),
      }
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

  //First drawing of word after component entering
  const onGenerate = async () => {
    try {
      const value = await whichWord(drawIndex(endpoints), endpoints);
      await takeSpecificWord(value, endpoints);
    } catch {
      alert("Wystapił błąd");
    }
  };

  const onTranslate = () => {
    setTranslated(true);
  };

  const onClose = () => {
    setFetchedWord([]);
  };

  const updateAndDrawNext = async () => {
    try {
      await sendNewEndpoints();
      const value = whichWord(drawIndex(endpointsFiltered), endpointsFiltered);
      takeSpecificWord(value, endpointsFiltered);
      dispatch(drawWordsActions.saveFetched(endpointsFiltered));
    } catch {
      alert("Wystapił błąd");
    }
  };

  //This function handles events after rejection a word
  const onReject = async () => {
    btnRejectRef.current.blur();
    try {
      await updateAndDrawNext();
    } catch {
      alert("Wystapił błąd");
    }
  };

  //This function handles events after adding a word to daily repeats
  const onAdd = async () => {
    btnAddRef.current.blur();
    try {
      await addMyWord();
      await updateAndDrawNext();
    } catch {
      alert("Wystapił błąd");
    }
  };

  return (
    <div>
      <PagesTitle>Nowe słówka</PagesTitle>
      {fetchedWord.length !== 0 ? (
        <WordPreview
          polish={fetchedWord.pl}
          type={fetchedWord.type}
          translated={translated}
          eng={fetchedWord.eng}
          translate={onTranslate}
          close={onClose}
          reject={onReject}
          add={onAdd}
          btnAddRef={btnAddRef}
          btnRejectRef={btnRejectRef}
        />
      ) : (
        <InitBtns onClick={onGenerate}>wygeneruj</InitBtns>
      )}
    </div>
  );
};
export default NewWords;
