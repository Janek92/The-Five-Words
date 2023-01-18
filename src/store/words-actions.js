import { wordsActions } from "./words-slice";
import { getDatabase, ref, get, child } from "firebase/database";

const fetchHandler = (endpoints, dispatch, actionName, userId) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/${endpoints}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const res = snapshot.val();
        dispatch(actionName(res));
        localStorage.setItem(`${endpoints}`, JSON.stringify(res));
      } else {
        dispatch(actionName([]));
        localStorage.setItem(`${endpoints}`, JSON.stringify([]));
      }
    })
    .catch((error) => console.log(error));
};

export const downloadEndpoints = (userId) => {
  return async (dispatch) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/for-draw`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          dispatch(wordsActions.saveFetched(res.number));
          localStorage.setItem(`for-draw`, res.number);
        } else {
          dispatch(wordsActions.saveFetched(0));
          localStorage.setItem(`for-draw`, 0);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const downloadEndpointsDaily = (userId) => {
  return async (dispatch) => {
    fetchHandler("daily", dispatch, wordsActions.saveDaily, userId);
  };
};

export const downloadEndpointsHistory = (userId) => {
  return async (dispatch) => {
    fetchHandler("history", dispatch, wordsActions.saveHistory, userId);
  };
};

export const downloadPractice = (userId) => {
  return async (dispatch) => {
    fetchHandler("practice", dispatch, wordsActions.savePractice, userId);
  };
};
