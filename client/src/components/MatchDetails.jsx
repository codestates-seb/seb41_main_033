import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import matchGame from "../util/matchGame";
const Detail = styled.div`
  width: var(--col-9);
  margin-right: 32px;
  div :nth-child(1) {
    > img {
      align-content: flex-end;
    }
  }
  .description {
    display: flex;
    flex-direction: column;
  }
  button,
  a {
    width: 280px;
    margin-right: 16px;
  }
`;
const Div = styled.div`
  display: flex;
  margin-bottom: 16px;

  > img {
    width: 80px;
    height: 80px;
  }
`;
const Span = styled.span`
  display: block;
  margin: 0 8px;
  color: var(--white);
`;
const Info = styled.div`
  width: 100%;
  .title {
    font-size: var(--font-head2-size);
    color: var(--white);
    line-height: 150%;
  }
  .game {
    color: var(--yellow);
  }
`;
const EmLink = styled(Link)`
  text-align: center;
  display: block;
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    rgba(255, 186, 41, 1) 0%,
    rgba(255, 143, 147, 1) 51%,
    rgba(255, 186, 41, 1) 100%
  );
  transition: 0.4s;
  padding: 12px 16px;
  font-size: var(--font-body1-size);
  font-weight: var(--font-weight-medium);
  color: var(--strong-color);
  border-radius: var(--border-radius-btn);
  &:hover {
    background-position: right center;
  }
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  margin-right: 6px;
  height: 32px;
  color: var(--white);
  background: var(--black);
  border: 1px solid var(--grey);
  border-radius: 30px;
  cursor: pointer;
`;
const Description = styled.div`
  margin-bottom: 32px;
`;
const MatchDetails = ({ data, boardId }) => {
  const [same, setSame] = useState(true);

  const usenavigate = useNavigate();
  useEffect(() => {
    if (data.memberId === "로그인한유저아이디") {
      setSame(true);
    }
  }, [data.memberId]);
  const deleteBtn = () => {
    axios
      .delete(`${API_URL}/api/matches/${boardId}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
      })
      .then((res) => usenavigate("/"));
  };

  return (
    <Detail className="card big">
      <Div>
        <Info>
          <div className="title">{data.title}</div>
          <div className="game">{data.game.korTitle}</div>
        </Info>
        <img src={matchGame(data.game).image} alt="게임아이콘" />
      </Div>
      <Div>
        <span>팀원수</span>
        <Span>{data?.team} 명</Span>
        <span>매칭생성시간</span>
        <Span>{displayedAt(data?.createdAt)}</Span>
      </Div>
      <Div>
        {data?.tags.map((el, idx) => (
          <Tag key={idx}>{el}</Tag>
        ))}
      </Div>
      <Div className="description">
        <div>상세설명</div>
        <Description>{data?.content}</Description>
      </Div>
      {same && (
        <Div>
          <EmLink to={"/matchwrite"}>수정하기</EmLink>
          <button className="normal" onClick={deleteBtn}>
            삭제하기
          </button>
        </Div>
      )}
    </Detail>
  );
};
export default MatchDetails;
