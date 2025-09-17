import { Movie } from '../models/movie';

export interface IWeatherService {
    GetMovieFromAPI(): Promise<{ current: Movie}>;
    RenderMovie(): void;
}