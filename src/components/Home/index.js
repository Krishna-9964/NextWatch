import Header from "../Header";
import Sidebar from "../Sidebar";
import HomeVideos from "../HomeVideos";
import NoVideos from "../NoVideos";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { IoCloseOutline } from "react-icons/io5";
import SearchBar from "../SearchBar";
import Failure from "../Failure";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const apiUrl = "https://apis.ccbp.in/videos/all?search=";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoadedData, setInitialLoadedData] = useState([]);

  const { activeTheme } = useContext(ThemeContext);

  const searchQueryData = (query) => {
    // const queryData = initialLoadedData.filter((eachVideo) => {
    //   return eachVideo.title.toLowerCase().includes(query.toLowerCase());
    // });
    // console.log(queryData);
    // setApiDetails((prevApiDetails) => ({
    //   ...prevApiDetails,
    //   apiStatus: apiStatusConstants.success,
    //   responseData: queryData,
    // }));

    setSearchQuery(query);
  };

  const [isPremiumNotClosed, setClosePremium] = useState(true);

  //   const contextValue = useContext(NxtWatch);
  //   const { homeVideos, updateHomeVideos } = contextValue;
  const jwtToken = Cookies.get("jwt_token");
  const getHomeVideos = async () => {
    // Before the fetch operation, set API status to inProgress
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
    let videoList = null;
    try {
      response = await fetch(apiUrl + searchQuery, options);
      fetchedData = await response.json();
      videoList = fetchedData.videos;
    } catch (e) {
      response = { ok: false, status: 404 };
    }

    if (response.ok) {
      const formattedData = videoList.map((eachVideo) => {
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

      // Set API status to success and store the formatted data
      setApiDetails((prevApiDetails) => ({
        ...prevApiDetails,
        apiStatus: apiStatusConstants.success,
        responseData: formattedData,
      }));
      setInitialLoadedData(formattedData);
    } else {
      // If response is not successful, set API status to failure and store the error message
      setApiDetails((prevApiDetails) => ({
        ...prevApiDetails,
        apiStatus: apiStatusConstants.failure,
        errorMsg: fetchedData.error_msg,
      }));
    }
  };

  useEffect(() => {
    getHomeVideos();
  }, [searchQuery]);

  const tryAgain = () => {
    getHomeVideos();
  };

  const renderLoadingView = () => {
    return (
      <Loader
        type="Rings"
        color={activeTheme === "dark" ? "#ffffff" : "#0f0f0f"}
        height={160}
        width={160}
      />
    );
  };

  const renderSuccessView = () => {
    if (apiDetails.responseData.length > 0)
      return <HomeVideos videos={apiDetails.responseData} />;
    else return <NoVideos />;
  };

  const renderFailureView = () => {
    const { errorMsg } = apiDetails;
    return <h1>Videos not found</h1>;
  };

  const onClickCloseButton = () => {
    // console.log("Clicked");
    setClosePremium(false);
  };

  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>

      <div className={`main ${activeTheme}`}>
        <Sidebar focusButton="homeButton" />
        <div className="play-area">
          {isPremiumNotClosed && (
            <div className="premium">
              <div className="premium-adv">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="logo"
                />
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button">GET IT NOW</button>
              </div>
              <div className="IoCloseOutline">
                <IoCloseOutline onClick={onClickCloseButton} />
              </div>
            </div>
          )}
          <div className="search-bar">
            <SearchBar searchQueryData={searchQueryData} />
          </div>
          <div className="content">
            {(() => {
              switch (apiDetails.apiStatus) {
                case apiStatusConstants.inProgress:
                  return renderLoadingView();
                case apiStatusConstants.success:
                  return renderSuccessView();
                case apiStatusConstants.failure:
                  return renderFailureView;
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

export default Home;
