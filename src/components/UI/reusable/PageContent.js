import styled from "styled-components";

const PageContent = styled.div`
  width: 100%;
  padding: calc(0.5rem + var(--bar-menu)) 0 0.5rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (orientation: landscape) {
    padding: 0.5rem 0 0.5rem var(--bar-menu);
  }
  @media (orientation: landscape) and (min-width: 1200px) {
    padding: calc(0.5rem + var(--bar-menu)) 0 0.5rem 0;
  }
`;

export default PageContent;
