import styled from 'styled-components';

const Background = styled.div`
  background: rgba(229, 229, 229, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PopupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 버튼이 1개면 4개 컬럼, 2개면 6개 컬럼 너비 */
  width: ${({ button2 }) => (button2 ? 'var(--col-6)' : 'var(--col-4)')};
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
  width: 100%;

  button {
    flex: 1;

    :first-child {
      /* 버튼이 1개면 오른쪽 마진 16px, 없으면 0 */
      margin-right: ${({ button2 }) => (button2 ? '16px' : '0')};
    }
  }
`;

const Popup = ({ title, content, button1, button2 }) => {
  return (
    <Background>
      <PopupWrap className="card big" button2={button2}>
        <Title>
          <div className="title">{title}</div>
        </Title>
        <Content>
          <p className="content">{content}</p>
        </Content>
        <ButtonWrap button2={button2}>
          <button className="em">{button1}</button>
          {button2 ? <button className="normal">{button2}</button> : null}
        </ButtonWrap>
      </PopupWrap>
    </Background>
  );
};

export default Popup;
