import { PagesTitle, PagesContent } from "../UI/reusable/reusable";
import classes from "./HowToUse.module.scss";
import generateBtn from "../../assets/UI-elements/new-words/generate-btn-removebg.png";
import addBtn from "../../assets/UI-elements/new-words/add-removebg.png";
import omitBtn from "../../assets/UI-elements/new-words/omit-removebg.png";
import endBtn from "../../assets/UI-elements/new-words/end-btn-removebg.png";

const HowToUse = () => {
  return (
    <PagesContent>
      <PagesTitle>Jak używać aplikacji</PagesTitle>
      <div className={classes.step}>
        <div className={classes.number}>1</div>
        <p className={classes.description}>
          Aby zacząć korzystać z aplikacji, należy przejść do sekcji "
          <span className={classes.bold}>nowe</span>", a następnie wybrać
          przycisk "<span className={classes.bold}>wygeneruj</span>":
          <br />
          <img className={classes.img} src={generateBtn}></img>
        </p>
      </div>
      <div className={classes.step}>
        <div className={classes.number}>2</div>
        <p className={classes.description}>
          Wyświetlone słowo można pominąć klikając zielony przycisk wówczas nie
          pojawi się ono ponownie:
          <br />
          <img className={classes.img} src={omitBtn}></img>
          <br /> lub dodać do kolejki wybierając niebieski:
          <br />
          <img className={classes.img} src={addBtn}></img>
          <br />z której potem będzie można dodać do sekcji "
          <span className={classes.bold}>powtórki</span>
          ". Wybranie którejkolwiek z powyższych opcji losuje kolejne słowo. Aby
          zakończyć należy wybrać przycisk "
          <span className={classes.bold}>zakończ</span>" lub po prostu opuścić
          podstronę. <br />
          <img className={classes.img} src={endBtn}></img>
        </p>
      </div>
      <div className={classes.step}>
        <div className={classes.number}>3</div>
        <p className={classes.description}>
          {" "}
          Sekcja "<span className={classes.bold}>powtórki</span>" służy do
          wyświetlania powtórek w formie listy do 5 słów, tak aby można było je
          szybko przyswoić. Po zakończeniu należy dodać słówka do archiwum.
          Można je przejrzeć w sekcji "
          <span className={classes.bold}>już znam</span>".
        </p>
      </div>
    </PagesContent>
  );
};
export default HowToUse;
