import { useRef } from "react";
import { useMemberDetails } from "../../../hooks/useMemberDetails";
import "./SearchInput.css";

const SearchInput = () => {
  const { setSearchText } = useMemberDetails();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    if (searchInputRef.current && searchInputRef.current.value) {
      searchInputRef.current.value = "";
      setSearchText("");
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by name, email or role"
          ref={searchInputRef}
        />
        {searchInputRef.current?.value && (
          <button onClick={clearSearch}>X</button>
        )}
      </div>

      <button
        onClick={() => setSearchText(searchInputRef.current?.value ?? "")}
        className="search-icon"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
