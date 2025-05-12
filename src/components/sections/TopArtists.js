import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/top-artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.error("Error fetching top artists:", err));
  }, []);

  return (
    <section id="topartists" className="my-5 px-3">
      <h2 className="mb-4 fw-bold text-center">🌟 TOP ARTISTS</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {artists.map((artist) => (
          <div className="col text-center" key={artist.id}>
            <Card className="h-100 shadow artist-card">
              <Card.Img
                variant="top"
                src={`http://localhost:8000/${artist.image}`}
                className="artist-img"
              />
              <Card.Body>
                <Card.Title className="artist-name">{artist.name}</Card.Title>
                <Card.Text className="artist-country">{artist.country}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopArtists;
