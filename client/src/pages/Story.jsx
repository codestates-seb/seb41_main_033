import styled from "styled-components";
import { dummyDataStory } from "./../data/dummyDataStory";
import SearchBar from "./../components/SearchBar";
import StorySingle from "../components/StorySingle";
import WriteFloatButton from "../components/WriteFloatButton";

const TitleWrap = styled.div`
	display: flex;
	margin-bottom: 32px;
	h3 {
		margin-right: 24px;
		letter-spacing: -0.5px;
		font-size: var(--font-head2-size);
	}
	h3.active {
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
				<h3 className="active">모두의 스토리</h3>
				<h3>친구의 스토리</h3>
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
