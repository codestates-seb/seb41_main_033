import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as ImgUploadIcon } from "./../assets/addPhoto.svg";
import PostPatch from "../components/PostPatch";
import InputWrap from "../components/InputWrap";
import gameList from "../data/gameList.json";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/slice/userInfo";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "../components/Popup";
import { throttle } from "lodash";

const ContentWrap = styled.div`
  margin: 24px 0;
  label {
    font-size: var(--font-body1-size);
    margin-bottom: 8px;
  }
  .error_caption {
    padding: 0 16px;
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
      input[type="file"] {
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
      justify-content: center;
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

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
    .custom_input_wrap {
      flex-direction: column;
      .custom_input {
        width: 100%;
        margin: 0 0 12px 0;
      }
      .custom_btn {
        width: 100%;
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
  input[type="checkbox"] {
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
  input[type="checkbox"]:checked + .game_title {
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
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [fileName, setFileName] = useState("????????? ????????? ???????????????");
  const [file, setFile] = useState("");
  const [checkedGame, setCheckedGame] = useState([]);
  const [bio, setBio] = useState("");
  const [isError, setIsError] = useState({ nickname: false });
  const loginInfo = useSelector((state) => state.islogin.login);
  const userInform = useSelector((state) => state.userInfo.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNickname = (e) => {
    setNickname(e.target.value);
    if (
      !e.target.value ||
      !/(?=.*\d)|(?=.*[a-zA-Z])|(?=.*[???-???]).{2,8}/.test(e.target.value)
    ) {
      setIsError({ ...isError, nickname: true });
    } else setIsError({ ...isError, nickname: false });
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
          alert("5???????????? ?????? ???????????????.");
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
    if (e.target.value.length > 500) {
      setIsError({ ...isError, introduction: true });
    } else setIsError({ ...isError, introduction: false });
  };

  const handlePatch = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handlePatchSubmit = throttle(() => {
    const formData = new FormData();
    const data = {
      nickname,
      introduction: bio,
      games: checkedGame,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    if (file) {
      formData.append("image", file);
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/members/${userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${loginInfo?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setIsOpen((prev) => !prev);
        document.body.style.overflow = "unset";
        dispatch(userInfo(res.data.data));
        navigate(`/profile/${userid}`, { replace: true });
      });
  }, 10000);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/members/${userid}`, {
        headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
      })
      .then((res) => {
        setNickname(res.data.data.nickname);
        setBio(res.data.data.introduction);
      });
    setCheckedGame(userInform.games.map((game) => game.korTitle));
  }, [loginInfo?.accessToken, userInform.games, userid]);

  if (userInform) {
    return (
      <PostPatch
        image={userInform.profileImage}
        nickname={userInform.nickname}
        identifier={userInform.identifier}
        button1="????????????"
        button2="????????????"
        link="/quit"
        handleSubmit={handlePatch}
      >
        <ContentWrap>
          <NicknameWrap>
            <label htmlFor="nickname">????????? ??????</label>
            <InputWrap
              className={isError.nickname ? "error" : null}
              type="text"
              name="nickname"
              value={nickname || ""}
              onChange={handleNickname}
              maxLength="8"
            />
            {isError.nickname ? (
              <div className="error_caption">
                ???????????? 2~8?????? ??????, ??????, ????????? ???????????????.
              </div>
            ) : null}
          </NicknameWrap>
          <ProfileWrap>
            <div className="custom_label">????????? ????????? ??????</div>
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
                ????????? ?????????
              </label>
            </div>
          </ProfileWrap>
          <GameWrap>
            <label htmlFor="game">???????????? ?????? (?????? 5???)</label>
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
            <label htmlFor="bio">???????????? ??????</label>
            <textarea
              className={isError.introduction ? "error" : null}
              id="bio"
              value={bio || ""}
              placeholder="????????? ???????????????"
              onChange={handleBio}
            />
            {isError.introduction ? (
              <div className="error_caption">
                ??????????????? 500??? ????????? ???????????????.
              </div>
            ) : null}
          </BioWrap>
          <BlockWrap>
            <label>????????? ?????? ??????</label>
            <button
              className="normal block_button"
              onClick={() => navigate(`/profile/${userid}/block`)}
            >
              ????????? ?????? ?????? ??????
            </button>
          </BlockWrap>
        </ContentWrap>
        <Popup
          isOpen={isOpen}
          title="????????? ??????"
          content="????????? ????????? ?????????????????????."
          button1="??????"
          handleBtn1={handlePatchSubmit}
        />
      </PostPatch>
    );
  } else {
    return null;
  }
};

export default ProfileEdit;
