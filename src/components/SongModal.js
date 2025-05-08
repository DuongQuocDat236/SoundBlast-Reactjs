import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const SongModal = ({ show, handleClose, song }) => {
  if (!song) return null;

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Body
        className="text-white"
        style={{
          background: "linear-gradient(to right, rgb(39, 94, 58), rgb(29, 28, 28))",
          padding: "40px",
        }}
      >
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src={`http://localhost:8000/${song.image}`}
              alt={song.title}
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            />
          </Col>

          <Col md={6}>
            <h2 className="fw-bold">{song.title}</h2>
            <h4 className="text-light mb-4">{song.artist}</h4>

            <audio
              controls
              className="w-100 mb-4"
              style={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <source
                src={`http://localhost:8000/${song.audio}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>

            <Button
              variant="light"
              href={`http://localhost:8000/${song.audio}`}
              download
              className="me-3"
            >
              🎧 Download MP3
            </Button>

            <Button variant="outline-light" onClick={handleClose}>
              ❌ Close
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SongModal;