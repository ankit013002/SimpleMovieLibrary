"use client";

import Card from "@/app/(components)/Card";
import { MovieType } from "@/app/(types)/MovieType";

interface MovieContentProps {
  movies: MovieType[];
}

const MovieContent = ({ movies }: MovieContentProps) => {
  return (
    <div className="bg-transparent grid grid-cols-3 gap-5">
      {movies.map((movie, index) => {
        return <Card key={index} movie={movie} />;
      })}
    </div>
  );
};

export default MovieContent;
