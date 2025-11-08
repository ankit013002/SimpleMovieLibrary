import React from "react";
import HeaderBanner from "./(components)/HeaderBanner";
import MovieSection from "./(components)/MovieSection";
import HeaderBannerText from "./(components)/HeaderBannerText";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-bg">
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center">
        <HeaderBanner />
        <HeaderBannerText />
      </section>

      <section>
        <MovieSection />
      </section>
    </div>
  );
};

export default page;
