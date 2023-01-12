import styled from "styled-components";
import SearchBar from "./../components/SearchBar";
import StorySingle from "../components/StorySingle";
import { dummyDataStory } from "./../data/dummyDataStory";

const TitleWrap = styled.ul`
	display: flex;
	margin-bottom: 32px;
	li {
		margin-right: 24px;
		letter-spacing: -0.5px;
		font-size: var(--font-head2-size);
	}
	li.active {
		font-weight: var(--font-weight-medium);
		color: var(--primary-color);
	}
`;

const StoryBoardWrap = styled.div`
	margin-top: 48px;
	> div {
		margin-bottom: 24px;
	}
`;

const Story = () => {
	return (
		<div>
			<TitleWrap>
				<li className="active">모두의 스토리</li>
				<li>친구의 스토리</li>
			</TitleWrap>
			<SearchBar />
			<StoryBoardWrap>
				{dummyDataStory.map((el, idx) => {
					return <StorySingle key={idx} data={el} />;
				})}
			</StoryBoardWrap>
		</div>
	);
};
export default Story;
