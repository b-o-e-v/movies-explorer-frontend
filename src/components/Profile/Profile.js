import { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useValidationForm } from '../../hooks/useValidationForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

export default function Profile({
  handleSignout,
  editProfileMessage,
  isSubmitting,
  handleEditUserInfo,
  isSucced,
}) {
  const { values, handleErrors, errors, isValid } = useValidationForm();

  const currentUser = useContext(CurrentUserContext);

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleEditUserInfo(
      values.name || currentUser.name,
      values.email || currentUser.email
    );
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет ${
        currentUser.name ? currentUser.name : ''
      }!`}</h1>
      <form
        className='profile__form'
        name='profileForm'
        onSubmit={handleSubmit}
      >
        <label htmlFor='name' className='profile__input-label'>
          Имя
          <input
            className='profile__input'
            id='name'
            autoComplete='off'
            type='text'
            name='name'
            ref={inputRef}
            placeholder='Введите имя'
            required
            minLength='2'
            onChange={handleErrors}
            disabled={isSubmitting}
            defaultValue={currentUser.name ? currentUser.name : ''}
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
            ref={inputRef}
            placeholder='Введите email'
            required
            onChange={handleErrors}
            disabled={isSubmitting}
            defaultValue={currentUser.email ? currentUser.email : ''}
          />
        </label>
        <span className='auth__input-error'>{errors.email}</span>
        <span className={`profile__form-message ${isSucced ? 'profile__form-message_succeed' : 'profile__form-message_error'}`}>{editProfileMessage}</span>
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
        onClick={handleSignout}
        to='/'
      >
        Выйти из аккаунта
      </NavLink>
    </section>
  );
}
