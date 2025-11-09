"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, getUserByToken, signOutUser } from "../actions/authAction";

const NavBarAccountSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function doesCookieExist() {
      const token = await getSession();
      if (token) {
        setIsLoggedIn(true);
        const retrievedUser = await getUserByToken(token);
        if (retrievedUser.success) {
          setUser(retrievedUser.user);
        }
      }
      setIsLoading(false);
    }

    doesCookieExist();
  }, []);

  const goToLogin = () => {
    redirect("/login");
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.refresh();
    window.location.reload();
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-infinity loading-sm"></span>
        </div>
      ) : isLoggedIn ? (
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
            <div>{user?.name}</div>
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
