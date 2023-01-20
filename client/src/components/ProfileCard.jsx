import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SinglePofileWrap from './SingleProfileWrap';
import { ReactComponent as ProfileImg } from '../assets/defaultImg.svg';
import { ReactComponent as Setting } from '../assets/settingsIcon.svg';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
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
  }
`;

const InformWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  .img_profile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 16px;
  }
  .icon {
    margin: auto 0;
  }
  .setting,
  .likes {
    width: 24px;
    height: 24px;
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

const ProfileCard = ({
  image,
  nickname,
  identifier,
  following,
  follower,
  likes,
  games,
  introduction,
}) => {
  /* 더미 데이터 */
  const [isMe, setIsMe] = useState(false);
  const { userid } = useParams();
  const memberId = useSelector((state) => state.islogin.memberId);

  useEffect(() => {
    userid === memberId ? setIsMe(true) : setIsMe(false);
  }, []);

  return (
    <div>
      <ProfileWrap className="card sm">
        <InformWrap>
          <SinglePofileWrap imgSize="big" imgSrc={image} name={nickname} subInfo={identifier} />
          {/* 자기 자신 여부에 따라 표시 아이콘 달라짐 */}
          {isMe ? (
            <div className="icon">
              <Link to={`/profile/${userid}/edit`}>
                <Setting className="setting" />
              </Link>
            </div>
          ) : (
            <div className="icon">
              <Heart className="likes" />
            </div>
          )}
        </InformWrap>
        <FollowWrap>
          <Follow>
            <div className="follow">팔로잉</div>
            <div className="number">{following}</div>
          </Follow>
          <Follow>
            <div className="follow">팔로워</div>
            <div className="number">{follower}</div>
          </Follow>
          <Follow>
            <div className="follow">좋아요</div>
            <div className="number">{likes}</div>
          </Follow>
        </FollowWrap>
        {isMe ? null : (
          <ButtonWrap>
            <button className="em">팔로우하기</button>
            <button className="normal">차단하기</button>
          </ButtonWrap>
        )}
      </ProfileWrap>
      <ProfileWrap className="card sm">
        <div className="inform_title">주로하는 게임</div>
        <GameWrap>
          <ul>
            {games.map((game) => (
              <li key={game.id} className="normal game_title">
                {game.korTitle}
              </li>
            ))}
          </ul>
        </GameWrap>
      </ProfileWrap>
      <ProfileWrap className="card sm">
        <div className="inform_title">자기 소개</div>
        <div className="inform_content">{introduction}</div>
      </ProfileWrap>
    </div>
  );
};

export default ProfileCard;
