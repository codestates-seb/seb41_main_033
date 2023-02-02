import styled from "styled-components";
import { ReactComponent as DefaultProfileImg } from "./../assets/defaultImg.svg";

const ProfileWrap = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	.profile_img_wrap {
		width: ${(props) => {
			if (props.imgSize === "big") return "56px";
			else if (props.imgSize === "small") return "36px";
			else {
				return "40px";
			}
		}};
		height: ${(props) => {
			if (props.imgSize === "big") return "56px";
			else if (props.imgSize === "small") return "36px";
			else {
				return "40px";
			}
		}};
		margin-right: 16px;
		border-radius: 40px;
		overflow: hidden;

		svg,
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.profile_info_wrap {
		.username {
			margin-bottom: 2px;
			line-height: var(--line-height-lg);
			font-size: var(--font-body1-size);
			font-weight: var(--font-weight-medium);
			color: var(--strong-color);
		}
		.subInfo {
			font-size: var(--font-body2-size);
		}
	}
`;

const SinglePofileWrap = ({ className, imgSize, imgSrc, name, subInfo }) => {
	return (
		<ProfileWrap className={className} imgSize={imgSize}>
			<div className="profile_img_wrap">{imgSrc ? <img src={imgSrc} /> : <DefaultProfileImg />}</div>
			<div className="profile_info_wrap">
				<div className="username">{name}</div>
				<div className="subInfo">{subInfo}</div>
			</div>
		</ProfileWrap>
	);
};
export default SinglePofileWrap;
