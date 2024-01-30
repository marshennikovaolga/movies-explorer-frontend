    // next sprint
    class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка checkResponse: ${res.status}`);
    }

    register(username, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
          }),
        })
          .then((res) => this._checkResponse(res))
          .catch((err) => {
            console.error(`Ошибка при регистрации: ${err}`);
            return err;
          });
      }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => this._checkResponse(res))
            .then((data) => {
                if (data.token) {
                    const token = data.token;
                    localStorage.setItem('jwt', token);
                    return token;
                }
            });
    }

    getUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => this._checkResponse(res));
    }

    setUserInfo(username, email, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username,
                email: email
            })
        })
        .then(res => this._checkResponse(res))
        .then(data => data); //?
    }

    getMovies(token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => this._checkResponse(res));
    }

    addMovie(data, token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `${this._baseUrl}${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `${this._baseUrl}${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            }),
        })
            .then(res => this._checkResponse(res));
    }

    deleteMovie(movieId, token) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => this._checkResponse(res));
    }
}

const UserApi = new MainApi({
    baseUrl: 'https://api.movies-diploma.nomoredomainsmonster.ru'
});

export default UserApi;