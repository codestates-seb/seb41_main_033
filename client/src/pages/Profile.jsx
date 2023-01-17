import axios from 'axios';
import { API_URL } from '../data/apiUrl';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import ProfileContent from '../components/ProfileContent';

const ProfileWrap = styled.div`
  display: flex;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const isMatch = false;
  const isStory = true;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/3`, {
        // ngrok get cors 해결용
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => setUser(res.data.data));
  }, []);

  if (user) {
    return (
      <ProfileWrap>
        <ProfileCard
          image={user.image}
          nickname={user.nickname}
          identifier={user.identifier}
          following={user.followingCount}
          follower={user.followerCount}
          likes={user.likeCount}
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
