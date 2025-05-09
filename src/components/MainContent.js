import React from 'react';
import TrendingNow from './sections/TrendingNow';
import TopCharts from './sections/TopCharts';
import NewReleases from './sections/NewReleases';
import LatestAlbums from './sections/LatestAlbums';
import Genres from './sections/Genres';
import OldSongs from './sections/OldSongs';
import TopArtists from './sections/TopArtists';
import Languages from './sections/Languages';
import TopSearchedSongs from './sections/TopSearchedSongs';
import Gallery from './sections/Gallery';
import ReviewSection from './sections/ReviewSection';
import FeedbackForm from './sections/FeedbackForm';

const MainContent = () => {
  return (
    <main id="main" className="px-3 container">
      <TrendingNow />
      <TopCharts />
      <NewReleases />
      <LatestAlbums />
      <Genres />
      <OldSongs />
      <TopArtists />
      <Languages />
      <TopSearchedSongs />
      <Gallery />
      <ReviewSection />
      <FeedbackForm />
    </main>
  );
};

export default MainContent;
