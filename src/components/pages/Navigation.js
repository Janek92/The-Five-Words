import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/5words.png";
import { GrMenu } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const [menuShow, setMenuShow] = useState(false);

  const onShowMenu = () => {
    setMenuShow((prev) => !prev);
  };
  const onHideMenu = () => {
    setMenuShow((prev) => (prev = false));
  };

  const classNamesNavBar = `${classes["nav-bar"]} ${
    !menuShow ? "" : classes["--show-menu"]
  }`;
  const classNamesMenu = `${classes.menu} ${
    menuShow ? "" : classes["--invisible"]
  }`;

  return (
    <>
      <header className={classNamesNavBar}>
        <Link to="/">
          <img className={classes.logo} src={logo}></img>
        </Link>
        <button className={classes.burger} onClick={onShowMenu}>
          {menuShow ? <GrClose /> : <GrMenu />}
        </button>
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
                trening
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
                historia
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
              <button className={classes["logout-btn"]}>wyloguj</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Navigation;
