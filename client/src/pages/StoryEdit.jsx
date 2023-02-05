import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import PostPatch from "../components/PostPatch";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/Popup";
import LoadingFull from "../components/LoadingFull";
import { throttle } from "lodash";

const TextArea = styled.div`
  margin: 24px 0 16px 0;
`;

const StoryEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const memberId = loginInfo.memberId;
  const accessToken = loginInfo.accessToken;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/boards/${params.boardid}`)
      .then((res) => {
        setContent(res.data.data.content);
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
  const handlePatch = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleStoryEditSubmit = throttle(() => {
    setIsLoading(true);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/boards/${params.boardid}`,
        { content: content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setIsOpen((prev) => !prev);
        navigate("/story");
        document.body.style.overflow = "unset";
      })
      .catch((err) => {
        setIsLoading(false);
        alert("스토리 수정에 실패했습니다.");
        console.log(err);
      });
  }, 10000);

  return (
    <>
      <PostPatch
        image={userData.profileImage}
        nickname={userData.nickname}
        identifier={userData.identifier}
        button1="수정완료"
        button2="취소"
        link={-1}
        handleSubmit={handlePatch}
      >
        <TextArea>
          <label>내용</label>
          <textarea
            placeholder="스토리 내용만 수정만 가능합니다"
            onChange={(e) => handleContentOnChange(e)}
            defaultValue={content}
          ></textarea>
        </TextArea>
        <Popup
          isOpen={isOpen}
          title="스토리 수정"
          content="스토리 수정이 완료되었습니다."
          button1="확인"
          handleBtn1={handleStoryEditSubmit}
        />
      </PostPatch>
      {isLoading ? <LoadingFull /> : null}
    </>
  );
};
export default StoryEdit;
