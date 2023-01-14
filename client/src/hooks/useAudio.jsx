import { useState, useEffect, useMemo } from "react";

const useAudio = (url) => {
  const sound = useMemo(() => new Audio(url), [url]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? sound.play() : sound.pause();
  }, [playing, sound]);

  useEffect(() => {
    sound.addEventListener("ended", () => setPlaying(false));
    return () => {
      sound.removeEventListener("ended", () => setPlaying(false));
    };
  }, [sound]);

  return [playing, setPlaying];
};

export default useAudio;
