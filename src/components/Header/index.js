import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const { activeTheme, changeTheme } = useContext(ThemeContext);

  const onClickChangeTheme = () => {
    changeTheme(activeTheme === "dark" ? "" : "dark");
  };

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className={`container-fluid header-section ${activeTheme}`}>
      <Link to="/">
        <img
          className="logo"
          src={
            activeTheme === "dark"
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          }
          alt="logo"
        />
      </Link>

      <ul className="navigation">
        <li onClick={onClickChangeTheme}>
          {activeTheme === "dark" ? (
            <CiLight className="theme-icon" />
          ) : (
            <MdDarkMode className="theme-icon" />
          )}
        </li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile"
          />
        </li>
        <li>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
