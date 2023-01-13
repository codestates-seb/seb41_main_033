import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardWrap = styled.div`
  width: 100%;
`;

const ProfileWrap = styled.div`
  display: flex;
  .image_container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile_container {
    width: calc(100% - 96px);
    margin: auto 0;
    .nickname {
      font-size: var(--font-head2-size);
      color: var(--white);
    }
    .identifier {
      font-size: var(--font-body1-size);
    }
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  button {
    width: 280px;
  }
  button:first-child {
    margin-right: 16px;
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
  return (
    <CardWrap className="card big">
      <ProfileWrap>
        <div className="image_container">
          <img src={image} alt="프로필 이미지" />
        </div>
        <div className="profile_container">
          <div className="nickname">{nickname}</div>
          <div className="identifier">{identifier}</div>
        </div>
      </ProfileWrap>
      <form onSubmit={() => {}}>
        {children}
        <ButtonWrap>
          <Link to={link1}>
            <button className="em">{button1}</button>
          </Link>
          <Link to={link2}>
            <button className="normal">{button2}</button>
          </Link>
        </ButtonWrap>
      </form>
    </CardWrap>
  );
};

export default PostPatch;
