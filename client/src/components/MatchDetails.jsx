import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import { Link } from "react-router-dom";
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
  button {
    width: 100%;
    margin: 16px;
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
const MatchDetails = ({ data, matchId }) => {
  const [same, setSame] = useState(false);
  useEffect(() => {
    if (matchId === "memberId") {
      setSame(true);
    }
  }, [matchId]);
  const deleteBtn = () => {
    axios
      .get(`${API_URL}/api/matches/${matchId}`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => console.log(res));
  };

  return (
    <Detail className="card big">
      <Div>
        <Info>
          <div className="title">{data.title}</div>
          <div className="game">{data.game}</div>
        </Info>
        <img
          src="https://new-version.download/wp-content/uploads/league-of-legends.png"
          alt="게임아이콘"
        ></img>
      </Div>
      <Div>
        <span>팀원수</span>
        <Span>{data.team} 명</Span>
        <span>매칭생성시간</span>
        <Span>{displayedAt(data.createdAt)}</Span>
      </Div>
      <Div>
        {data.tags.map((el, idx) => (
          <Tag key={idx}>{el}</Tag>
        ))}
      </Div>
      <Div className="description">
        <div>상세설명</div>
        <Description>{data.content}</Description>
      </Div>
      {same && (
        <Div>
          <Link to={"/matchwrite"}>
            <button className="em">수정하기</button>
          </Link>
          <button className="normal" onClick={deleteBtn}>
            삭제하기
          </button>
        </Div>
      )}
    </Detail>
  );
};
export default MatchDetails;
