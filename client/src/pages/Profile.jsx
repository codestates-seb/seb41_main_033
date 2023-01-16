import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import ProfileContent from '../components/ProfileContent';

const ProfileWrap = styled.div`
  display: flex;
`;

const Profile = () => {
  const URL = `https://f841-14-63-98-43.jp.ngrok.io`;
  const [user, setUser] = useState(null);
  const isMatch = false;
  const isStory = true;

  useEffect(() => {
    axios
      .get(`${URL}/api/members/98`, {
        // ngrok get cors 해결용
        headers: { 'ngrok-skip-browser-warning': '69420' },
      })
      .then((res) => setUser(res.data.data));
  }, []);

  if (user) {
    return (
      <ProfileWrap>
        <ProfileCard
          iamge={user.iamge}
          nickname={user.nickname}
          identifier={'user.identifier'}
          following={user.following}
          follower={user.follower}
          likes={user.likes}
          games={user.games}
          introduction={user.introduction}
        />
        <ProfileContent
          isMatch={isMatch}
          isStory={isStory}
          matchBoards={user.matchBoards}
          userBoards={user.userBoards}
        />
      </ProfileWrap>
    );
  } else {
    return null;
  }
};

export default Profile;
