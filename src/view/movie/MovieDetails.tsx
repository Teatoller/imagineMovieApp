import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export const MovieDetails = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const apiUrl = "https://www.omdbapi.com/";
  const apiKey = "bd3b24c3";
  const defaultMovieId = 'tt3896198';

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
      console.error('Error fetching default movie:', error);
    }
  };

  useEffect(() => {
    // Fetch the default movie when the component mounts
    fetchDefaultMovie(); 
  }, []);

  useEffect(() => {
    if (!searchText) {
        fetchDefaultMovie()
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
      <h3>MovieDetails</h3>

      <div>
        <label>
          Search Movie:
          <input type="text" value={searchText} onChange={handleSearchChange} />
        </label>
      </div>
      {movies.length > 0 ? (
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            </div>
          ))}
        </div>
      ) : (
        <p>{searchText ? 'No movies found' : 'Enter a movie title to search'}</p>
      )}
    </div>
  );
};
