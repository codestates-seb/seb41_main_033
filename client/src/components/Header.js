import styled from "styled-components";
import { ReactComponent as ProfileImg } from "./../assets/defaultImg.svg";
import { ReactComponent as SearchIcon } from "./../assets/search.svg";

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

const SearchWrap = styled.div`
	flex: 1;
	position: relative;
	padding: 16px 16px 16px 56px;
	display: flex;
	align-items: center;
	background: var(--input-color);
	border-radius: var(--border-radius-btn);
	svg {
		position: absolute;
		left: 16px;
		top: 12px;
		width: 24px;
		height: 24px;
	}
	input[type="text"] {
		padding: 0;
		border: 0 none;
		outline: none;
	}
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
			<SearchWrap>
				<SearchIcon />
				<input type="text" />
			</SearchWrap>
			<ProfileWrap>
				<span className="alert">알림</span>
				<span className="user_nickname">맑게고인신나현</span>
				<div className="user_img">
					<ProfileImg />
				</div>
			</ProfileWrap>
			<BtnWrap>
				<a href="" className="active">
					회원가입
				</a>
				<a href="">로그인</a>
			</BtnWrap>
		</HeaderWrap>
	);
};

export default Header;
