import { useState } from "react";
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
