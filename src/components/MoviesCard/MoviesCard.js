import { useState, useEffect, useCallback } from 'react';
import image from '../../images/jpg/notFoundImage.jpeg';

import './MoviesCard.css';

export default function MoviesCard({
  movie,
  saveMovie,
  deleteMovie,
  isSavedMovies,
}) {
  const [isSaved, setIsSaved] = useState(false);

  const film = {
    country: movie.country || 'Страна',
    director: movie.director || 'Режиссер',
    duration: movie.duration || 0,
    year: movie.year || 'Не указано',
    description: movie.description || 'Описание',
    image: movie.image
      ? movie.image.url
        ? `https://api.nomoreparties.co${movie.image.url}`
        : movie.image
      : image,
    trailer: movie?.trailerLink,
    nameRU: movie.nameRU || 'Название',
    nameEN: movie.nameEN || 'Title',
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
    movieId: movie.id,
  };

  const formattedTime = `${Math.trunc(film.duration / 60)}ч ${
    film.duration % 60
  }м`;

  const isLikedMovie = useCallback(() => {
    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (savedMovies.some((mov) => mov.nameRU === movie.nameRU)) {
        setIsSaved(true);
      }
    }
  }, [movie.nameRU]);

  const handleSaveMovie = () => {
    saveMovie(film);
    console.log(film);
    setIsSaved(true);
  };

  const handleDeleteMovie = () => {
    setIsSaved(false);
    console.log(movie._id)
    deleteMovie(movie._id);
  };

  const handleDislikeMovie = () => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const card = savedMovies.find((mov) => mov.nameRU === movie.nameRU);
    handleDeleteMovie(card._id);
    setIsSaved(false);
  };

  useEffect(() => {
    isLikedMovie();
  }, [isLikedMovie]);

  return (
    <div className='card'>
      <div className='card___container'>
        <a
          className='card__image-link'
          href={film.trailer}
          target='_blank'
          rel='noreferrer'
        >
          <img className='card__image' src={film.image} alt='Картинка фильма' />
        </a>
        <div className='card__wrapper'>
          <h2 className='card__title'>{film.nameRU}</h2>
          {isSavedMovies ? (
            <button
              className='card__btn card__btn-del'
              type='button'
              onClick={handleDeleteMovie}
            ></button>
          ) : (
            <button
              className={isSaved ? 'card__btn active-btn-like' : 'card__btn'}
              onClick={!isSaved ? handleSaveMovie : handleDislikeMovie}
              type='button'
            />
          )}
        </div>
      </div>
      <p className='card__time'>{`${formattedTime}`}</p>
    </div>
  );
}
