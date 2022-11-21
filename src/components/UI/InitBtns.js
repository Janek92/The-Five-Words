import styled from "styled-components";

const InitBtns = styled.button`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-family: var(--basic-font-family);
  padding: 0.2rem;
  width: 70%;
  margin: 0.5rem 15%;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: 2px 2px 0.5rem 0 #000000;
  border-radius: 5px;
  padding: 0.5rem;

  &:focus {
    box-shadow: 2px 2px 0.7rem 0 #eaac33;
  }

  @media (orientation: landscape) {
    width: 40%;
    margin: 0.5rem 30%;
  }

  @media (orientation: landscape) and (min-width: 1200px) {
    width: 24%;
    margin: 0.5rem 38%;
    cursor: pointer;
    &:hover {
      box-shadow: 2px 2px 1rem 2px #000;
    }
  }
`;

export default InitBtns;
