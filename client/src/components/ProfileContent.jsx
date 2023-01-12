import styled from 'styled-components';
import ProfileContentList from './ProfileContentList';

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

const ProfileContent = () => {
  const isMatch = true;
  const isStory = false;

  return (
    <ContentWrap className="card">
      <TabWrap>
        <div className={'tab' + (isMatch ? ' active' : '')}>매칭글</div>
        <div className={'tab' + (isStory ? ' active' : '')}>스토리</div>
      </TabWrap>
      <ProfileContentList />
    </ContentWrap>
  );
};

export default ProfileContent;
