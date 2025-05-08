import React, { useState, useEffect, useRef } from "react";
import data90s from "../data/Dataoldsong/Music90s.json";
import data80s from "../data/Dataoldsong/Music80s.json";
import styles from "./OldSongsPage.module.css";

const OldSongsPage = () => {
  const [songs80s, setSongs80s] = useState([]);
  const [songs90s, setSongs90s] = useState([]);
  const audioRefs = useRef({});

  useEffect(() => {
    setSongs80s(data80s);
    setSongs90s(data90s);
  }, []);

  const renderSongCard = (song) => (
    <div key={song.id} className={styles.songCard}>
      <img src={song.cover} alt={song.title} className={styles.songImage} />
      <p className={styles.songTitle}>{song.title}</p>
      <p className={styles.songArtist}>{song.artist}</p>
      <audio
        controls
        ref={(el) => (audioRefs.current[song.id] = el)}
        src={song.audio}
        onPlay={() => {
          Object.entries(audioRefs.current).forEach(([key, ref]) => {
            if (key !== song.id.toString() && ref) {
              ref.pause();
            }
          });
        }}
        className={styles.audioPlayer}
      />
    </div>
  );

  return (
    <div className={styles.coverWrapper}>
      <div
        className={styles.coverBackground}
        style={{ backgroundImage: "url('/images/imagesoldsong/anhnenoldsong.jpg')" }}
      >
        <div className={styles.circleImageWrapper}>
          <img src="/images/imagesoldsong/avata.jpg" alt="Old Song" className={styles.circleImage} />
        </div>
        <h1 className={styles.coverTitle}>OLD SONG</h1>
      </div>

      <div className={styles.coverFooter}><hr /></div>

      <div className={styles.musicContainer}>
        <div className={styles.musicSection}>
          <h2 className={styles.sectionTitle}>MUSIC 90S</h2>
          <div className={styles.songList}>{songs90s.map(renderSongCard)}</div>
        </div>

        <div className={styles.musicSection}>
          <h2 className={styles.sectionTitle}>MUSIC 80S</h2>
          <div className={styles.songList}>{songs80s.map(renderSongCard)}</div>
        </div>
      </div>
    </div>
  );
};

export default OldSongsPage;