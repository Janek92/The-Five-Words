import { drawWordsActions } from "./words-slice";
import { getDatabase, ref, get, child } from "firebase/database";
// import { getDatabase } from "firebase/database";
// import { db } from "../../firebase";

// const db = getDatabase();
// const dbRef = ref(getDatabase());
// const dbRef = ref(db);

const fetchHandler = (endpoints, dispatch, actionName, userId) => {
  // const db = getDatabase();
  // const dbRef = ref(db);
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/${endpoints}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const res = snapshot.val();
        if (res === null) {
          dispatch(actionName([]));
        } else {
          dispatch(actionName(res));
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => console.log(error));
};

export const downloadEndpoints = (userId) => {
  return async (dispatch) => {
    fetchHandler("for-draw", dispatch, drawWordsActions.saveFetched, userId);

    // get(child(dbRef, `users/${userId}/for-draw`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const res = snapshot.val();
    //       if (res === null) {
    //         dispatch(drawWordsActions.saveFetched([]));
    //       } else {
    //         dispatch(drawWordsActions.saveFetched(res));
    //       }
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/for-draw.json`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error("Wystąpił błąd przy pobieraniu");
    //     }
    //   })
    //   .then((res) => {
    //     if (res === null) {
    //       dispatch(drawWordsActions.saveFetched([]));
    //     } else {
    //       dispatch(drawWordsActions.saveFetched(res));
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };
};

export const downloadEndpointsDaily = (userId) => {
  return async (dispatch) => {
    fetchHandler("daily", dispatch, drawWordsActions.saveDaily, userId);

    // get(child(dbRef, `users/${userId}/daily`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const res = snapshot.val();
    //       if (res === null) {
    //         dispatch(drawWordsActions.saveDaily([]));
    //       } else {
    //         dispatch(drawWordsActions.saveDaily(res));
    //       }
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/daily.json`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error("Wystąpił błąd przy pobieraniu");
    //     }
    //   })
    //   .then((res) => {
    //     if (res === null) {
    //       dispatch(drawWordsActions.saveDaily([]));
    //     } else {
    //       dispatch(drawWordsActions.saveDaily(res));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

export const downloadEndpointsHistory = (userId) => {
  return async (dispatch) => {
    fetchHandler("history", dispatch, drawWordsActions.saveHistory, userId);

    // get(child(dbRef, `users/${userId}/history`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const res = snapshot.val();
    //       if (res === null) {
    //         dispatch(drawWordsActions.saveHistory([]));
    //       } else {
    //         dispatch(drawWordsActions.saveHistory(res));
    //       }
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // fetch(
    //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/history.json`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error("Wystąpił błąd przy pobieraniu");
    //     }
    //   })
    //   .then((res) => {
    //     if (res === null) {
    //       dispatch(drawWordsActions.saveHistory([]));
    //     } else {
    //       dispatch(drawWordsActions.saveHistory(res));
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };
};
