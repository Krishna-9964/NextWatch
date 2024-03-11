import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const Sidebar = ({ focusButton }) => {
  const { activeTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (focusButton !== "")
      document.getElementById(focusButton).classList.add("focus-element");
  }, []);
  return (
    <div className={`sidebar-container ${activeTheme}`}>
      <ul className="side-menu">
        <li>
          <Link to="/">
            <button type="button" id="homeButton">
              <span>
                <AiFillHome />
              </span>
              <p>Home</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/trending">
            <button type="button" id="trendingButton">
              <span>
                <HiFire />
              </span>
              <p>Trending</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/gaming">
            <button type="button" id="gamingButton">
              <span>
                <SiYoutubegaming />
              </span>
              <p>Gaming</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/saved-videos">
            <button type="button" id="saveVideosButton">
              <span>
                <MdOutlinePlaylistAdd />
              </span>
              <p>Saved Videos</p>
            </button>
          </Link>
        </li>
      </ul>
      <div className="contact-us">
        <h5>CONTACT US</h5>
        <div className="social-media-icons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linkedin logo"
          />
        </div>
        <h6 style={{ fontSize: "15px" }}>
          Enjoy! Now you can see your recommendations!
        </h6>
      </div>
    </div>
  );
};

export default Sidebar;
