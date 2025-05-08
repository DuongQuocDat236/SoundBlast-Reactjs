import React, { useState, useRef } from 'react';
import favourite from "../data/Datatopartists/favourite.json";
import hotsearch from "../data/Datatopartists/hotsearch.json";
import latest from "../data/Datatopartists/Latest.json";
import searchhits from "../data/Datatopartists/Searchhits.json";
import styles from './TopArtistsPage.module.css';

const Section = ({ title, data, onPlay, currentAudio, audioRefs, progresses, durations }) => (
  <div className={styles.section}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.cardsContainer}>
      {data.map(item => (
        <div key={item.id} className={styles.card}>
          <button
            className={styles.cardButton}
            onClick={() => onPlay(item)}
          >
            <img src={item.image} alt={item.title} className={styles.cardImage} />
            <p className={styles.cardTitle}>{item.title}</p>
          </button>
          {currentAudio === item.audio && (
            <div className={styles.cardProgressContainer}>
              <input
                type="range"
                min="0"
                max="100"
                value={progresses[item.audio] || 0}
                onChange={(e) => {
                  const newProgress = e.target.value;
                  const newTime = (newProgress / 100) * (durations[item.audio] || 0);
                  audioRefs.current[item.audio].currentTime = newTime;
                }}
                className={styles.cardProgressBar}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const TopArtistsPage = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progresses, setProgresses] = useState({});
  const [durations, setDurations] = useState({});
  const audioRefs = useRef({});

  const handlePlay = (item) => {
    const audioSrc = item.audio;

    if (currentAudio && currentAudio !== audioSrc && audioRefs.current[currentAudio]) {
      audioRefs.current[currentAudio].pause();
      audioRefs.current[currentAudio].currentTime = 0;
    }

    if (currentAudio === audioSrc && audioRefs.current[audioSrc]) {
      audioRefs.current[audioSrc].currentTime = 0;
    }

    setCurrentAudio(audioSrc);
    setCurrentSong({ title: item.title, artist: item.artist, image: item.image });
    setIsPlaying(true);
    setProgresses((prev) => ({ ...prev, [audioSrc]: 0 }));

    if (audioRefs.current[audioSrc]) {
      audioRefs.current[audioSrc].play();
    }
  };

  const togglePlayPause = (audioSrc) => {
    if (isPlaying) {
      audioRefs.current[audioSrc].pause();
    } else {
      audioRefs.current[audioSrc].play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (audioSrc) => {
    const audio = audioRefs.current[audioSrc];
    if (audio) {
      const current = audio.currentTime;
      const dur = audio.duration;
      setProgresses((prev) => ({ ...prev, [audioSrc]: (current / dur) * 100 }));
      setDurations((prev) => ({ ...prev, [audioSrc]: dur }));
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className={styles.topArtistsPage}>
      <h1 className={styles.mainTitle}>Top ca sĩ</h1>

      <Section title="Hot Search" data={hotsearch} {...{ onPlay: handlePlay, currentAudio, audioRefs, progresses, durations }} />
      <Section title="Yêu thích" data={favourite} {...{ onPlay: handlePlay, currentAudio, audioRefs, progresses, durations }} />
      <Section title="Mới nhất" data={latest} {...{ onPlay: handlePlay, currentAudio, audioRefs, progresses, durations }} />
      <Section title="Lượt tìm kiếm" data={searchhits} {...{ onPlay: handlePlay, currentAudio, audioRefs, progresses, durations }} />

      {currentAudio && (
        <div className={styles.audioPlayerContainer}>
          <audio
            ref={(el) => (audioRefs.current[currentAudio] = el)}
            src={currentAudio}
            onTimeUpdate={() => handleTimeUpdate(currentAudio)}
            onLoadedMetadata={() => {
              const dur = audioRefs.current[currentAudio].duration;
              setDurations((prev) => ({ ...prev, [currentAudio]: dur }));
            }}
            onEnded={() => setIsPlaying(false)}
          />
          <div className={styles.audioControls}>
            {currentSong?.image && (
              <img src={currentSong.image} alt={currentSong.title} className={styles.songThumbnail} />
            )}
            <div className={styles.songInfo}>
              <span className={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</span>
              <span className={styles.songArtist}>{currentSong?.artist || 'Unknown Artist'}</span>
            </div>
            <button onClick={() => togglePlayPause(currentAudio)} className={styles.playPauseButton}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <div className={styles.progressContainer}>
              <span className={styles.time}>
                {formatTime((progresses[currentAudio] / 100) * (durations[currentAudio] || 0))}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progresses[currentAudio] || 0}
                onChange={(e) => {
                  const newProgress = e.target.value;
                  const newTime = (newProgress / 100) * (durations[currentAudio] || 0);
                  audioRefs.current[currentAudio].currentTime = newTime;
                }}
                className={styles.progressBar}
              />
              <span className={styles.time}>
                {formatTime(durations[currentAudio] || 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtistsPage;
