import styled from "styled-components";
import BlockUserList from "../components/BlockUserList";
import { MOBILE_POINT } from "../data/breakpoint";

const BlockWrap = styled.div`
	width: 100%;
	padding: 48px 0;

	@media (max-width: ${MOBILE_POINT}) {
		padding: 24px 0;
	}
`;

const TitleWrap = styled.div`
	padding: 0 48px 48px 48px;
	.title {
		font-size: var(--font-head2-size);
	}

	@media (max-width: ${MOBILE_POINT}) {
		padding: 0 24px 24px 24px;
	}
`;

const BlockList = () => {
	return (
		<BlockWrap className="card">
			<TitleWrap>
				<div className="title">차단한 유저 목록</div>
			</TitleWrap>
			<BlockUserList />
		</BlockWrap>
	);
};

export default BlockList;
