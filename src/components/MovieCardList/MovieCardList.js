import { useState, useEffect } from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MovieCardList.css';

export default function MoviesCardList({
  isLoading,
  movies,
  moviesError,
  notFound,
  saveMovie,
  deleteMovie,
  isSavedMovies,
}) {
  const [initialCardsAmount, setInitialCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 5;
    } else if (size < 920) {
      return 8;
    } else if (size < 1279) {
      return 12;
    } else if (size > 1279) {
      return 12;
    }
  });

  const [addCardsAmount, setAddMoreCardsAmount] = useState(() => {
    const size = window.innerWidth;
    if (size < 720) {
      return 2;
    } else if (size < 920) {
      return 2;
    } else if (size < 1279) {
      return 3;
    } else if (size > 1279) {
      return 4;
    }
  });

  const handleResize = () => {
    const size = window.innerWidth;
    if (size < 720) {
      setInitialCardsAmount(5);
      setAddMoreCardsAmount(2);
    } else if (size < 920) {
      setInitialCardsAmount(8);
      setAddMoreCardsAmount(2);
    } else if (size < 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(3);
    } else if (size > 1279) {
      setInitialCardsAmount(12);
      setAddMoreCardsAmount(4);
    }
  };

  const handleAddMovies = () => {
    setInitialCardsAmount((prev) => prev + addCardsAmount);
  };

  const renderedMovies = movies && movies.slice(0, initialCardsAmount);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <section className='movies-list'>
      <Preloader isLoading={isLoading} />
      <span className={`movies-list__error ${moviesError ? '' : 'hidden'}`}>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен.
      </span>
      <span className={`movies-list__not-found ${notFound ? '' : 'hidden'}`}>
        Ничего не найдено :(
      </span>
      <span
        className={`movies-list__no-saved-films ${
          isSavedMovies && movies.length === 0 ? '' : 'hidden'
        }`}
      >
        Вы ещё ничего не сохраняли
      </span>
      <ul className='movies-list__items'>
        {renderedMovies &&
          renderedMovies.map((movie) => {
            return (
              <li
                key={movie.movieId || movie.id}
                className='movies-list__list-item'
              >
                <MoviesCard
                  movie={movie}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  isSavedMovies={isSavedMovies}
                />
              </li>
            );
          })}
      </ul>
      <button
        className={
          isSavedMovies
            ? 'movies-list__add-btn movies-list__add-btn_disabled'
            : `movies-list__add-btn ${
              !movies || (movies && movies.length === renderedMovies.length)
                  ? ' movies-list__add-btn_disabled'
                  : ''
              }`
        }
        onClick={handleAddMovies}
      >
        Ещё
      </button>
    </section>
  );
}
