import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import SavedVideoContext from "../../context/SavedVideoContext";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const VideoDetails = ({ videoDetails }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { activeTheme } = useContext(ThemeContext);
  const { savedVideos, saveVideo, deleteVideo } = useContext(SavedVideoContext);

  const onClickLike = () => {
    setLike((prev) => !prev);
    if (dislike) setDislike((prev) => !prev);
  };

  const onClickDislike = () => {
    setDislike((prev) => !prev);
    if (like) setLike((prev) => !prev);
  };

  const addToSavedList = () => {
    if (!isSaved) saveVideo(videoDetails);
    else deleteVideo(videoDetails.id);

    console.log("clicked");
  };

  useEffect(() => {
    const isVideoSaved = savedVideos.find(
      (eachVideo) => eachVideo.id === videoDetails.id
    );
    if (isVideoSaved !== undefined) setIsSaved(true);
    else setIsSaved(false);
  }, [savedVideos]);

  //Modify url
  const videoUrl = videoDetails.video_url.replace(
    "youtube.com/watch?v=",
    "youtube-nocookie.com/embed/"
  );

  return (
    <div className={`video-details-page ${activeTheme}`}>
      <div className="video-container">
        <iframe
          title={videoDetails.title}
          width="900"
          height="450"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="details-container">
        <h6>{videoDetails.title}</h6>
        <div className="likes flex">
          <p>
            {videoDetails.view_count} views &bull; {"  "}
            {moment(videoDetails.published_at).fromNow()}
          </p>
          <div className="buttons flex">
            <span onClick={onClickLike} className={like && "active"}>
              <AiOutlineLike /> Like
            </span>
            <span onClick={onClickDislike} className={dislike && "active"}>
              <BiDislike /> Dislike
            </span>
            <span className={isSaved && "active"} onClick={addToSavedList}>
              <MdOutlinePlaylistAdd /> {isSaved ? "Saved" : "Save"}
            </span>
          </div>
        </div>
        <div className="description flex">
          <div className="channel-icon">
            <img src={videoDetails.channel.profile_image_url} />
          </div>
          <div className="channel-details">
            <h6>{videoDetails.channel.name}</h6>
            <p>{videoDetails.channel.subscriber_count} subscribers</p>
            <br />
            <p>{videoDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
