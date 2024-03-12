import Header from "../Header";
import Sidebar from "../Sidebar";
import TrendingVideo from "../TrendingVideo";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import SavedVideoContext from "../../context/SavedVideoContext";
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

  const renderSuccessView = () => {
    return (
      <TrendingVideo
        trendingVideo={formattedSavedVideos}
        heading="Saved Videos"
      />
    );
  };

  const renderFailureView = () => {
    return (
      <div className={`failure-container ${activeTheme}`}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />{" "}
        <br />
        <h2>No Saved Videos Found</h2>
        <h5>You can save your videos while watching them.</h5>
      </div>
    );
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
