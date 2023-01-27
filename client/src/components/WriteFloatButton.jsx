import styled from "styled-components";
import { ReactComponent as AddIcon } from "./../assets/addIcon.svg";
import { MOBILE_POINT } from "../data/breakpoint";

const WriteFBtn = styled.button`
  position: fixed;
  right: 48px;
  bottom: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  padding: 0;
  z-index: 10;
  box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15),
    0px 2px 3px rgba(0, 0, 0, 0.3);

  &.em {
    border-radius: 28px;
  }

  svg {
    width: 36px;
    height: 36px;
  }

  @media (max-width: ${MOBILE_POINT}) {
    right: 16px;
    bottom: 68px;
    width: 48px;
    height: 48px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const WriteFloatButton = ({ click }) => {
  return (
    <WriteFBtn onClick={click} className="em">
      <AddIcon />
    </WriteFBtn>
  );
};
export default WriteFloatButton;
