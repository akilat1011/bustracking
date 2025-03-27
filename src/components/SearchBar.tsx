import { Search, MapPin } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-box">
        <MapPin size={24} />
        <input
          type="text"
          placeholder="Current Location"
          className="search-input"
        />
      </div>
      <div className="search-box">
        <Search size={24} />
        <input
          type="text"
          placeholder="Where to?"
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;