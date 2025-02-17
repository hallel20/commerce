import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const location = useLocation()

  const onSearch = (query: string) => {
    if(location.pathname === "/search")
        setSearchParams({ q: query });
    else
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500), // 300ms delay
    [onSearch] // Dependency array
  );

  // Update debounced search when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      debouncedSearch(searchQuery);
    }
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery); // Trigger search immediately on form submit
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 max-w-lg">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* @ts-ignore */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;
