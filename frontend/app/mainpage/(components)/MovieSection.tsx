"use client";

import Search from "./Search";
import MovieContent from "./MovieContent";
import { useEffect, useState } from "react";
import { MovieType } from "@/app/(types)/MovieType";

const MovieSection = () => {
  const [searchInput, SetSearchInput] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const res = await fetch("http://localhost:5000/movies/trending");
      const data = await res.json();
      setIsLoading(false);
      setMovies(data.movies);
    }

    fetchTrendingMovies();
  }, []);

  console.log(movies);

  return (
    <div>
      <Search input={searchInput} setInput={SetSearchInput} />
      {isLoading ? (
        <span className="loading loading-infinity loading-xl"></span>
      ) : (
        <MovieContent movies={movies} />
      )}
    </div>
  );
};

export default MovieSection;
