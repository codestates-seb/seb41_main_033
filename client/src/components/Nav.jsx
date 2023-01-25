import styled from "styled-components";
import { ReactComponent as LogoImg } from "./../assets/Logo.svg";
import { ReactComponent as MenuIconMatch } from "./../assets/handshakeIcon.svg";
import { ReactComponent as MenuIconStory } from "./../assets/boardIcon.svg";
import { ReactComponent as MenuIconGame } from "./../assets/gameIcon.svg";
import { ReactComponent as MenuIconProfile } from "./../assets/personIcon.svg";
import { ReactComponent as CurtainCall } from "../assets/curtainIcon.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { MOBILE_POINT } from "../data/breakpoint";
// import NavMenu from "./NavMenu";

const NavWrap = styled.nav`
	position: relative;
	flex: none;
	width: 200px;
	background: var(--bg-card-color);

	.copy {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 48px 16px;
		text-align: center;
		font-size: var(--font-caption-size);
	}

	@media (max-width: ${MOBILE_POINT}) {
		position: fixed;
		width: 100%;
		height: 56px;
		padding: 0 16px;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--bg-card-color);
		border-top: 1px solid var(--border-color);
		z-index: 20;

		.copy {
			display: none;
		}
	}
`;

const LogoWrap = styled.div`
	position: sticky;
	width: 100%;
	height: 112px;
	display: flex;
	align-items: center;
	justify-content: center;
	a {
		display: block;
		width: 130px;
		height: 35px;
		svg {
			width: 100%;
			height: 100%;
		}
	}

	@media (max-width: ${MOBILE_POINT}) {
		display: none;
	}
`;

const Menu = styled.ul`
	position: sticky;
	width: 100%;
	padding: 0 16px;

	@media (max-width: ${MOBILE_POINT}) {
		padding: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
	}
`;

const MenuItem = styled.li`
	width: 100%;
	border-radius: var(--border-raidus-md);
	color: var(--font-color);
	overflow: hidden;
	a {
		display: flex;
		align-items: center;
		padding: 16px;
		color: inherit;
		svg {
			width: 24px;
			height: 24px;
			margin-right: 12px;
			fill: var(--font-color);
			path {
				fill: inherit;
			}
		}
		span {
			font-size: var(--font-body2-size);
		}
	}
	a:hover {
		color: var(--grey);
		path {
			fill: var(--grey);
		}
	}
	a.active {
		background: var(--black);
		color: var(--primary-color);
		svg {
			fill: var(--primary-color);
		}
	}
	a:hover.active {
		color: var(--primary-color);
		path {
			fill: var(--primary-color);
		}
	}

	@media (max-width: ${MOBILE_POINT}) {
		padding: 8px 0;
		margin: 0 auto;
		flex: 1;
		a {
			display: block;
			padding: 0;
			svg {
				display: block;
				margin: 0 auto;
			}
			span {
				display: block;
				margin: 0 auto;
				text-align: center;
				font-size: var(--font-caption-size);
				white-space: nowrap;
			}
		}
		a.active {
			background: none;
		}
	}
`;

const Nav = () => {
	const loginInfo = useSelector((state) => state.islogin.login);

	return (
		<NavWrap>
			<LogoWrap>
				<NavLink to="/match" title="GAMETO">
					<LogoImg />
				</NavLink>
			</LogoWrap>
			<Menu>
				<MenuItem>
					<NavLink
						to="/match"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MenuIconMatch />
						<span>매칭하기</span>
					</NavLink>
				</MenuItem>
				<MenuItem>
					<NavLink
						to="/story"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MenuIconStory />
						<span>스토리</span>
					</NavLink>
				</MenuItem>
				<MenuItem>
					<NavLink
						to="/game"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MenuIconGame />
						<span>오늘뭐하지?</span>
					</NavLink>
				</MenuItem>
				{loginInfo?.isLogin ? (
					<MenuItem>
						<NavLink
							to={`/profile/${loginInfo?.memberId}`}
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							<MenuIconProfile />
							<span>마이프로필</span>
						</NavLink>
					</MenuItem>
				) : null}
				<MenuItem>
					<NavLink
						to={`/`}
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<CurtainCall />
						<span>커튼코올?!</span>
					</NavLink>
				</MenuItem>
			</Menu>
			<p className="copy">© 맑게고인물 team33 2023</p>
		</NavWrap>
	);
};

export default Nav;
