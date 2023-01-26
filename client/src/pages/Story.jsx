import styled from "styled-components";
import WriteFloatButton from "../components/WriteFloatButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Popup from "../components/Popup";
import StoryAll from "../components/StoryAll";
import StoryFriend from "../components/StoryFriend";

const Wrap = styled.div`
	.loadingObserver {
		> div {
			width: 100%;
			height: 140px;
			margin-bottom: 24px;
			border-radius: var(--border-radius-lg);
			background: var(--darkgrey1);
			animation: loading_skeleton 1.2s linear infinite;
		}
	}

	@keyframes loading_skeleton {
		0% {
			background: var(--darkgrey1);
		}
		50% {
			background: var(--darkgrey2);
		}
		100% {
			background: var(--darkgrey1);
		}
	}
`;

const TitleWrap = styled.div`
	display: flex;
	margin-bottom: 32px;
	h3 {
		margin-right: 24px;
		letter-spacing: -0.5px;
		font-size: var(--font-head2-size);
		cursor: pointer;
	}
	h3.active {
		font-weight: var(--font-weight-medium);
		color: var(--primary-color);
	}
`;

const Story = () => {
	const loginInfo = useSelector((state) => state.islogin.login);
	const accessToken = loginInfo.accessToken;
	const isLogin = loginInfo.isLogin;
	const navigate = useNavigate();

	const [isFriendStory, setIsFriendStory] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleLogin = () => {
		navigate(`/login`);
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "unset";
	};

	const handleSignup = () => {
		navigate(`/signup`);
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "unset";
	};

	//작성하기 버튼
	const handleWriteFBtnOnClick = () => {
		if (accessToken) {
			navigate(`/story/storywrite`);
		} else {
			setIsOpen((prev) => !prev);
			document.body.style.overflow = "hidden";
		}
	};

	const handleStoryTapClick = (value) => {
		setIsFriendStory(value);
		if (value && !isLogin) {
			setIsOpen((prev) => !prev);
			document.body.style.overflow = "unset";
		}
	};

	if (isFriendStory) {
		return (
			<Wrap>
				<TitleWrap>
					<h3
						className={isFriendStory ? "" : "active"}
						onClick={() => handleStoryTapClick(false)}
					>
						모두의 스토리
					</h3>
					<h3
						className={isFriendStory ? "active" : ""}
						onClick={() => handleStoryTapClick(true)}
					>
						친구의 스토리
					</h3>
				</TitleWrap>
				{isLogin ? (
					<StoryFriend accessToken={accessToken} isLogin={isLogin} />
				) : (
					"친구 스토리는 로그인 후 볼 수 있습니다."
				)}
				<WriteFloatButton click={handleWriteFBtnOnClick} />
				<Popup
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title="친구 스토리 보기"
					content="친구 스토리 보기는 로그인 후 이용 가능합니다."
					button1="로그인"
					button2="회원가입"
					handleBtn1={handleLogin}
					handleBtn2={handleSignup}
				/>
			</Wrap>
		);
	} else {
		return (
			<Wrap>
				<TitleWrap>
					<h3
						className={isFriendStory ? "" : "active"}
						onClick={() => handleStoryTapClick(false)}
					>
						모두의 스토리
					</h3>
					<h3
						className={isFriendStory ? "active" : ""}
						onClick={() => handleStoryTapClick(true)}
					>
						친구의 스토리
					</h3>
				</TitleWrap>
				<StoryAll accessToken={accessToken} isLogin={isLogin} />
				<WriteFloatButton click={handleWriteFBtnOnClick} />
				<Popup
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title="스토리 작성"
					content="스토리 작성은 로그인 후 이용 가능합니다."
					button1="로그인"
					button2="회원가입"
					handleBtn1={handleLogin}
					handleBtn2={handleSignup}
				/>
			</Wrap>
		);
	}
};
export default Story;
