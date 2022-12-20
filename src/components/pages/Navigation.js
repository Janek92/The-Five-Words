import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/5words.png";
import { GrMenu } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import classes from "./Navigation.module.css";
import { useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";

const Navigation = (props) => {
  const dispatch = useDispatch();

  const [menuShow, setMenuShow] = useState(false);

  const onShowMenu = () => {
    setMenuShow((prev) => (prev = true));
    props.closeDefault();
  };
  const onHideMenu = () => {
    setMenuShow((prev) => (prev = false));
  };

  useEffect(() => {
    if (props.close) {
      onHideMenu();
    }
  }, [props.close]);

  const classNamesNavBar = `${classes["nav-bar"]} ${
    !menuShow ? "" : classes["--show-menu"]
  }`;
  const classNamesMenu = `${classes.menu} ${
    menuShow ? "" : classes["--invisible"]
  }`;

  const onLogout = () => {
    dispatch(drawWordsActions.saveUser(null));
  };

  return (
    <>
      <header className={classNamesNavBar}>
        <Link to="/">
          <img className={classes.logo} src={logo}></img>
        </Link>
        {menuShow ? (
          <button className={classes.burger} onClick={onHideMenu}>
            <GrClose />
          </button>
        ) : (
          <button className={classes.burger} onClick={onShowMenu}>
            <GrMenu />
          </button>
        )}
        <nav className={classNamesMenu}>
          <ul className={classes["nav__container"]}>
            <li className={classes["nav__list-element"]}>
              <NavLink
                onClick={onHideMenu}
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                strona główna
              </NavLink>
            </li>
            <li className={classes["nav__list-element"]}>
              <NavLink
                onClick={onHideMenu}
                to="/daily"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dzisiejsze
              </NavLink>
            </li>
            <li className={classes["nav__list-element"]}>
              <NavLink
                onClick={onHideMenu}
                to="/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                nowe
              </NavLink>
            </li>
            <li className={classes["nav__list-element"]}>
              <NavLink
                onClick={onHideMenu}
                to="/history"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                już znam
              </NavLink>
            </li>
            <li className={classes["nav__list-element"]}>
              <NavLink
                onClick={onHideMenu}
                to="/how-to-use"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                jak korzystać
              </NavLink>
            </li>
            <li className={classes["nav__list-element"]}>
              <button onClick={onLogout} className={classes["logout-btn"]}>
                wyloguj
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Navigation;
