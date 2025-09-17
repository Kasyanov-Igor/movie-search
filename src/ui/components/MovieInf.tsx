import React from 'react';
import { Movie } from '../../domain/models/movie';

export const MovieDetails: React.FunctionComponent<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="bg-light p-3">
      <div className="row">
        <div className="col-md-8">
          <h2 className="m-3 text-primary"><b>{movie.title}</b></h2>
          <p className="m-3"><b>Year:</b> {movie.year}</p>
          <p className="m-3"><b>Type:</b> {movie.Type}</p>
          <p className="m-3"><b>ID:</b> {movie.id}</p>
          {movie.Rated && <p className="m-3"><b>Rated:</b> {movie.Rated}</p>}
          {movie.Released && <p className="m-3"><b>Released:</b> {movie.Released}</p>}
          {movie.Runtime && <p className="m-3"><b>Runtime:</b> {movie.Runtime}</p>}
          {movie.Genre && <p className="m-3"><b>Genre:</b> {movie.Genre}</p>}
          {movie.Director && <p className="m-3"><b>Director:</b> {movie.Director}</p>}
          {movie.Writer && <p className="m-3"><b>Writer:</b> {movie.Writer}</p>}
          {movie.Actors && <p className="m-3"><b>Actors:</b> {movie.Actors}</p>}
          {movie.Plot && <p className="m-3"><b>Plot:</b> {movie.Plot}</p>}
          {movie.Language && <p className="m-3"><b>Language:</b> {movie.Language}</p>}
          {movie.Country && <p className="m-3"><b>Country:</b> {movie.Country}</p>}
          {movie.Awards && <p className="m-3"><b>Awards:</b> {movie.Awards}</p>}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="m-3">
              <b>Ratings:</b>
              <ul>
                {movie.Ratings.map((rating, index) => (
                  <li key={index}>{rating.Source}: {rating.Value}</li>
                ))}
              </ul>
            </div>
          )}
          {movie.Metascore && <p className="m-3"><b>Metascore:</b> {movie.Metascore}</p>}
          {movie.imdbRating && <p className="m-3"><b>IMDB Rating:</b> {movie.imdbRating}</p>}
          {movie.imdbVotes && <p className="m-3"><b>IMDB Votes:</b> {movie.imdbVotes}</p>}
          {movie.DVD && <p className="m-3"><b>DVD:</b> {movie.DVD}</p>}
          {movie.BoxOffice && <p className="m-3"><b>Box Office:</b> {movie.BoxOffice}</p>}
          {movie.Production && <p className="m-3"><b>Production:</b> {movie.Production}</p>}
          {movie.Website && <p className="m-3"><b>Website:</b> <a href={movie.Website} target="_blank" rel="noopener noreferrer">{movie.Website}</a></p>}
          {movie.Response && <p className="m-3"><b>Response:</b> {movie.Response}</p>}
        </div>
        <div className="col-md-4 text-center">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.title} Poster`} className="img-fluid" style={{ maxHeight: '400px' }} />
          ) : (
            <p>No Poster Available</p>
          )}
        </div>
      </div>
    </div>
  );
};