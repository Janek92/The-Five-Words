import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import { useEffect, useState } from "react";
import WordPreview from "../UI/WordPreview";

const NewWords = () => {
  const dispatch = useDispatch();
  const endPoints = useSelector((state) => state.draw.endPoints);
  const endPointsFiltered = useSelector(
    (state) => state.draw.endPointsFiltered
  );
  const [fetchedWord, setFetchedWord] = useState([]);
  const [translated, SetTranslated] = useState(false);

  //losowanie indeksu
  const onDraw = () => {
    const nr = Math.floor(Math.random() * endPoints.length);
    console.log(endPoints.length);
    return nr;
  };

  const whichWord = (value) => {
    return endPoints[value];
  };

  //wysyłanie nowej tablicy z linkami
  const onSend = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/for-draw.json",
      {
        method: "PUT",
        body: JSON.stringify(endPoints),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy wysyłaniu");
        }
      })
      .then((res) => {
        console.log("Nowa tablica słówek do losowania wysłana z powodzeniem");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //pobranie przed wylosowaniem, to samo co w useEffect
  const takeWordsForDraw = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/for-draw.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy pobieraniu");
        }
      })
      .then((res) => {
        console.log(res);
        dispatch(drawWordsActions.wordsForFetch(res));
      })
      .catch((error) => console.log(error));
  };

  // useEffect żeby pobrać po wejsciu w komponent
  useEffect(() => {
    takeWordsForDraw();
  }, []);

  useEffect(() => {
    if (fetchedWord.length === 0) return;
    console.log(fetchedWord);
    //TUTAJ COS CO RENDERUJE KOMPONENT ZE SŁÓWKIEM
  }, [fetchedWord]);

  //______POBRANIE SŁOWA
  const takeSpecificWord = (value) => {
    SetTranslated(false);
    //Przefiltrowanie aktualnej listy endpointów w celu usunięcia z niej wylosowanego endpointa:
    const filtered = endPoints.filter((el) => el !== value);
    dispatch(drawWordsActions.saveFiltered(filtered));
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
        console.log(loadedWord);
        setFetchedWord(...loadedWord);
      })
      .catch((error) => alert(error.name));
  };

  const onGenerate = async () => {
    try {
      // await takeWordsForDraw();
      const value = await whichWord(onDraw());
      await takeSpecificWord(value);
    } catch {
      alert("Wystapił błąd");
    }
  };
  //_________________________

  // const activist = {
  //   eng: "activist",
  //   id: 32,
  //   pl: "aktywista",
  //   type: "rzeczownik",
  // };

  // const placeWord = () => {
  //   fetch(
  //     "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/activist.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(activist),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error("Wystąpił błąd przy wysyłaniu");
  //       }
  //     })
  //     .then((res) => {
  //       console.log("Nowa tablica słówek do losowania wysłana z powodzeniem");
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const translate = () => {
    SetTranslated(true);
    // console.log(endPointsFiltered);
    // console.log(endPoints);
  };

  // console.log(fetchedWord.length === 0);

  return (
    <div>
      <h1>Nowe słówka</h1>
      <button onClick={onSend}>Wrzuć listę słów</button>
      {/* <button onClick={placeWord}>wrzuć słowo</button> */}
      <button onClick={onGenerate}>WYGENERUJ</button>
      <WordPreview
        polish={fetchedWord.pl}
        type={fetchedWord.type}
        translated={translated}
        eng={fetchedWord.eng}
        onTranslate={translate}
      />
    </div>
  );
};
export default NewWords;
