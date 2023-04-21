import { useEffect, useRef } from "react";
import classes from "./NewWordsPreview.module.scss";
import { GrAdd, GrTrash } from "react-icons/gr";

const NewWordsPreview = ({
  isPolish,
  fetchedWord,
  translate,
  close,
  reject,
  add,
  btnAddRef,
  btnRejectRef,
  isLoading,
}) => {
  const wordInPolish = useRef();
  const wordType = useRef();

  useEffect(() => {
    wordInPolish.current.classList.add(classes["--animating"]);
    wordType.current.classList.add(classes["--animating"]);
    setTimeout(() => {
      wordInPolish.current.classList.remove(classes["--animating"]);
      wordType.current.classList.remove(classes["--animating"]);
    }, 400);
  }, [fetchedWord.pl]);

  return (
    <div className={classes["word-preview"]}>
      <h3 className={classes.polish} ref={wordInPolish}>
        {fetchedWord.pl}
      </h3>
      <p className={classes.type} ref={wordType}>
        {fetchedWord.type}
      </p>
      <div className={classes["translation-container"]}>
        {isPolish ? (
          <h3 className={classes.english}>{fetchedWord.eng}</h3>
        ) : (
          <button className={classes.translation} onClick={translate}>
            przetłumacz
          </button>
        )}
      </div>

      <div className={classes["control-buttons-container"]}>
        <button
          className={classes.remove}
          onClick={reject}
          ref={btnRejectRef}
          disabled={isLoading}
        >
          <GrTrash />
        </button>
        <button
          className={classes.add}
          onClick={add}
          ref={btnAddRef}
          disabled={isLoading}
        >
          <GrAdd />
        </button>
      </div>
      <div className={classes["end-container"]}>
        <button className={classes.end} onClick={close}>
          zakończ
        </button>
      </div>
    </div>
  );
};

export default NewWordsPreview;
