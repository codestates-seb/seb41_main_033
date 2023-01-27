import styled from "styled-components";
import { ReactComponent as Joy } from "../assets/readme.svg";

const Wrap = styled.div`
	h2 {
		margin-bottom: 24px;
		font-size: var(--font-head2-size);
		color: var(--strong-color);
	}
	.card{
		border:1px solid var(--darkgrey3));
	}
`;

const Banner = styled.div`
	padding: 48px;
	margin-bottom: 48px;
	background-image: linear-gradient(
		to right,
		rgba(255, 186, 41, 1) 0%,
		rgba(255, 143, 147, 1) 100%
	);
	border-radius: 16px;
	color: var(--strong-color);
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
`;

const VisualSection = styled.section`
	margin-bottom: 48px;
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
	margin-bottom: 48px;
	.team_list {
		display: flex;
		margin-top: 24px;
		li {
			flex: 1;
			margin-right: 12px;
			border-radius: 8px;
			padding: 24px 0;
			text-align: center;
			.img_wrap {
				display: block;
				width: 80px;
				height: 80px;
				margin: 0 auto 32px auto;
				background: #fff;
				border-radius: 50%;
			}
			.name {
				text-align: left;
				padding: 0 16px;
				font-size: var(--font-body2-size);
				color: var(--strong-color);
			}
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

const MusicZone = styled.div`
	.content_wrap {
		width: 100%;
		iframe {
			width: 100%;
		}
	}
`;

const WorkLog = styled.section`
	margin-bottom: 48px;
	h2 {
		margin: 24px 0;
	}

	.card_wrap {
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

const SkillsStack = styled.div`
	margin-bottom: 48px;
	.img_wrap {
		width: 100%;
		overflow: hidden;
		img {
			width: 100%;
		}
	}
`;

const PageView = styled.section`
	margin-bottom: 48px;
	.page_title {
		font-size: var(--font-head3-size);
		color: var(--strong-color);
	}
`;

const Readme = () => {
	const name = [
		"FE 김소라",
		"FE 손수빈",
		"FE 신나현",
		"BE 신대경",
		"BE 양건모",
		"BE 조대희",
	];

	const theme = {
		blue: {
			color1: "#547de7",
			color2: "#7dffb5",
		},
		red: {
			color1: "#ff5855",
			color2: "#f97c6a",
		},
		pink: {
			color1: "#7b56ee",
			color2: "#ff7ec1",
		},
		yellow: {
			color1: "#ffbc2d",
			color2: "#ffd145",
		},
	};
	return (
		<Wrap>
			{/* 소개 문구 */}
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

			{/* 팀원 소개 및 개요 */}
			<TeamSumUpSection className="card big">
				<div className="title">
					<h2>Our Team</h2>
					<span>맑게고인 33조</span>
				</div>
				<ul className="team_list">
					{name.map((el, idx) => {
						return (
							<li key={idx}>
								<div className="img_wrap"></div>
								<p className="name">{el}</p>
							</li>
						);
					})}
				</ul>
			</TeamSumUpSection>

			{/* <MusicZone>
				<div className="content_wrap">
					<iframe
						width="1280"
						height="720"
						src="https://www.youtube.com/embed/fag6IcPqWBQ"
						title="[BGM] Neon Merge Defense Portfolio"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					></iframe>
				</div>
				<div className="desc_wrap">
					<h3>MUSIC</h3>
					<p>이것은 BE의 다재다능 만능꾼 대경님이 직.접. 만든 음악입니다</p>
				</div>
			</MusicZone> */}

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
				<h2>주요 페이지 뷰</h2>
				<div>
					<div className="card md">
						<h3 className="page_title">로그인 페이지</h3>
						주요 페이지 뷰 - 프론트에서 캡쳐(이미지? or gif?) -> 지금은 비워놓음
					</div>
				</div>
			</PageView>

			{/* 팀원소개 */}
			<WorkLog>
				<h2>Our Work Log</h2>
				<div className="card_wrap">
					{/* 김소라 */}
					<WorkCard theme={theme.blue}>
						<div className="worklog_card card">
							<div className="img_wrap">
								<img src="/images/readme/card_예시.png" />
							</div>
							<div className="desc_wrap">
								<h4 className="title">소감</h4>
								<h3 className="name">FE 김소라</h3>
								<p>
									메인 프로젝트 시작전에는 남들에 비해 못해서 많은 불안감이
									있었지만 팀원들이 너무 좋고 으쌰으쌰하는 분위기라 항상까지는
									아니지만 즐겁게 작업하고 있습니다 😀 리덕스 툴킷을 쓰면서 아직
									어려운 부분도 있지만 비동기가 아닌 상태관리에서는 잘쓰고
									있습니다 간단한 CRUD 부분만 맡았지만 막상 구현해보니
									생각하지도 못한 부분에서 에러가 났지만 소통하여 같이 해결해
									나가고 백엔드 쪽에서 실시간으로 어떤 에러가 뜨는지 실시간으로
									알려 주실 정도로 협업이 잘되고 이게 진정한 협업이 아닐까 생각
									합니다 맑고 고인물 즐겁다✨
								</p>
							</div>
						</div>
						<div className="worklog_list_wrap card">
							<h4 className="title">work log</h4>
							<ul className="worklog_list">
								<li>로그인 페이지 뷰 구현 및 유효성검사</li>
								<li>매칭하기 페이지 뷰 구현 및 페이지네이션 구현</li>
								<li>매칭하기 작성하기,수정하기 페이지 뷰 구현</li>
								<li>검색하기 기능 구현</li>
								<li>게임추천하기 드래그앤 드롭 구현및 사운드 추가</li>
								<li>
									redux toolkit을 이용해 상태 업데이트와 persist 미들웨어를
									사용해 로컬스토리지에 저장
								</li>
							</ul>
						</div>
					</WorkCard>
					<WorkCard theme={theme.pink}>
						<div className="worklog_card card">
							<div className="img_wrap">
								<img src="/images/readme/card_예시.png" />
							</div>
							<div className="desc_wrap">
								<h4 className="title">소감</h4>
								<h3 className="name">FE 김소라</h3>
								<p>
									메인 프로젝트 시작전에는 남들에 비해 못해서 많은 불안감이
									있었지만 팀원들이 너무 좋고 으쌰으쌰하는 분위기라 항상까지는
									아니지만 즐겁게 작업하고 있습니다 😀 리덕스 툴킷을 쓰면서 아직
									어려운 부분도 있지만 비동기가 아닌 상태관리에서는 잘쓰고
									있습니다 간단한 CRUD 부분만 맡았지만 막상 구현해보니
									생각하지도 못한 부분에서 에러가 났지만 소통하여 같이 해결해
									나가고 백엔드 쪽에서 실시간으로 어떤 에러가 뜨는지 실시간으로
									알려 주실 정도로 협업이 잘되고 이게 진정한 협업이 아닐까 생각
									합니다 맑고 고인물 즐겁다✨
								</p>
							</div>
						</div>
						<div className="worklog_list_wrap card">
							<h4 className="title">work log</h4>
							<ul className="worklog_list">
								<li>로그인 페이지 뷰 구현 및 유효성검사</li>
								<li>매칭하기 페이지 뷰 구현 및 페이지네이션 구현</li>
								<li>매칭하기 작성하기,수정하기 페이지 뷰 구현</li>
								<li>검색하기 기능 구현</li>
								<li>게임추천하기 드래그앤 드롭 구현및 사운드 추가</li>
								<li>
									redux toolkit을 이용해 상태 업데이트와 persist 미들웨어를
									사용해 로컬스토리지에 저장
								</li>
							</ul>
						</div>
					</WorkCard>
					<WorkCard theme={theme.yellow}>
						<div className="worklog_card card">
							<div className="img_wrap">
								<img src="/images/readme/card_예시.png" />
							</div>
							<div className="desc_wrap">
								<h4 className="title">소감</h4>
								<h3 className="name">FE 김소라</h3>
								<p>
									메인 프로젝트 시작전에는 남들에 비해 못해서 많은 불안감이
									있었지만 팀원들이 너무 좋고 으쌰으쌰하는 분위기라 항상까지는
									아니지만 즐겁게 작업하고 있습니다 😀 리덕스 툴킷을 쓰면서 아직
									어려운 부분도 있지만 비동기가 아닌 상태관리에서는 잘쓰고
									있습니다 간단한 CRUD 부분만 맡았지만 막상 구현해보니
									생각하지도 못한 부분에서 에러가 났지만 소통하여 같이 해결해
									나가고 백엔드 쪽에서 실시간으로 어떤 에러가 뜨는지 실시간으로
									알려 주실 정도로 협업이 잘되고 이게 진정한 협업이 아닐까 생각
									합니다 맑고 고인물 즐겁다✨
								</p>
							</div>
						</div>
						<div className="worklog_list_wrap card">
							<h4 className="title">work log</h4>
							<ul className="worklog_list">
								<li>로그인 페이지 뷰 구현 및 유효성검사</li>
								<li>매칭하기 페이지 뷰 구현 및 페이지네이션 구현</li>
								<li>매칭하기 작성하기,수정하기 페이지 뷰 구현</li>
								<li>검색하기 기능 구현</li>
								<li>게임추천하기 드래그앤 드롭 구현및 사운드 추가</li>
								<li>
									redux toolkit을 이용해 상태 업데이트와 persist 미들웨어를
									사용해 로컬스토리지에 저장
								</li>
							</ul>
						</div>
					</WorkCard>
					<WorkCard theme={theme.red}>
						<div className="worklog_card card">
							<div className="img_wrap">
								<img src="/images/readme/card_예시.png" />
							</div>
							<div className="desc_wrap">
								<h4 className="title">소감</h4>
								<h3 className="name">FE 김소라</h3>
								<p>
									메인 프로젝트 시작전에는 남들에 비해 못해서 많은 불안감이
									있었지만 팀원들이 너무 좋고 으쌰으쌰하는 분위기라 항상까지는
									아니지만 즐겁게 작업하고 있습니다 😀 리덕스 툴킷을 쓰면서 아직
									어려운 부분도 있지만 비동기가 아닌 상태관리에서는 잘쓰고
									있습니다 간단한 CRUD 부분만 맡았지만 막상 구현해보니
									생각하지도 못한 부분에서 에러가 났지만 소통하여 같이 해결해
									나가고 백엔드 쪽에서 실시간으로 어떤 에러가 뜨는지 실시간으로
									알려 주실 정도로 협업이 잘되고 이게 진정한 협업이 아닐까 생각
									합니다 맑고 고인물 즐겁다✨
								</p>
							</div>
						</div>
						<div className="worklog_list_wrap card">
							<h4 className="title">work log</h4>
							<ul className="worklog_list">
								<li>로그인 페이지 뷰 구현 및 유효성검사</li>
								<li>매칭하기 페이지 뷰 구현 및 페이지네이션 구현</li>
								<li>매칭하기 작성하기,수정하기 페이지 뷰 구현</li>
								<li>검색하기 기능 구현</li>
								<li>게임추천하기 드래그앤 드롭 구현및 사운드 추가</li>
								<li>
									redux toolkit을 이용해 상태 업데이트와 persist 미들웨어를
									사용해 로컬스토리지에 저장
								</li>
							</ul>
						</div>
					</WorkCard>
				</div>
			</WorkLog>
		</Wrap>
	);
};

export default Readme;
