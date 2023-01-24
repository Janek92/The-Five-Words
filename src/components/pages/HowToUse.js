import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import classes from "./HowToUse.module.css";
import generateBtn from "../../assets/UI-elements/new-words/generate-btn-removebg.png";
import addBtn from "../../assets/UI-elements/new-words/add-btn-removebg.png";
import omitBtn from "../../assets/UI-elements/new-words/omit-btn-removebg.png";
import endBtn from "../../assets/UI-elements/new-words/end-btn-removebg.png";

const HowToUse = () => {
  return (
    <PageContent>
      <PagesTitle>Jak używać aplikacji</PagesTitle>
      <p className={classes.description}>
        Aby zacząć korzystać z aplikacji, należy przejść do sekcji "
        <span className={classes["--bold"]}>nowe</span>", a następnie wybrać
        przycisk "<span className={classes["--bold"]}>wygeneruj</span>":
        <br />
        <img className={classes.img} src={generateBtn}></img>
        <br />
        Wyświetlone słowo można pominąć klikając przycisk "
        <span className={classes["--bold"]}>pomiń</span>" wówczas nie pojawi się
        ono ponownie:
        <br />
        <img className={classes.img} src={omitBtn}></img>
        <br /> lub dodać do kolejki wybierając "
        <span className={classes["--bold"]}>dodaj</span>":
        <br />
        <img className={classes.img} src={addBtn}></img>
        <br /> z której potem będzie można dodać do codziennych powtórek.
        Wybranie którejkolwiek z powyższych opcji losuje kolejne słowo. Aby
        zakończyć należy wybrać przycisk "
        <span className={classes["--bold"]}>zakończ</span>" lub po prostu
        opuścić podstronę.
        <br />
        <img className={classes.img} src={endBtn}></img>
        <br />
        Sekcja "<span className={classes["--bold"]}>dzisiejsze</span>" służy do
        wyświetlania powtórek w formie listy do 5 słów, tak aby można było je
        przyswoić w ciągu jednego dnia. Jest to możliwe tylko jeśli wcześniej
        dodano słowa w sekcji "<span className={classes["--bold"]}>nowe</span>".
        Po zakończeniu należy dodać słówka do historii. Można je przejrzeć w
        sekcji "<span className={classes["--bold"]}>już znam</span>".
      </p>
    </PageContent>
  );
};
export default HowToUse;
