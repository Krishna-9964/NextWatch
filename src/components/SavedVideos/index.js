import Header from "../Header";
import Sidebar from "../Sidebar";
import TrendingVideo from "../TrendingVideo";
import Failure from "../Failure";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import SavedVideoContext from "../../context/SavedVideoContext";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import "../Trending/index.css";

const SavedVideos = () => {
  const { activeTheme } = useContext(ThemeContext);
  const { savedVideos } = useContext(SavedVideoContext);
  const formattedSavedVideos = savedVideos.map((eachVideo) => ({
    id: eachVideo.id,
    publishedAt: eachVideo.published_at,
    thumbnailUrl: eachVideo.thumbnail_url,
    title: eachVideo.title,
    viewCount: eachVideo.view_count,
    channel: {
      name: eachVideo.channel.name,
      profileImageUrl: eachVideo.channel.profile_image_url,
    },
  }));

  useEffect(() => {
    console.log(savedVideos);
  }, []);

  const tryAgain = () => {};

  const renderLoadingView = () => (
    <Loader
      type="Rings"
      color={activeTheme === "dark" ? "#ffffff" : "#0f0f0f"}
      height={160}
      width={160}
    />
  );

  const renderSuccessView = () => {
    return (
      <TrendingVideo
        trendingVideo={formattedSavedVideos}
        heading="Saved Videos"
      />
    );
  };

  const renderFailureView = () => {
    return <Failure retry={tryAgain} />;
  };

  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>

      <div className={`main ${activeTheme}`}>
        <Sidebar focusButton="saveVideosButton" />
        <div className={`play-area ${activeTheme}`}>
          <div className="content">
            {savedVideos.length !== 0
              ? renderSuccessView()
              : renderFailureView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedVideos;
