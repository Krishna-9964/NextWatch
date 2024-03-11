import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  if (Cookies.get("jwt_token") !== undefined) {
    return <Navigate to="/" />;
  }

  const onClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // Store JWT token on Success of API call
  const onSubmitSuccess = (jwtToken) => {
    // Storing JWT token
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
  };
  const onSubmitFailure = (errorMsg) => {
    setIsError(true);
    setErrorMsg(errorMsg);
  };

  // Implementing onSubmit Event Handler
  const onSubmitForm = async (event) => {
    event.preventDefault();

    // Preparing Request Object
    const userDetails = { username, password };
    // Preparing Request Object to Make an API call
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    // Making Authentication Request
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    // Checking if API call is a success
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div className="login">
      <div className="container login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="logo"
        />
        <form
          className="form-group login-form container"
          onSubmit={onSubmitForm}
        >
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            onChange={onChangeUsername}
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />
          <div className="password-visibility">
            <input
              type="checkbox"
              id="show-password"
              onClick={onClickShowPassword}
            />
            <label className="form-check-label" htmlFor="show-password">
              Show Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {isError ? <p className="error-msg">*{errorMsg}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
