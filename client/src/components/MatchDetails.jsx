import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import matchGame from "../util/matchGame";
import { MOBILE_POINT } from "../data/breakpoint";

const Detail = styled.div`
	width: var(--col-9);
	margin-right: 32px;

	.title_wrap {
		display: flex;
		align-items: flex-start;
		margin-bottom: 16px;
	}
	.info_wrap {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		> div {
			&:nth-child(1) {
				margin-right: 16px;
			}
			span {
				margin-right: 6px;
			}
			strong {
				color: var(--strong-color);
			}
		}
	}
	.tag_wrap {
		display: flex;
		margin-bottom: 16px;
	}

	.description {
		.content {
			margin-top: 12px;
			color: var(--strong-color);
			word-break: break-all;
		}
	}
	button,
	a {
		width: 280px;
		margin-right: 16px;
	}

	@media (max-width: ${MOBILE_POINT}) {
		width: 100%;
	}
`;
const ImgWrap = styled.div`
	flex: none;
	width: 80px;
	height: 80px;
	overflow: hidden;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: ${MOBILE_POINT}) {
		width: 56px;
		height: 56px;
	}
`;
const Info = styled.div`
	width: 100%;
	.title {
		margin-bottom: 6px;
		font-size: var(--font-head2-size);
		color: var(--white);
		line-height: var(--line-height-lg);
	}
	.game {
		line-height: var(--line-height-lg);
		color: var(--yellow);
	}
`;
const EmLink = styled(Link)`
	text-align: center;
	display: block;
	background-size: 200% auto;
	background-image: linear-gradient(
		to right,
		rgba(255, 186, 41, 1) 0%,
		rgba(255, 143, 147, 1) 51%,
		rgba(255, 186, 41, 1) 100%
	);
	transition: 0.4s;
	padding: 12px 16px;
	font-size: var(--font-body1-size);
	font-weight: var(--font-weight-medium);
	color: var(--strong-color);
	border-radius: var(--border-radius-btn);
	&:hover {
		background-position: right center;
	}
`;
const Tag = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 6px 12px;
	margin-right: 6px;
	line-height: 20px;
	font-size: var(--font-caption-size);
	color: var(--white);
	background: var(--black);
	border: 1px solid var(--grey);
	border-radius: 30px;
	cursor: pointer;
`;

const MatchDetails = ({ data, boardId }) => {
	const [same, setSame] = useState(false);
	const navigate = useNavigate();
	const loginInfo = useSelector((state) => state.islogin.login);

	useEffect(() => {
		if (data.memberId === loginInfo?.memberId) {
			setSame(true);
		}
	}, []);

	const deleteBtn = () => {
		if (window.confirm("게시물을 삭제 하시겠습니까?")) {
			axios
				.delete(`${API_URL}/api/matches/${boardId}`, {
					headers: {
						Authorization: `Bearer ${loginInfo.accessToken}`,
					},
				})
				.then((res) => {
					alert("게시물이 삭제 되었습니다");
					navigate("/match");
				});
		}
	};

	return (
		<Detail className="card big">
			<div className="title_wrap">
				<Info>
					<div className="title">{data.title}</div>
					<div className="game">{data.game.korTitle}</div>
				</Info>
				<ImgWrap>
					<img src={matchGame(data.game).image} alt="게임아이콘" />
				</ImgWrap>
			</div>
			<div className="info_wrap">
				<div>
					<span>팀원수</span>
					<strong>{data?.team} 명</strong>
				</div>
				<div>
					<span>매칭생성시간</span>
					<strong>{displayedAt(data?.createdAt)}</strong>
				</div>
			</div>
			<div className="tag_wrap">
				{data?.tags.map((el, idx) => (
					<Tag key={idx}>{el}</Tag>
				))}
			</div>
			<div className="description">
				<div>상세설명</div>
				<div className="content">{data?.content}</div>
			</div>
			{same && (
				<div>
					<EmLink className="em" to={`/match/${boardId}/edit`}>
						수정하기
					</EmLink>

					<button className="normal" onClick={deleteBtn}>
						삭제하기
					</button>
				</div>
			)}
		</Detail>
	);
};
export default MatchDetails;
