import { render, screen } from "@testing-library/react";
import Card from "@/app/components/Card";
import { MovieType } from "@/app/types/MovieType";

describe("Card component", () => {
  const mockMovie: MovieType = {
    adult: false,
    backdrop_path: "/abc.jpg",
    id: 123,
    title: "Test Movie",
    original_title: "Test Movie Original",
    overview: "A test overview.",
    poster_path: "/poster.jpg",
    media_type: "movie",
    original_language: "en",
    genre_ids: [],
    popularity: 7.5,
    release_date: "2024-01-05",
    video: false,
    vote_average: 8.5,
    vote_count: 1200,
  };

  it("renders movie title and release year", () => {
    render(<Card movie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders fallback image if no poster_path", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: "" };
    render(<Card movie={movieWithoutPoster} />);
    const img = screen.getByAltText("Test Movie");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("posternotavailable.jpg");
  });
});
