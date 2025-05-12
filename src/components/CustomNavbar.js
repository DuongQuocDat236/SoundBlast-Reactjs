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
              <span className="me-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.15957 11.62C9.12957 11.62 9.10957 11.62 9.07957 11.62C9.02957 11.61 8.95957 11.61 8.89957 11.62C5.99957 11.53 3.80957 9.25 3.80957 6.44C3.80957 3.58 6.13957 1.25 8.99957 1.25C11.8596 1.25 14.1896 3.58 14.1896 6.44C14.1796 9.25 11.9796 11.53 9.18957 11.62C9.17957 11.62 9.16957 11.62 9.15957 11.62ZM8.99957 2.75C6.96957 2.75 5.30957 4.41 5.30957 6.44C5.30957 8.44 6.86957 10.05 8.85957 10.12C8.91957 10.11 9.04957 10.11 9.17957 10.12C11.1396 10.03 12.6796 8.42 12.6896 6.44C12.6896 4.41 11.0296 2.75 8.99957 2.75Z" fill="#292D32"/>
<path d="M16.5394 11.75C16.5094 11.75 16.4794 11.75 16.4494 11.74C16.0394 11.78 15.6194 11.49 15.5794 11.08C15.5394 10.67 15.7894 10.3 16.1994 10.25C16.3194 10.24 16.4494 10.24 16.5594 10.24C18.0194 10.16 19.1594 8.96 19.1594 7.49C19.1594 5.97 17.9294 4.74 16.4094 4.74C15.9994 4.75 15.6594 4.41 15.6594 4C15.6594 3.59 15.9994 3.25 16.4094 3.25C18.7494 3.25 20.6594 5.16 20.6594 7.5C20.6594 9.8 18.8594 11.66 16.5694 11.75C16.5594 11.75 16.5494 11.75 16.5394 11.75Z" fill="#292D32"/>
<path d="M9.16961 22.55C7.20961 22.55 5.23961 22.05 3.74961 21.05C2.35961 20.13 1.59961 18.87 1.59961 17.5C1.59961 16.13 2.35961 14.86 3.74961 13.93C6.74961 11.94 11.6096 11.94 14.5896 13.93C15.9696 14.85 16.7396 16.11 16.7396 17.48C16.7396 18.85 15.9796 20.12 14.5896 21.05C13.0896 22.05 11.1296 22.55 9.16961 22.55ZM4.57961 15.19C3.61961 15.83 3.09961 16.65 3.09961 17.51C3.09961 18.36 3.62961 19.18 4.57961 19.81C7.06961 21.48 11.2696 21.48 13.7596 19.81C14.7196 19.17 15.2396 18.35 15.2396 17.49C15.2396 16.64 14.7096 15.82 13.7596 15.19C11.2696 13.53 7.06961 13.53 4.57961 15.19Z" fill="#292D32"/>
<path d="M18.3392 20.75C17.9892 20.75 17.6792 20.51 17.6092 20.15C17.5292 19.74 17.7892 19.35 18.1892 19.26C18.8192 19.13 19.3992 18.88 19.8492 18.53C20.4192 18.1 20.7292 17.56 20.7292 16.99C20.7292 16.42 20.4192 15.88 19.8592 15.46C19.4192 15.12 18.8692 14.88 18.2192 14.73C17.8192 14.64 17.5592 14.24 17.6492 13.83C17.7392 13.43 18.1392 13.17 18.5492 13.26C19.4092 13.45 20.1592 13.79 20.7692 14.26C21.6992 14.96 22.2292 15.95 22.2292 16.99C22.2292 18.03 21.6892 19.02 20.7592 19.73C20.1392 20.21 19.3592 20.56 18.4992 20.73C18.4392 20.75 18.3892 20.75 18.3392 20.75Z" fill="#292D32"/>
</svg>
</span>
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
