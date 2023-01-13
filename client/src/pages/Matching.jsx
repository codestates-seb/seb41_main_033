import styled from "styled-components";
import MatchingCard from "../components/MatchingCard";
import { matchinglist } from "../data/gamelist";
import SearchBar from "../components/SearchBar";
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 974px;
`;
const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
`;

const Matching = () => {
  return (
    <Wrap>
      <SearchBar></SearchBar>
      <Ul>
        {matchinglist.map((el) => (
          <li>
            <MatchingCard data={el} />
          </li>
        ))}
      </Ul>
    </Wrap>
  );
};
export default Matching;
