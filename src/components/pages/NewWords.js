import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import PageContent from "../UI/reusable/PageContent";
import NewWordsPreview from "../UI/NewWordsPreview";
import PagesTitle from "../UI/reusable/PagesTitle";
import InitBtns from "../UI/reusable/InitBtns";
import Alert from "../UI/reusable/Alert";
import { set, ref, get, child } from "firebase/database";
import { db } from "../../firebase";

const NewWords = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.draw.currentUser);

  const eventDelay = useSelector((state) => state.draw.eventDelay);

  const endpoints = useSelector((state) => state.draw.endpoints);

  const [endpointsFiltered, setEndpointsFiltered] = useState([]);

  const endpointsDaily = useSelector((state) => state.draw.endpointsDaily);

  const [fetchedWord, setFetchedWord] = useState([]);

  const [translated, setTranslated] = useState(false);

  const btnAddRef = useRef();

  const btnRejectRef = useRef();

  //Function to send endpoints without added or rejected word
  const sendNewEndpoints = () => {
    set(ref(db, `users/${currentUser.uid}/for-draw`), {
      ...endpointsFiltered,
    });
    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/for-draw.json`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(endpointsFiltered),
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error(res.status);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
    setTranslated(false);
    const filtered = endpointsArray.filter((el) => el !== value);
    setEndpointsFiltered(filtered);

    const dbRef = ref(db);
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
          console.log("No data available");
          setFetchedWord([]);
        }
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${value}.json`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res;
    //     } else {
    //       throw new Error(res.status);
    //     }
    //   })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     const loadedWord = [];
    //     loadedWord.push({
    //       id: res.id,
    //       eng: res.eng,
    //       pl: res.pl,
    //       type: res.type,
    //     });
    //     setFetchedWord(...loadedWord);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     setIsLoading(false);
    //   });
  };

  //Update daily endpoints in redux and send it to database
  const addMyWord = async () => {
    setTranslated(false);
    const dailyWords = [...endpointsDaily];
    dailyWords.push(fetchedWord.eng);
    set(ref(db, `users/${currentUser.uid}/daily`), {
      ...dailyWords,
    })
      .then(() => {
        //In case of failed send, endpoints in application memory stays as before drawing
        dispatch(drawWordsActions.saveDaily(dailyWords));
        // return res.json();
      })
      .catch((error) => {
        console.error(error.name);
      });

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/daily.json`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(dailyWords),
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       //In case of failed send, endpoints in application memory stays as before drawing
    //       dispatch(drawWordsActions.saveDaily(dailyWords));
    //       // return res.json();
    //     } else {
    //       throw new Error(res.status);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error.name);
    //   });
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
