import classes from "./WordPreview.module.css";

const WordPreview = (props) => {
  // const classNames = `${classes["word-preview"]} ${
  //   props.className ? props.className : ""
  // }`;

  return (
    <div className={classes["word-preview"]}>
      <h3 className={classes.polish}>{props.polish}</h3>
      <p className={classes.type}>{props.type}</p>
      {props.translated ? (
        <h3 className={classes.english}>{props.eng}</h3>
      ) : (
        <button className={classes.translation} onClick={props.translate}>
          przetłumacz
        </button>
      )}
      <button className={classes.add} onClick={props.add} ref={props.btnAddRef}>
        dodaj do powtórek
      </button>
      <button
        className={classes.remove}
        onClick={props.reject}
        ref={props.btnRejectRef}
      >
        już to znam
      </button>
      <button className={classes.end} onClick={props.close}>
        zakończ
      </button>
    </div>
  );
};

export default WordPreview;
