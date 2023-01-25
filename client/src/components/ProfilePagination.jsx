import { useEffect } from 'react';
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
  button {
    &[aria-current='active'] {
      color: var(--yellow);
    }
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
  const [matchPageCount, setMatchPageCount] = useState(5);
  const matchTotalPage = matchPageInfo.totalPages;
  const matchFirstNum = matchFirstPage - (matchFirstPage % 5) + 1;
  const matchLastNum = matchFirstPage - (matchFirstPage % 5) + 5;

  const [storyFirstPage, setStoryFirstPage] = useState(storyPage);
  const [storyPageCount, setStoryPageCount] = useState(5);
  const storyTotalPage = storyPageInfo.totalPages;
  const storyFirstNum = storyFirstPage - (storyFirstPage % 5) + 1;
  const storyLastNum = storyFirstPage - (storyFirstPage % 5) + 5;

  useEffect(() => {
    if (matchLastNum > matchTotalPage) {
      setMatchPageCount(matchTotalPage % 5);
    } else setMatchPageCount(5);

    if (storyLastNum > storyTotalPage) {
      setStoryPageCount(storyTotalPage % 5);
    } else setStoryPageCount(5);
  }, [matchLastNum, matchTotalPage, storyLastNum, storyTotalPage]);

  console.log(matchPage);

  return (
    <PageWrap>
      {isMatch ? (
        <>
          {matchTotalPage > 1 ? (
            <button
              className="page_content"
              onClick={() => {
                setMatchPage(matchPage - 1);
                setMatchFirstPage(matchPage - 2);
              }}
              disabled={matchPage === 1}
            >
              <ArrowBack />
            </button>
          ) : null}
          {Array(matchPageCount)
            .fill()
            .map((_, idx) => (
              <button
                className="page_content"
                key={idx + 1}
                onClick={() => setMatchPage(matchFirstNum + idx)}
                aria-current={matchPage === matchFirstNum + idx && 'active'}
              >
                {matchFirstNum + idx}
              </button>
            ))}
          {matchTotalPage > 1 ? (
            <button
              className="page_content"
              onClick={() => {
                setMatchPage(matchPage + 1);
                setMatchFirstPage(matchPage);
              }}
              disabled={matchPage === matchTotalPage}
            >
              <ArrowForward />
            </button>
          ) : null}
        </>
      ) : (
        <>
          {storyTotalPage > 1 ? (
            <button
              className="page_content"
              onClick={() => {
                setStoryPage(storyPage - 1);
                setStoryFirstPage(storyPage - 2);
              }}
              disabled={storyPage === 1}
            >
              <ArrowBack />
            </button>
          ) : null}
          {Array(storyPageCount)
            .fill()
            .map((_, idx) => (
              <button
                className="page_content"
                key={idx + 1}
                onClick={() => setStoryPage(storyFirstNum + idx)}
                aria-current={storyPage === storyFirstNum + idx && 'active'}
              >
                {storyFirstNum + idx}
              </button>
            ))}
          {storyTotalPage > 1 ? (
            <button
              className="page_content"
              onClick={() => {
                setStoryPage(storyPage + 1);
                setStoryFirstPage(storyPage);
              }}
              disabled={storyPage === storyTotalPage}
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
