import styled from "styled-components";
import { ReactComponent as LogoImg } from "./../assets/Logo.svg";
import { ReactComponent as MenuIconMatch } from "./../assets/handshakeIcon.svg";
import { ReactComponent as MenuIconStory } from "./../assets/boardIcon.svg";
import { ReactComponent as MenuIconGame } from "./../assets/gameIcon.svg";
import { ReactComponent as MenuIconProfile } from "./../assets/personIcon.svg";

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
`;

const Menu = styled.ul`
	position: sticky;
	width: 100%;
	padding: 0 16px;
	li {
		width: 100%;
		border-radius: var(--border-raidus-md);
		color: var(--font-color);
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
	}
	li.active {
		background: var(--black);
		color: var(--primary-color);
		svg {
			fill: var(--primary-color);
		}
        a:hover {
			color: var(--primary-color);
			path {
				fill: var(--primary-color);
			}
		}
	}
`;

const Nav = () => {
	return (
		<NavWrap>
			<LogoWrap>
				<a href="" title="GAMETO">
					<LogoImg />
				</a>
			</LogoWrap>
			<Menu>
				<li className="active">
					<a href="none">
						<MenuIconMatch />
						<span>매칭하기</span>
					</a>
				</li>
				<li>
					<a href="none">
						<MenuIconStory />
						<span>스토리</span>
					</a>
				</li>
				<li>
					<a href="none">
						<MenuIconGame />
						<span>오늘뭐하지?</span>
					</a>
				</li>
				<li>
					<a href="none">
						<MenuIconProfile />
						<span>마이프로필</span>
					</a>
				</li>
			</Menu>
			<p className="copy">© 맑게고인물 team33 2023</p>
		</NavWrap>
	);
};

export default Nav;