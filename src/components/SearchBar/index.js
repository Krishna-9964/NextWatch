import { CiSearch } from "react-icons/ci";
import { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const SearchBar = (props) => {
  //   const [searchVideo, setSearchVideo] = useState("");
  const { searchQueryData } = props;
  const { activeTheme } = useContext(ThemeContext);
  const [inputSearch, setInputSearch] = useState("");

  const onClickSearch = () => {
    searchQueryData(inputSearch.trim());
  };
  const onChangeInput = (event) => {
    setInputSearch(event.target.value);
  };
  useEffect(() => {
    if (inputSearch === "") searchQueryData(inputSearch);
  }, [inputSearch]);
  return (
    <div className={`search-container ${activeTheme}`}>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={inputSearch}
        onChange={onChangeInput}
      />
      <div className="search-icon" onClick={onClickSearch}>
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchBar;
