import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function App() {
  const history = useHistory();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  // Поиск фильма
  const [isLoading, setIsLoading] = useState(false);
  // Все фильмы
  const [apiMovies, setApiMovies] = useState([]);
  // Найденные фильмы
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [moviesError, setMoviesError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [editProfileMessage, setEditProfileMessage] = useState('');
  const [isSucced, setIsSucced] = useState(false);

  const register = (name, email, password) => {
    setIsSubmitting(true);
    mainApi
      .signup(name, email, password)
      .then((res) => {
        setRegisterMessage('');
        setIsSubmitting(false);
        history.push('/signin');
      })
      .catch((err) => {
        if (err === 'Error: 400 Bad Request') {
          setRegisterMessage('Данные невалидны');
        } else if (err === 'Error: 409 Conflict') {
          setRegisterMessage('Пользователь с таким email уже существует!');
        } else {
          setRegisterMessage('Что-то пошло не так, попробуйте ещё раз!');
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const login = (email, password) => {
    setIsSubmitting(true);
    mainApi
      .signin(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setToken(localStorage.getItem('jwt'));
        setLoginMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 'Error: 401 Unauthorized') {
          setLoginMessage('Неправильные почта или пароль!');
        } else {
          setLoginMessage('Что-то пошло не так, попробуйте ещё раз!');
        }
      });
  };

  const handleEditUserInfo = (name, email) => {
    mainApi
      .editProfileInfo(name, email, token)
      .then((res) => {
        if (res.message) {
          setEditProfileMessage(res.message);
          setIsSucced(false);
        }
        setCurrentUser(res);
        setEditProfileMessage('Данные успешно обновлены!');
        setIsSucced(true);
      })
      .catch((err) => {
        setEditProfileMessage('Произошла ошибка!');
        setIsSucced(false);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    setApiMovies([]);
    setMovies([]);
    setIsLoggedIn(false)
    history.push('/');
  }

  const handleShortMovies = (e) => {
    setIsShortMovies(e.target.checked);
  };

  const searchMoviesByKeyword = (movies, keyword) => {
    let foundMovies = [];

    movies.forEach((movie) => {
      if (movie.nameRU.indexOf(keyword) > -1) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    });

    return foundMovies;
  };

  const searchMovies = (keyword) => {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setMoviesError(false);

    if (apiMovies.length === 0) {
      getMovies()
        .then((resMovies) => {
          setApiMovies(resMovies);
          const searchResult = searchMoviesByKeyword(resMovies, keyword);

          if (searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            localStorage.setItem('movies', JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch((err) => {
          setMoviesError(true);
          setMovies([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const searchResult = searchMoviesByKeyword(apiMovies, keyword);

      if (searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else if (searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setIsLoading(false);
      } else {
        setMoviesError(true);
        setMovies([]);
      }
    }
  };

  const saveMovie = (movie) => {
    mainApi
      .saveMovie(movie, token)
      .then((data) => {
        const movies = [...savedMovies, data];
        setSavedMovies((prev) => [...prev, data]);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        console.log(apiMovies, data)
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const searchSavedMovies = (keyword) => {
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchResult = searchMoviesByKeyword(movies, keyword);
    setSavedMovies(searchResult);
  };

  const deleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId, token)
      .then((res) => {
        const filteredsavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId;
        });
        setSavedMovies(filteredsavedMovies);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(filteredsavedMovies)
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  const checkToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      const movies = JSON.parse(localStorage.getItem('movies'));
      setToken(token);
      mainApi
        .getProfileInfo(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setMovies(movies);
          history.push('/movies');
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  useEffect(() => {
    checkToken();
  }, [history, isLoggedIn, checkToken]);

  useEffect(() => {
    if(isLoggedIn) {
    mainApi.getSavedMovies(token)
      .then((res) => {
        const films = res.filter((item) => item.owner === currentUser._id)
        setSavedMovies(films);
      })
      .catch(err => console.log(err));
    }
  }, [location, currentUser._id, isLoggedIn, token])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute path='/profile' isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <Profile
              editProfileMessage={editProfileMessage}
              isSubmitting={isSubmitting}
              handleEditUserInfo={handleEditUserInfo}
              handleSignout={handleSignout}
              isSucced={isSucced}
            />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <Movies
              isShortMovies={isShortMovies}
              handleSearchMovies={searchMovies}
              handleShortMovies={handleShortMovies}
              movies={movies}
              isLoading={isLoading}
              moviesError={moviesError}
              notFound={notFound}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
              isShortMovies={isShortMovies}
              handleSearchSavedMovies={searchSavedMovies}
              handleShortMovies={handleShortMovies}
              movies={savedMovies}
              moviesError={moviesError}
              notFound={notFound}
              deleteMovie={deleteMovie}
            />
            <Footer />
          </ProtectedRoute>
          <Route path='/signup'>
            <Register
              register={register}
              errorMessage={registerMessage}
              isSubmitting={isSubmitting}
            />
          </Route>
          <Route path='/signin'>
            <Login
              login={login}
              errorMessage={loginMessage}
              isSubmitting={isSubmitting}
            />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
