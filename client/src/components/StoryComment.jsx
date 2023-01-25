import styled from "styled-components";
import { useEffect, useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryBtn from "./StoryBtn";
import displayedAt from "../util/displayedAt";

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
	width: 24px;
	height: 24px;
	input[type="checkbox"] {
		appearance: none;
		width: 100%;
		height: 100%;
		margin: 0;
		background-image: url(${HeartIcon});
		background-repeat: no-repeat;
		background-position: 0 0;
		cursor: pointer;
	}
	input[type="checkbox"]:checked {
		background-position: 0 -24px;
	}
`;

const StoryComment = ({ memberId, data, handleEdit, handleDelete }) => {
	const [isMe, setIsMe] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState("");

	useEffect(() => {
		if (data.memberId === memberId) setIsMe(true);
	}, []);

	const handleChangeEditClick = () => {
		setIsEdit(true);
	};

	const handleEditContentChange = (e) => {
		setContent(e.currentTarget.value);
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
							defaultValue={data.content}
							onChange={(e) => handleEditContentChange(e)}
						></textarea>
					</div>
				) : (
					<div className="content_wrap">{data.content}</div>
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
			<CommentLike>
				<input type="checkbox" title="commentLikes" />
			</CommentLike>
		</Wrap>
	);
};

export default StoryComment;
