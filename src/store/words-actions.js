import { drawWordsActions } from "./words-slice";
import { getDatabase, ref, get, child } from "firebase/database";

const fetchHandler = (endpoints, dispatch, actionName, userId) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/${endpoints}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const res = snapshot.val();
        dispatch(actionName(res));
        // if (res === null) {
        //   dispatch(actionName([]));
        // } else {
        //   dispatch(actionName(res));
        // }
      } else {
        dispatch(actionName([]));
        // console.log("No data available");
      }
    })
    .catch((error) => console.log(error));
};

export const downloadEndpoints = (userId) => {
  return async (dispatch) => {
    fetchHandler("for-draw", dispatch, drawWordsActions.saveFetched, userId);
  };
};

export const downloadEndpointsDaily = (userId) => {
  return async (dispatch) => {
    fetchHandler("daily", dispatch, drawWordsActions.saveDaily, userId);
  };
};

export const downloadEndpointsHistory = (userId) => {
  return async (dispatch) => {
    fetchHandler("history", dispatch, drawWordsActions.saveHistory, userId);
  };
};

export const downloadPractice = (userId) => {
  return async (dispatch) => {
    fetchHandler("practice", dispatch, drawWordsActions.savePractice, userId);
  };
};
