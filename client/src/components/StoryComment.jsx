import styled from "styled-components";
import { useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryBtn from "./StoryBtn";

const Wrap = styled.div`
	display: flex;
	align-items: center;

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

const StoryComment = () => {
	const [isMe, setIsMe] = useState(true);
	const [isEdit, setIsEdit] = useState(true);
	return (
		<Wrap className="card sm">
			<div className="comment_body">
				<SinglePofileWrap className="profile_wrap" imgSize="small" name="맑게고인뜨악어" subInfo="3분전" />
				{isEdit ? (
					<div className="content_wrap edit">
						<textarea placeholder="내용을 입력하세요" minLength="5"></textarea>
					</div>
				) : (
					<div className="content_wrap">안녕하세요 저는 뜨악어에요 뜨거운 관심 캄사합니다</div>
				)}
				{isMe ? (
					<BtnWrap>
						<StoryBtn type="edit" />
						<StoryBtn type="delete" />
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
