import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
// import Spinner from "../UI/reusable/Spinner";
import { useSelector } from "react-redux";
import { set, ref } from "firebase/database";
import { db } from "../../firebase";

const Main = () => {
  const currentUser = useSelector((state) => state.draw.currentUser);

  const word = {
    eng: "action",
    id: 10,
    pl: "działanie",
    type: "rzeczownik",
  };

  const addToInit = () =>
    set(ref(db, `initial/${word.eng}`), {
      ...word,
    });

  // fetch(
  //   `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/initial/${word.eng}.json`,
  //   {
  //     method: "PUT",
  //     body: JSON.stringify(word),
  //   }
  // )
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       throw new Error("Wystąpił błąd przy wysyłaniu");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (
    <PageContent>
      <PagesTitle>Strona główna</PagesTitle>
      {/* <button onClick={sendNewEndpoints}>DODAJ DO FOR-DRAW</button> */}
      <button onClick={addToInit}>DODAJ DO INITIAL</button>
    </PageContent>
  );
};
export default Main;
