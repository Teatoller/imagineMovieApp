import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
}

export const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const apiUrl = "https://www.omdbapi.com/?i=tt3896198&apikey=bd3b24c3";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {movie ? (
        <div>
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <p>Plot: {movie.Plot}</p>
          <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
