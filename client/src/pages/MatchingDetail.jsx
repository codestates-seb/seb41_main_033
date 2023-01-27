import styled from "styled-components";
import MatchDetails from "../components/MatchDetails";
import UserCard from "../components/UserCard";
import { API_URL } from "../data/apiUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import { gameInfo } from "../redux/slice/matchInfo";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MOBILE_POINT } from "../data/breakpoint";

const Wrap = styled.div`
	display: flex;
	@media (max-width: ${MOBILE_POINT}) {
		flex-direction: column;
	}
`;

const MatchingDetail = () => {
	const [info, setInfo] = useState("");
	const { boardid } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${API_URL}/api/matches/${boardid}`)
			.then((res) => {
				setInfo(res.data.data);
				dispatch(gameInfo(res.data.data));
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{info && (
				<Wrap>
					<MatchDetails data={info} boardId={boardid} />
					<UserCard data={info} />
				</Wrap>
			)}
		</>
	);
};
export default MatchingDetail;
