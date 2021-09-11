import { NavLink } from 'react-router-dom';

import { useValidationForm } from '../../hooks/useValidationForm';
import Logo from '../Logo/Logo';

import '../Form/Form.css';

export default function Login() {
  const { handleErrors, errors, isValid } = useValidationForm();

  return (
    <section className='form'>
      <div className='form__wrapper'>
        <Logo />
        <h2 className='form__title'>Рады видеть!</h2>
        <form
          className='form__form'
          onSubmit={() => {
            console.log('вы вошли');
          }}
        >
          <fieldset className='form__fieldset login__fieldset'>
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
                minLength='4'
              />
              <span className='form__input-error'>{errors.password}</span>
            </label>
          </fieldset>
          <button
            className={`${
              isValid ? 'form__submit' : 'form__submit form__submit_disabled'
            }`}
            disabled={!isValid}
            type='submit'
          >
            Войти
          </button>
        </form>
        <p className='form__tip'>
          Ещё не зарегистрированы?{' '}
          <NavLink
            className='form__link'
            activeClassName='register__link_active'
            to='/signup'
          >
            Регистрация
          </NavLink>
        </p>
      </div>
    </section>
  );
}
