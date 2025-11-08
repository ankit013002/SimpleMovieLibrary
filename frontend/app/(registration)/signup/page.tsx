"use client";

import { userSignUp } from "@/app/actions/authAction";
import Link from "next/link";
import { useActionState } from "react";

const SignupPage = () => {
  const [data, action, isPending] = useActionState(userSignUp, undefined);

  return (
    <div className="min-h-screen bg-app-gradient flex items-center justify-center px-4">
      <div className="panel w-full max-w-md p-8 text-center space-y-6 elevated">
        <h1 className="text-3xl font-display text-heading">Create Account</h1>
        <p className="text-muted text-sm">
          Join and start exploring top-rated films
        </p>

        <form className="space-y-4 text-left" action={action}>
          <div>
            <label className="block text-sm mb-1 text-muted">Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-panel-2/80 border-border/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
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
            Create Account
          </button>
        </form>

        <div className="text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="btn-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
