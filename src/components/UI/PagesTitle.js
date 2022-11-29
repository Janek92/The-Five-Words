import styled, { keyframes } from "styled-components";

const entering = keyframes`
from {
  color: transparent;
  transform: translateX(0.5rem);
}
to {
  color: #000;
  transform: translateX(0);
}`;

const PagesTitle = styled.h2`
  font-size: 2.4rem;
  font-family: var(--titles-font-family);
  font-weight: 700;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  animation: ${entering} 0.25s linear;
`;

export default PagesTitle;
