import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import MovieCard from "../../components/MovieCard/index.js";
import { Loader } from "../../components/Loader/index.js";
import CatalogHeader from "../Catalog/components/CatalogHeader.js";
import { useGetShowsQuery } from "../../api/index.js";
import { smallMaxWidth } from "../../styles/index.js";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState([]);
  // eslint-disable-next-line
  const [query, setQuery] = useSearchParams(); // Sync with URL search parameters
  const { category } = useParams();
  const searchQueryFromUrl = query.get("search") || ""; // Get the search query from URL
  // const type = query.get("type") || "popular";

  // Make API call with the search query
  const { data, isLoading, isFetching } = useGetShowsQuery({
    category,
    page,
    searchQuery: searchQueryFromUrl, // Pass the search query to the API
    type: query.get("type") || "popular",
  });

  // Log the search query to verify
  useEffect(() => {
    console.log("Search Query from URL:", searchQueryFromUrl); // Log the query to see if it's correct
  }, [searchQueryFromUrl]);

  useEffect(() => {
    console.log("API Data:", data); // Checking if the correct data is returned

    if (isLoading || isFetching) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
      }
    }
  }, [data, isFetching, isLoading, page]);

  return (
    <>
      <CatalogHeader category={category} />
      <section className={`${smallMaxWidth}`}>
        {/* Loading or No Results */}
        {isLoading || isFetching ? (
          <Loader isMoviesSliderLoader={false} />
        ) : shows?.length === 0 ? (
          <div className="text-center my-8">
            <p>
              No results found for "{searchQueryFromUrl}". Try a different
              search.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
            {shows?.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={movie} category={category} />
              </div>
            ))}
          </div>
        )}
        {isFetching && !isLoading ? (
          <div className="my-4">
            <FiLoader className="mx-auto dark:text-gray-300 w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={isFetching}
              className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito my-4"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
