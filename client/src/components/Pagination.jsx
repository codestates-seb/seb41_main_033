import styled from "styled-components";
import { ReactComponent as ArrowBack } from "../assets/arrowBack.svg";
import { ReactComponent as ArrowForward } from "../assets/arrowForward.svg";

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page_content {
    width: 32px;
    height: 32px;
    font-size: var(--font-body2-size);
  }
  .active {
    color: var(--yellow);
  }
`;

const Pagination = () => {
  const isPage1 = false;
  const isPage2 = false;
  const isPage3 = true;
  const isPage4 = false;
  const isPage5 = false;

  return (
    <PageWrap>
      {/* 하드코딩 정보 수정 필요 */}
      <a className="page_content" href="none">
        <ArrowBack />
      </a>
      <a className={"page_content" + (isPage1 ? " active" : "")} href="none">
        1
      </a>
      <a className={"page_content" + (isPage2 ? " active" : "")} href="none">
        2
      </a>
      <a className={"page_content" + (isPage3 ? " active" : "")} href="none">
        3
      </a>
      <a className={"page_content" + (isPage4 ? " active" : "")} href="none">
        4
      </a>
      <a className={"page_content" + (isPage5 ? " active" : "")} href="none">
        5
      </a>
      <a className="page_content" href="none">
        <ArrowForward />
      </a>
    </PageWrap>
  );
};

export default Pagination;
