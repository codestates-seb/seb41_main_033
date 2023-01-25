import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "./../assets/search.svg";

const SearchWrap = styled.div`
	flex: 1;
	position: relative;
	padding: 8px 16px 8px 50px;
	display: flex;
	align-items: center;
	background: var(--input-color);
	border-radius: var(--border-radius-btn);
	svg {
		position: absolute;
		left: 16px;
		top: 16px;
		width: 24px;
		height: 24px;
	}
	input[type="text"] {
		width: 100%;
		padding: 0 6px;
		border: 0 none;
		outline: none;
		height: 40px;
	}
`;

const SearchBar = ({ setKeyword, setPage }) => {
	const [searchData, setSearchData] = useState("");
	const handleKeydown = (e) => {
		if (e.target.value.length <= 1) {
			setKeyword("");
		}
		if (e.key === "Enter") {
			setKeyword(searchData);
			setPage(1);
		}
	};

	return (
		<SearchWrap>
			<SearchIcon />
			<input
				type="text"
				onChange={(e) => setSearchData(e.target.value)}
				onKeyDown={handleKeydown}
				value={searchData}
			/>
		</SearchWrap>
	);
};
export default SearchBar;
