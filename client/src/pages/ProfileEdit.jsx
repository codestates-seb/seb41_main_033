import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import PostPatch from '../components/PostPatch';
import InputWrap from '../components/InputWrap';
import dummyUser from '../data/dummyUser.json';
import Dropdown from '../components/DropDown';

const ContentWrap = styled.div`
  margin: 24px 0;
  label {
    font-size: var(--font-body1-size);
    margin-bottom: 8px;
  }
`;

const NicknameWrap = styled.div`
  margin-bottom: 16px;
`;

const GameWrap = styled.div`
  margin-bottom: 16px;
`;

const BioWrap = styled.div`
  .bio {
    height: 112px;
  }
`;

const ProfileEdit = () => {
  const { identifier, nickname, image } = dummyUser.user[0];
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState('게임을 선택하세요');

  const handleNickname = (e) => {
    setUser({ ...user, nickname: e.target.value });
  };

  const handleBio = (e) => {
    setUser({ ...user, introduction: e.target.value });
  };

  useEffect(() => {
    setUser({ nickname });
  }, []);

  return (
    <PostPatch
      image={image}
      nickname={nickname}
      identifier={identifier}
      link1="/userid"
      button1="수정완료"
      link2="/quit"
      button2="탈퇴하기"
    >
      <ContentWrap>
        <NicknameWrap>
          <label htmlFor="nickname">닉네임 수정</label>
          <InputWrap
            type="text"
            name="nickname"
            value={user.nickname || ''}
            onChange={handleNickname}
          />
        </NicknameWrap>
        <GameWrap>
          <label htmlFor="game">주로하는 게임</label>
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            game={game}
            setGame={setGame}
          />
        </GameWrap>
        <BioWrap>
          <label htmlFor="bio">자기소개 수정</label>
          <InputWrap
            className="bio"
            type="text"
            name="bio"
            value={user.introduction || ''}
            placeholder="자기소개를 입력하세요"
            onChange={handleBio}
          />
        </BioWrap>
      </ContentWrap>
    </PostPatch>
  );
};

export default ProfileEdit;
