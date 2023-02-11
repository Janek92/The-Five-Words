import { set, ref } from "firebase/database";
import { firebase } from "../firebase";
import wordsList from "./wordsList.json";

const basicListLength = { number: wordsList.length };
export const sendNewEndpoints = (userId) => {
  set(ref(firebase.db, `users/${userId}/for-draw`), {
    ...basicListLength,
  });
};

export default wordsList;
