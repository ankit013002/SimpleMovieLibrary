"use client";

import Card from "@/app/components/Card";
import { MovieType } from "@/app/types/MovieType";
import { LuColumns3, LuColumns4 } from "react-icons/lu";

interface MovieContentProps {
  movies: MovieType[];
}

const MovieContent = ({ movies }: MovieContentProps) => {
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
          return <Card key={index} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieContent;
