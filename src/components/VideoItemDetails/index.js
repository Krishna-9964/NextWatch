import VideoDetails from "../VideoDetails";
import Header from "../Header";
import Sidebar from "../Sidebar";
import HomeVideos from "../HomeVideos";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { IoCloseOutline } from "react-icons/io5";
import SearchBar from "../SearchBar";
import Failure from "../Failure";
import ThemeContext from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import "./index.css";

const videoDetails = {
  id: "ad9822d2-5763-41d9-adaf-baf9da3fd490",
  title: "iB Hubs Announcement Event",
  video_url: "https://www.youtube.com/watch?v=pT2ojWWjum8",
  thumbnail_url:
    "https://assets.ccbp.in/frontend/react-js/nxt-watch/ibhubs-img.png",
  channel: {
    name: "iB Hubs",
    profile_image_url:
      "https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-img.png",
    subscriber_count: "1M",
  },
  view_count: "26K",
  published_at: "Nov 29, 2016",
  description:
    "iB Hubs grandly celebrated its Announcement Event in November 13, 2016, in the presence of many eminent personalities from the Government, Industry, and Academia with Shri Amitabh Kant, CEO, NITI Aayog as the Chief Guest.",
};

const apiUrl = "https://apis.ccbp.in/videos/";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const VideoItemDetails = () => {
  const { id } = useParams();

  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  });

  const jwtToken = Cookies.get("jwt_token");

  const getVideoDetails = async () => {
    setApiDetails({
      apiStatus: apiStatusConstants.inProgress,
      responseData: null,
      errorMsg: null,
    });

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "Application/json",
      },
    };
    let response = null;
    let fetchedData = null;
    try {
      response = await fetch(apiUrl + id, options);
      fetchedData = await response.json();
    } catch (e) {
      response = {
        ok: false,
        status: 404,
      };
    }

    if (response.ok) {
      //Format the data
      const formattedData = fetchedData.video_details;

      //Update the api details with the formatted data
      console.log(formattedData);
      setApiDetails({
        apiStatus: apiStatusConstants.success,
        responseData: formattedData,
        errorMsg: null,
      });
    }

    //if response is not ok update the api status with error message
    else {
      setApiDetails((prevDetails) => ({
        ...prevDetails,
        apiStatus: apiStatusConstants.failure,
        errorMsg: fetchedData.error_msg,
      }));
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  const tryAgain = () => {
    getVideoDetails();
  };

  const renderLoadingView = () => (
    <Loader type="Rings" color="#ffffff" height={80} width={80} />
  );

  const renderSuccessView = () => {
    return <VideoDetails videoDetails={apiDetails.responseData} />;
  };

  const renderFailureView = () => {
    const { errorMsg } = apiDetails;
    return <Failure retry={tryAgain} />;
  };

  const { activeTheme } = useContext(ThemeContext);
  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>

      <div className={`main ${activeTheme}`}>
        <Sidebar focusButton="" />
        <div className="play-area">
          {(() => {
            switch (apiDetails.apiStatus) {
              case apiStatusConstants.inProgress:
                return renderLoadingView();
              case apiStatusConstants.success:
                return renderSuccessView();
              case apiStatusConstants.failure:
                return renderFailureView();
              default:
                return <p>Default content</p>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default VideoItemDetails;
