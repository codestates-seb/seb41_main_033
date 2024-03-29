import styled from "styled-components";
import { ReactComponent as Glummy } from "../assets/glummy.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quit } from "../redux/slice/loginstate";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "./Popup";
import useAuthenticatedRequest from "../hooks/useinterceptor";
const QuitWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col-8);
  margin: 0 auto;

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
  }
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
  width: 100%;

  button {
    flex: 1;
  }

  button.warning {
    background-size: 200% auto;
    background-image: linear-gradient(
      to right,
      rgba(248, 126, 105, 1) 0%,
      rgba(255, 88, 85, 1) 50%,
      rgba(248, 126, 105, 1) 100%
    );
    border-radius: var(--border-radius-btn);
    margin-right: 16px;

    :hover {
      background-position: right center;
    }
  }

  @media (max-width: ${MOBILE_POINT}) {
    flex-direction: column;
    button {
      width: 100%;
      margin: 0 0 16px 0;
    }
  }
`;

const QuitCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.islogin.login);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const instance = useAuthenticatedRequest();
  const handleClick = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleQuit = () => {
    instance.delete(`/api/members/${loginInfo?.memberId}`).then(() => {
      localStorage.clear();
      setIsOpen((prev) => !prev);
      document.body.style.overflow = "unset";
      dispatch(quit({ accessToken: null, memberId: null, isLogin: false }));
      navigate("/");
    });
  };

  useEffect(() => {
    instance
      .get(`api/members/${loginInfo?.memberId}`)
      .then((res) => setUser(res.data.data));
  }, [loginInfo?.memberId, loginInfo?.accessToken]);

  if (user) {
    return (
      <QuitWrap className="card big">
        <ImgWrap>
          <Glummy />
        </ImgWrap>
        <Content>
          <p>
            <span className="nickname">👊🏻{user.nickname}👊🏻</span>님
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
            <span className="nickname">{user.nickname}</span>님이 올리신 게시글
            내가 좋아하는 유저 ...
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
            <span className="nickname">{user.nickname}</span>님이 탈퇴하면 저희
            서비스는 망할겁니다
          </p>
        </Content>
        <ButtonWrap>
          <button className="warning" onClick={handleClick}>
            그래도 탈퇴하기🧨
          </button>
          <button className="normal" onClick={() => navigate(-1)}>
            💖취소하기💖
          </button>
          <Popup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={`${user.nickname}님 때문에 우리 서비스는 망했습니다`}
            button1="그래도 사랑해요"
            handleBtn1={handleQuit}
          />
        </ButtonWrap>
      </QuitWrap>
    );
  } else return null;
};

export default QuitCard;
