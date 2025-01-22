import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, TMDB_API_BASE_URL } from "../utils/config.js";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({
        category = "movie",
        type = "popular",
        searchQuery,
        page = 1,
      }) => {
        let url = "";

        // Construct URL for search
        if (searchQuery) {
          url = `search/${category}?api_key=${API_KEY}&query=${encodeURIComponent(
            searchQuery
          )}&page=${page}`;
        }
        // Construct URL for category-based fetch (popular, trending, etc.)
        else {
          url = `${category}/${type}?api_key=${API_KEY}&page=${page}`;
        }

        console.log("Request URL:", url); // Debugging the constructed URL
        return url;
      },
    }),
    getShow: builder.query({
      query: ({ category, id }) =>
        `${category}/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetShowsQuery, useGetShowQuery } = tmdbApi;
