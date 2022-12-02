import classes from "./WordPreview.module.css";

const HistoryPreview = (props) => {
  return (
    <div className={classes["history-preview"]}>
      <h3 className={classes.polish}>{props.polish}</h3>
      <p className={classes.type}>{props.type}</p>
      {props.translated ? (
        <h3 className={classes.english}>{props.eng}</h3>
      ) : (
        <button className={classes.translation} onClick={props.translate}>
          przetłumacz
        </button>
      )}
    </div>
  );
};

export default HistoryPreview;
