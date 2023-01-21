import styled from "styled-components";

const Wrap = styled.div`
	padding: 48px 0;
`;

const Spinner = styled.div`
	width: 60px;
	height: 60px;
	margin: 24px auto;
	border: 3px solid var(--input-color);
	border-radius: 50%;
	border-top-color: var(--primary-color);
	animation: spin 1.2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const Loading = () => {
	return (
		<Wrap>
			<Spinner />
		</Wrap>
	);
};
export default Loading;
