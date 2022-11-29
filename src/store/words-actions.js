import { drawWordsActions } from "./words-slice";

export const downloadEndpoints = () => {
  console.log("downloadEndpoints działa");
  return async (dispatch) => {
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
        if (res === null) {
          dispatch(drawWordsActions.saveFetched([]));
        } else {
          dispatch(drawWordsActions.saveFetched(res));
        }
      })
      .catch((error) => console.log(error));
  };
};

export const downloadEndpointsDaily = () => {
  console.log("downloadEndpointsDaily działa");
  return async (dispatch) => {
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/daily.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy pobieraniu");
        }
      })
      .then((res) => {
        if (res === null) {
          dispatch(drawWordsActions.saveDaily([]));
        } else {
          dispatch(drawWordsActions.saveDaily(res));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
