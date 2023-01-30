import { useRef, useState } from 'react';
import styled from 'styled-components';
import { MOBILE_POINT } from '../data/breakpoint';

const Background = styled.div`
  position: fixed;
  width: fit-content;
  margin: 0 auto;
  left: 200px;
  right: 0;
  bottom: 24px;
  .music-container {
    background: var(--bg-card-color);
    border-radius: var(--border-radius-lg);
    box-shadow: 0px 6px 10px 4px rgb(0 0 0 / 15%), 0px 2px 3px rgb(0 0 0 / 30%);
    display: flex;
    padding: 16px 32px;
    position: relative;
    z-index: 10;
  }
  .music-info {
    background: var(--input-color);
    border-radius: 16px 16px 0 0;
    position: absolute;
    top: 0;
    left: 16px;
    width: calc(100% - 32px);
    padding: 8px 8px 8px 120px;
    opacity: 0;
    transform: translateY(0%);
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  }
  #title {
    font-size: 12px;
  }
  .music-container.play img {
    animation-play-state: running;
  }
  .music-container.play .music-info {
    opacity: 1;
    transform: translateY(-100%);
  }
  @media (max-width: ${MOBILE_POINT}) {
    left: 0;
    bottom: 80px;
  }
`;

const ProgressWrap = styled.div`
  background: var(--font-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  margin: 8px 0;
  height: 4px;
  width: 100%;
  .progress {
    background: var(--primary-color);
    border-radius: var(--border-radius-sm);
    height: 100%;
    width: 0%;
    transition: width 0.1s linear;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  width: 80px;
  ::after {
    content: '';
    background: var(--bg-card-color);
    height: 20px;
    width: 20px;
    position: absolute;
    left: 50%;
    bottom: 50%;
    border-radius: 50%;
    transform: translate(-50%, -15%);
  }
  img {
    width: inherit;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    bottom: 0;
    animation: rotate 3s linear infinite;
    animation-play-state: paused;
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

const NavWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .action-btn {
    color: var(--font-color);
    width: 48px;
    font-size: 24px;
    cursor: pointer;
    padding: 12px;
    margin: 0 24px;
    :focus {
      outline: 0;
    }
  }
`;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const progressRef = useRef();

  const handleUpdateProgress = (e) => {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressRef.current.style.width = `${progressPercent}%`;
  };

  const handleSong = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.4;
    }
  };

  const handleEndSong = () => {
    audioRef.current.play();
    audioRef.current.volume = 0.4;
  };

  return (
    <Background>
      <div className={'music-container ' + (isPlaying ? 'play' : null)}>
        <div className="music-info">
          <div id="title">Curtain Call</div>
          <ProgressWrap>
            <div className="progress" ref={progressRef} />
          </ProgressWrap>
        </div>
        <audio
          id="audio"
          src="music/curtainCall.mp3"
          ref={audioRef}
          onTimeUpdate={handleUpdateProgress}
          onEnded={handleEndSong}
        />
        <ImgWrap>
          <img id="cover" src="images/myVoice.jpeg" alt="music cover" />
        </ImgWrap>
        <NavWrap>
          <button id="play" className="action-btn" onClick={handleSong}>
            <i className={'fas ' + (isPlaying ? 'fa-pause' : 'fa-play')} />
          </button>
        </NavWrap>
      </div>
    </Background>
  );
};

export default MusicPlayer;
