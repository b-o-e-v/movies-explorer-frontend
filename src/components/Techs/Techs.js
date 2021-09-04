import Section from '../Section/Section';

import { TECHS } from '../../utils/constants';

import './Techs.css';

export default function Techs() {
  return (
    <div className='techs'>
      <Section title='Технологии'>
        <h3 className='techs__subtitle'>{TECHS.length} технологий</h3>
        <p className='techs__desc'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__list'>
          {TECHS.map((tech, index) => {
            return (
              <li key={index} className='techs__item'>
                {tech}
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
