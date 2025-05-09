import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-dark text-white pt-4 pb-2 position-relative">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Column 1: Brand Info */}
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <img
                src="/images/Logo.jpg"
                alt="SoundBlast Logo"
                style={{ 
                  borderRadius: '50%',
                  width: '100px', 
                  marginBottom: '10px' }}
              />
            </div>
            <h5 className="fw-bold text-center">SoundBlast</h5>
            <p className="small text-center">Your Music, Your Vibe!</p>
            <p className="small text-center">
              📍 123 Music Street, Sound City, USA <br />
              ☎️ +1 (800) 123-4567 <br />
              📧 support@soundblast.com
            </p>
            <div className="text-center">
            <Link to="/about" className="text-info text-decoration-none mx-2">About Us</Link> |
            <Link to="/contact" className="text-info text-decoration-none mx-2">Contact</Link> |
            <Link to="/privacy" className="text-info text-decoration-none mx-2">Privacy</Link> |
            <Link to="/site-map" className="text-info text-decoration-none mx-2">Site Map</Link>
            </div>
          </div>

          {/* Column 2: Map */}
          <div className="col-md-4 mb-4">
            <iframe
              title="SoundBlast Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0864237525383!2d-122.40144998468065!3d37.78509637975695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b61a5e2f%3A0x3123c0c8f75fbc7e!2sSpotify!5e0!3m2!1sen!2sus!4v1617103945061!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Column 3: Newsletter / Social */}
          <div className="col-md-4 mb-4 text-center">
            <h6 className="fw-bold mb-3">Stay in the loop!</h6>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-info w-100">Subscribe</button>
            </form>
            <div className="mt-4">
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
          </div>

        </div>

        {/* Ticker */}
        <div className="ticker bg-secondary text-white py-1 text-center" style={{
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}>
          <span style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "ticker 15s linear infinite"
          }}>
            📅 Today is April 2, 2025 – Welcome to SoundBlast – Your Music, Your Vibe!
          </span>
        </div>

        <p className="mt-3 mb-0 small text-muted text-center">&copy; 2025 SoundBlast. All rights reserved.</p>
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

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        a.text-info:hover {
          color: #0dcaf0;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
