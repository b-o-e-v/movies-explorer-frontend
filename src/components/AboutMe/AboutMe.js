import Section from '../Section/Section';

import avatar from '../../images/jpg/avatar.jpg';
import { ABOUTME, SOCIALS } from '../../utils/constants';

import './AboutMe.css';

export default function AboutMe() {
  return (
    <Section title={ABOUTME.status}>
      <div className='about-me'>
        <div>
          <h3 className='about-me__name'>{ABOUTME.name}</h3>
          <p className='about-me__education'>{ABOUTME.education}</p>
          <p className='about-me__about'>{ABOUTME.about}</p>
          <ul className='about-me__links'>
            {SOCIALS.map((link, index) => {
              return (
                <li key={index}>
                  <a
                    href={link.url}
                    className='about-me__link'
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
        <img className='about-me__avatar' src={avatar} alt='avatar' />
      </div>
    </Section>
  );
}
