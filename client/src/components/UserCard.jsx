import styled from "styled-components";
import { ReactComponent as Heart } from "./../assets/heartIcon.svg";

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
const Img = styled.img`
  margin: auto;
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;
const Name = styled.div`
  margin: 10px 0;
  text-align: center;
`;
const Like = styled.span`
  display: inline-block;
  margin: 0 6px;
  .logo_span {
    position: absolute;
    display: inline-block;
    margin-left: 4px;
    .logo {
      position: relative;
      margin-top: 3px;
    }
  }
`;
const UserCard = () => {
  return (
    <Card className="card big">
      <Div>
        <Img src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png" />
        <Name>맑음터공원</Name>
        <Like>Likes</Like>
        <Like className="number">
          0
          <span className="logo_span">
            <Heart className="logo" />
          </span>
        </Like>
      </Div>
    </Card>
  );
};
export default UserCard;
