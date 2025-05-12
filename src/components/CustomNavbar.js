import React, { useEffect, useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import "./CustomNavbar.css"; 
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({ toggleTheme, isDarkMode }) => {
  const [visitors, setVisitors] = useState(0);
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("#trending");
  const navigate = useNavigate();
  useEffect(() => {
    const randomVisitors = Math.floor(Math.random() * 1000) + 100;
    setVisitors(randomVisitors);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".custom-navbar");
      if (window.scrollY > 30) {
        nav.classList.add("navbar-blur");
      } else {
        nav.classList.remove("navbar-blur");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };

  return (
    <BootstrapNavbar
      expand="lg"
      className="custom-navbar shadow-sm py-2"
      style={{ background: "linear-gradient(to right, #7b2ff7, #f107a3, #00c6ff)" }}
    >
      <Container fluid className="px-4 d-flex align-items-center">
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            alt="Logo"
            src="/images/Logo.jpg"
            width="40"
            height="40"
            className="rounded-circle"
          />
          <span className="fw-bold text-black" style={{ fontSize: "1.7rem" }}>
            SoundBlast
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />
        <BootstrapNavbar.Collapse id="main-navbar-nav" className="d-flex align-items-center">
          <Nav
            className="flex-grow-1 d-flex align-items-center gap-3 ms-4"
            activeKey={activeMenu}
            onSelect={(selectedKey) => setActiveMenu(selectedKey)}
          >
            <Nav.Link as={Link} to="/trending" eventKey="/trending" className="nav-link-custom text-white small">
              Trending
            </Nav.Link>
            <Nav.Link as={Link} to="/top-charts" eventKey="/top-charts" className="nav-link-custom text-white small">
              TopCharts
            </Nav.Link>
            <Nav.Link as={Link} to="/new-releases" eventKey="/new-releases" className="nav-link-custom text-white small">
              New Releases
            </Nav.Link>
            <NavDropdown title={<span style={{ color: "white" }}>More</span>} id="more-dropdown">
              <NavDropdown.Item as={Link} to="/genres">Genres</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gallery">Gallery</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/languages">Languages</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/latest-albums">Latest Albums</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/top-artists">Top Artist</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/old-songs">OldSongs</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/top-searched">TopSearchedSongs</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reviews">ReviewSection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/feedback">FeedBack</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <SearchBar />
            <div onClick={toggleTheme} role="button" title="Toggle theme" className="ms-2">
              {isDarkMode ? "🌞" : "🌙"}
            </div>
            <div className="d-flex align-items-center small text-white">
              <span className="me-1">👥</span>
              <span>{visitors} online</span>
            </div>

            {user ? (
              <NavDropdown
                title={
                  <>
                    <Image
                      src="https://i.pravatar.cc/30"
                      roundedCircle
                      className="me-2"
                    />
                    {user.name}
                  </>
                }
                id="user-menu"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button size="sm" variant="light">
                  <Link className="nav-link text-black" to="/login">Login</Link>
                </Button>
                <Button size="sm" variant="dark">
                  <Link className="nav-link text-light" to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
