import { React, useState, useRef } from "react";
import classes from "./DailyPreview.module.scss";
// import InitBtns from "./reusable/InitBtns";
import { TestInitBtns } from "../UI/reusable/reusable";
import { useSelector } from "react-redux";

const DailyPreview = (props) => {
  const ref = useRef();

  const [showTranslation, setShowTranslation] = useState(false);

  const eventDelay = useSelector((state) => state.eventDelay);

  const onShowTranslate = () => {
    setTimeout(async () => {
      setShowTranslation((prev) => !prev);
      ref.current.blur();
    }, [eventDelay]);
  };

  return (
    <div className={classes.daily}>
      <p className={classes.polish}>{props.polish}</p>
      <p className={classes.type}>{props.type}</p>
      <TestInitBtns version="translate" ref={ref} onClick={onShowTranslate}>
        {showTranslation ? props.english : "przetłumacz"}
      </TestInitBtns>
    </div>
  );
};

export default DailyPreview;
