"use client";

import Card from "@/app/components/Card";
import { MovieType } from "@/app/types/MovieType";
import { useRouter } from "next/navigation";

interface MovieContentProps {
  movies: MovieType[];
}

const MovieContent = ({ movies }: MovieContentProps) => {
  const router = useRouter();

  return (
    <div className="p-5">
      {/* TODO: Implement other viewing styles
      <div>
        <select className="select">
          <option defaultChecked>
            <div>
              <LuColumns3 />
            </div>
          </option>
          <option>
            <div>
              <LuColumns4 />
            </div>
          </option>
        </select>
      </div> */}
      <div className="grid grid-cols-3 gap-5">
        {movies.map((movie, index) => {
          return (
            <button
              onClick={() => {
                router.push(`/movie-page/${movie.id}`);
              }}
              key={index}
            >
              <Card movie={movie} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MovieContent;
