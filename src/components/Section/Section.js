import './Section.css';

export default function Section({title, children, light}) {
  return (
    <section className={`section ${light ? 'section_light' : ''}`}>
      <h2 className='section__title'>{title}</h2>
      {children}
    </section>
  )
}
