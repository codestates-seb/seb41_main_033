import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '../assets/arrowBack.svg';
import { ReactComponent as ArrowForward } from '../assets/arrowForward.svg';

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

const ProfilePagination = ({
  isMatch,
  matchPage,
  setMatchPage,
  matchPageInfo,
  storyPage,
  setStoryPage,
  storyPageInfo,
}) => {
  const [matchFirstPage, setMatchFirstPage] = useState(matchPage);
  const matchTotalPage = matchPageInfo.totalPages;
  const matchFirstNum = matchFirstPage - (matchFirstPage % 8) + 1;

  const [storyFirstPage, setStoryFirstPage] = useState(storyPage);
  const storyTotalPage = storyPageInfo.totalPages;
  const storyFirstNum = storyFirstPage - (storyFirstPage % 8) + 1;

  const [isMatchPage1, setIsMatchPage1] = useState(true);
  const [isMatchPage2, setIsMatchPage2] = useState(false);
  const [isMatchPage3, setIsMatchPage3] = useState(false);
  const [isMatchPage4, setIsMatchPage4] = useState(false);
  const [isMatchPage5, setIsMatchPage5] = useState(false);

  const [isStoryPage1, setIsStoryPage1] = useState(true);
  const [isStoryPage2, setIsStoryPage2] = useState(false);
  const [isStoryPage3, setIsStoryPage3] = useState(false);
  const [isStoryPage4, setIsStoryPage4] = useState(false);
  const [isStoryPage5, setIsStoryPage5] = useState(false);

  return (
    <PageWrap>
      {isMatch ? (
        <>
          {matchTotalPage > 5 ? (
            <button
              className="page_content"
              onClick={() => {
                setMatchPage(matchPage - 1);
                setMatchFirstPage(matchPage - 2);
                setIsMatchPage1(true);
                setIsMatchPage2(false);
                setIsMatchPage3(false);
                setIsMatchPage4(false);
                setIsMatchPage5(false);
              }}
            >
              <ArrowBack />
            </button>
          ) : null}
          {matchTotalPage >= matchFirstNum ? (
            <button
              className={'page_content' + (isMatchPage1 ? ' active' : '')}
              onClick={() => {
                setMatchPage(matchFirstNum);
                setIsMatchPage1(true);
                setIsMatchPage2(false);
                setIsMatchPage3(false);
                setIsMatchPage4(false);
                setIsMatchPage5(false);
              }}
            >
              {matchFirstNum}
            </button>
          ) : null}
          {matchTotalPage >= matchFirstNum + 1 ? (
            <button
              className={'page_content' + (isMatchPage2 ? ' active' : '')}
              onClick={() => {
                setMatchPage(matchFirstNum + 1);
                setIsMatchPage1(false);
                setIsMatchPage2(true);
                setIsMatchPage3(false);
                setIsMatchPage4(false);
                setIsMatchPage5(false);
              }}
            >
              {matchFirstNum + 1}
            </button>
          ) : null}
          {matchTotalPage >= matchFirstNum + 2 ? (
            <button
              className={'page_content' + (isMatchPage3 ? ' active' : '')}
              onClick={() => {
                setMatchPage(matchFirstNum + 2);
                setIsMatchPage1(false);
                setIsMatchPage2(false);
                setIsMatchPage3(true);
                setIsMatchPage4(false);
                setIsMatchPage5(false);
              }}
            >
              {matchFirstNum + 2}
            </button>
          ) : null}
          {matchTotalPage >= matchFirstNum + 3 ? (
            <button
              className={'page_content' + (isMatchPage4 ? ' active' : '')}
              onClick={() => {
                setMatchPage(matchFirstNum + 3);
                setIsMatchPage1(false);
                setIsMatchPage2(false);
                setIsMatchPage3(false);
                setIsMatchPage4(true);
                setIsMatchPage5(false);
              }}
            >
              {matchFirstNum + 3}
            </button>
          ) : null}
          {matchTotalPage >= matchFirstNum + 4 ? (
            <button
              className={'page_content' + (isMatchPage5 ? ' active' : '')}
              onClick={() => {
                setMatchPage(matchFirstNum + 4);
                setIsMatchPage1(false);
                setIsMatchPage2(false);
                setIsMatchPage3(false);
                setIsMatchPage4(false);
                setIsMatchPage5(true);
              }}
            >
              {matchFirstNum + 4}
            </button>
          ) : null}
          {matchTotalPage > 5 ? (
            <button
              className="page_content"
              onClick={() => {
                setMatchPage(matchPage + 1);
                setMatchFirstPage(matchPage);
                setIsMatchPage1(true);
                setIsMatchPage2(false);
                setIsMatchPage3(false);
                setIsMatchPage4(false);
                setIsMatchPage5(false);
              }}
            >
              <ArrowForward />
            </button>
          ) : null}
        </>
      ) : (
        <>
          {storyTotalPage > 5 ? (
            <button
              className="page_content"
              onClick={() => {
                setStoryPage(storyPage - 1);
                setStoryFirstPage(storyPage - 2);
                setIsStoryPage1(true);
                setIsStoryPage2(false);
                setIsStoryPage3(false);
                setIsStoryPage4(false);
                setIsStoryPage5(false);
              }}
            >
              <ArrowBack />
            </button>
          ) : null}
          {storyTotalPage >= storyFirstNum ? (
            <button
              className={'page_content' + (isStoryPage1 ? ' active' : '')}
              onClick={() => {
                setStoryPage(storyFirstNum);
                setIsStoryPage1(true);
                setIsStoryPage2(false);
                setIsStoryPage3(false);
                setIsStoryPage4(false);
                setIsStoryPage5(false);
              }}
            >
              {storyFirstNum}
            </button>
          ) : null}
          {storyTotalPage >= storyFirstNum + 1 ? (
            <button
              className={'page_content' + (isStoryPage2 ? ' active' : '')}
              onClick={() => {
                setStoryPage(storyFirstNum + 1);
                setIsStoryPage1(false);
                setIsStoryPage2(true);
                setIsStoryPage3(false);
                setIsStoryPage4(false);
                setIsStoryPage5(false);
              }}
            >
              {storyFirstNum + 1}
            </button>
          ) : null}
          {storyTotalPage >= storyFirstNum + 2 ? (
            <button
              className={'page_content' + (isStoryPage3 ? ' active' : '')}
              onClick={() => {
                setStoryPage(storyFirstNum + 2);
                setIsStoryPage1(false);
                setIsStoryPage2(false);
                setIsStoryPage3(true);
                setIsStoryPage4(false);
                setIsStoryPage5(false);
              }}
            >
              {storyFirstNum + 2}
            </button>
          ) : null}
          {storyTotalPage >= storyFirstNum + 3 ? (
            <button
              className={'page_content' + (isStoryPage4 ? ' active' : '')}
              onClick={() => {
                setStoryPage(storyFirstNum + 3);
                setIsStoryPage1(false);
                setIsStoryPage2(false);
                setIsStoryPage3(false);
                setIsStoryPage4(true);
                setIsStoryPage5(false);
              }}
            >
              {storyFirstNum + 3}
            </button>
          ) : null}
          {storyTotalPage >= storyFirstNum + 4 ? (
            <button
              className={'page_content' + (isStoryPage5 ? ' active' : '')}
              onClick={() => {
                setStoryPage(storyFirstNum + 4);
                setIsStoryPage1(false);
                setIsStoryPage2(false);
                setIsStoryPage3(false);
                setIsStoryPage4(false);
                setIsStoryPage5(true);
              }}
            >
              {storyFirstNum + 4}
            </button>
          ) : null}
          {storyTotalPage > 5 ? (
            <button
              className="page_content"
              onClick={() => {
                setStoryPage(storyPage + 1);
                setStoryFirstPage(storyPage);
                setIsStoryPage1(true);
                setIsStoryPage2(false);
                setIsStoryPage3(false);
                setIsStoryPage4(false);
                setIsStoryPage5(false);
              }}
            >
              <ArrowForward />
            </button>
          ) : null}
        </>
      )}
    </PageWrap>
  );
};

export default ProfilePagination;
