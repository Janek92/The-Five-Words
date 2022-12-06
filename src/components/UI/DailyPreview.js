import { useState, useRef } from "react";
import classes from "./DailyPreview.module.css";
import InitBtns from "./reusable/InitBtns";

const DailyPreview = (props) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const btnRef = useRef();

  const onShowTranslate = () => {
    setShowTranslation((prev) => !prev);
    btnRef.current.blur();
  };

  return (
    <div className={classes.daily}>
      <p className={classes.polish}>{props.polish}</p>
      <p className={classes.type}>{props.type}</p>
      <InitBtns translate ref={btnRef} onClick={onShowTranslate}>
        {showTranslation ? props.english : "przetłumacz"}
      </InitBtns>
    </div>
  );
};

export default DailyPreview;
