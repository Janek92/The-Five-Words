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

  return (
    <PageContent>
      <PagesTitle>Strona główna</PagesTitle>
      {/* <button onClick={sendNewEndpoints}>DODAJ DO FOR-DRAW</button> */}
      <button onClick={addToInit}>DODAJ DO INITIAL</button>
    </PageContent>
  );
};
export default Main;
