import React from "react";
import classes from "./reusable.module.scss";
import { CgSpinnerTwoAlt, CgSpinnerAlt } from "react-icons/cg";
import { GrDocumentDownload } from "react-icons/gr";

export const Alert = ({ children }) => {
  return <h2 className={classes.alert}>{children}</h2>;
};
export const PagesTitle = ({ children }) => {
  return <h1 className={classes["pages-title"]}>{children}</h1>;
};

export const PagesContent = ({ children }) => {
  return <div className={classes["pages-content"]}>{children}</div>;
};

export const Spinner = () => {
  return (
    <aside className={classes.spinner}>
      <CgSpinnerTwoAlt />
      <CgSpinnerAlt />
    </aside>
  );
};

export const PageLoading = () => {
  return (
    <aside className={classes["page-loading"]}>
      <GrDocumentDownload />
    </aside>
  );
};

export const TestInitBtns = React.forwardRef(
  ({ version = "default", children, onClick, disabled }, ref) => {
    const classNames = () => {
      if (version === "translate") {
        return `${classes["init-btns"]} ${classes["--translate"]}`;
      } else if (version === "more columns") {
        return `${classes["init-btns"]} ${classes["--more-columns"]}`;
      } else {
        return `${classes["init-btns"]}`;
      }
    };

    return (
      <button
        className={classNames()}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
