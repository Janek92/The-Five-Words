import { useEffect, useRef } from "react";
import classes from "./NewWordsPreview.module.css";

const NewWordsPreview = (props) => {
  const wordInPolish = useRef();
  const wordType = useRef();

  useEffect(() => {
    wordInPolish.current.classList.add(classes["--animating"]);
    wordType.current.classList.add(classes["--animating"]);
    setTimeout(() => {
      wordInPolish.current.classList.remove(classes["--animating"]);
      wordType.current.classList.remove(classes["--animating"]);
    }, 400);
  }, [props.polish]);

  return (
    <div className={classes["word-preview"]}>
      <h3 className={classes.polish} ref={wordInPolish}>
        {props.polish}
      </h3>
      <p className={classes.type} ref={wordType}>
        {props.type}
      </p>
      {props.translated ? (
        <h3 className={classes.english}>{props.eng}</h3>
      ) : (
        <button className={classes.translation} onClick={props.translate}>
          przetłumacz
        </button>
      )}
      <button
        className={classes.add}
        onClick={props.add}
        ref={props.btnAddRef}
        disabled={props.isLoading}
      >
        dodaj
      </button>
      <button
        className={classes.remove}
        onClick={props.reject}
        ref={props.btnRejectRef}
        disabled={props.isLoading}
      >
        pomiń
      </button>
      <button className={classes.end} onClick={props.close}>
        zakończ
      </button>
    </div>
  );
};

export default NewWordsPreview;
