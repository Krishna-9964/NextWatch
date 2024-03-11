import React from "react";

const ThemeContext = React.createContext({
  activeTheme: "",
  changeTheme: () => {},
});

export default ThemeContext;
