import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const galleryRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8000/api/galleries')
      .then(res => {
        // Duplicate the data to simulate infinite loop
        setImages([...res.data, ...res.data, ...res.data]);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const container = galleryRef.current;
    const scrollAmount = 0.5;

    const autoScroll = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0; // Reset to beginning
      } else {
        container.scrollLeft += scrollAmount;
      }
    }, 15); // Speed of auto scroll (smaller = smoother)

    return () => clearInterval(autoScroll);
  }, []);

  const scroll = (direction) => {
    const container = galleryRef.current;
    const scrollAmount = 350;
    if (direction === 'left') container.scrollLeft -= scrollAmount;
    else container.scrollLeft += scrollAmount;
  };

  return (
    <section className="gallery-section py-5">
      <h2 className="text-center fw-bold mb-4"> GALLERY</h2>
      <div className="gallery-wrapper">
        <button className="arrow left" onClick={() => scroll('left')}>&lt;</button>
        <div className="gallery-container" ref={galleryRef}>
          {images.map((item, index) => (
            <div className="gallery-item" key={index}>
              <img src={`http://localhost:8000/${item.image}`} alt={item.title} />
              <p className="gallery-title">{item.title}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={() => scroll('right')}>&gt;</button>
      </div>
    </section>
  );
};

export default Gallery;
