"use client";
import React, { useEffect, useState } from "react";

const HeroText = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
      <div className="relative z-10 text-center mt-20">
        <h1
          className={`text-4xl font-bold mb-4 transition-all duration-700 ease-out transform
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Welcome to <span className="text-brand-500">PopcornBox!</span>
        </h1>
        <p
          className={`text-gray-300 transition-all duration-1000 ease-out delay-200 transform
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Discover your favorite movies and shows.
        </p>
      </div>
    </>
  );
};

export default HeroText;
