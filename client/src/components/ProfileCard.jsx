import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SinglePofileWrap from './SingleProfileWrap';
import { ReactComponent as Setting } from '../assets/settingsIcon.svg';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
import { ReactComponent as EmptyHeart } from '../assets/heartEmptyIcon.svg';
import axios from 'axios';
import { API_URL } from '../data/apiUrl';
import { useState, useEffect } from 'react';

const ProfileWrap = styled.div`
  width: var(--col-4);
  margin-bottom: 16px;
  .inform_title {
    margin-bottom: 10px;
    font-size: var(--font-body2-size);
    font-weight: var(--font-weight-medium);
  }
  .inform_content {
    margin-top: 6px;
    font-size: var(--font-body2-size);
    color: var(--white);
    white-space: pre-wrap;
  }
`;

const InformWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  .profile_container {
    margin-bottom: 0px;
  }
  .icon {
    margin: auto 0;
  }
  .setting,
  .likes {
    width: 24px;
    height: 24px;
    margin: auto 0;
    cursor: pointer;
  }
`;

const FollowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const Follow = styled.div`
  text-align: center;
  .follow,
  .number {
    font-size: var(--font-body2-size);
    line-height: var(--line-height-lg);
  }
  .number {
    color: var(--white);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 16px;
  }
`;

const GameWrap = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  .game_title {
    margin: 6px 6px 0 0;
    padding: 8px 12px;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-btn);
    color: var(--yellow);
    font-size: var(--font-caption-size);
  }
`;

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const { userid } = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const navigate = useNavigate();

  const handleFollow = () => {
    if (loginInfo?.isLogin) {
      axios.post(
        `${API_URL}/api/members/${userid}/follows`,
        {},
        {
          headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
        }
      );
      window.location.reload();
    } else return navigate(`/login`);
  };

  const handleLike = () => {
    if (loginInfo?.isLogin) {
      axios.post(
        `${API_URL}/api/members/${userid}/likes`,
        {},
        {
          headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
        }
      );
      window.location.reload();
    } else return navigate(`/login`);
  };

  const handleBlock = () => {
    if (loginInfo?.isLogin) {
      axios.post(
        `${API_URL}/api/members/${userid}/blocks`,
        {},
        {
          headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
        }
      );
      window.location.reload();
    } else return navigate(`/login`);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${userid}`, {
        headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
      })
      .then((res) => {
        setUser(res.data.data);
      });
    Number(userid) === loginInfo?.memberId ? setIsMe(true) : setIsMe(false);
  }, [userid, loginInfo?.accessToken, loginInfo?.memberId]);

  if (user) {
    return (
      <div>
        <ProfileWrap className="card sm">
          <InformWrap>
            <SinglePofileWrap
              className="profile_container"
              imgSize="big"
              imgSrc={user.profileImage}
              name={user.nickname}
              subInfo={user.identifier}
            />
            {/* 자기 자신 여부에 따라 표시 아이콘 달라짐 */}
            {isMe ? (
              <div className="icon">
                <Link to={`/profile/${userid}/edit`}>
                  <Setting className="setting" />
                </Link>
              </div>
            ) : (
              <div className="icon">
                {user.blockStatus ? null : (
                  <>
                    {user.likeStatus ? (
                      <Heart className="likes" onClick={handleLike} />
                    ) : (
                      <EmptyHeart className="likes" onClick={handleLike} />
                    )}
                  </>
                )}
              </div>
            )}
          </InformWrap>
          <FollowWrap>
            <Follow>
              <div className="follow">팔로잉</div>
              <div className="number">{user.followingCount}</div>
            </Follow>
            <Follow>
              <div className="follow">팔로워</div>
              <div className="number">{user.followerCount}</div>
            </Follow>
            <Follow>
              <div className="follow">좋아요</div>
              <div className="number">{user.likeCount}</div>
            </Follow>
          </FollowWrap>
          {!isMe ? (
            <ButtonWrap>
              {user.blockStatus ? null : (
                <>
                  {user.followStatus ? (
                    <button className="em" onClick={handleFollow}>
                      팔로우 해제하기
                    </button>
                  ) : (
                    <button className="em" onClick={handleFollow}>
                      팔로우하기
                    </button>
                  )}
                  <button className="normal" onClick={handleBlock}>
                    차단하기
                  </button>
                </>
              )}
            </ButtonWrap>
          ) : null}
        </ProfileWrap>
        {user.blockStatus ? null : (
          <>
            <ProfileWrap className="card sm">
              <div className="inform_title">주로하는 게임</div>
              <GameWrap>
                <ul>
                  {user.games.map((game) => (
                    <li key={game.id} className="normal game_title">
                      {game.korTitle}
                    </li>
                  ))}
                </ul>
              </GameWrap>
            </ProfileWrap>
            <ProfileWrap className="card sm">
              <div className="inform_title">자기 소개</div>
              <div className="inform_content">{user.introduction}</div>
            </ProfileWrap>
          </>
        )}
      </div>
    );
  } else return null;
};

export default ProfileCard;
