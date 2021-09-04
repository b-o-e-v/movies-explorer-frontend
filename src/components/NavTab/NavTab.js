import { Link } from 'react-router-dom';

import './NavTab.css';

export default function NavTab() {
  return (
    <Link to='/movies' className='navTab__link'>
      Узнать больше
    </Link>
  );
}
