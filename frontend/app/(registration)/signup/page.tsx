"use client";

import { userSignUp } from "@/app/actions/authAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const SignupPage = () => {
  const [data, action, isPending] = useActionState(userSignUp, undefined);
  const router = useRouter();
  const [validationErrors, setValidationErrors] =
    useState<Map<PropertyKey, string[]>>();

  useEffect(() => {
    if (data?.success) {
      router.refresh();
      window.location.href = "/";
    } else if (data?.errors) {
      queueMicrotask(() => setValidationErrors(data.errors));
    }
  }, [data, router]);

  const getErrors = (field: string) =>
    validationErrors?.get(field)?.map((msg, i) => (
      <p key={i} className="text-red-400 text-sm mt-1">
        {msg}
      </p>
    ));

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
            {getErrors("name")}
          </div>
          <div>
            <label className="block text-sm mb-1 text-muted">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-panel-2/80 border-border/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {getErrors("email")}
          </div>
          <div>
            <label className="block text-sm mb-1 text-muted">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-panel-2/80 border-border/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {getErrors("password")}
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-4"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Account"}
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
