import { useState } from 'react';

import './MoviesCard.css';

export default function MoviesCard({ movie, isSavedMovies }) {
  const [like, setLike] = useState(false);

  const film = {
    country: movie.country || 'Страна',
    director: movie.director || 'Режиссер',
    duration: movie.duration || 0,
    year: movie.year || 'Не указано',
    description: movie.description || 'Описание',
    image: movie.image,
    trailer: movie?.trailerLink,
    nameRU: movie.nameRU || 'Название',
    nameEN: movie.nameEN || 'Англ название',
    thumbnail: movie.thumbnail,
    movieId: movie.id,
  };

  const formattedTime = `${Math.trunc(film.duration / 60)}ч ${
    film.duration % 60
  }м`;

  return (
    <div className='card'>
      <div className='card___container'>
        <a
          className='card__image-link'
          href={movie.trailer}
          target='_blank'
          rel='noreferrer'
        >
          <img
            className='card__image'
            src={movie.image}
            alt='Картинка фильма'
          />
        </a>
        <div className='card__wrapper'>
          <h2 className='card__title'>{movie.nameRU}</h2>
          <button
            className={`card__btn 
            ${like && !isSavedMovies && 'active-btn-like'} 
            ${isSavedMovies && 'card__btn-del'}`}
            onClick={(e) => {
              isSavedMovies ? console.log('удалить') : setLike(!like);
            }}
            type='button'
          ></button>
        </div>
      </div>
      <p className='card__time'>{`${formattedTime}`}</p>
    </div>
  );
}
