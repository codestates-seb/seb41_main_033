import axios from "axios";
import StoryInputArea from "../components/StoryInputArea";
import { API_URL } from "../data/apiUrl";

// 이 부분은 수정되겠죠?!
const ACCESS_TOKEN = `eyJhbGciOiJIUzM4NCJ9.eyJhdXRoIjoiUk9MRV9VU0VSIiwic3ViIjoiZmlyZTkiLCJpYXQiOjE2NzM5NjY0NTAsImV4cCI6MTY3NDE4MjQ1MH0.l2L_WfBhXBBQqeQgquM74_WkdB3aAPcwc7wftO2XnmZYNQK2s6gUNoe576nJq3ME`;

const StoryWrite = () => {
	const handleWriteSubmit = (content, file) => {
		const data = { content };
		const formData = new FormData();
		formData.append(
			"data",
			new Blob([JSON.stringify(data)], {
				type: "application/json",
			})
		);
		if (file) formData.append("image", file);

		axios
			.post(`${API_URL}/api/boards`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": `Bearer ${ACCESS_TOKEN}`,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return <StoryInputArea page="write" handleSubmit={handleWriteSubmit} />;
};
export default StoryWrite;
