import { useState } from "react";
import { ReactComponent as Game } from "./../assets/mohagi.svg";
import styled from "styled-components";
import Animation from "../util/Animation";
import useAudio from "../hooks/useAudio";
import sound from "../assets/game.mp3";
import drum from "../assets/drum.mp3";
import RandomRolling from "../components/RandomRolling";

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
const Drag = () => {
  const [DnD, setDnD] = useState({ draggedTo: null, isDragging: false });
  const [isDrag, setDrag] = useState(false);
  const [play, setPlaying] = useAudio(sound);
  const [pass, setPass] = useAudio(drum);
  const [recommend, setRecommend] = useState(false);
  const onDragStart = (e) => {
    setDnD({
      ...DnD,
      isDragging: true,
    });
    setDrag(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    setDnD({
      isDragging: true,
      draggedTo: "중간지점",
    });
    setDrag(false);
    setRecommend(true);
    setPass(true);
  };
  const onDragLeave = (e) => {
    setPlaying(true);
    setDrag(true);
    setRecommend(false);
    setPass(false);
    setDnD({
      isDragging: false,
      draggedTo: "끝",
    });
  };

  return (
    <div>
      <Random>{recommend && <RandomRolling />}</Random>
      <Icon
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragLeave}
      >
        <div>{!recommend && <Game />}</div>

        <div>{isDrag && play && <Animation />}</div>
      </Icon>
    </div>
  );
};
export default Drag;
