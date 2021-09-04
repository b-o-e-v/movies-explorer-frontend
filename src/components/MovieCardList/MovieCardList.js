// import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIES } from '../../utils/movies';

import './MovieCardList.css';

export default function MoviesCardList({ isSavedMovies }) {
  return (
    <section className='movies-list'>
      {/* <Preloader /> */}
      <ul className='movies-list__items'>
        {MOVIES &&
          MOVIES.map((movie) => {
            return (
              <li key={movie.movieId} className='movies-list__list-item'>
                <MoviesCard movie={movie} isSavedMovies={isSavedMovies} />
              </li>
            );
          })}
      </ul>
      <button
        className={`movies-list__add-btn ${
          isSavedMovies && 'movies-list__add-btn_disabled'
        }`}
        onClick={() => {
          console.log('нажали кнопо4ку');
        }}
      >
        Ещё
      </button>
    </section>
  );
}
