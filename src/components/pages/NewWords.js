import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import { downloadEndpoints } from "../../store/words-actions";
import basicWordsList from "../data/words";
import PageContent from "../UI/reusable/PageContent";
import NewWordsPreview from "../UI/NewWordsPreview";
import PagesTitle from "../UI/reusable/PagesTitle";
import InitBtns from "../UI/reusable/InitBtns";
import Alert from "../UI/reusable/Alert";
import { set, ref, get, child } from "firebase/database";
import { db, dbRef } from "../../firebase";

const NewWords = () => {
  const dispatch = useDispatch();

  const btnAddRef = useRef();
  const btnRejectRef = useRef();

  const [fetchedWord, setFetchedWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [reducedEndpoints, setReducedEndpoints] = useState(0);
  const [endOfWords, setEndOfWords] = useState(false);

  const currentUser = useSelector((state) => state.draw.currentUser);
  const eventDelay = useSelector((state) => state.draw.eventDelay);
  const endpoints = useSelector((state) => state.draw.endpoints);
  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  useEffect(() => {
    dispatch(downloadEndpoints(currentUser.uid));
  }, []);

  //Fetch specific word
  const takeSpecificWord = (number) => {
    setIsLoading(true);
    setTranslated(false);
    const value = basicWordsList[number - 1];

    get(child(dbRef, `initial/${value}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const loadedWord = [];
          loadedWord.push({
            id: res.id,
            eng: res.eng,
            pl: res.pl,
            type: res.type,
          });
          setFetchedWord(...loadedWord);
          setIsLoading(false);
        } else {
          setFetchedWord([]);
          setEndOfWords(true);
        }
        setReducedEndpoints((prev) => prev - 1);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  //Update daily endpoints in redux and send it to database
  const addMyWord = async () => {
    btnAddRef.current.blur();
    setIsLoading(true);
    setTranslated(false);
    const dailyWords = [...endpointsDaily];
    dailyWords.push(fetchedWord.id);
    set(ref(db, `users/${currentUser.uid}/daily`), {
      ...dailyWords,
    })
      .then(() => {
        //In case of failed send, endpoints in application memory stays as before drawing
        dispatch(drawWordsActions.saveDaily(dailyWords));
        localStorage.setItem(`daily`, JSON.stringify(dailyWords));
      })
      .catch((error) => {
        console.error(error.name);
      });
  };

  //First drawing of word after enter to component
  const onGenerate = () => {
    setTimeout(async () => {
      setReducedEndpoints(endpoints);
      await takeSpecificWord(endpoints);
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
      dispatch(drawWordsActions.saveFetched(reducedEndpoints + 1));
      localStorage.setItem(`for-draw`, reducedEndpoints + 1);
    }, [eventDelay]);
  };

  const updateBackend = async () => {
    const basicListLength = { number: reducedEndpoints };
    set(ref(db, `users/${currentUser.uid}/for-draw`), {
      ...basicListLength,
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.name);
        setIsLoading(false);
      });
  };

  //This function handles events after rejection a word
  const onReject = () => {
    setTimeout(async () => {
      await updateBackend();
      await takeSpecificWord(reducedEndpoints);
    }, [eventDelay]);
  };

  //This function handles events after adding a word to daily repeats
  const onAdd = () => {
    setTimeout(async () => {
      await addMyWord();
      await updateBackend();
      await takeSpecificWord(reducedEndpoints);
    }, [eventDelay]);
  };

  return (
    <PageContent>
      <PagesTitle>Nowe słówka</PagesTitle>
      {endpoints === 0 || endOfWords ? (
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
        ></NewWordsPreview>
      ) : (
        <InitBtns onClick={onGenerate} disabled={isLoading}>
          wygeneruj
        </InitBtns>
      )}
    </PageContent>
  );
};
export default NewWords;
