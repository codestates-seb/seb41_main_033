import styled from "styled-components";
import { useEffect, useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import { ReactComponent as CommentIcon } from "./../assets/sms.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthenticatedRequest from "../hooks/useinterceptor";
import displayedAt from "../util/displayedAt";
import SinglePofileWrap from "../components/SingleProfileWrap";
import StoryComments from "../components/StoryComments";
import StoryBtn from "../components/StoryBtn";
import StoryFileView from "./../components/StoryFileView";
import Popup from "../components/Popup";
import viewSplitLine from "../util/hyper";

const Title = styled.h4`
  margin-top: 24px;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  font-size: var(--font-head3-size);

  &:first-child {
    margin-top: 0;
  }
`;

const StoryHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .profile_wrap {
    flex: 1;
    display: block;
  }
`;

const StoryLike = styled.div`
  position: relative;
  label {
    box-sizing: content-box;
    padding: 12px 16px 12px 48px;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-btn);
    text-align: center;
    color: var(--strong-color);
    cursor: pointer;
  }
  input[type="checkbox"] {
    appearance: none;
    position: absolute;
    left: 16px;
    top: 12px;
    width: 24px;
    height: 24px;
    margin: 0;
    background-image: url(${HeartIcon});
    background-repeat: no-repeat;
    background-position: 0 0;
    cursor: pointer;
  }
  input[type="checkbox"]:checked {
    background-position: 0 -24px;
  }
  input[type="checkbox"]:checked + label {
    background: var(--border-color);
  }
`;

const StoryBody = styled.div`
  .img_wrap {
    width: 100%;
    margin-bottom: 24px;
    img {
      max-width: 100%;
    }
  }
  .content_wrap {
    color: var(--strong-color);
    white-space: pre-wrap;
    a {
      text-decoration: underline;
      word-break: break-all;
    }
    a:hover {
      color: var(--white);
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  button {
    margin-right: 12px;
  }
  button:last-child {
    margin-right: 0;
  }
`;

const CommentsCountTag = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  margin: 24px 0 0 auto;
  background: var(--border-color);
  border-radius: var(--border-radius-btn);
  font-size: var(--font-caption-size);
  color: var(--strong-color);

  svg {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }
`;

const StoryDetail = () => {
  const navigate = useNavigate();
  let params = useParams();
  const loginInfo = useSelector((state) => state.islogin.login);
  const accessToken = loginInfo.accessToken;
  const memberId = loginInfo.memberId;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [storyData, setStoryData] = useState({});
  const [storyLike, setStoryLike] = useState({
    status: false,
    likeCount: 0,
  });
  const instance = useAuthenticatedRequest();

  useEffect(() => {
    instance
      .get(`/api/boards/${params.boardid}`)
      .then((res) => {
        setStoryData(res.data.data);
        setStoryLike({
          status: res.data.data.likeStatus,
          likeCount: res.data.data.likeCount,
        });
        if (res.data.data.memberId === Number(memberId)) setIsMe(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let type = "";
  if (storyData.contentType) type = storyData.contentType.split("/")[0];

  //스토리 좋아요
  const handleStoryLikeClick = () => {
    instance
      .post(`/api/boards/${params.boardid}/likes`)
      .then((res) => {
        let countValue = 0;
        if (res.data) countValue = 1;
        else countValue = -1;
        setStoryLike({
          status: res,
          likeCount: storyLike.likeCount + countValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //수정
  const handleStoryEditClick = () => {
    navigate(`/story/${params.userid}/${params.boardid}/edit`);
  };

  //삭제
  const handleDelete = () => {
    setIsDeleteOpen((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  const handleCancel = () => {
    setIsDeleteOpen((prev) => !prev);
    document.body.style.overflow = "unset";
  };

  const handleStoryDeleteClick = () => {
    instance
      .delete(`/api/boards/${params.boardid}`)
      .then((res) => {
        navigate("/story");
        document.body.style.overflow = "unset";
      })
      .catch((err) => {
        alert("스토리 삭제에 실패했습니다.");
      });
  };

  return (
    <>
      <Title>스토리</Title>
      <div className="card big">
        <StoryHead>
          <a
            href={`/profile/${params.userid}`}
            title="유저 프로필로 이동"
            className="profile_wrap"
          >
            <SinglePofileWrap
              imgSize="big"
              imgSrc={storyData.profileImage}
              name={storyData.nickname}
              subInfo={displayedAt(storyData.createdAt)}
            />
          </a>
          {storyData.likeStatus !== undefined ? (
            <StoryLike>
              <input
                type="checkbox"
                id="storyLikes"
                name="storyLikes"
                defaultChecked={storyLike.status ? true : null}
                onClick={handleStoryLikeClick}
              />
              <label htmlFor="storyLikes">{storyLike.likeCount}</label>
            </StoryLike>
          ) : null}
        </StoryHead>
        <StoryBody>
          <StoryFileView
            size="big"
            fileName={storyData.uploadFileName}
            contentType={storyData.contentType}
          />
          <div className="content_wrap">
            {viewSplitLine(String(storyData.content))}
          </div>
        </StoryBody>
        {storyData.commentCount ? (
          <CommentsCountTag>
            <CommentIcon />
            {storyData.commentCount}
          </CommentsCountTag>
        ) : null}
        {isMe ? (
          <BtnWrap>
            <StoryBtn
              size="big"
              type="edit"
              clickHandler={handleStoryEditClick}
            />
            <StoryBtn size="big" type="delete" clickHandler={handleDelete} />
          </BtnWrap>
        ) : null}
      </div>
      <Title>댓글</Title>
      <StoryComments boardId={params.boardid} />
      <Popup
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="스토리 삭제"
        content="스토리를 삭제하시겠습니까?"
        button1="삭제하기"
        button2="취소"
        handleBtn1={handleStoryDeleteClick}
        handleBtn2={handleCancel}
      />
    </>
  );
};
export default StoryDetail;
