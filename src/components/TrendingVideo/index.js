import { HiFire } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const TrendingVideo = (props) => {
  const { trendingVideo, heading } = props;
  const { activeTheme } = useContext(ThemeContext);
  return (
    <div className={`trending-container ${activeTheme}`}>
      <div className="heading flex">
        <div className="trend-icon flex">
          {heading === "Trending" ? <HiFire /> : <MdPlaylistAdd />}
        </div>
        <h1>{heading}</h1>
      </div>
      <ul className="video-container flex">
        {trendingVideo.map((eachVideo) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/video-item-details/${eachVideo.id}`}
            className="video-item flex"
            key={eachVideo.id}
          >
            <img
              src={eachVideo.thumbnailUrl}
              alt="video"
              className="video-image"
            />
            <div className="video-details">
              <h5>{eachVideo.title}</h5>
              <p>{eachVideo.channel.name}</p>
              <p>
                {eachVideo.viewCount} views &bull;{" "}
                {moment(eachVideo.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TrendingVideo;
