import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as ImgUploadIcon } from './../assets/addPhoto.svg';
import PostPatch from '../components/PostPatch';
import InputWrap from '../components/InputWrap';
import gameList from '../data/gameList.json';
import axios from 'axios';
import { API_URL } from '../data/apiUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../redux/slice/userInfo';

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

const ProfileWrap = styled.div`
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

const GameWrap = styled.div`
  .game_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px;
    div {
      margin-right: 6px;
    }
    div:last-child {
      margin-right: 0;
    }
  }
  .game {
    margin-top: 8px;
  }
  input[type='checkbox'] {
    display: none;
  }
  .game_title {
    padding: 8px 12px;
    background: var(--input-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-btn);
    font-size: var(--font-caption-size);
    cursor: pointer;
  }
  input[type='checkbox']:checked + .game_title {
    background: var(--bg-color);
    color: var(--yellow);
  }
`;

const BioWrap = styled.div`
  margin: 16px 0;
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

const BlockWrap = styled.div`
  .block_button {
    border-radius: 8px;
  }
`;

const ProfileEdit = () => {
  const { userid } = useParams();
  const [nickname, setNickname] = useState('');
  const [fileName, setFileName] = useState('이미지 파일을 선택하세요');
  const [file, setFile] = useState('');
  const [checkedGame, setCheckedGame] = useState([]);
  const [bio, setBio] = useState('');
  const loginInfo = useSelector((state) => state.islogin.login);
  const userInform = useSelector((state) => state.userInfo.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleOnChange = (e) => {
    setFileName(e.currentTarget.files[0].name);
    setFile(e.currentTarget.files[0]);
  };

  const handleCheckbox = useCallback(
    (e, checked, item) => {
      if (checked) {
        if (checkedGame.length < 5) {
          setCheckedGame((prev) => [...prev, item]);
        } else {
          alert('5개까지만 선택 가능합니다.');
          e.target.checked = null;
        }
      } else {
        setCheckedGame(checkedGame.filter((game) => game !== item));
      }
    },
    [checkedGame]
  );

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handlePatch = () => {
    const formData = new FormData();
    const data = {
      nickname,
      introduction: bio,
      games: checkedGame,
    };

    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );
    if (file) {
      formData.append('image', file);
    }

    axios
      .patch(`${API_URL}/api/members/${userid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${loginInfo?.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(userInfo(res.data.data));
        navigate(`/profile/${userid}`, { replace: true });
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${userid}`, {
        headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
      })
      .then((res) => {
        setNickname(res.data.data.nickname);
        setBio(res.data.data.introduction);
      });
    setCheckedGame(userInform.games.map((game) => game.korTitle));
  }, []);

  if (userInform) {
    return (
      <PostPatch
        image={userInform.profileImage}
        nickname={userInform.nickname}
        identifier={userInform.identifier}
        button1="수정완료"
        button2="탈퇴하기"
        link="/quit"
        handleSubmit={handlePatch}
      >
        <ContentWrap>
          <NicknameWrap>
            <label htmlFor="nickname">닉네임 수정</label>
            <InputWrap
              type="text"
              name="nickname"
              value={nickname || ''}
              onChange={handleNickname}
            />
          </NicknameWrap>
          <ProfileWrap>
            <div className="custom_label">프로필 이미지 수정</div>
            <div className="custom_input_wrap">
              <div className="custom_input">
                {fileName}
                <input
                  type="file"
                  onChange={(e) => handleOnChange(e)}
                  id="selectImg"
                />
              </div>
              <label htmlFor="selectImg" className="custom_btn">
                <ImgUploadIcon />
                이미지 업로드
              </label>
            </div>
          </ProfileWrap>
          <GameWrap>
            <label htmlFor="game">주로하는 게임 (최대 5개)</label>
            <div className="game_list">
              {gameList.games.map((game) => (
                <div className="game" key={game.id}>
                  <input
                    type="checkbox"
                    name="game"
                    id={game.title}
                    onChange={(e) => {
                      handleCheckbox(e, e.target.checked, e.target.id);
                    }}
                    defaultChecked={
                      userInform.games.filter(
                        (games) => games.korTitle === game.title
                      ).length > 0
                        ? true
                        : null
                    }
                  />
                  <label className="game_title" htmlFor={game.title}>
                    {game.title}
                  </label>
                </div>
              ))}
            </div>
          </GameWrap>
          <BioWrap>
            <label htmlFor="bio">자기소개 수정</label>
            <textarea
              id="bio"
              value={bio || ''}
              placeholder="내용을 입력하세요"
              onChange={handleBio}
            />
          </BioWrap>
          <BlockWrap>
            <label>차단한 유저 편집</label>
            <button
              className="normal block_button"
              onClick={() => navigate(`/profile/${userid}/block`)}
            >
              차단한 유저 목록 보기
            </button>
          </BlockWrap>
        </ContentWrap>
      </PostPatch>
    );
  } else {
    return null;
  }
};

export default ProfileEdit;
