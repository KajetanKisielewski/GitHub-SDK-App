export default class GitHubSDK {
    constructor(data) {
        this.url = 'https://api.github.com/';
        this.user = data.user;
        this.token = data.token;
    }




    async getIssueFromRepo(userName, repoName) {

        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${userName}/${repoName}/issues`

        return this._fetch(url, options, 'issues can\'t be downloaded')
    }

    async getCommentsFromCommit(userName, repoName, index) {

        const options = this._fetchGetOptions();
        const commitList = await this.getCommitsListFromRepo(userName, repoName)

       if(commitList) {
           const commitSha = commitList[index].sha
           const url = `${this.url}repos/${userName}/${repoName}/commits/${commitSha}/comments`

           return this._fetch(url, options, 'comments can\'t be downloaded')
       }

    }

    async getCommitsListFromRepo(userName, repoName) {

        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${userName}/${repoName}/commits`

        return this._fetch(url, options, 'commits can\'t be downloaded')
    }

    async getRepositoryContent(userName , repoName , path) {

        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${userName}/${repoName}/contents/${path}`

        return this._fetch(url, options, 'repo content can\'t be downloaded');

    }

    async createRepository(data) {
        const options = this._fetchPostOptions(data);
        const url = `${this.url}user/repos`

        return this._fetch(url, options, 'repo can\'t be created');
    }

    async getUserRepositories(userName) {
        const options = this._fetchGetOptions();
        const url = `${this.url}users/${userName}/repos`

        return this._fetch(url , options, 'user repositories has not been downloaded');
    }

    async getUserRepository(userName, repoName) {
        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${userName}/${repoName}`

        return this._fetch(url , options, 'user repository has not been downloaded');
    }

    async getRepositoriesOfAuthenticatedUser() {
        const options = this._fetchGetOptions();
        const url = `${this.url}user/repos?affiliation=owner&per_page=100&`

        return this._fetch(url , options, 'user repositories has not been downloaded');
    }

    async getUserProfileName(userName) {
        const data = await this.getUserData(userName);
        return data.login;
    }

    async getUserProfileUrl(userName) {
        const data = await this.getUserData(userName);
        return data.html_url;
    }

    async getUserAvatar(userName) {
        const data = await this.getUserData(userName);
        return data.avatar_url;
    }

    async getUserData(userName) {

        const options = this._fetchGetOptions();
        const url = `${this.url}users/${userName}`;

        return this._fetch(url , options, 'user data has not been downloaded')
    }


    _fetch(url, options, error) {

        return fetch(url, options)
            .then( resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            })
            .then( data => {
                return data;
            })
            .catch( err => {
                throw new Error(err , error)
            });
    }

    _fetchGetOptions() {

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.token}`,
            },
        }
        return options;
    }

    _fetchPostOptions(data) {

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.token}`,
            },
        }
        return options;
    }
}
