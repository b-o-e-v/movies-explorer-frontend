import { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';

import './SearchForm.css';

export default function SearchForm({
  isSavedMovies,
  isShortMovies,
  handleSearchMovies,
  handleSearchSavedMovies,
  handleShortMovies,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchMovies(searchInput);
  };

  const onSubmitSavedMovies = (e) => {
    e.preventDefault();
    handleSearchSavedMovies(searchInput);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setIsSearchFormValid(e.target.checkValidity());
  };

  return (
    <section className='search'>
      <form
        className='search__form'
        onSubmit={isSavedMovies ? onSubmitSavedMovies : onSubmit}
      >
        <fieldset className='search__fieldset'>
          <input
            className='search__input'
            type='text'
            name='search'
            placeholder='Фильм'
            onChange={handleChange}
            required
          />
          <button className='search__submit' type='submit'></button>
        </fieldset>
        <span
          className={`search__input-error ${
            isSearchFormValid ? 'search__input-error_hidden' : ''
          }`}
        >
          Это поле обязательно
        </span>
        <Checkbox
          handleShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
        />
      </form>
    </section>
  );
}
