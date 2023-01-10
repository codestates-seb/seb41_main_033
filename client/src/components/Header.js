import styled from "styled-components";

const HeaderWrap = styled.header`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 112px;
`;

const Header = () => {
	return (
		<HeaderWrap>
			<div className="container">Header</div>
		</HeaderWrap>
	);
};

export default Header;
