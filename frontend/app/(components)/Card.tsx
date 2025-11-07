import React from "react";
import { MovieType } from "../(types)/MovieType";

interface CardProps {
  movie: MovieType;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Card = ({ movie }: CardProps) => {
  return (
    <div className="card group overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:elevated">
      <div className="poster aspect-2/3">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={`/posternotavailable.jpg`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-lg font-semibold text-heading drop-shadow-md">
            {movie.title}
          </h3>
          <p className="text-sm text-muted">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "No Release Date"}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm text-muted line-clamp-3">{movie.overview}</p>

        <div className="flex items-center justify-between text-sm pt-2">
          <span className="badge">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="text-muted">
            {movie.original_language.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
