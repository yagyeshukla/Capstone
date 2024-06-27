import React from "react";
import styles from "./VideoControls.module.scss";
import { FaPlay, FaExpand } from "react-icons/fa";

const VideoControls = ({ onPlayPause, onFullScreen, isPlaying }) => {
  return (
    <div className={styles.videoControls}>
      <button className={styles.button} onClick={onPlayPause}>
        <FaPlay />
      </button>
      <button className={styles.button} onClick={onFullScreen}>
        <FaExpand />
      </button>
    </div>
  );
};

export default VideoControls;
