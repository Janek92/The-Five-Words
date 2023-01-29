import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../../store/words-slice";
import { downloadEndpoints } from "../../store/words-actions";
import useError from "../hooks/useError";
import wordsList from "../../data/wordsList";
import PageContent from "../UI/reusable/PageContent";
import NewWordsPreview from "../UI/NewWordsPreview";
import PagesTitle from "../UI/reusable/PagesTitle";
import InitBtns from "../UI/reusable/InitBtns";
import Alert from "../UI/reusable/Alert";
import { set, ref } from "firebase/database";
import { db } from "../../firebase";

const NewWords = () => {
  const dispatch = useDispatch();
  const { retriveError, turnOnMalfunction } = useError();

  const btnAddRef = useRef();
  const btnRejectRef = useRef();

  const [fetchedWord, setFetchedWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [reducedEndpoints, setReducedEndpoints] = useState(0);
  const [endOfWords, setEndOfWords] = useState(false);

  const currentUser = useSelector((state) => state.words.currentUser);
  const eventDelay = useSelector((state) => state.words.eventDelay);
  const endpoints = useSelector((state) => state.words.endpoints);
  const endpointsDaily = useSelector((state) => state.words.endpointsDaily);

  useEffect(() => {
    dispatch(downloadEndpoints(currentUser.uid));
    return () => {
      dispatch(downloadEndpoints(currentUser.uid));
    };
  }, []);

  const takeSpecificWord = (number) => {
    setIsLoading(true);
    setTranslated(false);
    const value = wordsList[number - 1];

    if (value) {
      const loadedWord = [];
      loadedWord.push({
        id: value.id,
        eng: value.eng,
        pl: value.pl,
        type: value.type,
      });
      setFetchedWord(...loadedWord);
    } else {
      setFetchedWord([]);
      setEndOfWords(true);
    }
    setReducedEndpoints((prev) => prev - 1);
    setIsLoading(false);
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
        dispatch(wordsActions.saveDaily(dailyWords));
        localStorage.setItem(`daily`, JSON.stringify(dailyWords));
      })
      .catch((error) => {
        retriveError(error);
        turnOnMalfunction();
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
      dispatch(wordsActions.saveFetched(reducedEndpoints + 1));
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
        setIsLoading(false);
        retriveError(error);
        turnOnMalfunction();
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
        <Alert>Poznałaś/eś już wszystkie słowa!</Alert>
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
