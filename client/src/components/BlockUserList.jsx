import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SingleProfileWrap from './SingleProfileWrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../data/apiUrl';
import { useEffect } from 'react';
import { setBlock } from '../redux/slice/blockSlice';

const ListWrap = styled.div`
  li {
    display: flex;
    justify-content: space-between;
    padding: 16px 48px;
    border-top: 1px solid var(--border-color);
    .profile_container {
      margin-bottom: 0px;
    }
    .unblock_btn {
      color: var(--error-color);
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
  button {
    width: 280px;
  }
`;

const BlockUserList = () => {
  const loginInfo = useSelector((state) => state.islogin.login);
  const blockUser = useSelector((state) => state.block.blockUsers);
  const { userid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBlock = (id) => {
    axios
      .post(
        `${API_URL}/api/members/${id}/blocks`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginInfo?.accessToken}`,
          },
        }
      )
      .then(() =>
        dispatch(setBlock(blockUser.filter((block) => block.id !== id)))
      );
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${userid}/blocks`, {
        headers: {
          Authorization: `Bearer ${loginInfo?.accessToken}`,
        },
      })
      .then((res) => dispatch(setBlock(res.data.data)));
  }, [userid, loginInfo?.accessToken, dispatch]);

  if (blockUser) {
    return (
      <>
        <ListWrap>
          <ul>
            {blockUser.map((block) => (
              <li key={block.id}>
                <SingleProfileWrap
                  className="profile_container"
                  imgSrc={block.profileImage}
                  name={block.nickname}
                  subInfo={block.identifier}
                />
                <button
                  className="unblock_btn"
                  onClick={() => handleBlock(block.id)}
                >
                  차단해제
                </button>
              </li>
            ))}
          </ul>
        </ListWrap>
        <ButtonWrap>
          <button
            className="em"
            onClick={() => navigate(`/profile/${userid}/edit`)}
          >
            편집 완료
          </button>
        </ButtonWrap>
      </>
    );
  } else return null;
};

export default BlockUserList;
