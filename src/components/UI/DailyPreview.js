import { useState } from "react";
import classes from "./DailyPreview.module.css";

const DailyPreview = (props) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const onShowTranslate = () => {
    console.log(props.english);
    setShowTranslation((prev) => !prev);
  };

  return (
    <div className={classes.daily}>
      <p className={classes.polish}>{props.polish}</p>
      <p className={classes.type}>{props.type}</p>
      <button className={classes.translate} onClick={onShowTranslate}>
        {showTranslation ? props.english : "przetłumacz"}
      </button>
    </div>
  );
};

export default DailyPreview;
