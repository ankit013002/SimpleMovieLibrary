"use client";

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import { userSignIn } from "@/app/actions/authAction";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [data, action, isPending] = useActionState(userSignIn, undefined);
  const router = useRouter();

  useEffect(() => {
    if (data?.success) {
      router.refresh();
      window.location.href = "/";
    }
  }, [data, router]);

  return (
    <div className="min-h-screen bg-app-gradient flex items-center justify-center px-4">
      <div className="panel w-full max-w-md p-8 text-center space-y-6 elevated">
        <h1 className="text-3xl font-display text-heading">Welcome Back</h1>
        <p className="text-muted text-sm">
          Sign in to continue watching your favorite movies
        </p>

        <form className="space-y-4 text-left" action={action}>
          <div>
            <label className="block text-sm mb-1 text-muted">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-panel-2/80 border-border/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-muted">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-panel-2/80 border-border/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Sign In
          </button>
        </form>

        <div className="text-sm text-muted">
          Don’t have an account?{" "}
          <Link href="/signup" className="btn-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
