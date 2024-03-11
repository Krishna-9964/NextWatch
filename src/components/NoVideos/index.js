import "./index.css";

const NoVideos = ({ retry }) => {
  const onClickRetry = () => {
    retry();
  };

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h2>No Search Results Found</h2>
      <h5>Try different keywords or remove the search filter.</h5>
    </div>
  );
};

export default NoVideos;
