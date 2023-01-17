import styled from "styled-components";
import { ReactComponent as ProfileImg } from "./../assets/defaultImg.svg";
import { NavLink } from "react-router-dom";

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
	flex: none;
	display: flex;
	align-items: center;
	margin-left: 32px;
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
`;

const Header = () => {
	return (
		<HeaderWrap>
			<ProfileWrap>
				<span className="alert">알림</span>
				<span className="user_nickname">맑게고인신나현</span>
				<div className="user_img">
					<ProfileImg />
				</div>
			</ProfileWrap>
			<BtnWrap>
				<NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
					회원가입
				</NavLink>
				<NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
					로그인
				</NavLink>
			</BtnWrap>
		</HeaderWrap>
	);
};

export default Header;
