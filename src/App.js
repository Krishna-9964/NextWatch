import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Trending from "./components/Trending";
import SavedVideos from "./components/SavedVideos";
// import Sidebar from "./components/Sidebar";
import VideoItemDetails from "./components/VideoItemDetails";

import { useState } from "react";
import ThemeContext from "./context/ThemeContext";
import SavedVideoContext from "./context/SavedVideoContext";
import "./App.css";

// Replace your code here
const App = () => {
  const [activeTheme, setActiveTheme] = useState("");
  const [savedVideos, setSavedVideos] = useState([]);

  const saveVideo = (video) => {
    setSavedVideos((prev) => [...prev, video]);
  };

  const deleteVideo = (id) => {
    const filteredVideos = savedVideos.filter(
      (eachVideo) => eachVideo.id !== id
    );
    setSavedVideos(filteredVideos);
  };

  const changeTheme = (activeTheme) => {
    setActiveTheme(activeTheme);
  };
  return (
    <BrowserRouter>
      <SavedVideoContext.Provider
        value={{ savedVideos, saveVideo: saveVideo, deleteVideo: deleteVideo }}
      >
        <ThemeContext.Provider
          value={{ activeTheme, changeTheme: changeTheme }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video-item-details/:id"
              element={
                <ProtectedRoute>
                  <VideoItemDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-videos"
              element={
                <ProtectedRoute>
                  <SavedVideos />
                </ProtectedRoute>
              }
            />

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </ThemeContext.Provider>
      </SavedVideoContext.Provider>
    </BrowserRouter>
  );
};

export default App;
