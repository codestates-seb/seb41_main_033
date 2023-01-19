import axios from "axios";
import { useNavigate } from "react-router-dom";
import StoryInputArea from "../components/StoryInputArea";
import { API_URL } from "../data/apiUrl";

const ACCESS_TOKEN = localStorage.getItem("key");

const StoryWrite = () => {
	const navigate = useNavigate();
	const handleWriteSubmit = (content, file) => {
		const data = { content };
		const formData = new FormData();
		formData.append(
			"data",
			new Blob([JSON.stringify(data)], {
				type: "application/json",
			})
		);
		if (file) formData.append("file", file);

		axios
			.post(`${API_URL}/api/boards`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": `Bearer ${ACCESS_TOKEN}`,
				},
			})
			.then((res) => {
				navigate("/story");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return <StoryInputArea page="write" handleSubmit={handleWriteSubmit} />;
};
export default StoryWrite;
