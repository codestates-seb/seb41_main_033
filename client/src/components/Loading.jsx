import styled from "styled-components";
import React from "react";
import { forwardRef } from "react";

const Wrap = styled.div`
	padding: 48px 0;
`;

const Spinner = styled.div`
	width: 60px;
	height: 60px;
	margin: 60px auto;
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

// const Loading = forwardRef((props, ref) => {
// 	return <Spinner ref={ref} />;
// });

const Loading = forwardRef((props, ref) => {
	return (
		<>
			<Spinner ref={ref} />
		</>
	);
});

export default Loading;
