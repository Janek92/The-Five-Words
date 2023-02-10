import PageContent from "../UI/reusable/PageContent";
import PagesTitle from "../UI/reusable/PagesTitle";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Main.module.css";

const Main = () => {
  const location = useLocation();

  const currentUser = useSelector((state) => state.currentUser);

  const endpoints = useSelector((state) => state.endpoints);
  const endpointsDaily = useSelector((state) => state.endpointsDaily);
  const endpointsHistory = useSelector((state) => state.endpointsHistory);

  const amountOfNew =
    endpoints === 0 ? "sprawdziłaś/łeś już wszystkie" : endpoints;

  const amountOfDaily = () => {
    if (endpoints === 0 && endpointsDaily.length === 0) {
      return "tutaj jest już pusto";
    } else if (endpointsDaily.length === 0) {
      return "nie dodałaś/eś żadnych";
    } else {
      return endpointsDaily.length;
    }
  };

  const amountOfHistory =
    endpointsHistory.length === 0
      ? "nie dodałeś żadnych"
      : endpointsHistory.length;

  return (
    <PageContent>
      <PagesTitle>Strona główna</PagesTitle>
      <h2 className={classes.malfunction}>{location.state}</h2>
      <div className={classes.statistics}>
        <p className={classes.email}>
          twój email:{" "}
          <span className={classes[("original-letters", "bold-letters")]}>
            {currentUser.email}
          </span>
        </p>
        <p>Liczba słówek w poszczególnych sekcjach :</p>
        <p>
          "Nowe" :{" "}
          <span className={classes["bold-letters"]}>{amountOfNew}</span>
        </p>
        <p>
          kolejka do dziennych :{" "}
          <span className={classes["bold-letters"]}>{amountOfDaily()}</span>
        </p>
        <p>
          w historii :{" "}
          <span className={classes["bold-letters"]}>{amountOfHistory}</span>
        </p>
      </div>
    </PageContent>
  );
};
export default Main;
