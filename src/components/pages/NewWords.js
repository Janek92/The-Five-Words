import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import PageContent from "../UI/reusable/PageContent";
import NewWordsPreview from "../UI/NewWordsPreview";
import PagesTitle from "../UI/reusable/PagesTitle";
import InitBtns from "../UI/reusable/InitBtns";
import Alert from "../UI/reusable/Alert";

const NewWords = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const eventDelay = useSelector((state) => state.draw.eventDelay);

  const endpoints = useSelector((state) => state.draw.endpoints);

  const [endpointsFiltered, setEndpointsFiltered] = useState([]);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  const [fetchedWord, setFetchedWord] = useState([]);

  const [translated, setTranslated] = useState(false);

  // let loading = false;

  const btnAddRef = useRef();

  const btnRejectRef = useRef();

  // const endpointsHistory = useSelector((state) => state.draw.endpointsHistory);

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
          throw new Error(res.status);
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
    setIsLoading(true);
    return endpointsArray[value];
  };

  //Fetch specific word depending on drawn endpoint
  const takeSpecificWord = (value, endpointsArray) => {
    // loading=true;
    setTranslated(false);
    const filtered = endpointsArray.filter((el) => el !== value);
    setEndpointsFiltered(filtered);
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${value}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => {
        return res.json();
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
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  //Update daily endpoints in redux and send it to database
  const addMyWord = async () => {
    setTranslated(false);
    const dailyWords = [...endpointsDaily];
    dailyWords.push(fetchedWord.eng);
    // dispatch(drawWordsActions.saveDaily(dailyWords));
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json`,
      {
        method: "PUT",
        body: JSON.stringify(dailyWords),
      }
    )
      .then((res) => {
        if (res.ok) {
          //In case of failed send, endpoints in application memory stays as before drawing
          dispatch(drawWordsActions.saveDaily(dailyWords));
          // return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .catch((error) => {
        console.error(error.name);
      });
    btnAddRef.current.blur();
  };

  //First drawing of word after component entering
  const onGenerate = () => {
    setTimeout(async () => {
      const value = await whichWord(drawIndex(endpoints), endpoints);
      await takeSpecificWord(value, endpoints);
    }, [eventDelay]);
  };

  const onTranslate = () => {
    setTimeout(() => {
      setTranslated(true);
    }, [eventDelay]);
  };

  const onClose = () => {
    setTimeout(() => {
      setFetchedWord([]);
    }, [eventDelay]);
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
    btnRejectRef.current.blur();
  };

  //This function handles events after rejection a word
  const onReject = () => {
    setTimeout(async () => {
      await updateAndDrawNext();
    }, [eventDelay]);
  };

  //This function handles events after adding a word to daily repeats
  const onAdd = () => {
    setTimeout(async () => {
      await addMyWord();
      await updateAndDrawNext();
    }, [eventDelay]);
  };

  return (
    <PageContent>
      <PagesTitle>Nowe słówka</PagesTitle>
      {endpoints.length === 0 && !fetchedWord ? (
        <Alert>Poznałeś już wszystkie słowa!</Alert>
      ) : fetchedWord.length !== 0 ? (
        <NewWordsPreview
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
          isLoading={isLoading}
        />
      ) : endpoints.length === 0 && fetchedWord.length === 0 ? (
        <Alert>Poznałeś już wszystkie słowa!</Alert>
      ) : (
        <InitBtns onClick={onGenerate} disabled={isLoading}>
          wygeneruj
        </InitBtns>
      )}
    </PageContent>
  );
};
export default NewWords;
