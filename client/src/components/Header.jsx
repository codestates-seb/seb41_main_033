import styled from "styled-components";
import { ReactComponent as ProfileImg } from "./../assets/defaultImg.svg";
import { ReactComponent as LogoImg } from "./../assets/logoImgM.svg";
import { ReactComponent as LogoutImg } from "./../assets/logoutIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../data/apiUrl";
import { login } from "../redux/slice/loginstate";
import { logout } from "../redux/slice/loginstate";
import { userInfo } from "../redux/slice/userInfo";
import { MOBILE_POINT } from "../data/breakpoint";

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

	@media (max-width: ${MOBILE_POINT}) {
		margin-left: 6px;
		a {
			font-size: 12px;
		}
		button {
			padding: 6px;
		}
	}
`;

const Header = () => {
	const loginInfo = useSelector((state) => state.islogin.login);
	const userInform = useSelector((state) => state.userInfo.userInfo);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loginInfo?.isLogin) {
			axios.get(`${API_URL}/api/members/${loginInfo?.memberId}`).then((res) => {
				dispatch(userInfo(res.data.data));
			});
		}
	}, [loginInfo?.isLogin, loginInfo?.memberId, dispatch]);

	const handleLogout = () => {
		axios
			.post(
				`${API_URL}/api/members/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${loginInfo.accessToken}`,
					},
				}
			)
			.then(() => {
				localStorage.clear();
				dispatch(logout({ accessToken: null, memberId: null, isLogin: false }));
				navigate("/");
			});
	};

	useEffect(() => {
		if (loginInfo?.isLogin && Date.now() >= loginInfo?.expire) {
			const memberId = loginInfo.memberId;
			const expire = Date.now() + 1000 * 60 * 20;

			axios
				.get(
					`${API_URL}/api/members/${loginInfo?.memberId}`,
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
	return (
		<HeaderWrap>
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
						<button onClick={handleLogout} title="로그아웃">
							<LogoutImg />
						</button>
					</BtnWrap>
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
