import styled from "styled-components";
import { useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import { ReactComponent as CommentIcon } from "./../assets/sms.svg";
import SinglePofileWrap from "../components/SingleProfileWrap";
import StoryComment from "../components/StoryComment";
import StoryBtn from "../components/StoryBtn";

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
	}
`;

const BtnWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 24px;
	button {
		margin-right: 12px;
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

const StoryDetail = () => {
	let isComment = true;
	const [isMe, setIsMe] = useState(true);

	return (
		<>
			<Title>스토리</Title>
			<div className="card big">
				<StoryHead>
					<SinglePofileWrap className="profile_wrap" imgSize="big" name={`맑게고인신나현`} subInfo={`2분전`} />
					<StoryLike>
						<input type="checkbox" id="storyLikes" name="storyLikes" />
						<label htmlFor="storyLikes">0</label>
					</StoryLike>
				</StoryHead>
				<StoryBody>
					<div className="img_wrap">
						<img src="https://blog.kakaocdn.net/dn/sqJj4/btrRAEdJj37/KoHvQKIfa2bUIJvKv0wELK/img.png" />
					</div>
					<div className="content_wrap">
						뜨악어!뜨아거!뜨악어!뜨아거!뜨악어!뜨악어!뜨악어!뜨악어!
						<br />
						진화하면 악뜨거!악뜨거!
					</div>
				</StoryBody>
				{isComment ? (
					<CommentsCountTag>
						<CommentIcon />1
					</CommentsCountTag>
				) : null}
				{isMe ? (
					<BtnWrap>
						<StoryBtn size="big" type="edit" />
						<StoryBtn size="big" type="delete" />
					</BtnWrap>
				) : null}
			</div>
			<Title>댓글</Title>
			<CommentWriteWrap className="card sm">
				<div className="title">댓글 작성</div>
				<textarea placeholder="댓글을 입력하세요"></textarea>
				<button className="normal">댓글 입력</button>
			</CommentWriteWrap>
			<StoryComment />
		</>
	);
};
export default StoryDetail;
