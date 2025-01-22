import React from "react";
import { Loader } from "../../components/Loader/index.js";
import Error from "../../components/Error/index.js";
import Section from "../../components/Section/index.js";
import Hero from "./components/Hero.js";
import { useGetShowsQuery } from "../../api/index.js";
import { maxWidth } from "../../styles/index.js";
import { sections } from "../../constants/index.js";
import { cn } from "../../utils/helper.js";

const Home = () => {
  const { data, isLoading, isError } = useGetShowsQuery({
    category: "movie",
    type: "popular",
    page: 1,
  });

  // Handle loading and error states
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Unable to fetch the movies! " />;
  }

  // Ensure data exists before slicing
  const popularMovies = data?.results?.slice(0, 5) || [];

  return (
    <div className="bg-mainColor dark:bg-black text-primary dark:text-secColor">
      <Hero movies={popularMovies} />
      <div className={cn(maxWidth, "lg:mt-12 md:mt-8 sm:mt-6 xs:mt-4 mt-2")}>
        {sections.map(({ title, category, type }) => (
          <Section title={title} category={category} type={type} key={title} />
        ))}
      </div>
    </div>
  );
};

export default Home;
