import styled from 'styled-components';
import ProfileContentList from './ProfileContentList';
import Pagination from './Pagination';

const ContentWrap = styled.div`
  width: var(--col-8);
  height: fit-content;
  padding: 16px 0;
  margin-left: 32px;
`;

const TabWrap = styled.div`
  display: flex;
  .tab {
    padding: 12px 48px;
  }
  .active {
    color: var(--yellow);
    border-bottom: 2px var(--yellow) inset;
  }
`;

const ProfileContent = ({ isMatch, isStory }) => {
  return (
    <ContentWrap className="card">
      <TabWrap>
        <div className={'tab' + (isMatch ? ' active' : '')}>매칭글</div>
        <div className={'tab' + (isStory ? ' active' : '')}>스토리</div>
      </TabWrap>
      <ProfileContentList isMatch={isMatch} isStory={isStory} />
      <Pagination />
    </ContentWrap>
  );
};

export default ProfileContent;
