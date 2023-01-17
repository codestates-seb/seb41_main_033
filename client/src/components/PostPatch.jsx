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
  link1,
  button1,
  link2,
  button2,
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
      <form onSubmit={() => {}}>
        {children}
        <ButtonWrap>
          <button
            className="em"
            type="submit"
            onClick={() => navigate(`${link1}`)}
          >
            {button1}
          </button>
          <button
            className="normal"
            type="button"
            onClick={() => navigate(`${link2}`)}
          >
            {button2}
          </button>
        </ButtonWrap>
      </form>
    </CardWrap>
  );
};

export default PostPatch;
