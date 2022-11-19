import classes from "./WordPreview.module.css";

const WordPreview = (props) => {
  const classNames = `${classes["word-preview"]} ${
    props.className ? props.className : ""
  }`;
  return (
    <div className={classNames}>
      <h2>{props.polish}</h2>
      <p>{props.type}</p>
      {props.translated ? (
        <h3>{props.eng}</h3>
      ) : (
        <button className={classes.translation} onClick={props.translate}>
          przetłumacz
        </button>
      )}
      <button className={classes.add}>dodaj do powtórek</button>
      <button className={classes.remove} onClick={props.reject}>
        już to znam
      </button>
      <button className={classes.end} onClick={props.close}>
        zakończ
      </button>
    </div>
  );
};

export default WordPreview;
