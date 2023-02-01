import styled from "styled-components";
import Loading from "./Loading";

const Wrap = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
`;

const LoadingFull = () => {
	return (
		<Wrap>
			<Loading />
		</Wrap>
	);
};
export default LoadingFull;
