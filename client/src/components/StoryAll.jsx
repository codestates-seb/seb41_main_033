import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./../components/SearchBar";
import StorySingle from "../components/StorySingle";
import NoSearch from "../components/NoSearch";
import useAuthenticatedRequest from "../hooks/useinterceptor";

const StoryBoardWrap = styled.div`
  margin-top: 48px;
  > div {
    margin-bottom: 24px;
  }
`;

const StoryAll = ({ accessToken, isLogin }) => {
  const [storyData, setStoryData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isNoSearch, setIsNoSearch] = useState(false);
  const instance = useAuthenticatedRequest();

  //페이지 로딩 state
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageEndPoint = useRef();
  //페이지 증가 함수
  const addPage = () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };
  //페이지 요청 함수
  const requestPage = async (page) => {
    let url = "";
    if (keyword === "") {
      setIsNoSearch(false);
      if (page === 1) setStoryData([]);
      url = `/api/boards?page=${page}`;
      instance
        .get(url)
        .then((res) => {
          setStoryData((prevData) => [...prevData, ...res.data.data]);
          const totalPages = res.data.pageInfo.totalPages;
          if (page === totalPages) {
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      url = `/api/boards?page=${page}&keyword=${keyword}`;
      setIsNoSearch(false);
      await instance
        .get(url)
        .then((res) => {
          //console.log(res.data.data);
          setStoryData(res.data.data);
          const totalPages = res.data.pageInfo.totalPages;

          if (page === totalPages) {
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
        })
        .catch((err) => {
          // console.log(err);
          setIsNoSearch(true);
          setIsLoading(false);
        });
    }
  };
  //페이지 바뀔때마다 데이터 요청
  useEffect(() => {
    requestPage(page);
  }, [page, keyword]);
  //Intersection Observer로 로딩 여부 확인
  useEffect(() => {
    if (isLoading) {
      //로딩시 페이지 추가
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            addPage();
          }
        },
        { threshold: 0.4 }
      );
      //옵저버 탐색
      observer.observe(pageEndPoint.current);
    }
  }, [isLoading]);

  return (
    <>
      <SearchBar setKeyword={setKeyword} setPage={setPage} />
      <StoryBoardWrap>
        {keyword && isNoSearch ? <NoSearch /> : null}
        {storyData
          ? storyData.map((el, idx) => {
              return <StorySingle key={idx} data={el} />;
            })
          : "작성된 스토리가 없습니다."}
        {isLoading && (
          <div className="loadingObserver" ref={pageEndPoint}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </StoryBoardWrap>
    </>
  );
};
export default StoryAll;
