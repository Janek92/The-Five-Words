import styled, { keyframes } from "styled-components";

const entering = keyframes`
from {
  color: transparent;
}
to {
  color: #000;
}`;

const PagesTitle = styled.h1`
  color: #000;
  // text-shadow: 2px 2px 5px #000;
  font-size: 2.2rem;
  font-family: var(--titles-font-family);
  font-weight: 700;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  animation: ${entering} 0.25s linear;
  @media (orientation: landscape) {
    padding: 0;
  }
`;

export default PagesTitle;
