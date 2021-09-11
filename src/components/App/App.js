import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';

import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function App() {
  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Header isLoggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute path='/profile'>
          <Header isLoggedIn={true} />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/movies'>
          <Header isLoggedIn={true} />
          <Movies />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path='/saved-movies'>
          <Header isLoggedIn={true} />
          <SavedMovies />
          <Footer />
        </ProtectedRoute>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
