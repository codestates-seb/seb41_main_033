import styled from "styled-components";
import { ReactComponent as DefaultProfileImg } from "./../assets/defaultImg.svg";
import { ReactComponent as BoardLikeIcon } from "./../assets/heartIcon.svg";
import { ReactComponent as BoardCommentIcon } from "./../assets/sms.svg";

const StoryWrap = styled.div`
	.storyMain {
		display: flex;
	}
`;

const TextArea = styled.div`
	flex: 1;
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

const ImgArea = styled.div`
	width: var(--col-3);
	height: var(--col-3);
	border-radius: var(--border-radius-lg);
	background: var(--grey);
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
	return (
		<StoryWrap className="card md">
			<div className="storyMain">
				<TextArea>
					<a href="" title="유저 프로필로 이동">
						<div className="profile">
							<div className="profile_img_wrap">
								<DefaultProfileImg />
							</div>
							<div className="profile_info_wrap">
								<div className="username">{data.nickname}</div>
								<div className="time">{data.createdAt}</div>
							</div>
						</div>
					</a>
					<div className="content">{data.content}</div>
				</TextArea>
				{data.image === undefined ? (
					""
				) : (
					<ImgArea>
						<img src={data.image} />
					</ImgArea>
				)}
			</div>
			<InfoWrap>
				{data.contentLikes === undefined || data.contentLikes === 0 ? (
					""
				) : (
					<li>
						<BoardLikeIcon />
						<span>{data.contentLikes}</span>
					</li>
				)}
				{data.commentCount == undefined || data.commentCount === 0 ? (
					""
				) : (
					<li>
						<BoardCommentIcon />
						<span>{data.commentCount}</span>
					</li>
				)}
			</InfoWrap>
		</StoryWrap>
	);
};
export default StorySingle;
