import styled from 'styled-components';
import Drag from '../components/Drag';

const Warp = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  width: var(--col-6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const IconWrap = styled.div`
  margin: 100px 0px;
`;
const Title = styled.div`
  font-size: var(--font-head2-size);
  text-align: center;
  margin-top: 20px;
`;
const GameRecommend = () => {
  return (
    <Warp>
      <Card className="card sm">
        <IconWrap>
          <Drag />
          <Title>오늘은 뭐가땡기지?</Title>
        </IconWrap>
      </Card>
    </Warp>
  );
};
export default GameRecommend;
