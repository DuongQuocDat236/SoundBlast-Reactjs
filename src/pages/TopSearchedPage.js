import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Dropdown } from "react-bootstrap";

const TopSearchedPage = () => {
  const [songs, setSongs] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    // Mock data for Top Searched Songs with additional details
    const mockSongs = [
      { id: 1, title: "Shape of You", artist: "Ed Sheeran", image: "/images/imagestopsearchedsong/searched1.png", youtubeId: "JGwWNGJdvx8" },
      { id: 2, title: "Blinding Lights", artist: "The Weeknd", image: "/images/imagestopsearchedsong/searched2.png", youtubeId: "4NRXx6U8ABQ" },
      { id: 3, title: "Dance Monkey", artist: "Tones and I", image: "/images/imagestopsearchedsong/searched3.png", youtubeId: "q0hyYWKXF0Q" },
      { id: 4, title: "Someone Like You", artist: "Adele", image: "/images/imagestopsearchedsong/searched4.png", youtubeId: "hLQl3WQQoQ0" },
      { id: 5, title: "Perfect", artist: "Ed Sheeran", image: "/images/imagestopsearchedsong/searched1.png", youtubeId: "2Vv-BfVoq4g" },
      { id: 6, title: "Until I Met You", artist: "Ava Cornish", image: "/images/imagestopsearchedsong/searched2.png", youtubeId: "randomId1" },
      { id: 7, title: "Walking Promises", artist: "Ava Cornish", image: "/images/imagestopsearchedsong/searched3.png", youtubeId: "randomId2" },
      { id: 8, title: "Gimme Some Courage", artist: "Ava Cornish", image: "/images/imagestopsearchedsong/searched4.png", youtubeId: "randomId3" },
      { id: 9, title: "Rolling in the Deep", artist: "Adele", image: "/images/imagestopsearchedsong/searched1.png", youtubeId: "hLQl3WQQoQ0" },
    ];
    setSongs(mockSongs);
  }, []);

  const handleImageClick = (youtubeId) => {
    setSelectedVideo(youtubeId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const topSong = songs[1];
  const top2to5 = songs.slice(1, 5);
  const top6to9 = songs.slice(5, 9);

  if (songs.length === 0) {
    return <div>Loading...</div>;
  }

  const songDetails = {
    1: { artist: "Ed Sheeran", age: 34, gender: "Male", genre: "Pop", review: "A catchy pop hit with a unique rhythm that keeps listeners engaged for hours." },
    2: { artist: "The Weeknd", age: 35, gender: "Male", genre: "R&B/Pop", review: "A synth-pop masterpiece with a modern vibe that dominates the charts." },
    3: { artist: "Tones and I", age: 31, gender: "Female", genre: "Pop", review: "An energetic track with a distinctive voice that stands out in the industry." },
    4: { artist: "Adele", age: 36, gender: "Female", genre: "Soul/Pop", review: "A soulful ballad with deep emotions that resonates with millions worldwide." },
    5: { artist: "Ed Sheeran", age: 34, gender: "Male", genre: "Pop", review: "A romantic ballad with heartfelt lyrics that touch the soul deeply." },
    6: { artist: "Ava Cornish", age: 28, gender: "Female", genre: "Indie", review: "A soothing indie song with a fresh feel that captivates listeners instantly." },
    7: { artist: "Ava Cornish", age: 28, gender: "Female", genre: "Indie", review: "A promising track with emotional depth that leaves a lasting impression." },
    8: { artist: "Ava Cornish", age: 28, gender: "Female", genre: "Indie", review: "A courageous and uplifting melody that inspires with every note." },
    9: { artist: "Adele", age: 36, gender: "Female", genre: "Soul/Pop", review: "A powerful classic with timeless appeal that continues to move audiences." },
  };

  return (
    <div style={{ backgroundColor: "#E5E4DB", minHeight: "100vh", padding: "60px 0" }}>
      <Container>
        
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <img
                src={topSong?.image}
                alt={topSong?.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1 style={{ color: "#000", fontSize: "2.5rem", marginBottom: "10px" }}>
              This Month's Top Search!
            </h1>
            <p style={{ marginBottom: "20px", color: "#333" }}>
              {topSong?.title} by {topSong?.artist} leads the charts this month, followed by hits like
              Blinding Lights, Dance Monkey, and more...
            </p>
            <Button
              variant="outline-dark"
              style={{
                color: "#000",
                borderColor: "#000",
                borderRadius: "20px",
                padding: "5px 15px",
                transition: "all 0.3s ease",
                width: "fit-content",
              }}
              onClick={() => handleImageClick(topSong?.youtubeId)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              Play Now
            </Button>
            <h3 style={{ color: "#333", marginTop: "20px" }}>Most Searched Songs</h3>
            <p style={{ color: "#333" }}>{topSong?.title} by {topSong?.artist}</p>
          </Col>
        </Row>

        
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: "#333", marginBottom: "20px" }}>Top Searched Songs 2-5</h3>
            <Row>
              {top2to5.map((song) => (
                <Col md={3} key={song.id} className="mb-4 position-relative">
                  <Card style={{ border: "none", background: "transparent" }}>
                    <Card.Img
                      variant="top"
                      src={song?.image}
                      style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleImageClick(song?.youtubeId)}
                    />
                    <Card.Body className="text-center">
                      <Card.Title style={{ fontSize: "1rem" }}>{song?.title}</Card.Title>
                      <Card.Text style={{ color: "#666", fontSize: "0.9rem" }}>
                        {song?.artist}
                      </Card.Text>
                      <div
                        onMouseEnter={() => setShowDropdown(song.id)}
                        onMouseLeave={() => setShowDropdown(null)}
                        style={{ position: "relative" }}
                      >
                        <Button
                          variant="outline-dark"
                          style={{
                            color: "#000",
                            borderColor: "#000",
                            borderRadius: "20px",
                            padding: "5px 15px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                        >
                          View More
                        </Button>
                        <Dropdown
                          show={showDropdown === song.id}
                          style={{ position: "absolute", top: "100%", left: "0", zIndex: 1000, width: "100%" }}
                        >
                          <Dropdown.Menu
                            style={{
                              width: "120%",
                              backgroundColor: "#FFF",
                              border: "1px solid #000",
                              padding: "10px",
                              maxWidth: "100%",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            <Dropdown.Item>
                              <strong>Artist:</strong> {songDetails[song.id].artist}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <strong>Age:</strong> {songDetails[song.id].age}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <strong>Gender:</strong> {songDetails[song.id].gender}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <strong>Genre:</strong> {songDetails[song.id].genre}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <div
                                style={{
                                  maxWidth: "100%",
                                  whiteSpace: "normal",
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                }}
                              >
                                <strong>Review:</strong> {songDetails[song.id].review}
                              </div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        
        <Row>
          <Col>
            <h3 style={{ color: "#333", marginBottom: "20px" }}>Top Searched Songs 6-9</h3>
            <div style={{ backgroundColor: "#F5F5F5", padding: "20px", borderRadius: "10px" }}>
              {top6to9.map((song, index) => (
                <Row key={song.id} className="align-items-center mb-3">
                  <Col xs={12}>
                    <div style={{ display: "flex", alignItems: "center", color: "#000" }}>
                      <span style={{ fontSize: "1.5rem", marginRight: "15px", color: "#000" }}>
                        0{index + 6}
                      </span>
                      <img
                        src={song?.image}
                        alt={song?.title}
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "15px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "1rem", color: "#000" }}>{song?.title}</div>
                        <div style={{ fontSize: "0.9rem", color: "#000" }}>{song?.artist}</div>
                      </div>
                      <span style={{ marginLeft: "auto", color: "#000" }}>5:10</span>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>
        </Row>

        
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Body style={{ padding: 0 }}>
            {selectedVideo && (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default TopSearchedPage;