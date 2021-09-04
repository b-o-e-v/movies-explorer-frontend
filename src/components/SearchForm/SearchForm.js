import { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';

import './SearchForm.css';

export default function SearchForm() {
  const [searchInput, setSearchInput] = useState('');

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <section className='search'>
      <form
        className='search__form'
        onSubmit={(e) => {
          e.preventDefault();
          console.log(searchInput);
        }}
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
        <Checkbox />
      </form>
    </section>
  );
}
