import { useState, useRef } from "react";
import classes from "./DailyPreview.module.css";
import InitBtns from "./reusable/InitBtns";
import { useSelector } from "react-redux";

const DailyPreview = (props) => {
  const btnRef = useRef();

  const [showTranslation, setShowTranslation] = useState(false);

  const eventDelay = useSelector((state) => state.words.eventDelay);

  const onShowTranslate = () => {
    setTimeout(async () => {
      setShowTranslation((prev) => !prev);
      btnRef.current.blur();
    }, [eventDelay]);
  };

  return (
    <div className={classes.daily}>
      <p className={classes.polish}>{props.polish}</p>
      <p className={classes.type}>{props.type}</p>
      <InitBtns translate="true" ref={btnRef} onClick={onShowTranslate}>
        {showTranslation ? props.english : "przetłumacz"}
      </InitBtns>
    </div>
  );
};

export default DailyPreview;
