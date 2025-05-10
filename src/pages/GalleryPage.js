import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./GalleryPage.module.css";
import artistData from "../data/Datagallery/gallery.json";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [artists, setArtists] = useState([]); // lưu toàn bộ nghệ sĩ

  useEffect(() => {
    setArtists(artistData); // Gán toàn bộ dữ liệu nghệ sĩ
    axios
      .get("/data/gallery.json")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error loading gallery", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Gallery</h2>

      {/* Slider ảnh chung */}
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={`http://localhost:3000/${img.image}`}
              alt={`gallery-${index}`}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        ))}
      </Slider>

      {/* Danh sách nghệ sĩ */}
      {artists.map((artist, index) => (
        <div key={index} className={styles.artistInfoContainer}>
          {/* Cột trái: ảnh */}
          <div className={styles.leftColumn}>
            <img
              src={`/${artist.gallery[0]}`}
              alt="Large"
              className={styles.largeImage}
            />
            <div className={styles.smallImages}>
              <img src={`/${artist.gallery[1]}`} alt="Side 1" />
              <img src={`/${artist.gallery[2]}`} alt="Side 2" />
            </div>
            <img
              src={`/${artist.gallery[3]}`}
              alt="Vertical"
              className={styles.tallImage}
            />
          </div>

          {/* Cột giữa: video */}
          <div className={styles.middleColumn}>
            {artist.latestSong?.thumbnail && (
              <a
                href={artist.latestSong.videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`/${artist.latestSong.thumbnail}`}
                  alt={artist.latestSong.title}
                  className={styles.videoThumb}
                />
              </a>
            )}
            <div className={styles.videoText}>
              <p style={{ fontSize: "13px", color: "#888" }}>
                YouTube · {artist.stageName} Official
              </p>
              <strong>{artist.latestSong?.title || "N/A"}</strong>
              <p style={{ fontSize: "13px", color: "#888" }}>
                {artist.latestSong?.releaseDate || "N/A"}
              </p>
            </div>
          </div>

          {/* Cột phải: thông tin */}
          <div className={styles.rightColumn}>
            <div className={styles.infoBox}>
              <span>Tuổi</span>
              <p>
                {artist.age} năm<br />
                {new Date(artist.birthDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className={styles.infoBox}>
              <span>Tên đầy đủ</span>
              <p>{artist.fullName}</p>
            </div>
            {artist.playlist?.title && (
              <div className={styles.infoBox}>
                <span>Playlist</span>
                <div className={styles.moreLinks}>
                  <img src={`/${artist.playlist.image}`} alt="Playlist" />
                  <p>
                    {artist.playlist.title}
                    <br />
                    <small>{artist.playlist.platform}</small>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default GalleryPage;
