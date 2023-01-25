import styled from 'styled-components';

const Background = styled.div`
  background: rgba(229, 229, 229, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PopupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 200px;
  width: var(--col-6);
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
    font-size: var(--font-head3-size);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    width: calc((100% - 24px) / 2);

    :first-child {
      /* 버튼이 1개면 오른쪽 마진 16px, 없으면 0 */
      margin-right: ${({ button2 }) => (button2 ? '16px' : '0')};
    }
  }
`;

const Popup = ({
  isOpen,
  title,
  content,
  button1,
  button2,
  handleBtn1,
  handleBtn2,
}) => {
  if (isOpen) {
    return (
      <Background>
        <PopupWrap className="card big">
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
