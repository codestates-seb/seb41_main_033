import styled from 'styled-components';
import { ReactComponent as BlockUser } from '../assets/blockUser.svg';
import ProfileContentList from './ProfileContentList';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from '../data/apiUrl';

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
  const loginInfo = useSelector((state) => state.islogin.login);
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [isMatch, setIsMatch] = useState(true);
  const [isStory, setIsStory] = useState(false);

  const handleTab = () => {
    setIsMatch((prev) => !prev);
    setIsStory((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${userid}`, {
        headers: { Authorization: `Bearer ${loginInfo?.accessToken}` },
      })
      .then((res) => {
        setUser(res.data.data);
      });
  }, [userid, loginInfo?.accessToken]);

  if (user) {
    return (
      <ContentWrap className="card">
        {user.blockStatus ? (
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
          </>
        )}
      </ContentWrap>
    );
  } else return null;
};

export default ProfileContent;
