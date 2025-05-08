import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex">
        <div className="input-group" style={{ width: "360px" }}>
          <input
            type="search"
            className="form-control rounded-start-pill ps-3"
            placeholder="Enter song name"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-light rounded-end-pill px-2"
            type="submit"
            title="Search"
          >
            🔍
          </button>
        </div>
    </form>
  );
};

export default SearchBar;
