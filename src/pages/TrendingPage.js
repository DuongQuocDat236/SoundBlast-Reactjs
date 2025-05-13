import React, { useRef, useState } from "react";
import styles from "./TrendingPage.module.css";
import { FaPlay, FaPause } from "react-icons/fa";

import hotNhacVietData from "../data/Datatrending/Hotnhacviet.json";
import nhacAuMyData from "../data/Datatrending/Nhacaumy.json";
import topNhacAuMyData from "../data/Datatrending/Topnhacaumy.json";
import topNhacVietData from "../data/Datatrending/Topnhacviet.json";

const TrendingPage = () => {
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  const handlePlay = (id) => {
    const currentAudio = audioRefs.current[id];

    if (playingId && playingId !== id) {
      const prevAudio = audioRefs.current[playingId];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    if (currentAudio?.paused) {
      currentAudio.play();
      setPlayingId(id);
    } else {
      currentAudio.pause();
      setPlayingId(null);
    }
  };

  const handleTimeUpdate = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      const currentTime = Math.floor(audio.currentTime);
      const progressBars = document.querySelectorAll(`[data-progress="${id}"]`);
      progressBars.forEach((bar) => {
        const progress = (currentTime / (audio.duration || 1)) * 100;
        bar.style.width = `${progress}%`;
      });
    }
  };

  const handleProgressClick = (e, id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percent * audio.duration;
    }
  };

  const handleRewind = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const formatTime = (sec = 0) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderAudioPlayer = (item) => (
    <div className={styles.audioContainer}>
      <button
        onClick={() => handlePlay(item.id)}
        className={styles.playButton}
        aria-label={playingId === item.id ? "Pause" : "Play"}
      >
        {playingId === item.id ? <FaPause /> : <FaPlay />}
      </button>
      <div className={styles.trackInfo}>{item.title}</div>
      <div className={styles.time}>
        <span>{formatTime(audioRefs.current[item.id]?.currentTime || 0)}</span>
        <span>{formatTime(item.duration || 0)}</span>
      </div>
      <div
        className={styles.progressBar}
        onClick={(e) => handleProgressClick(e, item.id)}
      >
        <div
          className={styles.progress}
          data-progress={item.id}
          style={{
            width: `${
              audioRefs.current[item.id]?.currentTime &&
              audioRefs.current[item.id].duration
                ? (audioRefs.current[item.id].currentTime /
                    audioRefs.current[item.id].duration) * 100
                : 0
            }%`,
          }}
        />
      </div>
      <button
        onClick={() => handleRewind(item.id)}
        className={styles.rewindButton}
        aria-label="Rewind 10 seconds"
      >
        &lt;
      </button>
      <audio
        ref={(el) => (audioRefs.current[item.id] = el)}
        src={`/${item.audio}`}
        onTimeUpdate={() => handleTimeUpdate(item.id)}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.albumCol}`}>
          <div className={styles.topMusicContainer}>
            <h3 className={styles.sectionTitle}>Trending now</h3>
            <h4 className={styles.subTitle}>Top nhạc Việt Nam</h4>
            <div className={styles.albumList}>
              {hotNhacVietData.map((item) => (
                <div className={styles.albumItem} key={item.id}>
                  <img src={`/${item.cover}`} alt={item.title} />
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.artist}>{item.artist}</p>
                  {renderAudioPlayer(item)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.col} ${styles.listCol}`}>
          <div className={styles.hotSongsContainer}>
            <h2 className={styles.sectionTitle}>Hot Song's</h2>
            <div className={styles.hotSongsGrid}>
              {topNhacVietData.map((song) => (
                <div className={styles.songItem} key={song.id}>
                  <div className={styles.songContent}>
                    <img
                      src={`/${song.cover}`}
                      alt={song.title}
                      className={styles.songCover}
                    />
                    <div className={styles.songInfo}>
                      <h4 className={styles.songTitle}>{song.title}</h4>
                      <p className={styles.songArtist}>{song.artist}</p>
                    </div>
                  </div>
                  {renderAudioPlayer(song)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.col} ${styles.albumCol}`}>
          <div className={styles.topMusicContainer}>
            <h3 className={styles.sectionTitle}>Hot Song's</h3>
            <div className={styles.albumList}>
              {topNhacAuMyData.map((item) => (
                <div className={styles.albumItem} key={item.id}>
                  <img src={`/${item.cover}`} alt={item.title} />
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.artist}>{item.artist}</p>
                  {renderAudioPlayer(item)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.col} ${styles.listCol}`}>
          <div className={styles.hotSongsContainer}>
            <h2 className={styles.sectionTitle}>Hot Song's</h2>
            <div className={styles.hotSongsGrid}>
              {nhacAuMyData.map((song) => (
                <div className={styles.songItem} key={song.id}>
                  <div className={styles.songContent}>
                    <img
                      src={`/${song.cover}`}
                      alt={song.title}
                      className={styles.songCover}
                    />
                    <div className={styles.songInfo}>
                      <h4 className={styles.songTitle}>{song.title}</h4>
                      <p className={styles.songArtist}>{song.artist}</p>
                    </div>
                  </div>
                  {renderAudioPlayer(song)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
