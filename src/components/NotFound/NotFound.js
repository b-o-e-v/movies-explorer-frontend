import { useHistory } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  const history = useHistory();
  const handleClickLink = () => {
    history.goBack();
    console.log(history)
  };

  return (
    <section className='not-found'>
      <div className='not-found__text'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__subtitle'>Страница не найдена</p>
      </div>
      <button className='not-found__link' onClick={handleClickLink}>
        Назад
      </button>
    </section>
  );
}
