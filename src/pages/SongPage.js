import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const SongPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/songs/${id}`)
      .then((res) => setSong(res.data))
      .catch((err) => {
        console.error("Failed to fetch song:", err);
        navigate("/");
      });
  }, [id, navigate]);

  if (!song) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1DB954, #191414)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "40px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <img
          src={`http://localhost:8000/${song.image}`}
          alt={song.title}
          style={{
            width: "320px",
            height: "320px",
            objectFit: "cover",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 className="fw-bold mb-1">{song.title}</h1>
          <h4 className="text-light mb-4">{song.artist}</h4>

          <audio
            controls
            style={{
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              padding: "5px",
            }}
          >
            <source
              src={`http://localhost:8000/${song.audio}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>

          <div className="mt-4 d-flex gap-3">
            <Button
              variant="light"
              href={`http://localhost:8000/${song.audio}`}
              download
            >
              🎧 Download MP3
            </Button>
            <Button variant="outline-light" onClick={() => navigate(-1)}>
              ❌ Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPage;
