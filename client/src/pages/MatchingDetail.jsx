import styled from "styled-components";
import MatchDetails from "../components/MatchDetails";
import UserCard from "../components/UserCard";
import { API_URL } from "../data/apiUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Wrap = styled.div`
  display: flex;
`;

const MatchingDetail = () => {
  const [info, setInfo] = useState("");

  const { boarId } = useParams();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/matches/${boarId}`, {

        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => setInfo(res?.data.data));
  }, []);

  return (
    <Wrap>

      <MatchDetails data={info} boarId={boarId} />

      <UserCard data={info} />
    </Wrap>
  );
};
export default MatchingDetail;
