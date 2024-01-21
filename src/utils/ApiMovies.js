class ApiMovies {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка checkResponse: ${res.status}`);
    }
    

    // next sprint
    getMovies() {
        return fetch(`${this._baseUrl}/movies`)
            .then(res => this._checkResponse(res));
    }
}

