import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import TrendingNow from '../components/sections/TrendingNow';
import TopCharts from '../components/sections/TopCharts';
import NewReleases from '../components/sections/NewReleases';
import LatestAlbums from '../components/sections/LatestAlbums';
import Genres from '../components/sections/Genres';
import OldSongs from '../components/sections/OldSongs';
import TopArtists from '../components/sections/TopArtists';
import Languages from '../components/sections/Languages';
import TopSearchedSongs from '../components/sections/TopSearchedSongs';
import Gallery from '../components/sections/Gallery';
import ReviewSection from '../components/sections/ReviewSection';
import FeedbackForm from '../components/sections/FeedbackForm';

const MainContent = () => {
  return (
    <Container fluid className="pt-4 px-3">

      {/* Row 1: Trending + OldSong */}
      <Row className="align-items-stretch mb-5">
        <Col md={8}>
          <div className="h-100 p-3 bg-white rounded shadow-sm">
            <div className="section-wrapper"><TrendingNow /></div>
          </div>
        </Col>
        <Col md={4}>
          <div className="h-100 p-3 bg-white rounded shadow-sm">
            <OldSongs />
          </div>
        </Col>
      </Row>

      {/* Row 2: New Releases + Top Searched */}
      <Row className="mb-5">
        <Col md={8}><NewReleases /></Col>
        <Col md={4}><TopSearchedSongs /></Col>
      </Row>

      {/* Row 3: Albums + Genres */}
      <Row className="mb-5">
        <Col md={6}><LatestAlbums /></Col>
        <Col md={6}><Genres /></Col>
      </Row>

      {/* Row 4: TopCharts + Top Artists */}
      <Row className="mb-5">
        <Col md={6}><TopCharts/></Col>
        <Col md={6}><TopArtists /></Col>
      </Row>

      {/* Row 5: Languages full width */}
      <Row className="mb-5">
        <Col><Languages /></Col>
      </Row>

      {/* Row 6: Gallery full width */}
      <Row className="mb-5">
        <Col><Gallery /></Col>
      </Row>

      {/* Row 7: Review + Feedback */}
      <Row className="mb-5">
        <Col md={6}><ReviewSection /></Col>
        <Col md={6}><FeedbackForm /></Col>
      </Row>

    </Container>
  );
};

export default MainContent;
