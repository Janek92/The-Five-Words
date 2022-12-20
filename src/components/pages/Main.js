import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import Spinner from "../UI/reusable/Spinner";
import { useSelector } from "react-redux";

const Main = () => {
  const currentUser = useSelector((state) => state.draw.currentUser);
  const allWords = [
    "abandon",
    "ability",
    "able",
    "abortion",
    "about",
    "above",
    "abroad",
    "absence",
    "absolute",
    "absolutely",
    "absorb",
    "abuse",
    "academic",
    "accept",
    "access",
    "accident",
    "accompany",
    "accomplish",
    "according",
    "account",
    "accurate",
    "accuse",
    "achieve",
    "achievement",
    "acid",
    "acknowledge",
    "acquire",
    "across",
    "act",
    "action",
    "active",
    "activist",
  ];

  const sendNewEndpoints = () => {
    fetch(
      `https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/for-draw.json`,
      {
        method: "PUT",
        body: JSON.stringify(allWords),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd przy wysyłaniu");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <PageContent>
      <PagesTitle>Strona główna</PagesTitle>
      <button onClick={sendNewEndpoints}>DODAJ DO FOR-DRAW</button>
    </PageContent>
  );
};
export default Main;
