import React, { useRef, useState, useEffect } from 'react';
import styles from './LanguagesPage.module.css';
import songsData from '../data/languagespage.json';

const LanguagesPage = () => {
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (song) => {
    if (playingId === song.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setPlayingId(song.id);
    }
  };

  useEffect(() => {
    return () => {
      // Tắt nhạc khi rời trang
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  const heroSong = songsData[0];
  const categories = ['Trung', 'Han', 'Nhat', 'US'];
  const getSongsByCountry = (country) =>
    songsData.filter((song) => song.country === country).slice(0, 4);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src={heroSong.image} alt={heroSong.title} className={styles.heroImage} />
          <div className={styles.heroInfo}>
            <h2>{heroSong.title}</h2>
            <p>{heroSong.artist}</p>
            <audio controls src={heroSong.audio} className={styles.audio}></audio>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        {[0, 1].map((rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {categories.slice(rowIdx * 2, rowIdx * 2 + 2).map((country) => (
              <div key={country} className={styles.column}>
                <h3 className={styles.categoryTitle}>See what's new in {country}</h3>
                {getSongsByCountry(country).map((song) => (
                  <div key={song.id} className={styles.songCard}>
                    <img src={song.image} alt={song.title} className={styles.songImage} />
                    <div className={styles.songInfo}>
                      <p className={styles.title}>{song.title}</p>
                      <p className={styles.artist}>{song.artist}</p>
                    </div>

                    <button
                      className={`${styles.playButton} ${playingId === song.id ? styles.pause : styles.play}`}
                      onClick={() => handlePlayPause(song)}
                    >
                      {playingId === song.id ? '⏸' : '▶️'}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default LanguagesPage;
