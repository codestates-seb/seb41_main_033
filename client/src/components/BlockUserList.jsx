import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SingleProfileWrap from "./SingleProfileWrap";
import { useDispatch, useSelector } from "react-redux";
import useAuthenticatedRequest from "../hooks/useinterceptor";
import { useEffect } from "react";
import { setBlock } from "../redux/slice/blockSlice";
import { MOBILE_POINT } from "../data/breakpoint";

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
      transition: 0.4s;
      :hover {
        color: var(--strong-color);
      }
    }
    .content_none {
      width: 100%;
      text-align: center;
    }
  }

  @media (max-width: ${MOBILE_POINT}) {
    li {
      padding: 16px 24px;
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
  const instance = useAuthenticatedRequest();

  const handleBlock = (id) => {
    instance
      .post(`/api/members/${id}/blocks`)
      .then(() =>
        dispatch(setBlock(blockUser.filter((block) => block.id !== id)))
      );
  };

  useEffect(() => {
    instance
      .get(`/api/members/${userid}/blocks`)
      .then((res) => dispatch(setBlock(res.data.data)));
  }, [userid, loginInfo?.accessToken, dispatch]);

  if (blockUser) {
    return (
      <>
        <ListWrap>
          <ul>
            {blockUser.length > 0 ? (
              blockUser.map((block) => (
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
              ))
            ) : (
              <li>
                <div className="content_none">차단한 유저가 없습니다.</div>
              </li>
            )}
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
