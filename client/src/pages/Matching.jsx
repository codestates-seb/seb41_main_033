import styled from "styled-components";
import MatchingCard from "../components/MatchingCard";
import SearchBar from "../components/SearchBar";
import WriteFloatButton from "../components/WriteFloatButton";
import MatchPagination from "../components/MatchPagination";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import NoSearch from "../components/NoSearch";
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
  const [matchinglist, setMatchinglist] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.islogin.login);
  const matchingBtn = () => {
    if (loginInfo) {
      navigate("/matchwrite");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/matches?page=${page}&keyword=${keyword}`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => {
        setMatchinglist(res.data.data);
        setTotal(res.data.pageInfo.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page, keyword]);

  return (
    <Wrap>
      <SearchBar setKeyword={setKeyword} />
      {matchinglist.length === 0 ? (
        <NoSearch />
      ) : (
        <Ul>
          {matchinglist?.map((el) => (
            <li key={el.id}>
              <Link to={`/${el.id}/detail`}>
                <MatchingCard data={el} />
              </Link>
            </li>
          ))}
        </Ul>
      )}
      <WriteFloatButton click={matchingBtn} />
      <MatchPagination setPage={setPage} page={page} total={total} />
    </Wrap>
  );
};
export default Matching;
