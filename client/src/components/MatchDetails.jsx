import styled from 'styled-components';
import displayedAt from '../util/displayedAt';
import { useState, useEffect } from 'react';
import { API_URL } from '../data/apiUrl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import matchGame from '../util/matchGame';
import Popup from '../components/Popup';

const Detail = styled.div`
  width: var(--col-9);
  margin-right: 32px;
  div :nth-child(1) {
    > img {
      align-content: flex-end;
    }
  }
  .description {
    display: flex;
    flex-direction: column;
    > ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
    }
  }
  button,
  a {
    width: 280px;
    margin-right: 16px;
  }
`;
const Div = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const ImgWrap = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Span = styled.span`
  display: block;
  margin: 0 8px;
  color: var(--white);
`;
const Info = styled.div`
  width: 100%;
  .title {
    font-size: var(--font-head2-size);
    color: var(--white);
    line-height: 150%;
  }
  .game {
    color: var(--yellow);
  }
`;
const EmLink = styled(Link)`
  text-align: center;
  display: block;
  background-size: 200% auto;
  background-image: linear-gradient(
    to right,
    rgba(255, 186, 41, 1) 0%,
    rgba(255, 143, 147, 1) 51%,
    rgba(255, 186, 41, 1) 100%
  );
  transition: 0.4s;
  padding: 12px 16px;
  font-size: var(--font-body1-size);
  font-weight: var(--font-weight-medium);
  color: var(--strong-color);
  border-radius: var(--border-radius-btn);
  &:hover {
    background-position: right center;
  }
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  margin-right: 6px;
  height: 32px;
  color: var(--white);
  background: var(--black);
  border: 1px solid var(--grey);
  border-radius: 30px;
  cursor: pointer;
`;
const Description = styled.div`
  margin-bottom: 32px;
  margin-top: 12px;
  color: var(--white);
  overflow: scroll;
  -ms-overflow-style: none;
  white-space: pre-wrap;
`;
const MatchDetails = ({ data, boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [same, setSame] = useState(false);
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.islogin.login);

  useEffect(() => {
    if (data.memberId === loginInfo?.memberId) {
      setSame(true);
    }
  }, []);

  const deleteBtn = () => {
    axios
      .delete(`${API_URL}/api/matches/${boardId}`, {
        headers: {
          Authorization: `Bearer ${loginInfo.accessToken}`,
        },
      })
      .then((res) => {
        setIsOpen((prev) => !prev);
        navigate('/match');
        document.body.style.overflow = 'unset';
      });
  };

  const handleDelete = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = 'unset';
  };

  return (
    <Detail className="card big">
      <Div>
        <Info>
          <div className="title">{data.title}</div>
          <div className="game">{data.game.korTitle}</div>
        </Info>
        <ImgWrap>
          <img src={matchGame(data.game).image} alt="게임아이콘" />
        </ImgWrap>
      </Div>
      <Div>
        <span>팀원수</span>
        <Span>{data?.team} 명</Span>
        <span>매칭생성시간</span>
        <Span>{displayedAt(data?.createdAt)}</Span>
      </Div>
      <Div>
        {data?.tags.map((el, idx) => (
          <Tag key={idx}>{el}</Tag>
        ))}
      </Div>
      <Div className="description">
        <div>상세설명</div>
        <Description>{data?.content}</Description>
      </Div>
      {same && (
        <Div>
          <EmLink className="em" to={`/match/${boardId}/edit`}>
            수정하기
          </EmLink>
          <button className="normal" onClick={handleDelete}>
            삭제하기
          </button>
        </Div>
      )}
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="매칭하기 삭제하기"
        content="매칭하기를 삭제하시겠습니까?"
        button1="삭제하기"
        button2="취소"
        handleBtn1={deleteBtn}
        handleBtn2={handleCancel}
      />
    </Detail>
  );
};
export default MatchDetails;
