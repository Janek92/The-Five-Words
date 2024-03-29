import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/5fivewords.png";
import { GrMenu } from "react-icons/gr";
import { GrClose } from "react-icons/gr";
import classes from "./Navigation.module.scss";
import { useDispatch } from "react-redux";
import { wordsActions } from "../../store/words-slice";
import { firebase } from "../../firebase";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuShow, setMenuShow] = useState(false);

  const onShowMenu = () => {
    setMenuShow((prev) => (prev = true));
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

  const onLogout = () => {
    firebase.logOut
      .then(() => {
        dispatch(wordsActions.saveUser(null));
        localStorage.removeItem("user");
        localStorage.removeItem("daily");
        localStorage.removeItem("for-draw");
        localStorage.removeItem("practice");
        localStorage.removeItem("history");
        navigate("/login", {
          state: `Wylogowano`,
        });
      })
      .catch(() => {
        alert("Nie udało się wylogować");
      });
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
          <ul className={classes.ul}>
            <li className={classes.li}>
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
            <li className={classes.li}>
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
            <li className={classes.li}>
              <NavLink
                onClick={onHideMenu}
                to="/daily"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Powtórki
              </NavLink>
            </li>

            <li className={classes.li}>
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
            <li className={classes.li}>
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
            <li className={classes.li}>
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
