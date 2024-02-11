class MainApi {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка checkResponse: ${res.status}`);
    }

    _req(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkResponse);
    }


    register(name, email, password) {
        return this._req('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        })
    }

    login(email, password) {
        return this._req('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((data) => {
            if (data && data.token) {
                const token = data.token;
                localStorage.setItem('jwt', token);
                return token;
            } else {
                throw new Error('ответ сервера не содержит токен');
            }
        });
    }

    getUser(token) {
        return this._req('/users/me', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }


    setUserInfo(name, email, token) {
        return this._req('/users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
    }

    getMovies(token) {
        return this._req('/movies', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    addMovie(data, token) {
        return this._req('/movies', {
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
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail:  `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            }),
        });
    }

    deleteMovie(movieId, token) {
        return this._req(`/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}

const UserApi = new MainApi({
    baseUrl: 'https://api.movies-diploma.nomoredomainsmonster.ru'
});

export default UserApi;
