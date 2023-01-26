import styled from "styled-components";
import { MOBILE_POINT } from "../data/breakpoint";

const ImgArea = styled.div`
	width: ${(props) => (props.size === "big" ? "100%" : "var(--col-3)")};
	height: ${(props) => (props.size === "big" ? "auto" : "var(--col-3)")};
	${(props) => (props.size === "big" ? "margin-bottom:24px;" : "")}
	${(props) =>
		props.size === "big" ? "" : "border-radius:var(--border-radius-lg);"}
	background: ${(props) => (props.size === "big" ? "none" : "var(--grey)")};
	overflow: hidden;

	img {
		${(props) => (props.size === "big" ? "" : "width: 100%;")}
		${(props) => (props.size === "big" ? "" : "height: 100%;")}
		${(props) => (props.size === "big" ? "" : "object-fit: cover;")}
		${(props) => (props.size === "big" ? "max-width:100%;" : "")}
		display: block;
	}

	@media (max-width: ${MOBILE_POINT}) {
		width: 100%;
		height: auto;
		margin-top: 16px;
	}
`;

const VideoArea = styled.div`
	width: ${(props) => (props.size === "big" ? "100%" : "var(--col-3)")};
	height: ${(props) => (props.size === "big" ? "auto" : "var(--col-3)")};
	${(props) => (props.size === "big" ? "margin-bottom:24px;" : "")}
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	video {
		width: 100%;
		height: 100%;
	}

	@media (max-width: ${MOBILE_POINT}) {
		width: 100%;
		margin-top: 16px;
	}
`;

const StoryFileView = ({ size, fileName, contentType }) => {
	//파일 type 판별
	let type = "";
	if (contentType) type = contentType.split("/")[0];
	return (
		<>
			{fileName && type === "image" ? (
				<ImgArea size={size}>
					<img src={fileName} />
				</ImgArea>
			) : null}
			{fileName && type === "video" ? (
				<VideoArea size={size}>
					<video controls>
						<source src={fileName} type={contentType} />
					</video>
				</VideoArea>
			) : null}
		</>
	);
};
export default StoryFileView;
