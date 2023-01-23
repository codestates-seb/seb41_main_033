import styled from "styled-components";
import { useEffect, useState } from "react";
import HeartIcon from "./../assets/heart_sprite.svg";
import { ReactComponent as CommentIcon } from "./../assets/sms.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import displayedAt from "../util/displayedAt";
import SinglePofileWrap from "../components/SingleProfileWrap";
import StoryComments from "../components/StoryComments";
import StoryBtn from "../components/StoryBtn";
import StoryFileView from "./../components/StoryFileView";

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
	const [isMe, setIsMe] = useState(false);
	const [storyData, setStoryData] = useState({});
	const [commentsList, setCommentsList] = useState([]);
	//const [isBoardLike, setIsBoardLike] = useState(storyData.likeStatus);
	useEffect(() => {
		axios
			.get(`${API_URL}/api/boards/${params.boardid}`, {
				// headers: {
				// 	//"ngrok-skip-browser-warning": "69420",
				// 	Authorization: `Bearer ${accessToken}`,
				// },
			})
			.then((res) => {
				setStoryData(res.data.data);
				if (res.data.data.memberId === Number(memberId)) setIsMe(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	let type = "";
	if (storyData.contentType) type = storyData.contentType.split("/")[0];

	//23.1.21. 좋아요 기능 중단
	const handleStoryLikeClick = () => {
		// axios
		// 	.post(
		// 		`${API_URL}/api/boards/${params.boardid}/likes`,
		// 		{},
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${isLogin.accessToken}`,
		// 			},
		// 		}
		// 	)
		// 	.then((res) => {
		// 		//setIsBoardLike(res);
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	//수정
	const handleStoryEditClick = () => {
		navigate(`/story/${params.userid}/${params.boardid}/edit`);
	};

	//삭제
	const handleStoryDeleteClick = () => {
		axios
			.delete(`${API_URL}/api/boards/${params.boardid}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => {
				//삭세하시겠습니까? 팝업 호출 필요
				alert("게시물이 삭제됩니다.");
				navigate("/story");
			})
			.catch((err) => {
				console.log(err);
				alert("게시물 삭제에 실패하였습니다.");
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
						<StoryLike onClick={handleStoryLikeClick}>
							<input
								type="checkbox"
								id="storyLikes"
								name="storyLikes"
								defaultChecked={storyData.likeStatus ? true : null}
							/>
							<label htmlFor="storyLikes">{storyData.likeCount}</label>
						</StoryLike>
					) : null}
				</StoryHead>
				<StoryBody>
					<StoryFileView
						size="big"
						fileName={storyData.uploadFileName}
						contentType={storyData.contentType}
					/>
					<div className="content_wrap">{storyData.content}</div>
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
						<StoryBtn
							size="big"
							type="delete"
							clickHandler={handleStoryDeleteClick}
						/>
					</BtnWrap>
				) : null}
			</div>
			<Title>댓글</Title>
			<StoryComments boardId={params.boardid} />
		</>
	);
};
export default StoryDetail;
