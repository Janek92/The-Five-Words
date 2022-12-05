import styled, { keyframes } from "styled-components";

const standardPadding = "0.5rem";

const entering = keyframes`
from {
  color: transparent;
  transform: translateX(${standardPadding});
}
to {
  color: #bbb;
  transform: translateX(0);
}`;

const PagesTitle = styled.h2`
  color: #bbb;
  font-size: 2.2rem;
  font-family: var(--titles-font-family);
  font-weight: 700;
  padding: ${standardPadding};
  padding-top: calc(${standardPadding} + var(--bar-menu));
  width: 100%;
  text-align: center;
  animation: ${entering} 0.25s linear;
  @media (orientation: landscape) {
    padding-top: ${standardPadding};
    padding-left: var(--bar-menu);
  }
  @media (orientation: landscape) and (min-width: 1200px) {
    padding-left: ${standardPadding};
  }
`;

export default PagesTitle;
