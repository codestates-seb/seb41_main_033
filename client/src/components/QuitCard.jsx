import styled from 'styled-components';
import { ReactComponent as Glummy } from '../assets/glummy.svg';

const QuitWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col-8);
`;

const ImgWrap = styled.div`
  margin-bottom: 48px;
`;

const Content = styled.div`
  margin-bottom: 24px;

  p {
    margin-bottom: 24px;
    text-align: center;
    font-size: var(--font-body1-size);
    font-weight: var(--font-weight-medium);
  }

  span.nickname {
    color: var(--yellow);
  }

  span.sad {
    color: #5275ed;
  }

  span.warning {
    color: var(--red);
  }

  span.gameto {
    color: var(--white);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  button {
    width: var(--col-3);
  }

  button.warning {
    background: var(--red);
    border-radius: var(--border-radius-btn);
  }
`;

const QuitCard = () => {
  return (
    <QuitWrap className="card big">
      <ImgWrap>
        <Glummy />
      </ImgWrap>
      <Content>
        <p>
          <span className="nickname">👊🏻닉네임👊🏻</span>님
          <br />
          <span>GAMETO</span> 탈퇴 신청을 원하시나요🥹
          <span className="sad">ㅠㅠ</span>🥹
        </p>
        <p>
          <span className="warning">
            🤬다.시.한.번 생각해주세요 아시겠어요?🤬
          </span>
        </p>
        <p>
          <span className="nickname">닉네임</span>님이 올리신 게시글 내가
          좋아하는 유저 ...
          <br />
          추억과 애정 모두 버리실건가요? ㅠㅠ
          <br />
          <span className="gameto">GAMETO</span>는 편리한 서비스 이용을 위해
          밤낮 없이
          <br />
          고민하고 고민하여 발전하고 있답니다 🤔
          <br />
          정말정말! 탈퇴하실거라면 아래 버튼을 눌러주세요
          <br />
          <span className="warning">탈퇴시 계정 복구는 불가해요🤬</span>
          <br />
          그동안 저희 서비스 이용해주셔서 감사합니다
        </p>
        <p>
          <span className="nickname">닉네임</span>님이 탈퇴하면 저희 서비스는
          망할겁니다
        </p>
      </Content>
      <ButtonWrap>
        <button className="warning">그래도 탈퇴하기🧨</button>
        <button className="normal">💖취소하기💖</button>
      </ButtonWrap>
    </QuitWrap>
  );
};

export default QuitCard;
