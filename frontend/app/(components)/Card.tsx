import React from "react";
import { MovieType } from "../(types)/MovieType";

interface CardProps {
  movie: MovieType;
}

const Card = ({ movie }: CardProps) => {
  return <div className="bg-red-500">{movie.title}</div>;
};

export default Card;
