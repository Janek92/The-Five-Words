import { useState, useRef } from "react";
import classes from "./DailyPreview.module.css";
import InitBtns from "./reusable/InitBtns";
import { useSelector } from "react-redux";

const DailyPreview = (props) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const eventDelay = useSelector((state) => state.draw.eventDelay);

  const btnRef = useRef();

  const onShowTranslate = () => {
    setTimeout(async () => {
      setShowTranslation((prev) => !prev);
      btnRef.current.blur();
    }, [eventDelay]);
    // setShowTranslation((prev) => !prev);
    // btnRef.current.blur();
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
