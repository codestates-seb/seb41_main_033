import styled from "styled-components";
import { ReactComponent as EditIcon } from "./../assets/editIcon.svg";
import { ReactComponent as CloseIcon } from "./../assets/closeIcon.svg";

const BtnStoryStyle = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => (props.size === "big" ? "200px" : "auto")};
	padding: ${(props) => (props.size === "big" ? "12px 16px" : "6px 12px")};
	background: var(--grey);
	border-radius: var(--border-radius-sm);
	font-size: var(--font-body2-size);
	color: var(--strong-color);

	svg {
		width: 16px;
		height: 16px;
		margin-left: 8px;
		fill: var(--white);

		path {
			fill: inherit;
		}
	}
`;

const StoryBtn = ({ size, type }) => {
	return (
		<BtnStoryStyle size={size}>
			{type === "edit" ? (
				<>
					수정
					<EditIcon />
				</>
			) : null}
			{type === "delete" ? (
				<>
					삭제
					<CloseIcon />
				</>
			) : null}
		</BtnStoryStyle>
	);
};
export default StoryBtn;
