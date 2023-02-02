import styled from "styled-components";
import { ReactComponent as Arrow } from "./../assets/arrowDown.svg";
const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownBody = styled.div`
  background-color: var(--darkgrey2);
  border: 1px solid var(--grey);
  color: var(--white);
  border-radius: ${(props) => (props.isActive ? ` 8px 8px 0 0` : `8px`)};
  padding: 12px 16px;
  font-size: 14px;
  margin-bottom: 16px;
  margin: 8px 0px;
  position: relative;
  span {
    top: 12px;
    right: 16px;
    position: absolute;
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  background-color: var(--darkgrey2);
  width: 100%;
  border: 1px solid var(--grey);
  border-radius: 0 0 8px 8px;

  font-size: 14px;
  margin-bottom: 16px;
  height: 210px;
  position: absolute;
  overflow-y: scroll;
  top: 40px;
  border-top-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownItemContainer = styled.li`
  color: var(--font-color);
  padding: 12px 16px;
  width: 100%;
  &:hover {
    background-color: var(--black);
  }
`;

const Dropdown = ({ isOpen, setIsOpen, setGame, game }) => {
  const itemList = [
    "리그 오브 레전드",
    "발로란트",
    "오버워치 2",
    "로스트아크",
    "메이플스토리",
    "서든어택",
    "배틀그라운드",
    "던전앤파이터",
    "사이퍼즈",
    "마인크래프트",
    "디아블로 2",
    "디아블로 3",
    "어몽어스",
    "파이널 판타지 14",
    "이터널 리턴",
    "스팀 게임",
    "닌텐도 게임",
    "기타",
  ];
  return (
    <DropdownContainer>
      <DropdownBody onClick={() => setIsOpen(!isOpen)} isActive={isOpen}>
        {game}
        <span>
          <Arrow />
        </span>
      </DropdownBody>
      <DropdownMenu isActive={isOpen}>
        {itemList.map((item, idx) => (
          <DropdownItemContainer
            onClick={(e) => {
              setIsOpen(!isOpen);
              setGame(e.target.textContent);
            }}
            key={idx}
            value={item}
          >
            {item}
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;
