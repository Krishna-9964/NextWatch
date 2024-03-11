import moment from "moment";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";
const HomeVideos = (props) => {
  const { videos } = props;

  const { activeTheme } = useContext(ThemeContext);

  return (
    <div className={`videos-container ${activeTheme}`}>
      {videos.map((video) => (
        <Link
          to={`/video-item-details/${video.id}`}
          key={video.id}
          className="video-card"
          style={{ textDecoration: "none", color: "black" }}
        >
          <img src={video.thumbnailUrl} alt={video.title} />
          <div className="details">
            <div className="channel-info">
              <img
                src={video.channel.profileImageUrl}
                alt={video.channel.name}
              />
            </div>
            <div className="video-details">
              <h6>{video.title}</h6>
              <p>{video.channel.name} on</p>
              <p>
                {video.viewCount} views &bull;{" "}
                {moment(video.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeVideos;
