import styled from "styled-components";
import displayedAt from "../util/displayedAt";
import matchGame from "../util/matchGame";

const Card = styled.div`
	padding: 16px;
`;
const Title = styled.div`
	margin: 16px;
	max-width: 264px;
	.game_title {
		color: var(--white);
		font-size: var(--font-head3-size);
		margin-bottom: 5px;
	}
`;
const Space = styled.div`
	display: flex;
	margin: 8px;
	&.game_info {
		justify-content: end;
		align-items: flex-end;
		.team_count {
			display: flex;
			align-items: center;
			color: var(--strong-color);
			span {
				margin-right: 8px;
			}
		}
		div {
			margin-right: 10px;
		}

		span {
			display: block;
			width: 6px;
			height: 6px;
			margin-right: 6px;
			border-radius: 6px;
			background: var(--primary-color);
			font-size: 0;
		}
	}
`;
const ImgWrap = styled.div`
	width: 80px;
	height: 80px;
	overflow: hidden;
	border-radius: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
const Tag = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px 12px;
	margin-right: 6px;
	height: 32px;
	color: var(--white);
	background: var(--black);
	border: 1px solid var(--grey);
	border-radius: 30px;
	cursor: pointer;
`;
const MatchingCard = ({ data }) => {
	return (
		<Card className="card">
			<Space>
				<ImgWrap>
					{data.game && (
						<img src={matchGame(data.game).image} alt="게임아이콘" />
					)}
				</ImgWrap>

				<Title>
					<div className="game_title">{data.title}</div>
					<div>{data.nickname}</div>
				</Title>
			</Space>
			<Space className="game_info">
				<div className="team_count">
					<span></span>
					{data.team}명
				</div>
				<div>{displayedAt(data.createdAt)}</div>
			</Space>
			<Space>
				{data.tags.map((el, idx) => (
					<Tag key={idx}>{el}</Tag>
				))}
			</Space>
		</Card>
	);
};
export default MatchingCard;
