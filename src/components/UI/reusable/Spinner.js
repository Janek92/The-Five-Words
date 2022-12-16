import { CgSpinnerTwoAlt, CgSpinnerAlt } from "react-icons/cg";
import styled, { keyframes } from "styled-components";

const rotating = keyframes`
from{transform:rotate(0)}to{transform:rotate(360deg)}`;

const SpinArea = styled.aside`
  width: 100%;
  display: flex;
  justify-content: center;
  & * {
    font-size: 4rem;
    transform-origin: center;
  }
  & svg:nth-of-type(1) {
    position: relative;
    animation: ${rotating} 1.2s linear infinite;
  }
  & svg:nth-of-type(2) {
    position: absolute;
    animation: ${rotating} 2s linear reverse infinite;
  }
`;

const Spinner = () => {
  return (
    <SpinArea>
      <CgSpinnerTwoAlt />
      <CgSpinnerAlt />
    </SpinArea>
  );
};

export default Spinner;
