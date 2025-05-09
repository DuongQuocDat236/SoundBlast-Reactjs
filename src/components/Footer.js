import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <footer className="bg-black text-white pt-4 pb-3 position-relative">
      <div className="container">
        <div className="row">

          {/* Column 1: Info */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-center">Contact</h6>
            <p className="small mb-1">📍 Tầng 1 - Tòa nhà Detech- Số 8 Đường Tôn Thất Thuyết - Phường Mỹ Đình 2 - Quận Nam Từ Liêm - Hà Nội</p>
            <p className="small mb-1">☎️ +1 (800) 123-4567</p>
            <p className="small mb-0">📧 support@soundblast.com</p>
          </div>

          {/* Column 2: Social + Newsletter */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3 text-center">Follow Us</h6>
            <div className="mb-3 d-flex justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-info mx-2" size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-info mx-2" size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-info mx-2" size={20} />
              </a>
            </div>
            <form className="mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-info w-100">Subscribe</button>
            </form>
          </div>

          {/* Column 3: Links */}
          <div className="col-md-3 mb-4 text-center">
            <h6 className="fw-bold mb-3">Pages</h6>
            <p><Link to="/about" className="text-info text-decoration-none">About Us</Link></p>
            <p><Link to="/contact" className="text-info text-decoration-none">Contact</Link></p>
            <p><Link to="/privacy" className="text-info text-decoration-none">Privacy</Link></p>
            <p><Link to="/site-map" className="text-info text-decoration-none">Site Map</Link></p>
          </div>

          {/* Column 4: Back Home + Map */}
          <div className="col-md-3 mb-4 text-center">
            <button className="btn btn-info mb-3" onClick={() => navigate('/')}> <FaHome className="me-2" />Come With Us</button>
            <div className="d-flex justify-content-center">
              <iframe
                title="SoundBlast Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0864237525383!2d-122.40144998468065!3d37.78509637975695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b61a5e2f%3A0x3123c0c8f75fbc7e!2sSpotify!5e0!3m2!1sen!2sus!4v1617103945061!5m2!1sen!2sus"
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="ticker-container my-3" style={{
          background: "linear-gradient(90deg, #5ac8fa, #7b2cbf)",
          color: "white",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: "0.9rem",
          fontWeight: "500",
          borderRadius: "6px",
          padding: "6px 0",
        }}>
          <div
            style={{
              display: "inline-block",
              paddingLeft: "100%",
              animation: "tickerScroll 18s linear infinite",
            }}
          >
            📅 {formatTime(currentTime)} – Welcome to SoundBlast – Your Music, Your Vibe!
          </div>
        </div>

        <style>{`
            @keyframes tickerScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .ticker-container div {
              text-shadow: 0 0 5px #ffffff, 0 0 8px #5ac8fa;
            }
          `}</style>


        <hr className="border-secondary" />

        {/* Bottom Logo + Copyright */}
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img
            src="/images/Logo.jpg"
            alt="SoundBlast Logo"
            style={{ width: '60px', borderRadius: '50%' }}
          />
          <p className="small text-white mt-2 mb-0 fw-semibold">
            &copy; {new Date().getFullYear()} CopyRight@SoundBlast. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn btn-info position-fixed"
          style={{
            bottom: '20px',
            right: '20px',
            borderRadius: '50%',
            padding: '10px 14px',
            zIndex: 1000,
          }}
          title="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
