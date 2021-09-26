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
  const pathname = location.pathname;

  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiMovies, setApiMovies] = useState([]);
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

  const handleShortMovies = (e) => {
    setIsShortMovies(e.target.checked);
  };

  const onLogin = (email, password) => {
    setIsSubmitting(true);
    mainApi
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          history.push('/movies');
          mainApi
            .getProfileInfo(data.token)
            .then((user) => {
              setCurrentUser(user);
              mainApi
                .getSavedMovies(data.token)
                .then((res) => {
                  const films = res.filter((item) => item.owner === user._id);
                  setSavedMovies(films);
                  localStorage.setItem('savedMovies', JSON.stringify(films));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(`Error: ${err}`));
        }
      })
      .catch((err) => {
        if (err === 'Error: 401 Unauthorized') {
          setLoginMessage('Неправильные почта или пароль!');
        } else {
          setLoginMessage('Что-то пошло не так, попробуйте ещё раз!');
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onRegister = (name, email, password) => {
    setIsSubmitting(true);
    mainApi
      .signup(name, email, password)
      .then((res) => {
        if (res._id) {
          onLogin(email, password);
        }
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

  const handleEditUserInfo = (name, email) => {
    mainApi
      .editProfileInfo(name, email, token)
      .then((res) => {
        if (res.message) {
          setEditProfileMessage(res.message);
          setIsSucced(false);
        }
        if (res._id) {
          setCurrentUser(res);
          setEditProfileMessage('Данные успешно обновлены!');
          setIsSucced(true);
        }
      })
      .catch((err) => {
        setEditProfileMessage('Произошла ошибка!');
        setIsSucced(false);
      });
  };

  const clearAllErrors = () => {
    setLoginMessage('');
    setRegisterMessage('');
    setNotFound(false);
    setEditProfileMessage('');
  };

  const handleSignout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setIsLoggedIn(false);
    setApiMovies([]);
    setMovies([]);
    setSavedMovies([]);
    clearAllErrors();
    history.push('/');
  };

  const searchMoviesByKeyword = (movies, keyword) => {
    const foundMovies = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
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
        .then((res) => {
          setApiMovies(res);
          setMovies(res);
          const searchResult = searchMoviesByKeyword(res, keyword);

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
    const token = localStorage.getItem('jwt');
    const movies = localStorage.getItem('movies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (token) {
      setToken(token);
      if (movies) {
        const result = JSON.parse(movies);
        setMovies(result);
      }
      if (savedMovies) {
        const res = JSON.parse(savedMovies);
        setSavedMovies(res);
      }
      mainApi
        .getProfileInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          history.push(pathname);
        })
        .catch((err) => console.log(err));
    }
  }, [history, pathname]);

  useEffect(() => {
    checkToken();
  }, []);

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
              onRegister={onRegister}
              errorMessage={registerMessage}
              isSubmitting={isSubmitting}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onLogin={onLogin}
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
