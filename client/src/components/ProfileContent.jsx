import styled from 'styled-components';
import ProfileContentList from './ProfileContentList';
import Pagination from './Pagination';
import { useState } from 'react';

const ContentWrap = styled.div`
  width: var(--col-8);
  height: fit-content;
  padding: 16px 0;
  margin-left: 32px;
`;

const TabWrap = styled.div`
  ul {
    display: flex;
  }
  .tab {
    padding: 12px 48px;
    cursor: pointer;
  }
  .active {
    color: var(--yellow);
    border-bottom: 2px var(--yellow) inset;
  }
`;

const ProfileContent = () => {
  const [isMatch, setIsMatch] = useState(true);
  const [isStory, setIsStory] = useState(false);

  const handleTab = () => {
    setIsMatch((prev) => !prev);
    setIsStory((prev) => !prev);
  };

  return (
    <ContentWrap className="card">
      <TabWrap>
        <ul>
          <li
            className={'tab' + (isMatch ? ' active' : '')}
            onClick={handleTab}
          >
            매칭글
          </li>
          <li
            className={'tab' + (isStory ? ' active' : '')}
            onClick={handleTab}
          >
            스토리
          </li>
        </ul>
      </TabWrap>
      <ProfileContentList isMatch={isMatch} isStory={isStory} />
      <Pagination />
    </ContentWrap>
  );
};

export default ProfileContent;
