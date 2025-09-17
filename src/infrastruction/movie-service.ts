import { Movie } from '../domain/models/movie';

export class MovieService {

    public async GetMoviesByName(
        nameMovie: string,
        numberPage: number
    ): Promise<{ movies: Movie[]; totalResults: number }> {
        
        const url = `https://www.omdbapi.com/?s=${nameMovie}&page=${numberPage}&apikey=7e8d752`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.Response === 'False' || !data.Search) {
                // Если фильмов нет или API вернул ошибку, возвращаем пустой массив и 0 результатов
                return { movies: [], totalResults: 0 };
            }

            const movies: Movie[] = data.Search.map((item: any) => ({
                title: String(item.Title),
                year: Number(item.Year) || 0,
                id: String(item.imdbID) || 0,
                Type: item.Type || '',
                sunset: 0,
                Poster: item.Poster || '',
            }));

            const totalResults = parseInt(data.totalResults) || 0;

            return { movies, totalResults };
        } catch (error) {
            console.error('Ошибка при получении фильмов:', error);
            return { movies: [], totalResults: 0 };
        }
    }

    public async GetMovieId(
        movieId: string
    ): Promise<Movie> {
        const url = `https://www.omdbapi.com/?i=${movieId}&apikey=7e8d752`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.Response === 'False') {
                throw new Error(data.Error || 'Фильм не найден');
            }

            const movie: Movie = {
                title: data.Title || '',
                year: Number(data.Year) || 0,
                id: data.imdbID || '',
                Type: data.Type || '',
                Poster: data.Poster || '',
                Rated: data.Rated,
                Released: data.Released,
                Runtime: data.Runtime,
                Genre: data.Genre,
                Director: data.Director,
                Writer: data.Writer,
                Actors: data.Actors,
                Plot: data.Plot,
                Language: data.Language,
                Country: data.Country,
                Awards: data.Awards,
                Ratings: data.Ratings || [],
                Metascore: data.Metascore,
                imdbRating: data.imdbRating,
                imdbVotes: data.imdbVotes,
                DVD: data.DVD,
                BoxOffice: data.BoxOffice,
                Production: data.Production,
                Website: data.Website,
                Response: data.Response,
            };

            return movie;
        } catch (error) {
            console.error('Ошибка при получении информации о фильме:', error);
            throw error;  // Или вернуть null, в зависимости от логики приложения
        }
    }
}


