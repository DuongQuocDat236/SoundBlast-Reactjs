import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import datagenres from "../data/Datagenres/datagenres.json";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./GenresPage.css"; 


const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(datagenres);
  }, []);

  return (
    <div className="genres-page">
      <Container className="py-5">
        <h2 className="text-center mb-5 genres-title">Genres</h2>
        <Row>
          {genres.map((genre, index) => (
            <Col key={index} md={4} className="mb-4">
              <Link to={`/genres/${genre.name}`} style={{ textDecoration: "none" }}>
                <Card className="genre-card h-100 text-center">
                  <div className="genre-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={genre.image}
                      alt={genre.name}
                      className="genre-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="genre-name">{genre.name}</Card.Title>
                    <Card.Text className="genre-description">{genre.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default GenresPage;