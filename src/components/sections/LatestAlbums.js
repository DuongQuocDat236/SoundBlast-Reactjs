import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const LatestAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/latest-albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error("Error fetching Latest Albums data:", err));
  }, []);

  return (
    <section id="latestalbums" className="my-5 px-3">
      <h2 className="mb-4 text-center fw-bold">💿 LATEST ALBUMS</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {albums.map((album) => (
          <div className="col" key={album.id}>
            <Card className="album-card h-100 shadow">
              <Card.Img
                variant="top"
                src={`http://localhost:8000/${album.cover}`}
                className="album-img"
              />
              <Card.Body className="card-compact">
                <Card.Title className="card-title">{album.title}</Card.Title>
                <Card.Text className="card-text">{album.artist}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestAlbums;
