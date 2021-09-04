import './Checkbox.css';

export default function Checkbox() {
  return (
    <label className='filtercheckbox'>
      <input className='filtercheckbox__input' type='checkbox' />
      <span className='filtercheckbox__visible-input'></span>
      Короткометражки
    </label>
  );
}
