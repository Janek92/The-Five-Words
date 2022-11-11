import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../../assets/5words.png";
import { GrMenu } from "react-icons/gr";
import { GrClose } from "react-icons/gr";

const NavigationBar = styled.header`
  width: 100%;
  height: 4rem;
  box-shadow: 0 0 8px 0 black;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  align-items: center;
  position: relative;
  @media (orientation: landscape) {
    flex-direction: column;
    height: 100vh;
    width: 4rem;
    position: fixed;
  }
  a {
    margin: 0.3rem;
    img {
      width: 4.5rem;
    }
    &:active {
      transform: scale(0.98);
    }
  }
  button {
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border: none;
    font-size: 2.8rem;
    margin: 0.3rem;
    transition: all 0.15s;
    &:active {
      transform: scale(0.98);
    }
  }
`;

const Menu = styled.nav`
  width: 80%;
  position: fixed;
  top: 4rem;
  left: 4rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom-left-radius: 0.5rem;
  transition: all 0.2s;
  ${(props) =>
    props.invisible &&
    css`
      transform: translateX(100%);
      @media (orientation: landscape) {
        transform: translateY(-100%);
      }
    `};
  @media (orientation: landscape) {
    top: 0;
    height: auto;
    width: 60vw;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0.5rem;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    font-family: var(--basic-font-family);
    font-weight: 500;
    text-transform: uppercase;
    li {
      width: 100%;
      margin: 0.7rem 0;
      a {
        color: rgb(255, 255, 255);
        text-decoration: none;
        font-size: 1rem;
      }
      button {
        border: none;
        background-color: transparent;
        width: 100%;
        font-family: var(--basic-font-family);
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        color: rgb(255, 255, 255);
        padding: 0;
        margin: 0;
      }
    }
  }
`;

const Navigation = () => {
  const [menuShow, setMenuShow] = useState(false);

  const onShowMenu = () => {
    setMenuShow((prev) => !prev);
  };

  return (
    <>
      <NavigationBar>
        <Link to="/">
          <img src={logo}></img>
        </Link>
        <button onClick={onShowMenu}>
          {menuShow ? <GrClose /> : <GrMenu />}
        </button>
        <Menu invisible={!menuShow}>
          <ul>
            <li>
              <NavLink to="/">strona główna</NavLink>
            </li>
            <li>
              <NavLink to="/new">przeglądaj nowe</NavLink>
            </li>
            <li>
              <NavLink to="/daily">powtarzaj słówka</NavLink>
            </li>
            <li>
              <NavLink to="/history">historia słówek</NavLink>
            </li>
            <li>
              <NavLink to="/how-to-use">jak korzystać</NavLink>
            </li>
            <li>
              <button>wyloguj</button>
            </li>
          </ul>
        </Menu>
      </NavigationBar>
    </>
  );
};
export default Navigation;
