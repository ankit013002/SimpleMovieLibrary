import React from "react";
import HeaderBanner from "./(components)/HeaderBanner";
import MovieSection from "./(components)/MovieSection";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-bg">
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center">
        <HeaderBanner />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to PopcornBox!</h1>
          <p className="text-gray-300">
            Discover your favorite movies and shows.
          </p>
        </div>
      </section>

      <section>
        <MovieSection />
      </section>
    </div>
  );
};

export default page;
