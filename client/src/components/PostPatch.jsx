import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SinglePofileWrap from "./SingleProfileWrap";
import { MOBILE_POINT } from "../data/breakpoint";

const CardWrap = styled.div`
  width: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 32px;
  text-align: center;
  button {
    width: 280px;
    margin-right: 16px;
  }
  button:last-child {
    margin: 0;
  }

  @media (max-width: ${MOBILE_POINT}) {
    flex-direction: column;
    button {
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;
    }
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
