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
  const [match, setMatch] = useState(null);
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/3`, {
        // ngrok get cors 해결용
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => setUser(res.data.data));
    axios
      .get(`${API_URL}/api/members/3/matches`, {
        // ngrok get cors 해결용
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => setMatch(res.data.data));
    axios
      .get(`${API_URL}/api/members/3/boards`, {
        // ngrok get cors 해결용
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => setStory(res.data.data));
  }, []);

  if (user && match && story) {
    return (
      <ProfileWrap>
        <ProfileCard
          image={user.profileImage}
          nickname={user.nickname}
          identifier={user.identifier}
          following={user.followingCount}
          follower={user.followerCount}
          likes={user.likeCount}
          games={user.games}
          introduction={user.introduction}
        />
        <ProfileContent matchBoards={match} userBoards={story} />
      </ProfileWrap>
    );
  } else {
    return null;
  }
};

export default Profile;
