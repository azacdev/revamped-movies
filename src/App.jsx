import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./component/MovieCard";

const API_URL = 'https://www.omdbapi.com?apikey=d3a3903a';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSeacrhTerm] = useState('');
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    
    setMovies(data.Search)
  }
  
  useEffect(() => { 
    searchMovies('')
  }, []);

  return (
    <div className="app">
      <h1>RevampedMovie</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSeacrhTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      
    </div>
  )
}

export default App
