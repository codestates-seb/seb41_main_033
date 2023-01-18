import styled from "styled-components";
import Dropdown from "../components/DropDown";
import React, { useState } from "react";
import InputWrap from "../components/InputWrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DefaultProfileImg } from "./../assets/defaultImg.svg";
import { API_URL } from "../data/apiUrl";
const MatchContainer = styled.form`
  .user_info {
    display: flex;
    flex-direction: column;
    > div {
      margin-bottom: 16px;
    }
  }
  textarea {
    background-color: var(--input-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    width: 100%;
    min-height: 112px;
    padding: 16px;
    color: var(--strong-color);
    resize: none;
  }
`;

const Wrap = styled.div`
  width: 100%;
`;

const MatchBox = styled.div`
  display: flex;
  justify-content: center;
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const UserDiv = styled.div`
  .nickname {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-head3-size);
    color: var(--white);
  }
`;

const MatchBtn = styled.button`
  width: 280px;
  padding: 12px 16px;
  margin: 32px 8px;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.023em;
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
      cursor: pointer;
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
    /* height: 28px; */
    padding: 6px 0;
    &:focus {
      outline: transparent;
    }
  }
`;

const MatchingWrite = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    title: "",
    game: "",
    team: "",
    content: "",
  });
  const [tags, setTags] = useState([]);
  const [game, setGame] = useState("게임을 선택하세요");

  const removeTags = (index) => {
    const newTag = tags.filter((_, idx) => idx !== index);
    setTags(newTag);
  };

  const addTags = (event) => {
    const newTag = event.target.value.replace(/ /g, "").substring(0, 6);
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
    const isEmpty = (object) =>
      !Object.values(object).every((el) => el !== null && el.length !== 0);

    const data = { title, game, team, tags, content };
    if (!isEmpty(data)) {
      axios
        .post(`${API_URL}/api/matches`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("key")}`,
          },
        })
        .then(() => navigate("/"));
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MatchContainer className="card big" onsubmit="return false">
      <Wrap>
        <UserInfo>
          <UserImg src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png" />
          <UserDiv>
            <div className="nickname">맑게 고인 김소라</div>
            <div>유저아이디 </div>
          </UserDiv>
        </UserInfo>
        <MatchBox className="user_info">
          <div>
            <Label htmlFor="title">제목</Label>
            <InputWrap
              type="text"
              name="title"
              id="title"
              length={"30"}
              placeholder="제목을 입력하세요"
              onChange={changeValue}
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
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="tag"
                  onClick={() => removeTags(index)}
                >
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
            <Label htmlFor="content">상세 설명</Label>
            <textarea
              name="content"
              placeholder="상세설명을 입력하세요"
              onChange={changeValue}
            />
          </div>
        </MatchBox>
        <MatchBox>
          <MatchBtn type="submit" onClick={submitBtn} className="em">
            작성완료
          </MatchBtn>
          <MatchBtn className="normal" onClick={() => navigate("/")}>
            취소
          </MatchBtn>
        </MatchBox>
      </Wrap>
    </MatchContainer>
  );
};
export default MatchingWrite;
