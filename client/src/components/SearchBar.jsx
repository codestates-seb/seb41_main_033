import styled from "styled-components";
import { ReactComponent as SearchIcon } from "./../assets/search.svg";

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

const SearchBar = () => {
	return (
		<SearchWrap>
			<SearchIcon />
			<input type="text" />
		</SearchWrap>
	);
};
export default SearchBar;
