import dummy from "../data/dummyRandomRolling.json";
import styled from "styled-components";
const Warap = styled.div`
  overflow: hidden;
  position: relative;
  height: 96px;
  width: 96px;
`;
const ImgBox = styled.div`
  width: 1728px; /* 보여야 하는 이미지 전체 합 */
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  animation: bannermove 1s linear infinite;
`;
const ImgDiv = styled.div`
  flex: 0 0 auto;
  height: 200px;

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
  return (
    <Warap>
      <ImgBox>
        {dummy.randomList.map((el, idx) => (
          <ImgDiv key={idx}>
            <Image key={idx} src={el.images} />
          </ImgDiv>
        ))}
      </ImgBox>
      ;
    </Warap>
  );
};
export default RandomRolling;
