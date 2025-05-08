import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("data/Slider.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error loading slider:", err));
  }, []);

  return (
    <section className="slider-wrapper position-relative">
      <Carousel fade interval={4000} pause={false} controls={false} indicators={false}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} className="slider-item">
            <img
              src={slide.image}
              className="d-block w-100 slider-img"
              alt={slide.title}
            />
            <div className="slider-caption text-white text-center">
              <p className="slider-sub">{slide.subtitle || "NEW SINGLE"}</p>
              <h1 className="slider-title">{slide.title}</h1>
              <p className="slider-desc">{slide.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <a href="#main-sections" className="scroll-down text-white">
        <i className="bi bi-chevron-down fs-2"></i>
      </a>
    </section>
  );
};

export default Slider;