import styled from 'styled-components';
import { MOBILE_POINT } from '../data/breakpoint';
import { useSelector } from 'react-redux';

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

const ModalWrap = styled.div`
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

const Modal = () => {
  const { isOpen, props } = useSelector((state) => state.modal);

  console.log(isOpen, props);

  if (isOpen) {
    return (
      <Background>
        <ModalWrap className="card big" onClick={(e) => e.stopPropagation()}>
          <Title>
            <div className="title">{props.title}</div>
          </Title>
          <Content>
            <p className="content">{props.content}</p>
          </Content>
          <ButtonWrap>
            <button className="em" onClick={props.handleBtn1}>
              {props.button1}
            </button>
            {props.button2 ? (
              <button className="normal" onClick={props.handleBtn2}>
                {props.button2}
              </button>
            ) : null}
          </ButtonWrap>
        </ModalWrap>
      </Background>
    );
  } else return null;
};

export default Modal;
