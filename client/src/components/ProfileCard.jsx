import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SinglePofileWrap from './SingleProfileWrap';
import { ReactComponent as Setting } from '../assets/settingsIcon.svg';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
import { ReactComponent as EmptyHeart } from '../assets/heartEmptyIcon.svg';
import axios from 'axios';
import { useState } from 'react';
import { setProfile } from '../redux/slice/profileSlice';
import { MOBILE_POINT } from '../data/breakpoint';
import Popup from './Popup';

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

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
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

const ProfileCard = ({ user, isMe }) => {
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const { userid } = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const userInfo = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (isLikeOpen) {
      setIsLikeOpen((prev) => !prev);
    }
    if (isFollowOpen) {
      setIsFollowOpen((prev) => !prev);
    }
    if (isBlockOpen) {
      setIsBlockOpen((prev) => !prev);
    }
    document.body.style.overflow = 'unset';
    navigate(`/login`);
  };

  const handleSignup = () => {
    if (isLikeOpen) {
      setIsLikeOpen((prev) => !prev);
    }
    if (isFollowOpen) {
      setIsFollowOpen((prev) => !prev);
    }
    if (isBlockOpen) {
      setIsBlockOpen((prev) => !prev);
    }
    document.body.style.overflow = 'unset';
    navigate(`/signup`);
  };

  const handleFollow = () => {
    if (loginInfo?.isLogin) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/members/${userid}/follows`,
          {},
          {
            headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
          }
        )
        .then((res) => {
          if (res.data === '???????????? ?????????????????????.') {
            dispatch(
              setProfile({
                ...userInfo,
                followStatus: !userInfo.followStatus,
                followerCount: userInfo.followerCount + 1,
              })
            );
          } else {
            dispatch(
              setProfile({
                ...userInfo,
                followStatus: !userInfo.followStatus,
                followerCount: userInfo.followerCount - 1,
              })
            );
          }
        });
    } else {
      setIsFollowOpen((prev) => !prev);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleLike = () => {
    if (loginInfo?.isLogin) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/members/${userid}/likes`,
          {},
          {
            headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
          }
        )
        .then((res) => {
          if (res.data === '???????????? ?????????????????????.') {
            dispatch(
              setProfile({
                ...userInfo,
                likeStatus: !userInfo.likeStatus,
                likeCount: userInfo.likeCount + 1,
              })
            );
          } else {
            dispatch(
              setProfile({
                ...userInfo,
                likeStatus: !userInfo.likeStatus,
                likeCount: userInfo.likeCount - 1,
              })
            );
          }
        });
    } else {
      setIsLikeOpen((prev) => !prev);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleBlock = () => {
    if (loginInfo?.isLogin) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/members/${userid}/blocks`,
          {},
          {
            headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
          }
        )
        .then((res) => {
          if (
            res.data ===
            '?????? ????????? ?????????????????????. ???????????? ???????????? ???????????????.'
          ) {
            dispatch(
              setProfile({
                ...userInfo,
                blockStatus: !userInfo.blockStatus,
              })
            );
          } else {
            dispatch(
              setProfile({
                ...userInfo,
                blockStatus: !userInfo.blockStatus,
              })
            );
          }
        });
    } else {
      setIsBlockOpen((prev) => !prev);
      document.body.style.overflow = 'hidden';
    }
  };

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
          {/* ?????? ?????? ????????? ?????? ?????? ????????? ????????? */}
          {isMe ? (
            <div className="icon">
              <Link to={`/profile/${userid}/edit`}>
                <Setting className="setting" />
              </Link>
            </div>
          ) : (
            <div className="icon">
              {userInfo.blockStatus ? null : (
                <>
                  {userInfo.likeStatus ? (
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
            <div className="follow">?????????</div>
            <div className="number">{userInfo.followingCount}</div>
          </Follow>
          <Follow>
            <div className="follow">?????????</div>
            <div className="number">{userInfo.followerCount}</div>
          </Follow>
          <Follow>
            <div className="follow">?????????</div>
            <div className="number">{userInfo.likeCount}</div>
          </Follow>
        </FollowWrap>
        {!isMe ? (
          <ButtonWrap>
            {userInfo.blockStatus ? null : (
              <>
                {userInfo.followStatus ? (
                  <button className="em" onClick={handleFollow}>
                    ????????? ????????????
                  </button>
                ) : (
                  <button className="em" onClick={handleFollow}>
                    ???????????????
                  </button>
                )}
                <button className="normal" onClick={handleBlock}>
                  ????????????
                </button>
              </>
            )}
          </ButtonWrap>
        ) : null}
      </ProfileWrap>
      {userInfo.blockStatus ? null : (
        <>
          <ProfileWrap className="card sm">
            <div className="inform_title">???????????? ??????</div>
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
            <div className="inform_title">?????? ??????</div>
            <div className="inform_content">{user.introduction}</div>
          </ProfileWrap>
        </>
      )}
      <Popup
        isOpen={isLikeOpen}
        setIsOpen={setIsLikeOpen}
        title="?????????"
        content="???????????? ????????? ??? ?????? ???????????????."
        button1="?????????"
        button2="????????????"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
      <Popup
        isOpen={isFollowOpen}
        setIsOpen={setIsFollowOpen}
        title="?????????"
        content="???????????? ????????? ??? ?????? ???????????????."
        button1="?????????"
        button2="????????????"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
      <Popup
        isOpen={isBlockOpen}
        setIsOpen={setIsBlockOpen}
        title="??????"
        content="????????? ????????? ??? ?????? ???????????????."
        button1="?????????"
        button2="????????????"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
    </div>
  );
};

export default ProfileCard;
