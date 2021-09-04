import { SOCIALS } from '../../utils/constants';

import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__vendors'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__bottom-row'>
        <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a
              className='footer__link'
              href='https://praktikum.yandex.ru/'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          {SOCIALS.map((link, index) => {
            return (
              <li className='footer__links-item' key={index}>
                <a
                  key={index}
                  href={link.url}
                  className='footer__link'
                  target='_blank'
                  rel='noreferrer'
                >
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
