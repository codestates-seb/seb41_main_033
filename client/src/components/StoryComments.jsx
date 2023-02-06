import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import StoryComment from "../components/StoryComment";
import { useSelector } from "react-redux";
import { throttle } from "lodash";

const CommentWriteWrap = styled.div`
  margin-bottom: 24px;
  text-align: right;
  .title {
    width: 100%;
    margin-bottom: 16px;
    text-align: left;
    font-size: var(--font-body1-size);
    color: var(--strong-color);
  }
  textarea {
    margin-bottom: 16px;
  }
  button.normal {
    border-radius: var(--border-radius-sm);
  }
`;

const StoryComments = ({ boardId }) => {
  const loginInfo = useSelector((state) => state.islogin.login);
  const accessToken = loginInfo.accessToken;
  const memberId = loginInfo.memberId;
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  //댓글 입력
  const handleCommentChange = (e) => {
    setComment(e.currentTarget.value);
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  //CRUD
  //CREATE: 댓글 생성
  const handleWriteClick = throttle(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setCommentsList((prevData) => [...prevData, res.data.data]);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 등록에 실패했습니다.");
      });
  }, 10000);
  //READ: 댓글 불러오기
  const getCommentsList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}/comments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCommentsList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //UPDATE: 댓글 수정
  const handleEditClick = (commentsId, content) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/boards/comments/${commentsId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        alert("댓글 수정에 실패했습니다.");
      });
  };
  //DELETE: 댓글 삭제
  const handleDeleteClick = (commentsId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/boards/comments/${commentsId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        let newData = commentsList.filter((el) => el.id !== commentsId);
        setCommentsList(newData);
      })
      .catch((err) => {
        alert("댓글 삭제에 실패했습니다.");
      });
  };
  return (
    <>
      <CommentWriteWrap className="card sm">
        <div className="title">댓글 작성</div>
        <textarea
          placeholder="댓글을 입력하세요"
          onChange={(e) => {
            handleCommentChange(e);
          }}
          value={comment}
        ></textarea>
        <button className="normal" onClick={handleWriteClick}>
          댓글 입력
        </button>
      </CommentWriteWrap>
      {commentsList?.map((el) => {
        return (
          <StoryComment
            key={el.id}
            data={el}
            memberId={memberId}
            accessToken={accessToken}
            handleEdit={handleEditClick}
            handleDelete={handleDeleteClick}
          />
        );
      })}
    </>
  );
};
export default StoryComments;
