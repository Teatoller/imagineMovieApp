import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
}

export const MovieDetails = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const apiUrl = "https://www.omdbapi.com/";
  const apiKey = "bd3b24c3";

  useEffect(() => {
    if (!searchText) {
      // Don't make a request if the search term is empty
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            apikey: apiKey,
            t: searchText,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  return (
    <div>
      <h3>MovieDetails</h3>

      <div>
        <label>
          Search Movie:
          <input type="text" value={searchText} onChange={handleSearchChange} />
        </label>
      </div>
      {movie ? (
        <div>
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <p>Plot: {movie.Plot}</p>
          <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        </div>
      ) : (
        // <p>Loading...</p>
        <p>
          {searchText ? "Movie not found" : "Enter a movie title to search"}
        </p>
      )}
    </div>
  );
};
