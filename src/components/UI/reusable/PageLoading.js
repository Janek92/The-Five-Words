import { GrDocumentDownload } from "react-icons/gr";
import styled, { keyframes } from "styled-components";

const pulsing = keyframes`
from{transform: scale(1);}to{transform: scale(0.7);}`;

const PulsingArea = styled.aside`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    font-size: 5rem;
    animation: ${pulsing} 1s linear infinite;
  }
`;

const PageLoading = () => {
  return (
    <PulsingArea>
      <GrDocumentDownload />
    </PulsingArea>
  );
};

export default PageLoading;
