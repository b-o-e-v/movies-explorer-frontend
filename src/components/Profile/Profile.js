import { NavLink } from 'react-router-dom';

import { useValidationForm } from '../../hooks/useValidationForm';

import './Profile.css';

export default function Profile() {
  const { handleErrors, errors, isValid } = useValidationForm();

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${'Александр'}!`}</h1>
      <form
        className='profile__form'
        name='profileForm'
        onSubmit={(e) => {
          e.preventDefault();
          console.log('форма отправлена');
        }}
      >
        <label htmlFor='name' className='profile__input-label'>
          Имя
          <input
            className='profile__input'
            id='name'
            autoComplete='off'
            type='text'
            name='name'
            placeholder='Введите имя'
            required
            minLength='2'
            onChange={handleErrors}
          />
        </label>
        <span className='auth__input-error'>{errors.name}</span>
        <label htmlFor='email' className='profile__input-label'>
          E-mail
          <input
            className='profile__input'
            id='email'
            autoComplete='off'
            type='email'
            name='email'
            placeholder='Введите email'
            required
            onChange={handleErrors}
          />
        </label>
        <span className='auth__input-error'>{errors.email}</span>
        <button
          className={`${
            isValid
              ? 'profile__form-submit'
              : 'profile__form-submit profile__form-submit_disabled'
          }`}
          type='submit'
          disabled={!isValid}
        >
          Редактировать
        </button>
      </form>
      <NavLink
        className='profile__signout-link'
        activeClassName='profile__signout-link_active'
        onClick={() => {
          console.log('вышли из аккаунта');
        }}
        to='/'
      >
        Выйти из аккаунта
      </NavLink>
    </section>
  );
}
