import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ImgUploadIcon } from "./../assets/addPhoto.svg";
import SinglePofileWrap from "./SingleProfileWrap";

const Wrap = styled.div`
	width: 100%;

	input[type="text"] {
		width: 100%;
		padding: 12px 16px;
		border-radius: var(--border-radius-sm);
	}
`;

const TextArea = styled.div`
	margin: 24px 0 16px 0;

	textarea {
		resize: none;
		width: 100%;
		min-height: 112px;
		padding: 12px 16px;
		background: var(--input-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-sm);
		font-size: var(--font-body2-size);
		color: var(--strong-color);
	}
`;

const InputFile = styled.div`
	.custom_label {
		margin-bottom: 8px;
	}
	.custom_input_wrap {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		font-size: var(--font-body2-size);

		.custom_input {
			flex: 1;
			position: relative;
			padding: 12px 16px;
			margin-right: 12px;
			background: var(--input-color);
			border: 1px solid var(--border-color);
			border-radius: var(--border-radius-sm);

			input[type="file"] {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		.cutomt_btn {
			flex: none;
			display: flex;
			align-items: center;
			padding: 8px 24px;
			margin: 0;
			background: var(--bg-color);
			border: 1px solid var(--white);
			border-radius: var(--border-radius-sm);
			color: var(--primary-color);

			svg {
				width: 24px;
				height: 24px;
				margin-right: 6px;
			}
		}
	}
`;

const BtnWrap = styled.div`
	padding-top: 56px;
	text-align: center;

	button {
		width: 280px;
		margin-right: 16px;
	}
	button:last-child {
		margin-right: 0;
	}
`;

const StoryInputArea = ({ page }) => {
	const [fileName, setFileName] = useState("이미지는 jpeg, jpg, png만 업로드 가능합니다");
	const handleOnchange = (e) => {
		setFileName(e.currentTarget.files[0].name);
	};
	return (
		<Wrap className="card big">
			<SinglePofileWrap imgSize="big" name="맑게고인신나현" subInfo="nahyeon123" />
			<TextArea>
				<label>내용</label>
				<textarea placeholder="내용을 입력하세요"></textarea>
			</TextArea>
			{page === "write" ? (
				<>
					<InputFile>
						<div className="custom_label">파일 업로드</div>
						<div className="custom_input_wrap">
							<div className="custom_input">
								{fileName}
								<input type="file" onChange={(e) => handleOnchange(e)} id="selectImg"></input>
							</div>
							<label htmlFor="selectImg" className="cutomt_btn">
								<ImgUploadIcon />
								파일 업로드
							</label>
						</div>
					</InputFile>
				</>
			) : null}

			<BtnWrap>
				<button className="em">{page === "edit" ? "수정완료" : "작성완료"}</button>
				<button className="normal">취소</button>
			</BtnWrap>
		</Wrap>
	);
};
export default StoryInputArea;
