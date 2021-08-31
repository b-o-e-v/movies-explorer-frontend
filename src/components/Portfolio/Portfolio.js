import Section from '../Section/Section'

import { PROJECTS } from '../../utils/constants'

import './Portfolio.css'

export default function Portfolio() {
  return (
    <Section title='Портфолио' light={true}>
      <ul className='portfolio'>
        {PROJECTS.map((project, index) => {
          return (
            <li key={index} className='portfolio__item'>
              <a href={project.link} className='portfolio__link'>{project.title}<span className='portfolio__arrow' /></a>
            </li>
          )
        })}
      </ul>
    </Section>
  );
}