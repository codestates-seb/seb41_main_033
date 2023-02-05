import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../assets/arrowBack.svg";
import { ReactComponent as ArrowForward } from "../assets/arrowForward.svg";
import { useEffect, useState } from "react";
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  &[aria-current="page"] {
    color: var(--primary-color);
  }
  &.active {
    color: var(--primary-color);
  }
`;
const MatchPagination = ({ setPage, page, total }) => {
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  let pageCount = 5;
  if (lastNum > total) {
    pageCount = total % 5;
  }
  useEffect(() => {
    if (sessionStorage.getItem("matchfix")) {
      setCurrPage(page - 1);
    }
  }, []);
  return (
    <Wrap>
      <Btn
        className="icon"
        onClick={() => {
          if (page <= 1) {
            return;
          }
          setPage(page - 1);
          setCurrPage(page - 2);
          sessionStorage.setItem("matchfix", page - 1);
        }}
      >
        {total > 5 && <ArrowBack />}
      </Btn>
      {Array(pageCount)
        .fill()
        .map((_, i) => (
          <Btn
            key={i + 1}
            aria-current={page === firstNum + i && "page"}
            onClick={() => {
              setPage(firstNum + i);
              sessionStorage.setItem("matchfix", firstNum + i);
            }}
          >
            {firstNum + i}
          </Btn>
        ))}
      <Btn
        className="icon"
        onClick={() => {
          if (total <= page) {
            return;
          }
          setPage(page + 1);
          setCurrPage(page);
          sessionStorage.setItem("matchfix", page + 1);
        }}
      >
        {total > 5 && <ArrowForward />}
      </Btn>
    </Wrap>
  );
};
export default MatchPagination;
