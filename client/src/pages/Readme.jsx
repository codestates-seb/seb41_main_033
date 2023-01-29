import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Joy } from "../assets/readme.svg";
import { ReactComponent as CloseIcon } from "../assets/closeIcon.svg";
import { teamData, pageData, theme } from "../data/readme";
import { MOBILE_POINT } from "../data/breakpoint";

const Wrap = styled.div`
	h2 {
		margin-bottom: 24px;
		font-size: var(--font-head2-size);
		color: var(--strong-color);
	}
	.card {
		border: 1px solid var(--darkgrey3);
	}
	section {
		margin-bottom: 48px;
	}

	@media (max-width: ${MOBILE_POINT}) {
		section {
			margin-bottom: 24px;
		}
	}
`;

const Banner = styled.section`
	padding: 48px;
	background-image: linear-gradient(
		to right,
		rgba(255, 186, 41, 1) 0%,
		rgba(255, 143, 147, 1) 100%
	);
	border-radius: 16px;
	color: var(--strong-color);
	word-break: keep-all;
	.desc {
		line-height: 22px;
		color: rgba(255, 255, 255, 0.7);
		strong {
			display: block;
			font-size: var(--font-head3-size);
			color: rgba(255, 255, 255);
			margin-bottom: 6px;
		}
	}

	@media (max-width: ${MOBILE_POINT}) {
		padding: 24px 32px;
		font-size: 12px;
		strong {
			font-size: 14px;
		}
	}
`;

const VisualSection = styled.section`
	.visual {
		position: relative;
		height: 480px;
		background: url(/images/readme/visual_img.jpg);
		background-size: cover;
		.text_wrap {
			position: absolute;
			left: 48px;
			bottom: 48px;
			.point {
				color: var(--primary-color);
				font-size: var(--font-body2-size);
			}
			p {
				margin-bottom: 32px;
				strong {
					display: block;
					font-size: var(--font-head1-size);
					color: var(--strong-color);
					margin-bottom: 8px;
				}
				span {
					display: block;
					margin-top: 6px;
				}
			}
		}
	}

	@media (max-width: ${MOBILE_POINT}) {
		.visual {
			padding-top: 48px;
			height: auto;
			.text_wrap {
				position: relative;
				left: auto;
				bottom: auto;
				word-break: keep-all;
			}
		}
	}
`;

const TeamSumUpSection = styled.section`
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		h2 {
			margin-bottom: 0;
		}
		span {
			color: var(--strong-color);
		}
	}
	.team_list {
		display: flex;
		margin-top: 24px;
		li {
			flex: 1;
			margin-right: 12px;
			border-radius: 8px;
			padding: 24px 0;
			text-align: center;
			position: relative;
			top: 0;
			transition: all 0.3s;

			a {
				display: block;
			}
			.img_wrap {
				display: block;
				width: 80px;
				height: 80px;
				margin: 0 auto 32px auto;
				background: #fff;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.name {
				text-align: left;
				padding: 0 16px;
				font-size: var(--font-body2-size);
				color: var(--strong-color);
			}
		}
		li:hover {
			top: -6px;
			box-shadow: 2px 2px 12px 6px rgb(0 0 0 / 80%);
		}
		li:nth-child(1) {
			background-image: linear-gradient(to top, #547de7 0%, #7dffb5 100%);
		}
		li:nth-child(2) {
			background-image: linear-gradient(to top, #ff5855 0%, #f97c6a 100%);
		}
		li:nth-child(3) {
			background-image: linear-gradient(to top, #7b56ee 0%, #ff7ec1 100%);
		}
		li:nth-child(4) {
			background-image: linear-gradient(to top, #ffbc2d 0%, #ffd145 100%);
		}
		li:nth-child(5) {
			background-image: linear-gradient(to top, #547de7 0%, #7dffb5 100%);
		}
		li:nth-child(6) {
			margin-right: 0;
			background-image: linear-gradient(to top, #ff5855 0%, #f97c6a 100%);
		}
	}
	.desc {
		margin-top: 16px;
	}
`;

const SkillsStack = styled.section`
	.img_wrap {
		width: 100%;
		overflow: hidden;
		img {
			width: 100%;
		}
	}
`;

const WorkLog = styled.section`
	h2 {
		margin: 24px 0;
	}
`;

const WorkCard = styled.div`
	display: flex;
	margin-bottom: 48px;
	.worklog_card {
		flex: 1;
		margin-right: 32px;
		overflow: hidden;
		.img_wrap {
			width: 100%;
			height: 240px;
			background: ${(props) => props.theme.color1};
			overflow: hidden;
			text-align: center;
			img {
				height: 100%;
				object-fit: cover;
			}
		}
		.desc_wrap {
			padding: 24px 32px;
			.title {
				margin-bottom: 4px;
				font-size: var(--font-body2-size);
				color: var(--primary-color);
			}
			.name {
				margin-bottom: 16px;
				font-size: var(--font-head3-size);
				color: var(--strong-color);
			}
			p {
				line-height: 1.6;
				font-size: var(--font-body2-size);
			}
		}
	}

	.worklog_list_wrap {
		flex: 1;
		.title {
			padding: 24px;
			color: var(--strong-color);
		}
		.worklog_list {
			li {
				position: relative;
				padding: 16px 32px 16px 48px;
				border-top: 1px solid #272727;
				line-height: var(--line-height-lg);
				font-size: var(--font-body2-size);
				word-break: keep-all;
				transition: all 0.3s;
			}
			li:before {
				content: "";
				position: absolute;
				left: 22px;
				top: 22px;
				display: block;
				width: 6px;
				height: 6px;
				background: ${(props) => props.theme.color2};
				border-radius: 6px;
			}
			li:hover {
				background-image: linear-gradient(
					to right,
					${(props) => props.theme.color1} 0%,
					${(props) => props.theme.color2} 100%
				);
				color: var(--strong-color);
			}
		}
	}
`;

const PageView = styled.section`
	display: flex;
	.pagelist_wrap {
		flex: 3;
		margin-right: 24px;
		.title {
			font-size: var(--font-body1-size);
			margin-bottom: 24px;
			padding: 24px 16px;
			border-bottom: 1px solid var(--darkgrey3);
		}
		.pagelist {
			padding-bottom: 24px;
			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 8px 16px;
				font-size: var(--font-caption-size);

				button {
					border: 1px solid var(--darkgrey3);
					border-radius: var(--border-radius-btn);
					padding: 4px 12px;
					font-size: var(--font-caption-size);
					background: var(--black);
				}
			}
		}
		li.selected {
			color: var(--strong-color);
			button {
				background: var(--white);
				color: var(--darkgrey1);
			}
		}
	}
	.page_wrap {
		flex: 7;
		padding: 32px 24px;
		background: var(--black);
		border-radius: var(--border-raidus-md);
		border: 1px solid var(--darkgrey3);
		.page_title {
			color: var(--strong-color);
			font-size: var(--font-head3-size);
			margin-bottom: 12px;
		}
		p {
			margin-bottom: 24px;
		}
		.page_img_wrap {
			position: relative;
			width: 100%;
			img {
				width: 100%;
			}
			.hover {
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.85);
				color: var(--white);
				opacity: 0;
				cursor: pointer;
			}
		}
		.page_img_wrap:hover {
			.hover {
				opacity: 1;
			}
		}
	}
`;

const BtnTop = styled.button`
	position: fixed;
	bottom: 56px;
	right: 56px;
	width: 56px;
	height: 56px;
	padding: 0;
	border: 1px solid var(--border-color);
	background: var(--black);
	border-radius: 16px;
	font-size: var(--font-caption-size);
	color: var(--white);
	box-shadow: 0px 6px 10px 4px rgb(0 0 0 / 15%), 0px 2px 3px rgb(0 0 0 / 30%);
`;

const GalleryPopUp = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: var(--bg-color);
	padding: 56px 0;
	overflow: hidden;

	.btn_popup_close {
		position: absolute;
		right: 16px;
		top: 16px;
		width: 24px;
		height: 24px;
		padding: 0;
	}
	.img_wrap {
		width: 100%;
		img {
			width: 100%;
		}
	}
`;

const Readme = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);

	//탭 클릭
	const handleTabClick = (idx) => {
		setCurrentTab(idx);
	};

	//스크롤 탑
	const handleScrollTopClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	//이미지 팝업 열기
	const handleOpenPopClick = () => {
		setIsPopUpOpen(true);
	};
	//팝업 닫기
	const handleClosePopClick = () => {
		setIsPopUpOpen(false);
	};

	return (
		<Wrap>
			{/* key visual 소개 문구 */}
			<VisualSection>
				<div className="card big visual">
					<div className="text_wrap">
						<p className="point">GAMETO | www.gameto.kr</p>
						<p>
							<strong>Play Together.</strong>
							<strong>Share Together.</strong>
						</p>
						<p>
							<span>
								함께 게임을 플레이 할 유저를 '매칭하기' 에서 쉽게 찾으세요.
							</span>
							<span>'스토리'에서 당신의 게임 이야기를 공유하세요.</span>
						</p>
					</div>
				</div>
			</VisualSection>

			<Banner>
				<p className="desc">
					<strong>
						비매너 비켜!😠 트롤 비켜!👊🏻 매너있게 같이 게임할 사람 없나요?!ㅜㅜ
					</strong>
					<br />
					복잡하고 보기 불편한 기존 게임 커뮤니티 대신에 같이 게임할 유저를
					찾고, <br />
					가볍게 게임 추천도 받을 수 있는 🕹️게이머🕹️를 위한 소셜서비스 입니다.
				</p>
			</Banner>

			{/* 기술스택 */}
			<SkillsStack>
				<h2>기술스택</h2>
				<div className="card big">
					<div className="img_wrap">
						<img src="images/readme/gameto_skillstack.png" />
					</div>
				</div>
			</SkillsStack>

			{/* 주요 페이지 뷰 */}
			<PageView>
				<div className="card pagelist_wrap">
					<h2 className="title">주요 기능 소개</h2>
					<ul className="pagelist">
						{pageData.map((el, idx) => {
							return (
								<li key={idx} className={idx === currentTab ? "selected" : ""}>
									<span>{el.pageName}</span>
									<button
										className="btn_view"
										onClick={() => handleTabClick(idx)}
									>
										보기
									</button>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="page_wrap">
					<h3 className="page_title">{pageData[currentTab].pageName}</h3>
					<p>{pageData[currentTab].content}</p>
					<div className="page_img_wrap">
						<img src={pageData[currentTab].src} />
						<div className="hover" onClick={handleOpenPopClick}>
							자세히 보기
						</div>
					</div>
				</div>
			</PageView>

			{/* 팀원 소개 및 개요 */}
			<TeamSumUpSection className="card big">
				<div className="title">
					<h2>Our Team</h2>
					<span>맑게고인 33조</span>
				</div>
				<ul className="team_list">
					{teamData.map((el, idx) => {
						return (
							<li key={idx}>
								<a href={`#member${idx}`}>
									<div className="img_wrap">
										<img src={el.imgSrc_sm} />
									</div>
									<p className="name">{`${el.position} ${el.name}`}</p>
								</a>
							</li>
						);
					})}
				</ul>
			</TeamSumUpSection>

			{/* 팀원소개 */}
			<WorkLog>
				<h2>Our Work Log</h2>
				<div className="card_wrap">
					{/* 김소라 */}
					{teamData.map((el, idx) => {
						return (
							<WorkCard key={idx} theme={theme[el.theme]} id={`member${idx}`}>
								<div className="worklog_card card">
									<div className="img_wrap">
										<img src={el.imgSrc_big} />
									</div>
									<div className="desc_wrap">
										<h4 className="title">소감</h4>
										<h3 className="name">{`${el.position} ${el.name}`}</h3>
										<p>{el.thought}</p>
									</div>
								</div>
								<div className="worklog_list_wrap card">
									<h4 className="title">work log</h4>
									<ul className="worklog_list">
										{el.worklog.map((el, idx) => {
											return <li key={idx}>{el}</li>;
										})}
									</ul>
								</div>
							</WorkCard>
						);
					})}
				</div>
			</WorkLog>

			{/* Go To TOP 버튼 */}
			<BtnTop onClick={handleScrollTopClick}>TOP</BtnTop>

			{/* 이미지 팝업 */}
			{isPopUpOpen ? (
				<GalleryPopUp>
					<button className="btn_popup_close" onClick={handleClosePopClick}>
						<CloseIcon />
					</button>
					<div className="img_wrap">
						<img src={pageData[currentTab].src} />
					</div>
				</GalleryPopUp>
			) : null}
		</Wrap>
	);
};

export default Readme;
