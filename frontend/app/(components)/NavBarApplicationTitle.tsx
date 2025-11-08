"use client";

import { redirect } from "next/navigation";

const NavBarApplicationTitle = () => {
  return (
    <button
      className="flex items-center font-bold text-4xl font-[cursive] cursor-pointer"
      onClick={() => redirect("/")}
    >
      <span>Popcorn</span>
      <span className="text-brand-500">B</span>
      <span>ox</span>
    </button>
  );
};

export default NavBarApplicationTitle;
