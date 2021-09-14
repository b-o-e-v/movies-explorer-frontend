import { NavLink } from 'react-router-dom';

import { useValidationForm } from '../../hooks/useValidationForm';
import Logo from '../Logo/Logo';

import '../Form/Form.css';

export default function Register({ onRegister, errorMessage, isSubmitting }) {
  const { values, handleErrors, errors, isValid } = useValidationForm();

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  };

  return (
    <section className='form'>
      <div className='form__wrapper'>
        <Logo />
        <h2 className='form__title'>Добро пожаловать!</h2>
        <form className='form__form' onSubmit={handleRegister}>
          <fieldset className='form__fieldset register__fieldset'>
            <label htmlFor='name' className='form__label'>
              Имя
              <input
                className='form__input'
                autoComplete='off'
                type='text'
                name='name'
                id='name'
                minLength='2'
                required
                onChange={handleErrors}
                disabled={isSubmitting}
              />
              <span className='form__input-error'>{errors.name}</span>
            </label>
            <label htmlFor='email' className='form__label'>
              E-mail
              <input
                className='form__input'
                autoComplete='off'
                type='email'
                name='email'
                id='email'
                required
                onChange={handleErrors}
                disabled={isSubmitting}
              />
              <span className='form__input-error'>{errors.email}</span>
            </label>
            <label htmlFor='password' className='form__label'>
              Пароль
              <input
                className='form__input'
                autoComplete='off'
                type='password'
                name='password'
                id='password'
                required
                onChange={handleErrors}
                minLength='6'
                disabled={isSubmitting}
              />
              <span className='form__input-error'>{errors.password}</span>
            </label>
          </fieldset>
          <span className='form__submit-error'>{errorMessage}</span>
          <button
            className={`${
              isValid ? 'form__submit' : 'form__submit form__submit_disabled'
            }`}
            type='submit'
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className='form__tip'>
          Уже зарегистрированы?{' '}
          <NavLink
            className='form__link'
            activeClassName='register__link_active'
            to='/signin'
          >
            Войти
          </NavLink>
        </p>
      </div>
    </section>
  );
}
