import React, { useState, useEffect, useRef } from "react"; 
import { useParams } from "react-router-dom";
import songsData from "../data/Datagenres/song.json";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "./GenreDetailPage.css";

const GenreDetailPage = () => {
    const { genreName } = useParams();
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(new Audio());
  
    useEffect(() => {
      const genreData = songsData.find((data) => data.genre === genreName);
      if (genreData) {
        setSongs(genreData.songs);
      }
    }, [genreName]);
  
    useEffect(() => {
      const audio = audioRef.current;
      return () => {
        audio.pause();
        audio.src = "";
        setCurrentSong(null);
      };
    }, []);
  
    const handlePlayPause = (song) => {
      if (currentSong?.title === song.title) {
        audioRef.current.pause();
        setCurrentSong(null);
      } else {
        audioRef.current.pause();
        audioRef.current.src = song.audio;
        audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
        setCurrentSong(song);
      }
    };
  
    const playAll = () => {
      let currentIndex = 0;
      const playNext = () => {
        if (currentIndex < songs.length) {
          audioRef.current.pause();
          audioRef.current.src = songs[currentIndex].audio;
          audioRef.current
            .play()
            .then(() => {
              setCurrentSong(songs[currentIndex]);
            })
            .catch((err) => console.error("Error playing audio:", err));
          audioRef.current.onended = () => {
            currentIndex++;
            playNext();
          };
        } else {
          setCurrentSong(null); // Đặt lại khi hết danh sách
        }
      };
      playNext();
    };
  
    return (
      <div className="genre-detail-page">
        <div className="genre-header">
          <Container>
            <Row className="align-items-center">
              <Col md={3}>
                <img
                  src={songs.length > 0 ? songs[0].image : "/images/placeholder.jpg"}
                  alt={genreName}
                  className="genre-header-image"
                />
              </Col>
              <Col md={9}>
                <h1 className="genre-title">{genreName}</h1>
                <p className="genre-description">
                  Explore the best {genreName} songs from various artists.
                </p>
                <Button variant="primary" className="play-all-btn mt-3" onClick={playAll}>
                  Play All
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="py-4">
          <Table borderless className="songs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={index} className="song-row">
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={song.image} alt={song.title} className="song-image me-3" />
                      <span>{song.title}</span>
                    </div>
                  </td>
                  <td>{song.artist}</td>
                  <td>{song.duration}</td>
                  <td>
                    <Button
                      variant="link"
                      className="play-button"
                      onClick={() => handlePlayPause(song)}
                    >
                      <i
                        className={
                          currentSong?.title === song.title
                            ? "bi bi-pause-fill"
                            : "bi bi-play-fill"
                        }
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  };
  
  export default GenreDetailPage;