import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ImgUploadIcon } from './../assets/addPhoto.svg';
import PostPatch from '../components/PostPatch';
import InputWrap from '../components/InputWrap';
import dummyUser from '../data/dummyUser.json';

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
  .custom_label {
    margin-bottom: 8px;
  }
  .custom_input_wrap {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: var(--font-body2-size);

    .custom_input {
      flex: 1;
      position: relative;
      padding: 12px 16px;
      margin-right: 12px;
      background: var(--input-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);

      input[type='file'] {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .custom_btn {
      flex: none;
      display: flex;
      align-items: center;
      padding: 8px 24px;
      margin: 0;
      background: var(--bg-color);
      border: 1px solid var(--white);
      border-radius: var(--border-radius-sm);
      color: var(--primary-color);

      svg {
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }
    }
  }
`;

const BioWrap = styled.div`
  margin: 24px 0 16px 0;
  textarea {
    resize: none;
    width: 100%;
    min-height: 112px;
    padding: 12px 16px;
    background: var(--input-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-body2-size);
    color: var(--strong-color);
  }
`;

const ProfileEdit = () => {
  const { identifier, nickname, image } = dummyUser.user[0];
  const [user, setUser] = useState({});
  const [fileName, setFileName] = useState(
    '파일을 선택하세요 (* jpeg, jpg, png 확장자만 가능합니다)'
  );
  const [game, setGame] = useState('게임을 선택하세요');

  const handleNickname = (e) => {
    setUser({ ...user, nickname: e.target.value });
  };

  const handleOnchange = (e) => {
    setFileName(e.currentTarget.files[0].name);
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
          <div className="custom_label">프로필 이미지 수정</div>
          <div className="custom_input_wrap">
            <div className="custom_input">
              {fileName}
              <input
                type="file"
                onChange={(e) => handleOnchange(e)}
                id="selectImg"
              ></input>
            </div>
            <label htmlFor="selectImg" className="custom_btn">
              <ImgUploadIcon />
              이미지 업로드
            </label>
          </div>
          <label htmlFor="game">주로하는 게임 (중복 선택 가능)</label>
        </GameWrap>
        <BioWrap>
          <label htmlFor="bio">자기소개 수정</label>
          <textarea
            name="bio"
            value={user.introduction || ''}
            placeholder="내용을 입력하세요"
            onChange={handleBio}
          />
        </BioWrap>
      </ContentWrap>
    </PostPatch>
  );
};

export default ProfileEdit;
