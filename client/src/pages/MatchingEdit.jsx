import styled from "styled-components";
import Dropdown from "../components/DropDown";
import React, { useState } from "react";
import InputWrap from "../components/InputWrap";
import PostPatch from "../components/PostPatch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import validity from "../util/validity";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "../components/Popup";
import { throttle } from "lodash";
const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.023em;
  margin: 16px 0px;
`;

const TagsInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: var(--darkgrey2);
  border: 1px solid var(--grey);
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  color: var(--white);
  margin: 8px 0px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px;
      margin-right: 6px;
      height: 32px;
      background: var(--black);
      border: 1px solid var(--grey);
      border-radius: 30px;
      .tag_title {
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 0.1px;
        margin-right: 8px;
      }
      .tag_close {
        cursor: pointer;
        color: var(--lightgrey);
      }
    }
  }
  input {
    display: inline-flex;
    border: none;
    outline: none;
    background: none;
    width: auto;
    color: var(--font-color);
    padding: 6px;
    &:focus {
      outline: transparent;
    }
  }

  @media (max-width: ${MOBILE_POINT}) {
    flex-direction: column;
    .tag {
      margin-bottom: 6px;
    }
  }
`;
const TextArea = styled.textarea`
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  width: 100%;
  min-height: 112px;
  padding: 16px;
  color: var(--strong-color);
  resize: none;
  white-space: pre-wrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MatchingEdit = () => {
  const gameInfo = useSelector((state) => state.games.gameInfo);
  const loginInfo = useSelector((state) => state.islogin.login);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({
    title: gameInfo?.title,
    team: gameInfo?.team,
    content: gameInfo?.content,
  });
  const [tags, setTags] = useState(gameInfo?.tags);
  const [game, setGame] = useState(gameInfo?.game.korTitle);

  const removeTags = (index) => {
    const newTag = tags.filter((_, idx) => idx !== index);
    setTags(newTag);
  };

  const addTags = (event) => {
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    const newTag = event.target.value.replace(reg, "").substring(0, 5);
    if (
      !tags.includes(newTag) &&
      event.key === "Enter" &&
      tags.length < 3 &&
      newTag.length > 0
    ) {
      setTags([...tags, `#${newTag}`]);
      event.target.value = "";
    } else if (tags.length >= 3) {
      event.target.value = "";
    }
  };
  const changeValue = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const { title, team, content } = info;

  const handlePatch = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const submitBtn = throttle((e) => {
    e.preventDefault();
    const data = { title, game, team, tags, content };
    validity(data);
    const isEmpty = (object) =>
      !Object.values(object).every((el) => el !== null && el.length !== 0);
    if (!isEmpty(data)) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/matches/${gameInfo.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${loginInfo.accessToken}`,
            },
          }
        )
        .then(() => {
          setIsOpen((prev) => !prev);
          document.body.style.overflow = "unset";
          navigate("/match");
        })
        .catch((err) => console.log(err));
    }
  }, 10000);

  return (
    <PostPatch
      image={gameInfo?.profileImage}
      nickname={gameInfo?.nickname}
      identifier={gameInfo?.identifier}
      button1="????????????"
      link={-1}
      button2="??????"
      handleSubmit={handlePatch}
    >
      <div>
        <Label htmlFor="title">??????</Label>
        <InputWrap
          type="text"
          name="title"
          id="title"
          maxLength="30"
          minLength="5"
          placeholder="????????? ???????????????"
          onChange={changeValue}
          value={title}
        />
      </div>
      <div>
        <Label htmlFor="game">???????????? ??? ??????</Label>
        <Dropdown
          id="game"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          game={game}
          setGame={setGame}
        />
      </div>
      <div>
        <Label htmlFor="team">???????????? ?????????</Label>
        <InputWrap
          type="text"
          name="team"
          id="team"
          value={team}
          placeholder="???????????? ???????????????"
          onChange={changeValue}
        />
      </div>

      <Label htmlFor="tag">??????</Label>
      <TagsInput>
        <ul id="tags">
          {tags?.map((tag, index) => (
            <li key={index} className="tag" onClick={() => removeTags(index)}>
              <span className="tag_title">{tag}</span>
              <span>??</span>
            </li>
          ))}
        </ul>
        <input
          className="tag_input"
          type="text"
          maxLength="12"
          onKeyUp={(event) => {
            addTags(event);
          }}
          placeholder="?????? ??? ???????????? ????????????"
        />
      </TagsInput>
      <div>
        <Label htmlFor="content">??????</Label>
        <TextArea
          name="content"
          placeholder="??????????????? ???????????????"
          onChange={changeValue}
          value={content}
          maxLength="500"
          minLength="5"
        />
      </div>
      <Popup
        isOpen={isOpen}
        title="???????????? ??????"
        content="???????????? ????????? ?????????????????????."
        button1="??????"
        handleBtn1={submitBtn}
      />
    </PostPatch>
  );
};
export default MatchingEdit;
