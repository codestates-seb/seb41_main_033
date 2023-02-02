import styled from 'styled-components';
import { ReactComponent as BlockUser } from '../assets/blockUser.svg';
import ProfileContentList from './ProfileContentList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MOBILE_POINT } from '../data/breakpoint';

const ContentWrap = styled.div`
  width: var(--col-8);
  height: fit-content;
  padding: 16px 0;
  margin-left: 32px;
  .block_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0;
  }
  .block_msg {
    margin-top: 24px;
    color: var(--white);
  }

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
    margin: 0;
  }
`;

const TabWrap = styled.div`
  ul {
    display: flex;
  }
  .tab {
    padding: 12px 48px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    color: var(--yellow);
    border-bottom: 2px var(--yellow) inset;
  }

  @media (max-width: ${MOBILE_POINT}) {
    ul {
      width: 100%;
      .tab {
        width: 50%;
      }
    }
  }
`;

const ProfileContent = ({
  match,
  matchPage,
  setMatchPage,
  matchPageInfo,
  story,
  storyPage,
  setStoryPage,
  storyPageInfo,
}) => {
  const userInfo = useSelector((state) => state.profile.user);
  const [isMatch, setIsMatch] = useState(true);
  const [isStory, setIsStory] = useState(false);

  const handleMatch = () => {
    setIsMatch(true);
    setIsStory(false);
  };

  const handleStory = () => {
    setIsMatch(false);
    setIsStory(true);
  };

  if (userInfo) {
    return (
      <ContentWrap className="card">
        {userInfo.blockStatus ? (
          <div className="block_container">
            <BlockUser />
            <div className="block_msg">차단한 유저의 프로필입니다.</div>
          </div>
        ) : (
          <>
            <TabWrap>
              <ul>
                <li
                  className={'tab' + (isMatch ? ' active' : '')}
                  onClick={handleMatch}
                >
                  매칭글
                </li>
                <li
                  className={'tab' + (isStory ? ' active' : '')}
                  onClick={handleStory}
                >
                  스토리
                </li>
              </ul>
            </TabWrap>
            <ProfileContentList
              isMatch={isMatch}
              isStory={isStory}
              match={match}
              matchPage={matchPage}
              setMatchPage={setMatchPage}
              matchPageInfo={matchPageInfo}
              story={story}
              storyPage={storyPage}
              setStoryPage={setStoryPage}
              storyPageInfo={storyPageInfo}
            />
          </>
        )}
      </ContentWrap>
    );
  } else return null;
};

export default ProfileContent;
