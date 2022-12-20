import classes from "./HistoryPreview.module.css";
import InitBtns from "./reusable/InitBtns";

const HistoryPreview = (props) => {
  return (
    <div className={classes["history-preview"]}>
      <h3 className={classes.polish}>{props.polish}</h3>
      <p className={classes.type}>{props.type}</p>
      {props.translated ? (
        <h3 className={classes.english}>{props.eng}</h3>
      ) : (
        <InitBtns translate="true" onClick={props.translate}>
          przetłumacz
        </InitBtns>
      )}
    </div>
  );
};

export default HistoryPreview;
