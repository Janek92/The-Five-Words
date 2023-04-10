import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { firebase } from "../../firebase";
import { wordsActions } from "../../store/words-slice";
import { sendNewEndpoints } from "../../data/wordsList";
import classes from "./Login.module.scss";
import { PagesTitle, Spinner } from "../UI/reusable/reusable";
import logo from "../../assets/5fivewords.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const onSignVersion = () => {
    setSignUpForm((prev) => !prev);
    setError(false);
    setEmail("");
    emailRef.current.value = "";
    setPassword("");
    passwordRef.current.value = "";
    if (signUpForm) {
      setPasswordConfirm("");
      passwordConfirmRef.current.value = "";
    }
  };

  const onEmail = (e) => {
    setError(false);
    setEmail((prev) => (prev = e.target.value));
  };

  const onPassword = (e) => {
    setError(false);
    setPassword((prev) => (prev = e.target.value));
  };
  const onPasswordConfirm = (e) => {
    setError(false);
    setPasswordConfirm((prev) => (prev = e.target.value));
  };

  const onLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(wordsActions.saveUser(user));
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  };

  const onSignUp = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (passwordConfirm !== password) {
      setError(true);
      setIsLoading(false);
      return;
    }
    createUserWithEmailAndPassword(firebase.auth, email, passwordConfirm)
      .then((userCredential) => {
        const user = userCredential.user;
        sendNewEndpoints(user.uid);
        setSignUpForm(false);
        setIsLoading(false);
        navigate("/login", {
          state: `Gratulacje ${emailRef.current.value}! Możesz się zalogować!`,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <Link className={classes.link} to="/login">
        <img className={classes.logo} src={logo}></img>
      </Link>
      <h2 className={classes["app-description"]}>
        Aplikacja do nauki podstawowych, angielskich słów
      </h2>
      {signUpForm ? (
        <PagesTitle>rejestracja</PagesTitle>
      ) : (
        <PagesTitle>logowanie</PagesTitle>
      )}
      {signUpForm ? (
        <div className={classes.caution}>
          <p>
            Uwaga! Jest to projekt niekomercyjny. Nie używaj swojego prawdziwego
            adresu e-mail w celu rejestracji w aplikacji. Użyj dowolnego ciągu
            znaków uwzględniając @.
          </p>
        </div>
      ) : null}
      <form
        onSubmit={signUpForm ? onSignUp : onLogin}
        className={classes.login}
      >
        {isLoading ? (
          <div className={classes["spinner-area"]}>
            <Spinner />
          </div>
        ) : null}
        <p className={classes.location}>{location.state}</p>
        <input
          ref={emailRef}
          onChange={onEmail}
          className={classes.email}
          type="email"
          placeholder="email"
        />
        <input
          ref={passwordRef}
          onChange={onPassword}
          className={classes.password}
          type="password"
          placeholder="password"
        />
        {signUpForm ? (
          <input
            ref={passwordConfirmRef}
            onChange={onPasswordConfirm}
            className={classes["password-confirm"]}
            type="password"
            placeholder="confirm password"
          />
        ) : null}
        <button className={classes.button} type="submit">
          {signUpForm ? "zarejestruj" : "zaloguj"}
        </button>
        {error ? (
          <span className={classes.info}>
            {signUpForm
              ? "za krótkie hasło lub niepoprawny email"
              : "zły email lub hasło"}
          </span>
        ) : null}
        {location.state ? null : (
          <span onClick={onSignVersion} className={classes.change}>
            {signUpForm
              ? "zaloguj się tutaj - kliknij"
              : "nie masz konta? zarejestruj się tutaj - kliknij"}
          </span>
        )}
      </form>
    </>
  );
};

export default Login;
