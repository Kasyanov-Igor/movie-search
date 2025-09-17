import React, { useState, useEffect } from 'react';
import { CurrentMovie } from './Movies';
import { Movie } from '../../domain/models/movie';
import { MovieDetails } from './MovieInf';
import { MovieService } from '../../infrastruction/movie-service';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const movieService = new MovieService(); // Убедитесь, что MovieService импортирован

  const fetchData = async (term: string, page: number) => {
    if (!term.trim()) return;
    setLoading(true);
    setError(null);
    setSelectedMovie(null); // Сброс выбранного фильма при новом поиске
    try {
      const { movies, totalResults } = await movieService.GetMoviesByName(term, page);
      setMovies(movies);
      setTotalResults(totalResults);
      setCurrentPage(page); // Устанавливаем текущую страницу
    } catch (err) {
      setError("Failed to fetch movie data. Please try again.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Сбрасываем на первую страницу при новом поиске
    fetchData(searchTerm, 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(searchTerm, page);
  };

  const handleMovieClick = async (movieId: string) => {
    setLoadingDetails(true);
    setErrorDetails(null);
    try {
      const movie = await movieService.GetMovieId(movieId);
      setSelectedMovie(movie);
    } catch (err) {
      setErrorDetails('Failed to fetch movie details.');
      setSelectedMovie(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10); // 10 результатов на страницу

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Movie Search</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter movie title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-center">Loading movie data...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {loadingDetails && <p className="text-center">Loading movie details...</p>}
      {errorDetails && <p className="text-center text-danger">{errorDetails}</p>}
      {selectedMovie && !loadingDetails && !errorDetails && (
        <MovieDetails movie={selectedMovie} />
      )}

      {!loading && !error && (
        <>
          <hr />
          {movies.length > 0 ? (
            <>
              <p className="text-center">
                Results: {totalResults} | Page {currentPage} of {totalPages}
              </p>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <CurrentMovie movie={movie} />
                </div>
              ))}

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">No movies found. Try a different title.</p>
          )}
          <hr />
        </>
      )}
    </div>
  );
};

export default App;
