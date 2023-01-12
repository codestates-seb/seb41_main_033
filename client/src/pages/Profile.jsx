import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import ProfileContent from '../components/ProfileContent';

const ProfileWrap = styled.div`
  display: flex;
`;

const Profile = () => {
  const isMatch = false;
  const isStory = true;

  return (
    <ProfileWrap>
      <ProfileCard />
      <ProfileContent isMatch={isMatch} isStory={isStory} />
    </ProfileWrap>
  );
};

export default Profile;
