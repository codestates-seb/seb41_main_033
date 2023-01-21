import styled from "styled-components";
import SearchBar from "./../components/SearchBar";
import StorySingle from "../components/StorySingle";
import WriteFloatButton from "../components/WriteFloatButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../data/apiUrl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TitleWrap = styled.div`
	display: flex;
	margin-bottom: 32px;
	h3 {
		margin-right: 24px;
		letter-spacing: -0.5px;
		font-size: var(--font-head2-size);
	}
	h3.active {
		font-weight: var(--font-weight-medium);
		color: var(--primary-color);
	}
`;

const StoryBoardWrap = styled.div`
	margin-top: 48px;
	> div {
		margin-bottom: 24px;
	}
`;

const Story = () => {
	const { accessToken } = useSelector((state) => state.islogin.login);
	const navigate = useNavigate();
	const [storyData, setStoryData] = useState([]);
	useEffect(() => {
		axios
			.get(`${API_URL}/api/boards?page=1`, {
				// headers: {
				// 	// "ngrok-skip-browser-warning": "69420",
				// 	Authorization: `Bearer ${ACCESS_TOKEN}`,
				// },
			})
			.then((res) => {
				setStoryData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const handleWriteFBtnOnClick = () => {
		navigate(`/storywrite`);
	};
	return (
		<div>
			<TitleWrap>
				<h3 className="active">모두의 스토리</h3>
				<h3>친구의 스토리</h3>
			</TitleWrap>
			<SearchBar />
			<StoryBoardWrap>
				{storyData?.map((el) => {
					return <StorySingle key={el.id} data={el} />;
				})}
			</StoryBoardWrap>
			<WriteFloatButton click={handleWriteFBtnOnClick} />
		</div>
	);
};
export default Story;
