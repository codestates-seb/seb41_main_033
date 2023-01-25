import styled from "styled-components";
import { ReactComponent as ProfileImg } from "./../assets/defaultImg.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../data/apiUrl";
import { logout } from "../redux/slice/loginstate";
import { userInfo } from "../redux/slice/userInfo";
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
`;

const ProfileWrap = styled.div`
	a {
		flex: none;
		display: flex;
		align-items: center;
		margin-left: 32px;
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
		border-radius: 50%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
`;

const BtnWrap = styled.div`
	flex: none;
	display: flex;
	margin-left: 48px;
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
	button {
		border: 1px solid var(--border-color);
		border-radius: 8px;
		font-size: var(--font-caption-size);
	}
`;

const Header = () => {
	const loginInfo = useSelector((state) => state.islogin.login);
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loginInfo?.isLogin) {
			axios.get(`${API_URL}/api/members/${loginInfo?.memberId}`).then((res) => {
				setUser(res.data.data);
				dispatch(userInfo(res.data.data));
			});
		}
	}, [loginInfo?.isLogin, loginInfo?.memberId]);

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

	return (
		<HeaderWrap>
			{user && loginInfo?.isLogin ? (
				<>
					<ProfileWrap>
						<a href={`/profile/${loginInfo?.memberId}`}>
							<span className="alert">알림</span>
							<span className="user_nickname">{user.nickname}</span>
							<div className="user_img">
								{user.profileImage ? (
									<img src={user.profileImage} alt="프로필이미지" />
								) : (
									<ProfileImg />
								)}
							</div>
						</a>
					</ProfileWrap>
					<BtnWrap>
						<button onClick={handleLogout}>로그아웃</button>
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
