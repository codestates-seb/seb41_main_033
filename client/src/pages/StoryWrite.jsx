import styled from "styled-components";
import useAuthenticatedRequest from "../hooks/useinterceptor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostPatch from "../components/PostPatch";
import { ReactComponent as ImgUploadIcon } from "./../assets/addPhoto.svg";
import { MOBILE_POINT } from "../data/breakpoint";
import LoadingFull from "../components/LoadingFull";
import { throttle } from "lodash";
const TextArea = styled.div`
  margin: 24px 0 16px 0;
`;

const InputFile = styled.div`
  .custom_label {
    margin-bottom: 8px;
  }
  .custom_input_wrap {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: var(--font-body2-size);

    .custom_input {
      flex: 1;
      position: relative;
      padding: 12px 16px;
      margin-right: 12px;
      background: var(--input-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);

      input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .custom_btn {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 24px;
      margin: 0;
      background: var(--bg-color);
      border: 1px solid var(--white);
      border-radius: var(--border-radius-sm);
      color: var(--primary-color);

      svg {
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }
    }
  }

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
    .custom_input_wrap {
      flex-direction: column;
      .custom_input {
        width: 100%;
        margin: 0 0 12px 0;
      }
      .custom_btn {
        width: 100%;
      }
    }
  }
`;

const StoryWrite = () => {
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.islogin.login);
  const memberId = loginInfo.memberId;
  const [userData, setUserData] = useState({});
  const [fileName, setFileName] = useState(
    "50MB 이하의 이미지, 영상 파일만 가능합니다"
  );
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const instance = useAuthenticatedRequest();

  useEffect(() => {
    instance
      .get(`/api/members/${memberId}`)
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
  const handleFileOnChange = (e) => {
    setFileName(e.currentTarget.files[0].name);
    setFile(e.currentTarget.files[0]);
  };
  //제출
  const handleWriteSubmit = throttle((content, file) => {
    setIsLoading(true);
    const data = { content };
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    if (file) formData.append("file", file);

    instance
      .post(`/api/boards`, formData)
      .then((res) => {
        setIsLoading(false);
        navigate("/story");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("스토리 작성에 실패했습니다.");
        console.log(err);
      });
  }, 10000);

  //렌더링
  if (userData) {
    return (
      <>
        <PostPatch
          image={userData.profileImage}
          nickname={userData.nickname}
          identifier={userData.identifier}
          button1="작성완료"
          button2="취소"
          link={-1}
          handleSubmit={() => handleWriteSubmit(content, file)}
        >
          <TextArea>
            <label>내용</label>
            <textarea
              placeholder="내용을 입력하세요"
              onChange={(e) => handleContentOnChange(e)}
            ></textarea>
          </TextArea>
          <InputFile>
            <div className="custom_label">파일 업로드</div>
            <div className="custom_input_wrap">
              <div className="custom_input">
                {fileName}
                <input
                  type="file"
                  onChange={(e) => handleFileOnChange(e)}
                  id="selectImg"
                ></input>
              </div>
              <label htmlFor="selectImg" className="custom_btn">
                <ImgUploadIcon />
                파일 업로드
              </label>
            </div>
          </InputFile>
        </PostPatch>
        {isLoading ? <LoadingFull /> : null}
      </>
    );
  } else {
    return null;
  }
};
export default StoryWrite;
