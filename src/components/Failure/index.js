import "./index.css";

const NoVideos = ({ retry }) => {
  const onClickRetry = () => {
    retry();
  };

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="No data"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p>We are having some trouble completing your request</p>
      <p>Please try again.</p>
      <button type="button" className="btn btn-primary" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  );
};

export default NoVideos;
