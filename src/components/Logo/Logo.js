import { NavLink } from 'react-router-dom';
import './Logo.css';

export default function Logo() {
  return (
    <NavLink
      className='logo-link'
      activeClassName='logo-link_active'
      to='/'
    ></NavLink>
  );
}
