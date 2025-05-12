import React, { useEffect, useState } from "react";
import axios from "axios";

const OldSongs = ({ onPlay }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/old-songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching old songs:", err));
  }, []);

  const handlePlay = (song) => {
    if (onPlay) onPlay(song); // Gửi bài hát lên BottomMusicPlayer
  };

  return (
    <section id="oldsongs" className="my-5 px-3">
      <h2 className="mb-4 fw-bold text-center">🎼 OLD SONGS</h2>
      <ul className="list-group">
        {songs.map((song, index) => (
          <li
            key={song.id}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            onClick={() => handlePlay(song)}
          >
            <p className="mb-1 fw-semibold small">
              {index + 1}. {song.title}
            </p>
            <p className="mb-0 text-muted small">{song.artist}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OldSongs;
