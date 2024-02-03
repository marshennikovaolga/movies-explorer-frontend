    class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject();
    }

    getMovies() {
        const url = `${this._baseUrl}/`;
        return fetch(url)
            .then(this._checkResponse);
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  });
  
  export default moviesApi
