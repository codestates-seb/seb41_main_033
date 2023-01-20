import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SinglePofileWrap from './SingleProfileWrap';

const CardWrap = styled.div`
  width: 100%;
`;

const ButtonWrap = styled.div`
  padding-top: 56px;
  text-align: center;
  button {
    width: 280px;
    margin-right: 16px;
  }
  button:last-child {
    margin-right: 0;
  }
`;

const PostPatch = ({
  image,
  nickname,
  identifier,
  children,
  button1,
  button2,
  link,
  handleSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <CardWrap className="card big">
      <SinglePofileWrap
        imgSize="big"
        imgSrc={image}
        name={nickname}
        subInfo={identifier}
      />
      {children}
      <ButtonWrap>
        <button className="em" onClick={handleSubmit}>
          {button1}
        </button>
        <button className="normal" onClick={() => navigate(link)}>
          {button2}
        </button>
      </ButtonWrap>
    </CardWrap>
  );
};

export default PostPatch;
