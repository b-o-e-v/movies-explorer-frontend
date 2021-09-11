import Section from '../Section/Section';

import './AboutProject.css';

export default function AboutProject() {
  return (
    <Section title='О проекте'>
      <div className='about-project'>
        <div className='about-project__block'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__block'>
          <h3 className='about-project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-progress'>
        <div className='about-progress__back-end'>
          <div className='about-progress__back-end_time'>1 неделя</div>
          <div className='about-progress__back-end_title'>Back-end</div>
        </div>
        <div className='about-progress__front-end'>
          <div className='about-progress__front-end_time'>4 недели</div>
          <div className='about-progress__front-end_title'>Front-end</div>
        </div>
      </div>
    </Section>
  );
}
