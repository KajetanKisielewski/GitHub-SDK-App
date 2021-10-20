export default class GitHubSDK {
    constructor(loginData) {
        this.url = 'https://api.github.com/';
        // this.user = user;
        // this.token = token;
        this.loginData = loginData.getUserData();
    }

    show() {
        console.log(this.loginData)
    }


    getUserData() {

        const url = `${this.url}users/${this.user}`

        return this._fetch(url)
            .then( data => {
                const apiData = data;
                return apiData;
            })
            .catch( err => {
                console.log( err ,'data has not been downloaded')
                // BŁAD 404;
            });
    }


    _fetch(urlPath) {

        const options = this._fetchOptions();
        const url = urlPath;

        return fetch(url, options)
            .then( resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            })
    }

    _fetchOptions() {

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.token}`,
            }
        }

        return options;
    }
}
