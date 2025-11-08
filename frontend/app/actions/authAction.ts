"use server";

import { cookies } from "next/headers";

export async function userSignUp(previousState: unknown, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    name,
    email,
    password,
  };

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
  const res = cookieStore.delete("session");
  return { res };
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
