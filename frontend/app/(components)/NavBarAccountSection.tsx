"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

const NavBarAccountSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const goToLogin = () => {
    redirect("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <button className="btn flex">
          <div className="avatar avatar-placeholder">
            <div className="bg-blue-500 p-2 text-neutral-content rounded-full">
              <span className="">D</span>
            </div>
          </div>
          <div>Placeholder Name</div>
        </button>
      ) : (
        <button className="btn" onClick={() => goToLogin()}>
          Log In/Sign Up
        </button>
      )}
    </div>
  );
};

export default NavBarAccountSection;
