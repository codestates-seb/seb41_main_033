import styled from "styled-components";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import PostPatch from "../components/PostPatch";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TextArea = styled.div`
  margin: 24px 0 16px 0;
`;

const StoryEdit = () => {
  const [userData, setUserData] = useState({});
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const memberId = loginInfo.memberId;
  const accessToken = loginInfo.accessToken;
  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${memberId}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //입력
  const handleContentOnChange = (e) => {
    setContent(e.currentTarget.value);
  };
  //제출
  const handleStoryEditSubmit = () => {
    axios
      .patch(
        `${API_URL}/api/boards/${params.boardid}`,
        { content: content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("수정이 완료되었습니다.");
        navigate("/story");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostPatch
      image={userData.profileImage}
      nickname={userData.nickname}
      identifier={userData.identifier}
      button1="수정완료"
      button2="취소"
      link={-1}
      handleSubmit={handleStoryEditSubmit}
    >
      <TextArea>
        <label>내용</label>
        <textarea
          placeholder="스토리 내용만 수정만 가능합니다"
          onChange={(e) => handleContentOnChange(e)}
        ></textarea>
      </TextArea>
    </PostPatch>
  );
};
export default StoryEdit;
