    class MoviesApi {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject();
    }

    _req(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkResponse);
    }

    getMovies() {
        return this._req('/')
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  });
  
  export default moviesApi
