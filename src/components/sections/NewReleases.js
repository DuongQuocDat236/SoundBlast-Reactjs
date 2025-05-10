import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomAudioCard from "../CustomAudioCard";

const NewReleases = ({ onPlay, currentSong }) => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/new-releases")
      .then((res) => setReleases(res.data))
      .catch((err) => console.error("Error fetching New Releases data:", err));
  }, []);

  return (
    <section id="newreleases" className="my-5 px-3">
      <h2 className="mb-4 text-center fw-bold">🎶 NEW RELEASES</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {releases.map((song) => (
          <div className="col" key={song.id}>
            <CustomAudioCard
              id={song.id}
              image={`http://localhost:8000/${song.image}`}
              title={song.title}
              artist={song.artist}
              audioSrc={`http://localhost:8000/api/stream-audio/${song.audio}`}
              onPlay={() =>
                onPlay({
                  id: song.id,
                  title: song.title,
                  artist: song.artist,
                  audioSrc: `http://localhost:8000/api/stream-audio/${song.audio}`,
                  image: `http://localhost:8000/${song.image}`,
                })
              }
              currentSong={currentSong}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
