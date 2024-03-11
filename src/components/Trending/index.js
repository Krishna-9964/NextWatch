import Header from "../Header";
import Sidebar from "../Sidebar";
import TrendingVideo from "../TrendingVideo";
import Failure from "../Failure";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import "./index.css";
const apiUrl = "https://apis.ccbp.in/videos/trending";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Trending = () => {
  const { activeTheme } = useContext(ThemeContext);
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  });

  const jwtToken = Cookies.get("jwt_token");
  const getTrendingVideos = async () => {
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
      response = await fetch(apiUrl, options);
      fetchedData = await response.json();
    } catch (e) {
      response = {
        ok: false,
        status: 404,
      };
    }

    if (response.ok) {
      //Format the data
      const formattedData = fetchedData.videos.map((eachVideo) => {
        return {
          id: eachVideo.id,
          publishedAt: eachVideo.published_at,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewCount: eachVideo.view_count,
          channel: {
            name: eachVideo.channel.name,
            profileImageUrl: eachVideo.channel.profile_image_url,
          },
        };
      });

      //Update the api details with the formatted data

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
    getTrendingVideos();
  }, []);

  const tryAgain = () => {
    getTrendingVideos();
  };

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
        trendingVideo={apiDetails.responseData}
        heading="Trending"
      />
    );
  };

  const renderFailureView = () => {
    const { errorMsg } = apiDetails;
    return <Failure retry={tryAgain} />;
  };

  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>

      <div className={`main ${activeTheme}`}>
        <Sidebar focusButton="trendingButton" />
        <div className={`play-area ${activeTheme}`}>
          <div className="content">
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
    </div>
  );
};

export default Trending;
