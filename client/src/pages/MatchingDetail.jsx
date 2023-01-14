import styled from "styled-components";
import { matchinglist } from "../data/gamelist";
import MatchDetails from "../components/MatchDetails";
import UserCard from "../components/UserCard";
const Wrap = styled.div`
  display: flex;
`;

const MatchingDetail = () => {
  const detail = matchinglist[0];
  return (
    <Wrap>
      <MatchDetails data={detail} />
      <UserCard />
    </Wrap>
  );
};
export default MatchingDetail;
