import styled from "styled-components";
import { dummyDataStory } from "./../data/dummyDataStory";
import SearchBar from "./../components/SearchBar";
import StorySingle from "../components/StorySingle";
import WriteFloatButton from "../components/WriteFloatButton";

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
				{dummyDataStory.map((el) => {
					return <StorySingle key={el.id} data={el} />;
				})}
			</StoryBoardWrap>
			<WriteFloatButton />
		</div>
	);
};
export default Story;
