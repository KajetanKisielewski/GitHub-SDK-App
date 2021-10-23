export default class GitHubSDK {
    constructor(data) {
        this.url = 'https://api.github.com/';
        this.user = data.login;
        this.token = data.password;
    }


    async getUserRepositories() {

       const url = `${this.url}users/${this.user}/repos`

       return this._fetch(url)
       .then( data => {
           return data;
       })
       .catch( err => {
           throw new Error('repositories has not been downloaded')
       });
    }

    async exportUserInformation() {

        const data = {
            userName: await this.getUserProfileName(),
            userAvatar: await this.getUserAvatar(),
            userGitHubSite: await this.getUserProfileUrl()
        }

        return data;
    }

    async getUserProfileName() {
        const data = await this.getUserData();
        return data.login;
    }

    async getUserProfileUrl() {
        const data = await this.getUserData();
        return data.html_url;
    }

    async getUserAvatar() {
        const data = await this.getUserData();
        return data.avatar_url
    }

    async getUserData() {
        const url = `${this.url}users/${this.user}`

        return this._fetch(url)
            .then( data => {
                return data;
            })
            .catch( err => {
                throw new Error('data has not been downloaded')
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
            },
        }

        return options;
    }
}
