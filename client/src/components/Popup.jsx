import { useEffect } from 'react';
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
    width: 100%;
    :last-child {
      margin-left: 24px;
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
  useEffect(() => {
    document.body.style.cssText = `
    position:fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width:100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

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
