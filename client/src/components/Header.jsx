import styled from "styled-components";
import { ReactComponent as ProfileImg } from "./../assets/defaultImg.svg";
import { ReactComponent as LogoImg } from "./../assets/logoImgM.svg";
import { ReactComponent as LogoutImg } from "./../assets/logoutIcon.svg";
import { ReactComponent as BackHistory } from "./../assets/arrowHistory.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../redux/slice/loginstate";
import { userInfo } from "../redux/slice/userInfo";
import { login } from "../redux/slice/loginstate";
import { MOBILE_POINT } from "../data/breakpoint";
import Popup from "./Popup";

const HeaderWrap = styled.header`
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	height: 112px;
	padding: 0 48px;

	@media (max-width: ${MOBILE_POINT}) {
		padding: 0 16px;
		height: 56px;
	}
`;

const BtnBack = styled.button`
	display: none;
	@media (max-width: ${MOBILE_POINT}) {
		display: block;
		height: 24px;
		padding: 6px;
		box-sizing: content-box;
		margin-right: 6px;
	}
`;

const LogoWrap = styled.div`
	display: none;
	width: 100%;
	a {
		display: block;
		width: 120px;
		height: 35px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
	@media (max-width: ${MOBILE_POINT}) {
		display: block;
	}
`;

const ProfileWrap = styled.div`
	a {
		flex: none;
		display: flex;
		align-items: center;
	}
	.alert {
		display: block;
		width: 6px;
		height: 6px;
		margin-right: 6px;
		border-radius: 6px;
		background: var(--primary-color);
		font-size: 0;
		overflow: hidden;
	}
	.user_nickname {
		margin-right: 12px;
		line-height: 1;
		font-size: var(--font-caption-size);
		color: var(--font-color);
	}
	.user_img {
		width: 48px;
		height: 48px;
		margin-right: 16px;
		border-radius: 50%;
		overflow: hidden;
		img,
		svg {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	@media (max-width: ${MOBILE_POINT}) {
		.user_img {
			width: 32px;
			height: 32px;
			margin-right: 6px;
		}
		.alert,
		.user_nickname {
			display: none;
		}
	}
`;

const BtnWrap = styled.div`
	flex: none;
	display: flex;
	margin-left: 16px;
	a {
		display: block;
		padding: 6px 16px;
		font-size: var(--font-body2-size);
		font-weight: var(--font-weight-md);
		color: var(--strong-color);
	}
	a.active {
		color: var(--primary-color);
	}
	button.btn_logout {
		height: 24px;
		padding: 6px;
		box-sizing: content-box;
	}
	@media (max-width: ${MOBILE_POINT}) {
		margin-left: 6px;
		a {
			font-size: 12px;
		}
	}
`;

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const loginInfo = useSelector((state) => state.islogin.login);
	const userInform = useSelector((state) => state.userInfo.userInfo);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loginInfo?.isLogin) {
			axios
				.get(
					`${process.env.REACT_APP_API_URL}/api/members/${loginInfo?.memberId}`
				)
				.then((res) => {
					dispatch(userInfo(res.data.data));
				});
		}
	}, [loginInfo?.isLogin, loginInfo?.memberId, dispatch]);

	const handlePopup = () => {
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "hidden";
	};

	const handleCancel = () => {
		setIsOpen((prev) => !prev);
		document.body.style.overflow = "unset";
	};

	const handleLogout = () => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/members/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${loginInfo.accessToken}`,
					},
				}
			)
			.then(() => {
				localStorage.clear();
				setIsOpen((prev) => !prev);
				document.body.style.overflow = "unset";
				dispatch(logout({ accessToken: null, memberId: null, isLogin: false }));
				navigate("/");
			});
	};

	useEffect(() => {
		if (loginInfo?.isLogin && Date.now() >= loginInfo?.expire) {
			const memberId = loginInfo.memberId;
			const expire = Date.now() + 1000 * 60 * 60;
			console.log(loginInfo.refreshtoken);
			axios
				.get(
					`${process.env.REACT_APP_API_URL}/api/members/${loginInfo?.memberId}`,
					{
						headers: {
							Authorization: `Bearer ${loginInfo.accessToken}`,
							refreshToken: `Bearer ${loginInfo.refreshtoken}`,
						},
					},
					{ withCredentials: true }
				)
				.then((res) => {
					const refreshtoken = res.headers.refreshtoken;
					const accessToken = res.headers.authorization;
					dispatch(userInfo(res.data.data));
					dispatch(
						login({
							accessToken,
							memberId,
							isLogin: true,
							expire,
							refreshtoken,
						})
					);
					window.location.reload();
				})
				.catch((err) => console.log(err));
		}
	});

	const handleHistoryBack = () => {
		navigate(-1);
	};

	return (
		<HeaderWrap>
			<BtnBack onClick={handleHistoryBack}>
				<BackHistory />
			</BtnBack>
			<LogoWrap>
				<a href="/" title="GAMETO">
					<LogoImg />
				</a>
			</LogoWrap>
			{userInform && loginInfo?.isLogin ? (
				<>
					<ProfileWrap>
						<a href={`/profile/${loginInfo?.memberId}`}>
							<div className="user_img">
								{userInform.profileImage ? (
									<img src={userInform.profileImage} alt="프로필이미지" />
								) : (
									<ProfileImg />
								)}
							</div>
							<span className="user_nickname">{userInform.nickname}</span>
							<span className="alert">알림</span>
						</a>
					</ProfileWrap>
					<BtnWrap>
						<button
							onClick={handlePopup}
							title="로그아웃"
							className="btn_logout"
						>
							<LogoutImg />
						</button>
					</BtnWrap>
					<Popup
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						title="로그아웃"
						content="로그아웃 하시겠습니까?"
						button1="로그아웃"
						button2="취소"
						handleBtn1={handleLogout}
						handleBtn2={handleCancel}
					/>
				</>
			) : (
				<BtnWrap>
					<NavLink
						to="/signup"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						회원가입
					</NavLink>
					<NavLink
						to="/login"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						로그인
					</NavLink>
				</BtnWrap>
			)}
		</HeaderWrap>
	);
};

export default Header;
