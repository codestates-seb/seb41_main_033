import styled from 'styled-components';
import { ReactComponent as Setting } from '../assets/settingsIcon.svg';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
import games from '../data/dummyGames.json';

const ProfileWrap = styled.div`
  width: var(--col-4);
  margin-bottom: 16px;

  .inform_title {
    margin-bottom: 16px;
    font-size: var(--font-body2-size);
    font-weight: var(--font-weight-medium);
  }

  .inform_content {
    font-size: 13px;
    color: var(--white);
  }
`;

const InformWrap = styled.div`
  display: flex;
  margin-bottom: 16px;

  .img_profile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .name_content {
    width: 100%;
    margin: auto;
  }

  .nickname {
    color: var(--white);
    font-size: 18px;
    font-weight: var(--font-weight-medium);
  }

  .identifier {
    font-size: var(--font-body2-size);
  }

  .icon {
    margin-left: 16px;
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
  /* 🥕일단은 버튼 처리 했는데 text 상하 중앙 정렬 안되는 것, 각 요소 사이 margin 값 어떻게 줄지...?🥕 */
  .game_title {
    color: var(--yellow);
    font-size: var(--font-caption-size);
  }
`;

const ProfileCard = () => {
  /* 더미 데이터 */
  const isMe = false;

  return (
    <div>
      <ProfileWrap className="card sm">
        <InformWrap>
          <img
            className="img_profile"
            src="https://user-images.githubusercontent.com/111413253/211796628-2ec8bc2a-894c-48da-9fa6-630ef4f70c4c.png"
            alt="프로필 이미지"
          />
          <div className="name_content">
            {/* 정보 수정 필요 */}
            <div className="nickname">닉네임</div>
            <div className="identifier">아이디</div>
          </div>
          {/* 자기 자신 여부에 따라 표시 아이콘 달라짐 */}
          {isMe ? (
            <div className="icon">
              <Setting className="setting" />
            </div>
          ) : (
            <div className="icon">
              <Heart className="likes" />
            </div>
          )}
        </InformWrap>
        <FollowWrap>
          {/* 정보 수정 필요 */}
          <Follow>
            <div className="follow">팔로잉</div>
            <div className="number">123</div>
          </Follow>
          <Follow>
            <div className="follow">팔로워</div>
            <div className="number">1234</div>
          </Follow>
          <Follow>
            <div className="follow">좋아요</div>
            <div className="number">1234</div>
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
          {games.games.map((game) => (
            <button key={game.id} className="normal game_title">
              {game.title}
            </button>
          ))}
        </GameWrap>
      </ProfileWrap>
      <ProfileWrap className="card sm">
        {/* 정보 수정 필요 */}
        <div className="inform_title">자기 소개</div>
        <div className="inform_content">에우프로시네 갈사람</div>
      </ProfileWrap>
    </div>
  );
};

export default ProfileCard;
