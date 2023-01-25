import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DefaultProfileImg } from "./../assets/defaultImg.svg";
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--col-3);
  height: 220px;
  padding: 48px 16px;
`;
const Div = styled.div`
  .number {
    color: var(--white);
  }
`;
const Img = styled.div`
  margin: auto;
  display: block;
  width: 56px;
  height: 56px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;
const Name = styled.div`
  margin: 10px 0;
  text-align: center;
`;
const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    margin: 0 6px;
  }
`;
const UserCard = ({ data }) => {
  return (
    <Card className="card big">
      <Div>
        <Link to={`/profile/${data.memberId}`}>
          <Img>
            {data.profileImage ? (
              <img src={data.profileImage} alt="유저프로필" />
            ) : (
              <DefaultProfileImg />
            )}
          </Img>
          <Name>{data.nickname}</Name>
        </Link>
        <Like>
          <div>Likes</div>
          <div className="number">{data.likeCount ? data.likeCount : 0}</div>
        </Like>
      </Div>
    </Card>
  );
};
export default UserCard;
