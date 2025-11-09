"use client";

import { MovieDetails } from "@/app/types/MovieDetailsType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay, FaImdb, FaClock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { motion } from "framer-motion";

const MoviePage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieDetails>();

  useEffect(() => {
    async function getMovieById() {
      const movieId = params.slug;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/movie-by-id?id=${movieId}`,
        { method: "GET" }
      );
      const data = await res.json();
      setMovie(data.movie);
    }
    getMovieById();
  }, [params.slug]);

  if (!movie)
    return (
      <div className="min-h-screen bg-app-gradient flex items-center justify-center text-muted text-xl">
        Loading movie details...
      </div>
    );

  return (
    <div className="min-h-screen bg-app-gradient text-heading">
      <div
        className="relative h-[70vh] w-full flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
        <div className="container-page relative z-10 pb-16 flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-brand-400 transition-colors mb-4"
          >
            <IoIosArrowBack /> Back
          </Link>

          <h1 className="text-5xl font-display font-semibold leading-tight">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-muted italic text-lg max-w-3xl">
              {movie.tagline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="pill">
              <FaClock className="text-brand-400" /> {movie.runtime} min
            </span>
            <span className="pill">Released: {movie.release_date}</span>
            <span className="pill">
              Rating: {movie.vote_average.toFixed(1)} / 10
            </span>
            <span className="pill">
              {movie.genres.map((g) => g.name).join(", ")}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FaPlay /> Watch Now
              </a>
            )}
            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <FaImdb className="text-brand-500 text-xl" /> View on IMDb
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="poster relative w-full aspect-2/3 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-border/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:bg-brand-500/30 hover:border-brand-400 transition-all duration-300 group"
          >
            <CiHeart className="text-2xl text-muted group-hover:text-brand-400 transition-colors duration-300" />
            <span className="absolute inset-0 rounded-full bg-brand-500/30 opacity-0 group-active:opacity-70 scale-0 group-active:scale-150 transition-all duration-300"></span>
          </motion.button>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <section className="panel p-6">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-muted leading-relaxed">{movie.overview}</p>
          </section>

          <section className="panel p-6">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted">
              <p>
                <span className="text-heading font-medium">
                  Original Title:
                </span>{" "}
                {movie.original_title}
              </p>
              <p>
                <span className="text-heading font-medium">Language:</span>{" "}
                {movie.spoken_languages[0]?.english_name}
              </p>
              <p>
                <span className="text-heading font-medium">Country:</span>{" "}
                {movie.production_countries.map((c) => c.name).join(", ")}
              </p>
              <p>
                <span className="text-heading font-medium">Budget:</span> $
                {movie.budget.toLocaleString()}
              </p>
              <p>
                <span className="text-heading font-medium">Revenue:</span> $
                {movie.revenue.toLocaleString()}
              </p>
              <p>
                <span className="text-heading font-medium">Status:</span>{" "}
                {movie.status}
              </p>
            </div>
          </section>

          {movie.production_companies.length > 0 && (
            <section className="panel p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-3 bg-panel-2/70 px-4 py-2 rounded-lg border border-border/50"
                  >
                    {company.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        width={60}
                        height={30}
                        className="object-contain"
                      />
                    )}
                    <span className="text-muted">{company.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
