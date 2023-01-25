import styled from "styled-components";
import Dropdown from "../components/DropDown";
import React, { useState } from "react";
import InputWrap from "../components/InputWrap";
import PostPatch from "../components/PostPatch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiUrl";
import { useSelector } from "react-redux";
import validity from "../util/validity";
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
    justify-content: center;
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
    padding: 6px 0;
    &:focus {
      outline: transparent;
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
  const submitBtn = (e) => {
    e.preventDefault();
    const data = { title, game, team, tags, content };
    validity(data);
    const isEmpty = (object) =>
      !Object.values(object).every((el) => el !== null && el.length !== 0);
    if (!isEmpty(data)) {
      axios
        .patch(`${API_URL}/api/matches/${gameInfo.id}`, data, {
          headers: {
            Authorization: `Bearer ${loginInfo.accessToken}`,
          },
        })
        .then(() => navigate("/match"))
        .catch((err) => alert(err));
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PostPatch
      image={gameInfo?.profileImage}
      nickname={gameInfo?.nickname}
      identifier={gameInfo?.identifier}
      button1="작성완료"
      link={-1}
      button2="취소"
      handleSubmit={submitBtn}
    >
      <div>
        <Label htmlFor="title">제목</Label>
        <InputWrap
          type="text"
          name="title"
          id="title"
          maxLength="30"
          minLength="5"
          placeholder="제목을 입력하세요"
          onChange={changeValue}
          value={title}
        />
      </div>
      <div>
        <Label htmlFor="game">플레이어 할 게임</Label>
        <Dropdown
          id="game"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          game={game}
          setGame={setGame}
        />
      </div>
      <div>
        <Label htmlFor="team">구하려는 팀원수</Label>
        <InputWrap
          type="text"
          name="team"
          id="team"
          value={team}
          placeholder="팀원수를 입력하세요"
          onChange={changeValue}
        />
      </div>

      <Label htmlFor="tag">태그</Label>
      <TagsInput>
        <ul id="tags">
          {tags?.map((tag, index) => (
            <li key={index} className="tag" onClick={() => removeTags(index)}>
              <span className="tag_title">{tag}</span>
              <span>×</span>
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
          placeholder="입력 후 엔터키를 누르세요"
        />
      </TagsInput>
      <div>
        <Label htmlFor="content">내용</Label>
        <TextArea
          name="content"
          placeholder="상세설명을 입력하세요"
          onChange={changeValue}
          value={content}
          maxLength="500"
          minLength="5"
        />
      </div>
    </PostPatch>
  );
};
export default MatchingEdit;
