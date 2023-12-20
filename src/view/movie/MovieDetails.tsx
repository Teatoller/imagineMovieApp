import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieDetails.css";
import { Header } from "../header/Header";

interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Type: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}

export const MovieDetails = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiUrl = "https://www.omdbapi.com/";
  const apiKey = "bd3b24c3";
  const defaultMovieId = "tt3896198";

  const fetchDefaultMovie = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          apikey: apiKey,
          i: defaultMovieId,
        },
      });

      setMovies([response.data]);
    } catch (error) {
      console.error("Error fetching default movie:", error);
    }
  };

  useEffect(() => {
    fetchDefaultMovie();
  }, []);

  useEffect(() => {
    if (!searchText) {
      fetchDefaultMovie();
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            apikey: apiKey,
            s: searchText,
          },
        });
        setMovies(response.data.Search || []);
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
       <Header searchText={searchText} handleSearchChange={handleSearchChange} />
      {movies.length > 0 ? (
        <>
          {movies.map((movie) => (
            <div className="movie-detail" key={movie.imdbID}>
              <div>
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />{" "}
                <p>Year: {movie.Year}</p>
                <p>
                  <span>{movie.Rated}</span> {movie.Genre}
                </p>
                <p>Plot: {movie?.Plot}</p>
              </div>

              <div>
                <h3>MovieDetails</h3>
                <p>Cast: {movie.Actors}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>
          {searchText ? "No movies found" : "Enter a movie title to search"}
        </p>
      )}
    </div>
  );
};
