import { set, ref } from "firebase/database";
import { db } from "../../firebase";

const basicWordsList = [];

const basicListLength = { number: basicWordsList.length };

export const sendNewEndpoints = (userId) => {
  set(ref(db, `users/${userId}/for-draw`), {
    ...basicListLength,
  });
};

export default basicWordsList;
