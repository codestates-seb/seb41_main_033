import styled from "styled-components";
import displayedAt from "../util/displayedAt";

const Card = styled.div`
  width: var(--col-6);
  padding: 16px;
  margin-bottom: 32px;
`;
const Title = styled.div`
  margin: 16px;
  max-width: 264px;
  .game_title {
    color: var(--white);
    font-size: var(--font-head3-size);
    margin-bottom: 5px;
  }
`;
const Space = styled.div`
  display: flex;
  margin: 8px;
  &.game_info {
    justify-content: end;
    align-items: flex-end;
    .team_count {
      display: flex;
      align-items: center;
    }
    div {
      margin-right: 10px;
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
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
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
const MatchingCard = ({ data }) => {
  console.log(data);
  return (
    <Card className="card">
      <Space>
        <Img src="https://new-version.download/wp-content/uploads/league-of-legends.png" />
        <Title>
          <div className="game_title">{data.title}</div>
          <div>{data.nickname}</div>
        </Title>
      </Space>
      <Space className="game_info">
        <div className="team_count">
          <span></span>
          {data.team}
        </div>
        <div>{displayedAt(data.createdAt)}</div>
      </Space>
      <Space>
        {data.tags.map((el, idx) => (
          <Tag key={idx}>{el}</Tag>
        ))}
      </Space>
    </Card>
  );
};
export default MatchingCard;
