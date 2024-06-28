/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlinePlayCircle } from "react-icons/md";
import { IoPauseCircleOutline } from "react-icons/io5";
import { FaForwardStep } from "react-icons/fa6";
import { FaStepBackward } from "react-icons/fa";
import { PlayerStyle } from "../styled/components/Player";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
} from "../slice/SongSlice";

interface PlayerProps {
  songUrl: string;
}

const Player: React.FC<PlayerProps> = ({ songUrl }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.song.isPlaying);
  const currentSongIndex = useSelector(
    (state: RootState) => state.song.currentSongIndex
  );
  const song = useSelector((state: RootState) => state.song.filteredSong);
  const duration = useSelector((state: RootState) => state.song.duration);
  const currentTime = useSelector((state: RootState) => state.song.currentTime);
  const [volume, setVolume] = useState(100);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const progressBar = useRef<HTMLInputElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioPlayer.current) {
      const seconds = Math.floor(audioPlayer.current.duration);
      dispatch(setDuration(seconds));
      if (progressBar.current) {
        progressBar.current.max = seconds.toString();
      }
    }
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
    dispatch,
  ]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.src = songUrl;
      if (isPlaying) {
        audioPlayer.current.play();
      }
    }
  }, [songUrl, isPlaying]);

  useEffect(() => {
    if (audioPlayer.current && song[currentSongIndex]) {
      //@ts-expect-error-error
      audioPlayer.current.src = song[currentSongIndex].songUrl;
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [currentSongIndex, song, isPlaying]);

  const calculateTime = (sec: number) => {
    if (isNaN(sec)) return "00:00";
    const minutes = Math.floor(sec / 60);
    const returnMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const second = Math.floor(sec % 60);
    const returnedSecond = second < 10 ? `0${second}` : `${second}`;
    return `${returnMinute}:${returnedSecond}`;
  };

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value);
      progressBar.current.style.setProperty(
        "--value",
        `${(Number(progressBar.current.value) / duration) * 100}%`
      );
      dispatch(setCurrentTime(Number(progressBar.current.value)));
    }
  };

  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    if (audioPlayer.current) {
      if (!isPlaying) {
        audioPlayer.current.play();
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    }
  };

  const whilePlaying = () => {
    if (audioPlayer.current && progressBar.current) {
      progressBar.current.value = audioPlayer.current.currentTime.toString();
      progressBar.current.style.setProperty(
        "--value",
        `${(Number(progressBar.current.value) / duration) * 100}%`
      );
      dispatch(setCurrentTime(audioPlayer.current.currentTime));
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const backThirthy = () => {
    if (progressBar.current) {
      progressBar.current.value = (
        Number(progressBar.current.value) - 30
      ).toString();
      changeRange();
    }
  };

  const forwardThirthy = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime += 30;
      progressBar.current.value = audioPlayer.current.currentTime.toString();
      changeRange();
    }
  };




  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolumePercentage = Number(e.target.value);
    const newVolume = newVolumePercentage / 100;
    setVolume(newVolumePercentage);
    if (audioPlayer.current) {
      audioPlayer.current.volume = newVolume;
    }
  };

  return (
    <PlayerStyle>
      <div>
        <audio ref={audioPlayer} src={songUrl} preload="metadata"></audio>
      </div>

      <button
        css={css`
          font-size: 1.5rem;
          @media (min-width: 768px) {
            font-size: 1.5rem /* 24px */;
            line-height: 2rem /* 32px */;
          }
        `}
        onClick={backThirthy}
      >
        <FaStepBackward
          css={css`
            background-color: transparent;
            color: #12be24;
            font-size: 18px;
          `}
        />
      </button>
      <button onClick={togglePlay}>
        {isPlaying ? (
          <IoPauseCircleOutline
            css={css`
              color: #12be24;
              font-size: 25px;
            `}
          />
        ) : (
          <MdOutlinePlayCircle
            css={css`
              color: #12be24;
              font-size: 25px;
            `}
          />
        )}
      </button>
      <button
        css={css`
          font-size: 0.75rem;
          @media (min-width: 768px) {
            font-size: 1.5rem /* 24px */;
            line-height: 2rem /* 32px */;
          }
        `}
        onClick={forwardThirthy}
      >
        <FaForwardStep
          css={css`
            color: #12be24;
            font-size: 18px;
          `}
        />
      </button>
     

      <div
        css={css`
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
        `}
      >
        {calculateTime(currentTime)}
      </div>
      <div
        css={css`
          width: 120px;
          display: none;
          @media (min-width: 768px) {
            width: 70%;
            display: block;
          }
        `}
      >
        <input
          ref={progressBar}
          type="range"
          css={css`
            width: 100%;
            `}
          defaultValue="0"
          onChange={changeRange}
        />
      </div>
      <div
        css={css`
          display: none;
          @media (min-width: 768px) {
            display: block;
          }
        `}
      >
        {calculateTime(duration)}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 10%;
          @media (min-width: 768px) {
            width: 70%;
          }
        `}
      >
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{volume}%</span>
      </div>
    </PlayerStyle>
  );
};

export default Player;
