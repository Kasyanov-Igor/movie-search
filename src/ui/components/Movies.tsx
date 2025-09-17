import React from 'react';
import { Movie } from '../../domain/models/movie';

export const CurrentMovie: React.FunctionComponent<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="bg-light p-3">
      <div className="row">
        <div className="col-md-8">
          <h4 className="m-3 text-primary"><b>{movie.title}</b></h4>
          <p className="m-3"><b>Year:</b> {movie.year}</p>
          <p className="m-3"><b>Type:</b> {movie.Type}</p>
          <p className="m-3"><b>ID:</b> {movie.id}</p>
        </div>
        <div className="col-md-4 text-center">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.title} Poster`} className="img-fluid" style={{ maxHeight: '200px' }} />
          ) : (
            <p>No Poster Available</p>
          )}
        </div>
      </div>
    </div>
  );
};
