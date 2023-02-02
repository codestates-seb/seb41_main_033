import styled from "styled-components";
import { MOBILE_POINT } from "../data/breakpoint";

const Background = styled.div`
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const PopupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 200px;
  width: var(--col-6);

  @media (max-width: ${MOBILE_POINT}) {
    width: calc(100% - 32px);
    margin: 0 auto;
  }
`;

const Title = styled.div`
  margin-bottom: 56px;

  .title {
    font-size: var(--font-head2-size);
    font-weight: var(--font-weight-medium);
  }
`;

const Content = styled.div`
  margin-bottom: 56px;

  .content {
    text-align: center;
    word-break: keep-all;
    font-size: var(--font-head3-size);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    width: 100%;
    margin-right: 0px;

    :last-child {
      margin-left: 24px;
    }
  }
`;

const Popup = ({
  isOpen,
  setIsOpen,
  title,
  content,
  button1,
  button2,
  handleBtn1,
  handleBtn2,
}) => {
  const handlePopup = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "unset";
  };

  if (isOpen) {
    return (
      <Background onClick={handlePopup}>
        <PopupWrap className="card big" onClick={(e) => e.stopPropagation()}>
          <Title>
            <div className="title">{title}</div>
          </Title>
          <Content>
            <p className="content">{content}</p>
          </Content>
          <ButtonWrap>
            <button className="em" onClick={handleBtn1}>
              {button1}
            </button>
            {button2 ? (
              <button className="normal" onClick={handleBtn2}>
                {button2}
              </button>
            ) : null}
          </ButtonWrap>
        </PopupWrap>
      </Background>
    );
  } else return null;
};

export default Popup;
