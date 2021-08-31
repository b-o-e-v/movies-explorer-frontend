import NavTab from '../NavTab/NavTab'

import './Promo.css'

export default function Promo() {
  return (
    <div className='promo'>
      <div className='promo_inner'>
        <h1 className='promo__title'>Учебный проект студента факультета <span className='promo__faculty'>Веб-разработки.</span></h1>
        <p className='promo__desc'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <NavTab />
      </div>
    </div>
  );
}