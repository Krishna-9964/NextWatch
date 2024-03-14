import { SiYoutubegaming } from "react-icons/si";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const GamingVideo = (props) => {
  const { videos } = props;
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div className={`gaming trending-container ${activeTheme}`}>
      <div className="heading flex">
        <div className="trend-icon flex">
          <SiYoutubegaming />
        </div>
        <h1>Gaming</h1>
      </div>
      <ul className="videos-container  flex">
        {videos.map((video) => (
          <Link
            to={`/video-item-details/${video.id}`}
            key={video.id}
            className="video-card"
            style={{ textDecoration: "none", color: "black" }}
          >
            <img src={video.thumbnailUrl} alt={video.title} />
            <div className="details">
              <div className="video-details">
                <h6>{video.title}</h6>
                <p>{video.viewCount} Watching Worldwide </p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GamingVideo;
