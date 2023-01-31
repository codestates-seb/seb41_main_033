import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';
import ProfileContent from '../components/ProfileContent';
import { MOBILE_POINT } from '../data/breakpoint';
import { setProfile } from '../redux/slice/profileSlice';

const ProfileWrap = styled.div`
  display: flex;
  @media (max-width: ${MOBILE_POINT}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const { userid } = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginInfo?.accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/members/${userid}`, {
          headers: {
            Authorization: `Bearer ${loginInfo?.accessToken}`,
          },
        })
        .then((res) => {
          setUser(res.data.data);
          dispatch(setProfile(res.data.data));
        });
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/members/${userid}`)
        .then((res) => {
          setUser(res.data.data);
          dispatch(setProfile(res.data.data));
        });
    }
    Number(userid) === loginInfo?.memberId ? setIsMe(true) : setIsMe(false);
  }, [userid, loginInfo?.accessToken, loginInfo?.memberId, dispatch]);

  if (user) {
    return (
      <ProfileWrap>
        <ProfileCard user={user} isMe={isMe} />
        <ProfileContent />
      </ProfileWrap>
    );
  } else {
    return <Loading />;
  }
};

export default Profile;
