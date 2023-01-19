import styled from "styled-components";
import { ReactComponent as BoardLikeIcon } from "./../assets/heartIcon.svg";
import { ReactComponent as BoardCommentIcon } from "./../assets/sms.svg";
import { useNavigate } from "react-router-dom";
import displayedAt from "../util/displayedAt";
import SinglePofileWrap from "./SingleProfileWrap";
import StoryFileView from "./StoryFileView";

const StoryWrap = styled.div`
	cursor: pointer;
	.storyMain {
		display: flex;
	}
`;

const TextArea = styled.div`
	flex: 1;
	margin-right: 32px;

	a {
		display: block;
	}

	.profile {
		display: flex;
		align-items: center;
		margin-bottom: 16px;

		.profile_img_wrap {
			width: 40px;
			height: 40px;
			margin-right: 16px;
			border-radius: 40px;
			svg,
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.profile_info_wrap {
			.username {
				line-height: var(--line-height-lg);
				font-size: var(--font-body1-size);
				font-weight: var(--font-weight-medium);
				color: var(--strong-color);
			}
			.time {
				font-size: var(--font-body2-size);
			}
		}
	}

	.content {
		font-size: var(--font-body2-size);
	}
`;

const InfoWrap = styled.ul`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	li {
		display: flex;
		align-items: center;
		padding: 10px 16px;
		margin-top: 32px;
		margin-right: 16px;
		border-radius: 100px;
		background: var(--grey);
		color: var(--strong-color);
		font-size: var(--font-body2-size);

		svg {
			width: 16px;
			height: 16px;
			margin-right: 8px;
		}
	}
	li:last-child {
		margin-right: 0;
	}
`;

const StorySingle = ({ data }) => {
	const navigate = useNavigate();

	const handleNaviOnClick = (e, memberId, boardId) => {
		// if (e.target === e.currentTarget)
		navigate(`/${memberId}/${boardId}`);
	};

	return (
		<StoryWrap className="card md" onClick={(e) => handleNaviOnClick(e, data.memberId, data.id)}>
			<div className="storyMain">
				<TextArea>
					<a href="" title="유저 프로필로 이동">
						<SinglePofileWrap imgSrc={data.profileImage} name={data.nickname} subInfo={displayedAt(data.createdAt)} />
					</a>
					<div className="content">{data.content}</div>
				</TextArea>
				<StoryFileView fileName={data.uploadFileName} contentType={data.contentType} />
			</div>
			<InfoWrap>
				{data.likeCount ? (
					<li>
						<BoardLikeIcon />
						<span>{data.likeCount}</span>
					</li>
				) : null}
				{data.commentCount ? (
					<li>
						<BoardCommentIcon />
						<span>{data.commentCount}</span>
					</li>
				) : null}
			</InfoWrap>
		</StoryWrap>
	);
};
export default StorySingle;
