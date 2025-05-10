import React, { useEffect, useState } from "react";
import axios from "axios";

const TopSearchedSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/top-searched-songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching top searched songs:", err));
  }, []);

  return (
    <section id="topsearchedsongs" className="my-5 px-3">
      <h2 className="mb-4 text-center fw-bold">🔍 TOP SEARCHED</h2>

      <ul className="list-group">
        {songs.map((song) => (
          <li key={song.id} className="list-group-item">
            <strong>{song.title}</strong> – {song.artist}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopSearchedSongs;



