import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MovieCardList/MovieCardList';

import './SavedMovies.css';

export default function SavedMovies({
  isShortMovies,
  handleSearchSavedMovies,
  handleShortMovies,
  movies,
  moviesError,
  notFound,
  handleDeleteMovie,
}) {
  return (
    <section className='saved-movies'>
      <SearchForm
        isSavedMovies={true}
        isShortMovies={isShortMovies}
        handleShortMovies={handleShortMovies}
        handleSearchSavedMovies={handleSearchSavedMovies}
      />
      <MoviesCardList
        isSavedMovies={true}
        movies={movies}
        handleDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
}
