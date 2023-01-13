import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import { useState } from "react";
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
const MatchDetails = ({ data }) => {
  console.log(data);

  return (
    <Detail className="card big">
      <Div>
        <Info>
          <div className="title">{data.title}</div>
          <div className="game">{data.game}</div>
        </Info>
        <img src="https://new-version.download/wp-content/uploads/league-of-legends.png"></img>
      </Div>
      <Div>
        <span>팀원수</span>
        <Span>{data.team}</Span>
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
        <Description>
          여기는 데이터를 요청받아 뿌릴것이당 하지만 까먹어서 넣지못했다 어차피
          요청해줄테니 기다리자 😋
        </Description>
      </Div>
      <Div>
        <button className="em">수정하기</button>
        <button className="normal">삭제하기</button>
      </Div>
    </Detail>
  );
};
export default MatchDetails;
