import styled from "styled-components";
import { useEffect, useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryBtn from "./StoryBtn";
import displayedAt from "../util/displayedAt";
import axios from "axios";
import Popup from "./Popup";
import viewSplitLine from "../util/hyper";

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
		word-break: break-word;
		white-space: pre-wrap;
		a {
			text-decoration: underline;
			word-break: break-word;
		}
		a:hover {
			color: var(--strong-color);
		}
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
	const [isOpen, setIsOpen] = useState(false);
	const [isMe, setIsMe] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState(data.content);
	const [commentLike, setCommentLike] = useState({
		status: data.likeStatus,
		count: data.likeCount,
	});

	const handlePopup = () => {
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "hidden";
	};

	const handleCancel = () => {
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "unset";
	};

	useEffect(() => {
		if (data.memberId === memberId) setIsMe(true);
	}, []);

	//?????? ?????? ??????
	const handleChangeEditClick = () => {
		setIsEdit(true);
	};

	//?????? ?????? ??????
	const handleEditContentChange = (e) => {
		setContent(e.currentTarget.value);
	};

	//?????? ?????????
	const handleCommentLikeClick = () => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/boards/comments/${data.id}/likes`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			.then((res) => {
				let countValue = 0;
				if (res.data) countValue = 1;
				else countValue = -1;
				setCommentLike({
					status: res.data,
					count: commentLike.count + countValue,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Wrap className="card sm">
			<div className="comment_body">
				<a
					href={`/profile/${data.memberId}`}
					title="?????? ???????????? ??????"
					className="profile_wrap"
				>
					<SinglePofileWrap
						className="profile_wrap"
						imgSize="small"
						imgSrc={data.profileImage}
						name={data.nickname}
						subInfo={displayedAt(data.createdAt)}
					/>
				</a>
				{isEdit ? (
					<div className="content_wrap edit">
						<textarea
							placeholder="????????? ???????????????"
							minLength="5"
							defaultValue={content}
							onChange={(e) => handleEditContentChange(e)}
						></textarea>
					</div>
				) : (
					<div className="content_wrap">{viewSplitLine(String(content))}</div>
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
						<StoryBtn type="delete" clickHandler={handlePopup} />
					</BtnWrap>
				) : null}
			</div>
			<CommentLike onClick={handleCommentLikeClick}>
				<span className={commentLike.status ? "heart selected" : "heart"}>
					??? ????????? ?????????
				</span>
				<span className="likeCount">{commentLike.count}</span>
			</CommentLike>
			<Popup
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="?????? ??????"
				content="????????? ?????????????????????????"
				button1="????????????"
				button2="??????"
				handleBtn1={() => {
					handleDelete(data.id);
					setIsOpen((prev) => !prev);
					document.body.style.overflow = "unset";
				}}
				handleBtn2={handleCancel}
			/>
		</Wrap>
	);
};

export default StoryComment;
