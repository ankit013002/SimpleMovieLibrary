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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/trending`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovies(data.movies);
    }

    fetchTrendingMovies();
  }, []);

  const handleMovieSearch = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/movie-by-title?title=${searchInput}`
    );
    const data = await res.json();
    setIsLoading(false);
    setMovies(data.movies);
    SetSearchInput("");
  };

  return (
    <div>
      <Search
        input={searchInput}
        setInput={SetSearchInput}
        handleSearch={handleMovieSearch}
      />
      {isLoading ? (
        <div className="flex justify-center p-10">
          <span className="loading loading-infinity loading-xl w-20"></span>
        </div>
      ) : (
        <MovieContent movies={movies} />
      )}
    </div>
  );
};

export default MovieSection;
