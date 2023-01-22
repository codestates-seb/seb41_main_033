import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SingleProfileWrap from './SingleProfileWrap';

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
  const { userid } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <ListWrap>
        <ul>
          <li>
            <SingleProfileWrap
              className="profile_container"
              imgSrc={''}
              name={'닉네임'}
              subInfo={'아이디'}
            />
            <button className="unblock_btn">차단해제</button>
          </li>
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
};

export default BlockUserList;
