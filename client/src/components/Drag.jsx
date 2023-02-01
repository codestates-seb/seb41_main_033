import { useState } from "react";
import { ReactComponent as Game } from "./../assets/mohagi.svg";
import styled from "styled-components";
import Confetti from "./Confetti";
import useAudio from "../hooks/useAudio";
import sound from "../assets/game.mp3";
import drum from "../assets/drum.mp3";
import RandomRolling from "../components/RandomRolling";
import axios from "axios";
import matchGame from "../util/matchGame";
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  cursor: pointer;
  touch-action: pan-y;
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
  a {
    position: relative;
    animation: fadeInUp 2s;
    text-decoration: underline;
    text-underline-offset: 8px;
  }
  a:hover {
    color: var(--yellow);
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        transform: translateZ(0);
      }
    }
  }
`;
const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
`;
const GameImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/games/random`)
      .then((res) => {
        setGameInfo(res.data.data);
        setDrag(true);
        setRecommend(false);
        setPlaying(true);
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

  const [tochedY, setTochedY] = useState(0);
  const onTouchStart = (e) => {
    setTochedY(e.changedTouches[0].pageY);
  };

  const onTouchEnd = (e) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;
    if (distanceY <= -40) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/games/random`)
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
            setPlaying(false);
          }, 10000)
        );
    }
  };

  return (
    <Wrap>
      <div>{isDrag && play && <Confetti />}</div>
      <Random>{recommend && !DnD.dragEnd && <RandomRolling />}</Random>
      <Icon
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div>{!DnD.dragEnd && !recommend && <Game />}</div>
      </Icon>
      {DnD.dragEnd && (
        <ImgBox>
          <GameImg src={matchGame(gameInfo).image} alt="게임아이콘" />
        </ImgBox>
      )}
      {DnD.dragEnd && (
        <Title>
          <a href={matchGame(gameInfo).url} target="blank">
            {gameInfo.korTitle} 고 ?
          </a>
        </Title>
      )}
      {!DnD.dragEnd && <Title>오늘 뭐가땡기지</Title>}
    </Wrap>
  );
};

export default Drag;
