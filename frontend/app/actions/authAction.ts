"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { UserZodSchema } from "../zod/authValidationZod";
import { ZodError } from "zod";

export async function userSignUp(previousState: unknown, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    name,
    email,
    password,
  };

  try {
    UserZodSchema.parse(payload);
  } catch (zodError) {
    if (zodError instanceof ZodError) {
      const validationErrors = new Map<PropertyKey, string[]>();
      for (const issue of zodError.issues) {
        const path = issue.path[0];
        if (validationErrors.has(path)) {
          const existingErrors = [
            ...validationErrors.get(path)!,
            issue.message,
          ];
          validationErrors.set(path, existingErrors);
        } else {
          validationErrors.set(path, [issue.message]);
        }
      }

      return {
        success: false,
        errors: validationErrors,
      };
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (res.ok && data.token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return { success: true, user: data.user };
  } else {
    console.error("Signup failed", data);
    return { success: false, error: data.message || "Signup failed" };
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");
  return token;
}

export async function signOutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}

export async function userSignIn(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  console.log(data);

  if (res.ok && data.token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return { success: true, user: data.user };
  } else {
    console.error("Login failed", data);
    return { success: false, error: data.message || "Login failed" };
  }
}

export async function getUserByToken(token: RequestCookie) {
  const userToken = {
    token,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/retrieve-user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
    }
  );

  const data = await res.json();

  if (res.ok) {
    return { success: true, user: data.user };
  } else {
    return { success: false, error: data.error };
  }
}
