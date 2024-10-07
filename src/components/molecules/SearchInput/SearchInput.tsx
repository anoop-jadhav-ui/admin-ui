import { useState } from "react";
import { useMemberDetails } from "../../../hooks/useMemberDetails";
import "./SearchInput.css";

const SearchInput = () => {
  const { setSearchText } = useMemberDetails();
  const [searchInputValue, setSearchInputValue] = useState("");

  const clearSearch = () => {
    setSearchInputValue("");
    setSearchText("");
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by name, email or role"
          value={searchInputValue}
          onChange={(e) =>
            setSearchInputValue((e.target as HTMLInputElement).value)
          }
        />
        {searchInputValue && <button onClick={clearSearch}>X</button>}
      </div>

      <button
        onClick={() => setSearchText(searchInputValue)}
        className="search-icon"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
