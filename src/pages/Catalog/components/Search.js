import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    const searchQueryFromUrl = query.get("search") || "";
    setSearch(searchQueryFromUrl);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    // Update the query params in the URL
    setQuery({ search });
    setSearch(""); // Clear the input field after submission
  };

  return (
    <form
      className="text-[14px] lg:py-10 md:pt-9 md:pb-10 sm:pt-8 sm:pb-10 pt-6 pb-8 flex flex-row items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-[8px] pl-[20px] pr-[36px] rounded-full outline-none w-[300px] md:w-[340px] shadow-md transition-all duration-300 focus:shadow-sm text-[#666] focus:bg-[#ffffff] bg-[#fdfdfd] font-medium dark:bg-[#302d3a] dark:text-primary dark:focus:bg-[#474550]"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={`Search for movies or tv series`}
      />
      <button
        type="submit"
        className="text-[18px] -ml-[32px] text-[#ff0000] z-[1]"
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default Search;
