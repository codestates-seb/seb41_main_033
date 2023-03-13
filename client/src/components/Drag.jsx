import { useState, useEffect } from "react";
import { ReactComponent as Game } from "./../assets/mohagi.svg";
import { ReactComponent as Dead } from "./../assets/deadIcon.svg";
import styled from "styled-components";
import Confetti from "./Confetti";
import useAudio from "../hooks/useAudio";
import sound from "../assets/game.mp3";
import drum from "../assets/drum.mp3";
import heaven from "../assets/heaven.mp3";
import RandomRolling from "../components/RandomRolling";
import matchGame from "../util/matchGame";
import useAuthenticatedRequest from "../hooks/useinterceptor";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  touch-action: pan-y;
  > .dead {
    > svg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  > div {
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
  &.typing-demo {
    width: 18ch;
    margin-top: 20px;
    animation: typing 5s steps(18), blink 1s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-family: monospace;
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
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
  const [count, setCount] = useState(1);
  const [play, setPlaying] = useAudio(sound);
  const [pass, setPass] = useAudio(drum);
  const [deadSound, setDeadSound] = useAudio(heaven);
  const [recommend, setRecommend] = useState(false);
  const [gameInfo, setGameInfo] = useState("");
  const instance = useAuthenticatedRequest();

  const onDragStart = (e) => {
    if (count > 6) {
      setPass(false);
      setPlaying(false);
      setDeadSound(true);
    } else {
      setDnD({
        isDragging: true,
        dragEnd: false,
      });
      setDrag(false);
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    if (count > 6) {
      setDeadSound(true);
    } else {
      setCount(count + 1);
      setDnD({
        isDragging: true,
        ...DnD,
      });
      setDrag(false);
      setRecommend(true);
      setPass(true);
    }
  };
  const onDragLeave = (e) => {
    if (count > 7) {
      setPass(false);
      setPlaying(false);
      setDeadSound(true);
    } else {
      e.preventDefault();
      instance
        .get(`/api/games/random`)
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
    }
    setCount(count + 1);
  };

  const [tochedY, setTochedY] = useState(0);

  const onTouchStart = (e) => {
    setTochedY(e.changedTouches[0].pageY);
    if (count > 6) {
      setPlaying(false);
      setDeadSound(true);
    }
  };

  const onTouchEnd = (e) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;
    if (distanceY <= -40) {
      if (count > 7) {
        setPlaying(false);
      } else {
        instance
          .get(`/api/games/random`)
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
            }, 8000)
          );
      }
    }
    setCount(count + 2);
  };
  useEffect(() => {
    setCount(1);
    return () => {
      setDeadSound(false);
    };
  }, []);

  return (
    <>
      {count > 7 ? (
        <Wrap>
          <Icon>
            <div className="dead">
              <Dead />
            </div>
          </Icon>
          <Title className="typing-demo">이제.. 날 놓아줘...</Title>
        </Wrap>
      ) : (
        <Wrap>
          <div>{isDrag && play && <Confetti />}</div>
          <Random>
            {recommend && !DnD.dragEnd && count <= 7 && <RandomRolling />}
          </Random>
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
      )}
    </>
  );
};

export default Drag;
