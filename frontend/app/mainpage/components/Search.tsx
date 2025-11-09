"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSearch: () => Promise<void>;
}

const Search = ({ input, setInput, handleSearch }: SearchProps) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-20 px-6 backdrop-blur-sm w-full border-t border-border/40">
      <h2 className="text-3xl font-bold text-heading tracking-tight">
        Search for a Movie
      </h2>
      <p className="text-muted text-sm mb-4">
        Explore your favorite films, shows, and hidden gems.
      </p>

      <div className="flex w-full max-w-2xl justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
        <input
          className="grow bg-panel text-heading/90 placeholder:text-muted/70 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/70 transition-all"
          placeholder="Search for movies, actors, or genres..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={() => handleSearch()}
          className="bg-brand-500 hover:bg-brand-400 active:bg-brand-600 transition-colors text-black px-5 flex items-center justify-center text-2xl"
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
