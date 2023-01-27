import styled from "styled-components";
import MatchingCard from "../components/MatchingCard";
import SearchBar from "../components/SearchBar";
import WriteFloatButton from "../components/WriteFloatButton";
import MatchPagination from "../components/MatchPagination";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NoSearch from "../components/NoSearch";
import Loading from "../components/Loading";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "../components/Popup";

const Wrap = styled.div``;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;

  li {
    width: calc(50% - 20px);
    margin-right: 40px;
    margin-bottom: 40px;
  }
  li:nth-child(2n) {
    margin-right: 0;
  }

  @media (max-width: ${MOBILE_POINT}) {
    li {
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
`;
const Empty = styled.div`
  text-align: center;
  font-size: var(--font-head1-size);
  padding-top: 96px;
`;

const Matching = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [matchinglist, setMatchinglist] = useState([]);
  const [loading, setLoding] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.islogin.login);

  const matchingBtn = () => {
    if (loginInfo?.isLogin) {
      navigate("/match/matchwrite");
    } else {
      setIsOpen((prev) => !prev);
      document.body.style.overflow = "hidden";
    }
  };

  const handleLogin = () => {
    navigate(`/login`);
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "unset";
  };

  const handleSignup = () => {
    navigate(`/signup`);
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (loginInfo?.isLogin) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/matches?page=${page}&keyword=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${loginInfo.accessToken}`,
            },
          }
        )
        .then((res) => {
          setMatchinglist(res.data.data);
          setTotal(res.data.pageInfo.totalPages);
          setLoding(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/matches?page=${page}&keyword=${keyword}`,
          {}
        )
        .then((res) => {
          setMatchinglist(res.data.data);
          setTotal(res.data.pageInfo.totalPages);
          setLoding(false);
        })
        .catch((err) => console.log(err));
    }
  }, [page, keyword]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrap>
          <SearchBar setKeyword={setKeyword} setPage={setPage} />
          {!keyword && !total ? (
            <Empty>매칭하기 게시물이 없습니다</Empty>
          ) : matchinglist.length === 0 ? (
            <NoSearch />
          ) : (
            <Ul>
              {matchinglist?.map((el) => (
                <li key={el.id}>
                  <Link to={`/match/${el.id}/detail`}>
                    <MatchingCard data={el} />
                  </Link>
                </li>
              ))}
            </Ul>
          )}
          <WriteFloatButton click={matchingBtn} />
          <MatchPagination setPage={setPage} page={page} total={total} />
        </Wrap>
      )}
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="매칭하기 작성"
        content="매칭하기 작성은 로그인 후 이용 가능합니다."
        button1="로그인"
        button2="회원가입"
        handleBtn1={handleLogin}
        handleBtn2={handleSignup}
      />
    </>
  );
};
export default Matching;
