import styled from "styled-components";
import { ReactComponent as BoardLikeIcon } from "./../assets/heartIcon.svg";
import { ReactComponent as BoardCommentIcon } from "./../assets/sms.svg";
import { Link, useNavigate } from "react-router-dom";
import displayedAt from "../util/displayedAt";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryFileView from "./StoryFileView";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "./Popup";

const StoryWrap = styled.div`
  cursor: pointer;
  .storyMain {
    display: flex;
  }
  @media (max-width: ${MOBILE_POINT}) {
    .storyMain {
      flex-direction: column;
    }
    .story_list_flieview {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

const TextArea = styled.div`
  flex: 1;
  margin-right: 32px;

  .content {
    font-size: var(--font-body2-size);
  }
`;

const InfoWrap = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  li {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    margin-top: 32px;
    margin-right: 16px;
    border-radius: 100px;
    background: var(--grey);
    color: var(--strong-color);
    font-size: var(--font-body2-size);

    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
  li:last-child {
    margin-right: 0;
  }
`;

const StorySingle = ({ data }) => {
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.islogin.login);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleSignup = () => {
    navigate(`/signup`);
  };

  const handleNaviOnClick = (e, memberId, boardId) => {
    if (loginInfo?.isLogin) {
      navigate(`/story/${memberId}/${boardId}`);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleProfileClick = (e, memberId) => {
    e.stopPropagation();
    navigate(`/profile/${memberId}`);
  };

  return (
    <StoryWrap
      className="card md"
      onClick={(e) => handleNaviOnClick(e, data.memberId, data.id)}
    >
      <div className="storyMain">
        <TextArea>
          <div onClick={(e) => handleProfileClick(e, data.memberId)} title="">
            <SinglePofileWrap
              imgSrc={data.profileImage}
              name={data.nickname}
              subInfo={displayedAt(data.createdAt)}
            />
          </div>
          <div className="content">{data.content}</div>
        </TextArea>
        <StoryFileView
          fileName={data.uploadFileName}
          contentType={data.contentType}
        />
      </div>
      <InfoWrap>
        {data.likeCount ? (
          <li>
            <BoardLikeIcon />
            <span>{data.likeCount}</span>
          </li>
        ) : null}
        {data.commentCount ? (
          <li>
            <BoardCommentIcon />
            <span>{data.commentCount}</span>
          </li>
        ) : null}
      </InfoWrap>
      <Popup
        isOpen={isOpen}
        title="스토리 상세보기"
        content="스토리는 상세보기는 로그인 후 가능합니다."
        button1="로그인"
        button2="회원가입"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
    </StoryWrap>
  );
};
export default StorySingle;
