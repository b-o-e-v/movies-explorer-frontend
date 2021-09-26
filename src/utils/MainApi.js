class MainApi {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
  }

  _getOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }

  signup(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  getProfileInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  editProfileInfo(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  saveMovie(movie, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        director: movie.director,
        country: movie.country,
        year: movie.year,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        duration: movie.duration,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
      }),
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._getOriginalResponse(res);
    });
  }
}

const mainApi = new MainApi({
  url: 'https://api.bitfilms.boev.nomoredomains.monster',
});

export default mainApi;
