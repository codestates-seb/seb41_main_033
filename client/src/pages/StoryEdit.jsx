import styled from "styled-components";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiUrl";
import axios from "axios";
import PostPatch from "../components/PostPatch";

const TextArea = styled.div`
	margin: 24px 0 16px 0;
`;

const StoryEdit = () => {
	const [userData, setUserData] = useState({});
	const [content, setContent] = useState("");
	useEffect(() => {
		axios
			.get(`${API_URL}/api/members/${localStorage.getItem("memberId")}`)
			.then((res) => {
				setUserData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//입력
	const handleContentOnChange = (e) => {
		setContent(e.currentTarget.value);
	};
	//제출
	const handleStoryEditSubmit = () => {
		console.log("스토리 수정 버튼 클릭");
	};

	return (
		<PostPatch
			image={userData.profileImage}
			nickname={userData.nickname}
			identifier={userData.identifier}
			button1="수정완료"
			button2="취소"
			link={-1}
			handleSubmit={handleStoryEditSubmit}
		>
			<TextArea>
				<label>내용</label>
				<textarea
					placeholder="스토리 내용만 수정만 가능합니다"
					onChange={(e) => handleContentOnChange(e)}
				></textarea>
			</TextArea>
		</PostPatch>
	);
};
export default StoryEdit;
