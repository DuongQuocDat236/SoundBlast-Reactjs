import React, { useRef, useState } from "react";
import styles from "./TrendingPage.module.css";
import { FaPlay, FaPause } from "react-icons/fa";

import hotNhacVietData from "../data/Datatrending/Hotnhacviet.json";
import nhacAuMyData from "../data/Datatrending/Nhacaumy.json";
import topNhacAuMyData from "../data/Datatrending/Topnhacaumy.json";
import topNhacVietData from "../data/Datatrending/Topnhacviet.json";

const TrendingPage = () => {
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRefs = {};

  const handlePlay = (id) => {
    if (activeAudio && activeAudio !== id) {
      audioRefs[activeAudio]?.pause();
      audioRefs[activeAudio].currentTime = 0;
    }
    if (audioRefs[id] && !audioRefs[id].paused) {
      audioRefs[id].pause();
    } else if (audioRefs[id]) {
      audioRefs[id].play();
    }
    setActiveAudio(audioRefs[id]?.paused ? null : id);
  };

  const handleTimeUpdate = (id) => {
    if (audioRefs[id]) {
      const currentTime = Math.floor(audioRefs[id].currentTime);
      const progressBars = document.querySelectorAll(`[data-progress="${id}"]`);
      progressBars.forEach((bar) => {
        const progress = (currentTime / (audioRefs[id].duration || 1)) * 100;
        bar.style.width = `${progress}%`;
      });
    }
  };

  const handleProgressClick = (e, id) => {
    if (audioRefs[id]) {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRefs[id].currentTime = percent * audioRefs[id].duration;
    }
  };

  const handleRewind = (id) => {
    if (audioRefs[id]) {
      audioRefs[id].currentTime = Math.max(0, audioRefs[id].currentTime - 10);
    }
  };

  const formatTime = (sec = 0) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.albumCol}`}>
          <div className={styles.topMusicContainer}>
            <h3 className={styles.sectionTitle}>Trending now</h3>
            <h4 className={styles.subTitle}>Top nhạc Việt</h4>
            <div className={styles.albumList}>
              {hotNhacVietData.map((item) => (
                <div className={styles.albumItem} key={item.id}>
                  <img src={`/${item.cover}`} alt={item.title} />
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.artist}>{item.artist}</p>
                  <div className={styles.audioContainer}>
                    <button
                      onClick={() => handlePlay(item.id)}
                      className={styles.playButton}
                      aria-label={
                        audioRefs[item.id]?.paused ? "Play" : "Pause"
                      }
                    >
                      {audioRefs[item.id]?.paused ? (
                        <FaPlay />
                      ) : (
                        <FaPause />
                      )}
                    </button>
                    <div className={styles.trackInfo}>{item.time }</div>
                    <div className={styles.time}>
                      <span>
                        {formatTime(
                          audioRefs[item.id]?.currentTime || 0
                        )}
                      </span>
                      <span>
                        {formatTime(item.duration || 0)}
                      </span>
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
                            audioRefs[item.id]?.currentTime &&
                            audioRefs[item.id].duration
                              ? (audioRefs[item.id].currentTime /
                                  audioRefs[item.id].duration) *
                                100
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
                      ref={(el) => (audioRefs[item.id] = el)}
                      src={`/${item.audio}`}
                      onTimeUpdate={() => handleTimeUpdate(item.id)}
                    />
                  </div>
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
                  <div className={styles.audioContainer}>
                    <button
                      onClick={() => handlePlay(song.id)}
                      className={styles.playButton}
                      aria-label={
                        audioRefs[song.id]?.paused ? "Play" : "Pause"
                      }
                    >
                      {audioRefs[song.id]?.paused ? (
                        <FaPlay />
                      ) : (
                        <FaPause />
                      )}
                    </button>
                    <div className={styles.trackInfo}>{song.title}</div>
                    <div className={styles.time}>
                      <span>
                        {formatTime(
                          audioRefs[song.id]?.currentTime || 0
                        )}
                      </span>
                      <span>{formatTime(song.duration || 0)}</span>
                    </div>
                    <div
                      className={styles.progressBar}
                      onClick={(e) => handleProgressClick(e, song.id)}
                    >
                      <div
                        className={styles.progress}
                        data-progress={song.id}
                        style={{
                          width: `${
                            audioRefs[song.id]?.currentTime &&
                            audioRefs[song.id].duration
                              ? (audioRefs[song.id].currentTime /
                                  audioRefs[song.id].duration) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleRewind(song.id)}
                      className={styles.rewindButton}
                      aria-label="Rewind 10 seconds"
                    >
                      &lt;
                    </button>
                    <audio
                      ref={(el) => (audioRefs[song.id] = el)}
                      src={`/${song.audio}`}
                      onTimeUpdate={() => handleTimeUpdate(song.id)}
                    />
                  </div>
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
                  <div className={styles.audioContainer}>
                    <button
                      onClick={() => handlePlay(item.id)}
                      className={styles.playButton}
                      aria-label={
                        audioRefs[item.id]?.paused ? "Play" : "Pause"
                      }
                    >
                      {audioRefs[item.id]?.paused ? (
                        <FaPlay />
                      ) : (
                        <FaPause />
                      )}
                    </button>
                    <div className={styles.trackInfo}>{item.time}</div>
                    <div className={styles.time}>
                      <span>
                        {formatTime(
                          audioRefs[item.id]?.currentTime || 0
                        )}
                      </span>
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
                            audioRefs[item.id]?.currentTime &&
                            audioRefs[item.id].duration
                              ? (audioRefs[item.id].currentTime /
                                  audioRefs[item.id].duration) *
                                100
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
                      ref={(el) => (audioRefs[item.id] = el)}
                      src={`/${item.audio}`}
                      onTimeUpdate={() => handleTimeUpdate(item.id)}
                    />
                  </div>
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
                  <div className={styles.audioContainer}>
                    <button
                      onClick={() => handlePlay(song.id)}
                      className={styles.playButton}
                      aria-label={
                        audioRefs[song.id]?.paused ? "Play" : "Pause"
                      }
                    >
                      {audioRefs[song.id]?.paused ? (
                        <FaPlay />
                      ) : (
                        <FaPause />
                      )}
                    </button>
                    <div className={styles.trackInfo}>{song.title}</div>
                    <div className={styles.time}>
                      <span>
                        {formatTime(
                          audioRefs[song.id]?.currentTime || 0
                        )}
                      </span>
                      <span>{formatTime(song.duration || 0)}</span>
                    </div>
                    <div
                      className={styles.progressBar}
                      onClick={(e) => handleProgressClick(e, song.id)}
                    >
                      <div
                        className={styles.progress}
                        data-progress={song.id}
                        style={{
                          width: `${
                            audioRefs[song.id]?.currentTime &&
                            audioRefs[song.id].duration
                              ? (audioRefs[song.id].currentTime /
                                  audioRefs[song.id].duration) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleRewind(song.id)}
                      className={styles.rewindButton}
                      aria-label="Rewind 10 seconds"
                    >
                      &lt;
                    </button>
                    <audio
                      ref={(el) => (audioRefs[song.id] = el)}
                      src={`/${song.audio}`}
                      onTimeUpdate={() => handleTimeUpdate(song.id)}
                    />
                  </div>
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