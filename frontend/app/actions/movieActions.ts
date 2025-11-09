export async function getLikedMovies(likedMovies: number[]) {
  const payload = {
    likedMovies,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/movies-by-ids`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (res.ok) {
    return { success: true, movies: data.movies };
  } else {
    return { success: false, error: data.error };
  }
}
