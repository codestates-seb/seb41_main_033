import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
import { ReactComponent as Comment } from '../assets/sms.svg';
import { ReactComponent as Video } from '../assets/videoIcon.svg';
import ProfilePagination from './ProfilePagination';
import matchGame from '../util/matchGame';
import Popup from './Popup';
import { useSelector } from 'react-redux';

const ListWrap = styled.div`
  li {
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    .game_container {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      overflow: hidden;
      margin: auto 0;
      margin-right: 16px;
      .game_icon {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content_container {
      line-height: var(--line-height-lg);
    }
    .match {
      width: 100%;
    }
    .story {
      width: calc(100% - 72px);
    }
    .content_title {
      font-size: var(--font-body2-size);
      color: var(--white);
      cursor: pointer;
    }
    .content_date {
      font-size: var(--font-caption-size);
    }
    .content_count {
      display: flex;
      padding-top: 12px;
      .content_like,
      .content_comment {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        background: #282828;
        border-radius: var(--border-radius-btn);
        span {
          margin-left: 8px;
          font-size: var(--font-caption-size);
          color: #e8def8;
        }
      }
      .content_like {
        margin-right: 6px;
      }
    }
    .image_container {
      width: 56px;
      height: 56px;
      border-radius: 4px;
      overflow: hidden;
      margin: auto 0;
      margin-left: 16px;
      .image_preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content_none {
      width: 100%;
      text-align: center;
    }
  }
`;

const ProfileContentList = ({
  isMatch,
  isStory,
  match,
  matchPage,
  setMatchPage,
  matchPageInfo,
  story,
  storyPage,
  setStoryPage,
  storyPageInfo,
}) => {
  const { userid } = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMatchNavigate = (id) => {
    navigate(`/match/${id}/detail`);
  };

  const handleStoryNavigate = (id) => {
    if (loginInfo?.isLogin) {
      navigate(`/story/${userid}/${id}`);
    } else {
      setIsOpen((prev) => !prev);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleLogin = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = 'unset';
    navigate(`/login`);
  };

  const handleSignup = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = 'unset';
    navigate(`/signup`);
  };

  return (
    <>
      <ListWrap>
        <ul>
          {isMatch ? (
            match.length > 0 ? (
              match.map((match) => (
                <li key={match.id}>
                  <div className="game_container">
                    <img
                      className="game_icon"
                      src={matchGame(match.game).image}
                      alt="게임 아이콘"
                    />
                  </div>
                  <div className="content_container match">
                    <div
                      className="content_title"
                      onClick={() => handleMatchNavigate(match.id)}
                    >
                      {match.title}
                    </div>
                    <div className="content_date">
                      {new Date(match.createdAt).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <div className="content_none">작성된 매칭하기가 없습니다.</div>
              </li>
            )
          ) : null}
          {isStory ? (
            story.length > 0 ? (
              story.map((story) => (
                <li key={story.id}>
                  <div className="content_container story">
                    <div
                      className="content_title"
                      onClick={() => handleStoryNavigate(story.id)}
                    >
                      {story.content}
                    </div>
                    <div className="content_date">
                      {new Date(story.createdAt).toLocaleString()}
                    </div>
                    <div className="content_count">
                      {story.likeCount ? (
                        <div className="content_like">
                          <Heart width="10px" />
                          <span>{story.likeCount}</span>
                        </div>
                      ) : null}
                      {story.commentCount ? (
                        <div className="content_comment">
                          <Comment width="10px" />
                          <span>{story.commentCount}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {story.uploadFileName ? (
                    <div className="image_container">
                      {story.contentType.split('/')[0] === 'image' ? (
                        <img
                          className="image_preview"
                          src={story.uploadFileName}
                          alt="스토리 이미지"
                        />
                      ) : (
                        <Video className="image_preview" />
                      )}
                    </div>
                  ) : null}
                </li>
              ))
            ) : (
              <li>
                <div className="content_none">작성된 스토리가 없습니다.</div>
              </li>
            )
          ) : null}
        </ul>
      </ListWrap>
      <ProfilePagination
        isMatch={isMatch}
        matchPage={matchPage}
        setMatchPage={setMatchPage}
        matchPageInfo={matchPageInfo}
        storyPage={storyPage}
        setStoryPage={setStoryPage}
        storyPageInfo={storyPageInfo}
      />
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="스토리 상세보기"
        content="스토리 상세보기는 로그인 후 이용 가능합니다."
        button1="로그인"
        button2="회원가입"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
    </>
  );
};

export default ProfileContentList;
