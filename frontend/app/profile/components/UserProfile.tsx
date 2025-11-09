"use client";

import { getSession, getUserByToken } from "@/app/actions/authAction";
import { getLikedMovies } from "@/app/actions/movieActions";
import { MovieType } from "@/app/types/MovieType";
import { UserType } from "@/app/types/UserType";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import Card from "@/app/components/Card";

const UserProfile = () => {
  const [user, setUser] = useState<UserType>();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const token = await getSession();
        if (token) {
          const retrievedUser = await getUserByToken(token);
          if (retrievedUser.success) {
            setUser(retrievedUser.user);
            const moviesLikedByUser = await getLikedMovies(
              retrievedUser.user!.likedMovies
            );
            setMovies(moviesLikedByUser.movies);
          }
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-gradient text-muted text-xl">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-app-gradient text-center text-muted text-lg">
        <p>You must be logged in to view your profile.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-app-gradient text-heading px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="panel p-8 rounded-2xl text-center space-y-4 elevated"
        >
          <h1 className="text-4xl font-display font-semibold tracking-tight">
            {user.name}
          </h1>
          <p className="text-muted text-sm">{user.email}</p>

          <div className="flex items-center justify-center gap-3 mt-4 text-brand-400">
            <FaHeart className="text-xl" />
            <span className="text-lg">
              {movies?.length || 0} Liked Movie{movies.length === 1 ? "" : "s"}
            </span>
          </div>
        </motion.div>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaHeart className="text-brand-400" />
            Liked Movies
          </h2>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card movie={movie} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted text-lg py-10">
              You haven’t liked any movies yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
