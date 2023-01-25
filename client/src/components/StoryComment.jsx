import styled from "styled-components";
import { useEffect, useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryBtn from "./StoryBtn";
import displayedAt from "../util/displayedAt";
import axios from "axios";
import { API_URL } from "../data/apiUrl";

const Wrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	.comment_body {
		flex: 1;
		margin-right: 16px;
	}

	.profile_wrap {
		display: flex;
		align-items: center;
		margin-bottom: 0;

		> div {
			display: flex;
			align-items: center;
			margin-right: 16px;
			font-size: inherit;

			.username {
				margin-right: 8px;
				font-size: var(--font-body2-size);
			}
		}
	}

	.content_wrap {
		flex: 1;
		padding-left: 52px;
		font-size: var(--font-body2-size);
	}
	.content_wrap.edit {
		textarea {
			background: var(--bg-color);
			border: 0 none;
			height: fit-content;
		}
	}
`;

const BtnWrap = styled.div`
	display: flex;
	padding-left: 52px;
	padding: 12px 0 0 52px;

	button {
		margin-right: 12px;
	}
	button:last-child {
		margin-right: 0;
	}
`;

const CommentLike = styled.div`
	flex: none;
	display: flex;
	align-items: stretch;
	.heart {
		display: block;
		width: 24px;
		height: 24px;
		margin: 0 6px 0 0;
		background-image: url(${HeartIcon});
		background-repeat: no-repeat;
		background-position: 0 0;
		font-size: 0;
		overflow: hidden;
		cursor: pointer;
	}
	.heart.selected {
		background-position: 0 -24px;
	}
	.likeCount {
		font-size: var(--caption-size);
		color: var(--strong-color);
	}
`;

const StoryComment = ({
	memberId,
	data,
	accessToken,
	handleEdit,
	handleDelete,
}) => {
	const [isMe, setIsMe] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState(data.content);
	const [commentLike, setCommentLike] = useState({
		status: data.likeStatus,
		count: data.likeCount,
	});

	useEffect(() => {
		if (data.memberId === memberId) setIsMe(true);
	}, []);

	//수정 버튼 클릭
	const handleChangeEditClick = () => {
		setIsEdit(true);
	};

	//수정 내용 입력
	const handleEditContentChange = (e) => {
		setContent(e.currentTarget.value);
	};

	//댓글 좋아요
	const handleCommentLikeClick = () => {
		axios
			.post(
				`${API_URL}/api/boards/comments/${data.id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				// let countValue = 0;
				// if (res.data) countValue = 1;
				// else countValue = -1;
				// setboardLike({
				// 	status: res,
				// 	likeCount: boardLike.likeCount + countValue,
				// });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Wrap className="card sm">
			<div className="comment_body">
				<SinglePofileWrap
					className="profile_wrap"
					imgSize="small"
					imgSrc={data.profileImage}
					name={data.nickname}
					subInfo={displayedAt(data.createdAt)}
				/>
				{isEdit ? (
					<div className="content_wrap edit">
						<textarea
							placeholder="내용을 입력하세요"
							minLength="5"
							defaultValue={content}
							onChange={(e) => handleEditContentChange(e)}
						></textarea>
					</div>
				) : (
					<div className="content_wrap">{content}</div>
				)}
				{isMe ? (
					<BtnWrap>
						{isEdit ? (
							<StoryBtn
								type="editComplete"
								clickHandler={() => {
									handleEdit(data.id, content);
									setIsEdit(false);
								}}
							/>
						) : (
							<StoryBtn type="edit" clickHandler={handleChangeEditClick} />
						)}
						<StoryBtn
							type="delete"
							clickHandler={() => handleDelete(data.id)}
						/>
					</BtnWrap>
				) : null}
			</div>
			<CommentLike onClick={handleCommentLikeClick}>
				<span className="heart">이 댓글에 좋아요</span>
				<span className="likeCount">12</span>
			</CommentLike>
		</Wrap>
	);
};

export default StoryComment;
