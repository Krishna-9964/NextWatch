import React from "react";

const SavedVideoContext = React.createContext({
  savedVideos: [],
  saveVideo: () => {},
  deleteVideo: () => {},
});

export default SavedVideoContext;
