import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MovieCardList/MovieCardList';

import './Movies.css';

export default function Movies() {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}
