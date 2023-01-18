import styled from "styled-components";
import MatchingCard from "../components/MatchingCard";
import SearchBar from "../components/SearchBar";
import WriteFloatButton from "../components/WriteFloatButton";
import MatchPagination from "../components/MatchPagination";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
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
  const [isLogin, setIsLogin] = useState(false);
  const [matchinglist, setMatchinglist] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const navigate = useNavigate();
  const matchingBtn = () => {
    if (isLogin) {
      navigate("/matchwrite");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("key")) {
      setIsLogin(true);
    }
  }, [isLogin]);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/matches?page=${page}`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => {
        setMatchinglist(res.data.data);
        setTotal(res.data.pageInfo.totalPages);
      });
  }, [page]);
  return (
    <Wrap>
      <SearchBar />
      <Ul>
        {matchinglist?.map((el) => (
          <li key={el.id}>
            <Link to={`/${el.id}/detail`}>
              <MatchingCard data={el} />
            </Link>
          </li>
        ))}
      </Ul>
      <WriteFloatButton click={matchingBtn} />
      <MatchPagination setPage={setPage} page={page} total={total} />
    </Wrap>
  );
};
export default Matching;
