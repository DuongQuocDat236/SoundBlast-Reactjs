import React, { useRef, useState } from "react";
import data from "../data/Datanewreleases/newreleases.json";
import styles from "./NewReleasesPage.module.css";

const NewReleasesPage = () => {
  const audioRef = useRef(null);
  const [currentId, setCurrentId] = useState(null);
  const [showText, setShowText] = useState(null);

  const handlePlayPause = (item) => {
    if (currentId === item.id) {
      audioRef.current.pause();
      setCurrentId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(item.audio);
      audioRef.current.play();
      setCurrentId(item.id);
      audioRef.current.onended = () => setCurrentId(null);
    }
  };

  const handleImageClick = (item) => {
    // Toggle the visibility of the text description when clicking the image
    setShowText(showText === item.id ? null : item.id);
  };

  return (
    <div className={styles.musicWrapper}>
      <h3 className={styles.sectionTitle}>NewReleasesPage 2025</h3>
      {data.map((item) => (
        <div className={`${styles.musicItem} ${showText === item.id ? styles.expanded : ""}`} key={item.id}>
          <div className={styles.left}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.cover}
              onClick={() => handleImageClick(item)} // Add click handler for the image
            />
            <div className={styles.info}>
              {showText !== item.id && (
                <>
                  <p><strong>Tên bài hát:</strong> {item.title}</p>
                  <p><strong>Tên ca sĩ:</strong> {item.artist}</p>
                  <p><strong>Xếp loại:</strong> {item.category}</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.right}>
            {showText === item.id && (
              <div className={styles.textDescription}>
                <p><strong>Mô tả:</strong> {item.text}</p>
              </div>
            )}
            <button
              className={styles.playBtn}
              onClick={() => handlePlayPause(item)}
            >
              {currentId === item.id ? "⏸️" : "▶️"}
            </button>
            <span>{item.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewReleasesPage;
