import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PagesTitle from "../UI/reusable/PagesTitle";
import classes from "./Login.module.css";
import { auth } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { drawWordsActions } from "../../store/words-slice";
import { sendNewEndpoints } from "../data/words";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [signUpForm, setSignUpForm] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

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
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(drawWordsActions.saveUser(user));
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const onSignUp = (e) => {
    e.preventDefault();
    if (passwordConfirm !== password) {
      setError(true);
      return;
    }
    createUserWithEmailAndPassword(auth, email, passwordConfirm)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        sendNewEndpoints(user.uid);
        setSignUpForm(false);
        navigate("/login", {
          state: `Gratulacje ${emailRef.current.value}! Możesz się zalogować!`,
        });
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <>
      {signUpForm ? (
        <PagesTitle>rejestracja</PagesTitle>
      ) : (
        <PagesTitle>logowanie</PagesTitle>
      )}
      <form
        onSubmit={signUpForm ? onSignUp : onLogin}
        className={classes.login}
      >
        <p className={classes["login__location"]}>{location.state}</p>
        <input
          ref={emailRef}
          onChange={onEmail}
          className={classes["login__email"]}
          type="email"
          placeholder="email"
        />
        <input
          ref={passwordRef}
          onChange={onPassword}
          className={classes["login__password"]}
          type="password"
          placeholder="password"
        />
        {signUpForm ? (
          <input
            ref={passwordConfirmRef}
            onChange={onPasswordConfirm}
            className={classes["login__password-confirm"]}
            type="password"
            placeholder="confirm password"
          />
        ) : null}
        <button className={classes["login__button"]} type="submit">
          {signUpForm ? "zarejestruj" : "zaloguj"}
        </button>
        {error ? (
          <span className={classes["login__info"]}>
            {signUpForm
              ? "za krótkie hasło lub niepoprawny email"
              : "zły email lub hasło"}
          </span>
        ) : null}
        {location.state ? null : (
          <span onClick={onSignVersion} className={classes["login__change"]}>
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
