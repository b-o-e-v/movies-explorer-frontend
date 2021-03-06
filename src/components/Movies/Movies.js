import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MovieCardList/MovieCardList';

import './Movies.css';

export default function Movies({
  isShortMovies,
  handleSearchMovies,
  handleShortMovies,
  movies,
  isLoading,
  moviesError,
  notFound,
  saveMovie,
  deleteMovie,
}) {
  return (
    <section className='movies'>
      <SearchForm
        isShortMovies={isShortMovies}
        handleSearchMovies={handleSearchMovies}
        handleShortMovies={handleShortMovies}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={movies}
        moviesError={moviesError}
        notFound={notFound}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      />
    </section>
  );
}
