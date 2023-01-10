import styled from "styled-components";

const NavWrap = styled.nav`
	flex: none;
	width: 200px;
	background: var(--bg-card-color);
`;

const Nav = () => {
	return (
		<NavWrap>
			<div>Nav</div>
		</NavWrap>
	);
};

export default Nav;
