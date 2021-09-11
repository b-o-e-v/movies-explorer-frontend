import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { getMovies } from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

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
  const history = useHistory();
  // Поиск фильма
  const [isLoading, setIsLoading] = useState(false);
  // Все фильмы
  const [apiMovies, setApiMovies] = useState([]);
  // Найденные фильмы
  const [movies, setMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [moviesError, setMoviesError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleShortMovies = (e) => {
    setIsShortMovies(e.target.checked);
  }

  const searchMoviesByKeyword = (movies, keyword) => {
    let foundMovies = [];
  
    movies.forEach((movie) => {
      if(movie.nameRU.indexOf(keyword) > -1) {
        if(isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        }
        else {
          foundMovies.push(movie);
        }
      }
    })
  
    return foundMovies;
  }

  const searchMovies = (keyword) => {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setMoviesError(false);
  
    if(apiMovies.length === 0) {
      getMovies()
      .then(resMovies => {
        setApiMovies(resMovies);
        const searchResult = searchMoviesByKeyword(resMovies, keyword);
  
        if(searchResult.length === 0) {
          setNotFound(true);
          setMovies([]);
        }
        else {
          localStorage.setItem('movies', JSON.stringify(searchResult));
          setMovies(JSON.parse(localStorage.getItem('movies')));
        }
      })
      .catch(err => {
        setMoviesError(true);
        setMovies([]);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
    else {
      const searchResult = searchMoviesByKeyword(apiMovies, keyword);
  
      if(searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      }
      else if(searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setIsLoading(false);
      }
      else {
        setMoviesError(true);
        setMovies([]);
      }
    }
  }

  const checkToken = useCallback(() => {
    // Потом удалить
    const movies = JSON.parse(localStorage.getItem('movies'));
    setMovies(movies);

    if(localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      const movies = JSON.parse(localStorage.getItem('movies'));
      setToken(token);
      mainApi.getProfileInfo(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setMovies(movies);
          history.push('/movies')
        })
        .catch(err => console.log(err));
    }
  }, [history])

  useEffect(() => {
    checkToken();
  }, [history, isLoggedIn, checkToken])

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
          <Movies
            isShortMovies={isShortMovies}
            handleSearchMovies={searchMovies}
            handleShortMovies={handleShortMovies}
            movies={movies}
            isLoading={isLoading}
            moviesError={moviesError}
            notFound={notFound}
            // handleSaveMovie={handleSaveMovie}
            // handleDeleteMovie={handleDeleteMovie}
          />
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
