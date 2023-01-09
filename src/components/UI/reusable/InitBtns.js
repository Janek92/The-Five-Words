import styled, { css } from "styled-components";

const InitBtns = styled.button`
  text-transform: uppercase;
  font-size: 1.1rem;
  font-family: var(--basic-font-family);
  padding: 1.2rem;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: 2px 2px 0.5rem 0 #000000;
  border-radius: 2rem;
  transition: all 0.1s;

  &:focus {
    box-shadow: 2px 2px 0.7rem 0 var(--focus-color);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 2px 2px 1.2rem 0 #eaac33;
  }

  @media (orientation: landscape) and (min-width: 1200px) {
    cursor: pointer;
    &:hover {
      box-shadow: 2px 2px 1rem 2px #000;
    }
  }
  ${(props) =>
    props.translate &&
    css`
      font-size: 0.9rem;
      font-weight: 700;
    `};
  ${(props) =>
    props.moreColumns &&
    css`
      @media (min-width: 1200px) {
        width: 30%;
        margin: 0 35%;
      }
      @media (min-width: 1600px) {
        width: 20%;
        margin: 0 40%;
      }
    `};
`;

export default InitBtns;
