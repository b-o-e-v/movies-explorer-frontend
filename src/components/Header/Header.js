import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <div className='header__root'>
        <Link to='/'><div className='header__logo' /></Link>
        <div>
          <Link to='#' className='header__link header__link_signup'>Регистрация</Link>
          <Link to='#' className='header__link header__link_signin'>Войти</Link>
        </div>
      </div>
    </header>
  );
}