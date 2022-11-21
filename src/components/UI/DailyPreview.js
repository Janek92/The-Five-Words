import classes from "./DailyPreview.module.css";

const DailyPreview = (props) => {
  return (
    <div className={classes.daily}>
      <p className={classes.polish}>{props.polish}</p>
      <p className={classes.type}>{props.type}</p>
      <button className={classes.translate}>{props.english}</button>
    </div>
  );
};

export default DailyPreview;
