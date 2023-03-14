import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import matchGame from "../util/matchGame";
import { MOBILE_POINT } from "../data/breakpoint";
import React from "react";
const Card = styled.div`
  padding: 24px 32px;

  .game_title_wrap {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .game_info {
    display: flex;
    justify-content: end;
    align-items: flex-end;
    margin-bottom: 8px;
    .team_count {
      display: flex;
      align-items: center;
      margin-right: 16px;
      color: var(--strong-color);
      span {
        margin-right: 8px;
      }
    }

    span {
      display: block;
      width: 6px;
      height: 6px;
      margin-right: 6px;
      border-radius: 6px;
      background: var(--primary-color);
      font-size: 0;
    }
  }

  .tags_wrap {
    display: flex;
  }

  @media (max-width: ${MOBILE_POINT}) {
    padding: 24px;
  }
`;
const ImgWrap = styled.div`
  flex: none;
  width: 80px;
  height: 80px;
  margin-right: 16px;
  overflow: hidden;
  border-radius: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${MOBILE_POINT}) {
    width: 56px;
    height: 56px;
  }
`;
const Title = styled.div`
  width: calc(100% - 96px);

  .game_title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--white);
    font-size: var(--font-head3-size);
    margin-bottom: 5px;
  }

  @media (max-width: ${MOBILE_POINT}) {
    .game_title {
      font-size: ;
    }
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  margin-right: 6px;
  line-height: 20px;
  background: var(--black);
  border: 1px solid var(--grey);
  border-radius: 30px;
  color: var(--white);
  font-size: var(--font-caption-size);
  cursor: pointer;
`;

const MatchingCard = ({ data }) => {
  return (
    <Card className="card">
      <div className="game_title_wrap">
        <ImgWrap>
          {data.game && (
            <img src={matchGame(data.game).image} alt="게임아이콘" />
          )}
        </ImgWrap>
        <Title>
          <div className="game_title">{data.title}</div>
          <div>{data.nickname}</div>
        </Title>
      </div>
      <div className="game_info">
        <div className="team_count">
          <span></span>
          {data.team}명
        </div>
        <div>{displayedAt(data.createdAt)}</div>
      </div>
      <div className="tags_wrap">
        {data.tags.map((el, idx) => (
          <Tag key={idx}>{el}</Tag>
        ))}
      </div>
    </Card>
  );
};
export default React.memo(MatchingCard);
