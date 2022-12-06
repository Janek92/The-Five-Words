import styled, { css } from "styled-components";

const InitBtns = styled.button`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-family: var(--basic-font-family);
  padding: 0.2rem;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: 2px 2px 0.5rem 0 #000000;
  border-radius: 2rem;
  padding: 0.5rem;
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
      font-size: 1.2rem;
    `};
`;

export default InitBtns;
