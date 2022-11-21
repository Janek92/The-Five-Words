import PagesTitle from "../UI/PagesTitle";
import InitBtns from "../UI/InitBtns";

const Daily = () => {
  const downloadMyWords = () => {
    fetch(
      "https://five-words-production-default-rtdb.europe-west1.firebasedatabase.app/my-words.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Nie można pobrać "moich słówek"');
        }
      })
      .then((res) => {
        console.log(res);
        const myWordsTotal = [];
        for (const key in res) {
          myWordsTotal.push({
            eng: res[key].eng,
            id: res[key].id,
            pl: res[key].pl,
            type: res[key].type,
          });
        }
        console.log(myWordsTotal);
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <PagesTitle>Dzisiejsze</PagesTitle>
      <InitBtns onClick={downloadMyWords}>pobierz słowa</InitBtns>
    </div>
  );
};
export default Daily;
