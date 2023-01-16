import styled from "styled-components";
import { ReactComponent as EditIcon } from "./../assets/editIcon.svg";
import { ReactComponent as CloseIcon } from "./../assets/closeIcon.svg";
import SinglePofileWrap from "./SingleProfileWrap";
import { useState } from "react";

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
`;

const BtnWrap = styled.div`
	flex: none;

	button {
		width: 24px;
		height: 24px;
		padding: 0;
		margin-right: 12px;

		svg {
			width: 24px;
			height: 24px;
		}
	}
	button:last-child {
		margin-right: 0;
	}
`;

const StoryComment = () => {
	const [isMe, setIsMe] = useState(true);
	return (
		<Wrap className="card sm">
			<div className="comment_body">
				<SinglePofileWrap className="profile_wrap" imgSize="small" name="맑게고인뜨악어" subInfo="3분전" />
				<div className="content_wrap">안녕하세요 저는 뜨악어에요 뜨거운 관심 캄사합니다</div>
			</div>
			{isMe ? (
				<BtnWrap>
					<button title="댓글 수정">
						<EditIcon />
					</button>
					<button title="댓글 삭제">
						<CloseIcon />
					</button>
				</BtnWrap>
			) : null}
		</Wrap>
	);
};

export default StoryComment;
