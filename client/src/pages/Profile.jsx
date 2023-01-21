import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import ProfileContent from '../components/ProfileContent';

const ProfileWrap = styled.div`
  display: flex;
`;

const Profile = () => {
  return (
    <ProfileWrap>
      <ProfileCard />
      <ProfileContent />
    </ProfileWrap>
  );
};

export default Profile;
