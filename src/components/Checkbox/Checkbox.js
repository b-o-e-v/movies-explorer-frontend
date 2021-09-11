import './Checkbox.css';

export default function Checkbox({ handleShortMovies, isShortMovies }) {
  return (
    <label className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        onChange={handleShortMovies}
        checked={isShortMovies}
      />
      <span className='checkbox__visible-input'></span>
      Короткометражки
    </label>
  );
}
