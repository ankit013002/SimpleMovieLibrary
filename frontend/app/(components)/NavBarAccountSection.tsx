"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, signOutUser } from "../actions/authAction";

const NavBarAccountSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function doesCookieExist() {
      const token = await getSession();
      if (token) {
        setIsLoggedIn(true);
      }
    }

    doesCookieExist();
  });

  const goToLogin = () => {
    redirect("/login");
  };

  const handleSignOut = async () => {
    await signOutUser();
    redirect("/");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            className="btn flex"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" } as React.CSSProperties}
          >
            <div className="avatar avatar-placeholder">
              <div className="bg-blue-500 p-2 text-neutral-content rounded-full">
                <span className="">D</span>
              </div>
            </div>
            <div>Placeholder Name</div>
          </button>
          <ul
            className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
            popover="auto"
            id="popover-1"
            style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
          >
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button onClick={() => handleSignOut()}>Sign out</button>
            </li>
          </ul>
        </>
      ) : (
        <button className="btn" onClick={() => goToLogin()}>
          Log In/Sign Up
        </button>
      )}
    </div>
  );
};

export default NavBarAccountSection;
