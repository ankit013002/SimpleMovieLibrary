"use client";

import Search from "./Search";
import MovieContent from "./MovieContent";
import { useEffect, useState } from "react";
import { MovieType } from "@/app/types/MovieType";

const MovieSection = () => {
  const [searchInput, SetSearchInput] = useState("");
  const [moviesSearched, setMoviesSearched] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/trending?page=${page}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovies(data.movies);
      setMovieCount(data.count);
      setPage(data.page);
      setPages([]);
    }

    fetchTrendingMovies();
  }, [page]);

  const handleMovieSearch = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/movie-by-title?title=${searchInput}&page=${page}`
    );
    const data = await res.json();
    setIsLoading(false);
    setMovies(data.movies);
    setPage(data.page);
    console.log(data.count);
    setMovieCount(data.count);
    setPages([]);
    setMoviesSearched(true);
    SetSearchInput("");
  };

  const goToPage = async (pageNumber?: number) => {
    console.log(pageNumber);
    let res = null;
    setIsLoading(true);
    const newPage = pageNumber ?? page + 1;
    if (moviesSearched) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/movie-by-title?title=${searchInput}&page=${newPage}`
      );
    } else {
      console.log("Trending");
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/trending?page=${newPage}`
      );
    }
    const data = await res.json();
    console.log(data);
    setIsLoading(false);
    setMovies(data.movies);
    setPage(newPage);
    setMovieCount(data.count);
    if (!pageNumber && page == pages.length) {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        newPages.push(prevPages.length + 1);
        return newPages;
      });
    }
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
      <div className="p-5">
        <div className="justify-self-center">
          {pages && (
            <div className="flex">
              {pages.map((pageNumber) => {
                return (
                  <div key={pageNumber}>
                    <button
                      onClick={() => goToPage(pageNumber)}
                      className={`btn w-1 btn-ghost ${
                        page == pageNumber ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {pageNumber}
                    </button>
                    {pageNumber != pages.length && <span>,</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {movieCount == 20 && (
          <div className="justify-self-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                goToPage();
              }}
              className="btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSection;
