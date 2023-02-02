import styled from "styled-components";
import { ReactComponent as SearchOff } from "./../assets/searchoff.svg";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 48px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  div {
    > svg {
      fill: var(--white);
    }
  }
`;
const Title = styled.div`
  font-size: var(--font-body1-size);
  color: var(--white);
  margin-top: 24px;
`;
const NoSearch = () => {
  return (
    <Wrap>
      <Box>
        <div>
          <SearchOff />
        </div>
        <Title>검색결과가 없습니다</Title>
      </Box>
    </Wrap>
  );
};
export default NoSearch;
