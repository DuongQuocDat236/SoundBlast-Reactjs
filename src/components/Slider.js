import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";

const GallerySlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("data/Slider.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error load slider:", err));
  }, []);

  return (
    <div className="slider-container">
      <Carousel fade controls={false} indicators={false} interval={4000}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              className="d-block w-100 slider-img"
              src={slide.image}
              alt={slide.title}
            />
            <div className="carousel-overlay">

              <h1 className="title">{slide.title}</h1>
              <p className="artist">{slide.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Animated down arrow */}
      <a href="#main" className="scroll-down">
        <i className="bi bi-chevron-down fs-1"></i>
      </a>
    </div>
  );
};

export default GallerySlider;
