import { useState } from "react";
import { ReactComponent as Game } from "./../assets/mohagi.svg";
import styled from "styled-components";
import Confetti from "./Confetti";
import useAudio from "../hooks/useAudio";
import sound from "../assets/game.mp3";
import drum from "../assets/drum.mp3";
import RandomRolling from "../components/RandomRolling";
import axios from "axios";
import { API_URL } from "../data/apiUrl";
import matchGame from "../util/matchGame";
const Icon = styled.div`
  div {
    animation: vibration 0.4s infinite;
    transition: 1s;
  }
  @keyframes vibration {
    from {
      transform: rotate(5deg);
    }
    to {
      transform: rotate(-5deg);
    }
  }
`;
const Random = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.div`
  font-size: var(--font-head2-size);
  text-align: center;
  margin-top: 20px;
`;
const GameImg = styled.img`
  width: 100%;
  height: 100%;
`;
const Drag = () => {
  const [DnD, setDnD] = useState({ dragEnd: false, isDragging: false });
  const [isDrag, setDrag] = useState(false);
  const [play, setPlaying] = useAudio(sound);
  const [pass, setPass] = useAudio(drum);
  const [recommend, setRecommend] = useState(false);
  const [gameInfo, setGameInfo] = useState("");
  const onDragStart = (e) => {
    setDnD({
      isDragging: true,
      dragEnd: false,
    });
    setDrag(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    setDnD({
      isDragging: true,
      ...DnD,
    });
    setDrag(false);
    setRecommend(true);
    setPass(true);
  };
  const onDragLeave = (e) => {
    axios
      .get(`${API_URL}/api/games/random`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => {
        setGameInfo(res.data.data);
        setPlaying(true);
        setDrag(true);
        setRecommend(false);
        setPass(false);
        setDnD({
          isDragging: false,
          dragEnd: true,
        });
      })
      .then(
        setTimeout(() => {
          setDnD({
            isDragging: false,
            dragEnd: false,
          });
        }, 5000)
      );
  };

  return (
    <div>
      <div>{isDrag && play && <Confetti />}</div>
      <Random>{recommend && !DnD.dragEnd && <RandomRolling />}</Random>
      <Icon
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragLeave}
      >
        <div>{!DnD.dragEnd && !recommend && <Game />}</div>
      </Icon>
      {DnD.dragEnd && (
        <GameImg src={matchGame(gameInfo)?.image} alt="게임아이콘" />
      )}
      <div></div>
      {DnD.dragEnd && <Title>{gameInfo.korTitle}</Title>}
      {!DnD.dragEnd && <Title>오늘 뭐가땡기지</Title>}
    </div>
  );
};

export default Drag;
