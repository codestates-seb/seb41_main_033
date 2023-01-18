import styled from "styled-components";
import matchGame from "../util/matchGame";
const Warap = styled.div`
  overflow: hidden;
  position: relative;
  height: 120px;
  width: 120px;
`;
const ImgBox = styled.div`
  width: 2160px; /* 보여야 하는 이미지 전체 합 */
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  animation: bannermove 1.2s linear infinite;
`;
const ImgDiv = styled.div`
  flex: 0 0 auto;
  height: 120px;
  background-color: var(--white);

  @keyframes bannermove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const RandomRolling = () => {
  const number = [];
  for (let i = 1; i <= 18; i++) {
    number.push({ id: i });
  }
  return (
    <Warap>
      <ImgBox>
        {number.map((el, idx) => (
          <ImgDiv key={idx}>
            <Image key={idx} src={matchGame(el).image} />
          </ImgDiv>
        ))}
      </ImgBox>
      ;
    </Warap>
  );
};
export default RandomRolling;
