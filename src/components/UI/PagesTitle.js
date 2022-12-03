import styled, { keyframes } from "styled-components";

const entering = keyframes`
from {
  color: transparent;
  transform: translateX(0.5rem);
}
to {
  color: #fff;
  transform: translateX(0);
}`;

const PagesTitle = styled.h2`
  color: #bbb;
  font-size: 2.2rem;
  font-family: var(--titles-font-family);
  font-weight: 700;
  padding: 0.5rem;
  padding-top: var(--bar-menu);
  width: 100%;
  text-align: center;
  animation: ${entering} 0.25s linear;
  @media (orientation: landscape) {
    padding: 0.5rem;
  }
`;

export default PagesTitle;
