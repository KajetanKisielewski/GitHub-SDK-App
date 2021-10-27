export default class GitHubSDK {
    constructor(data) {
        this.url = 'https://api.github.com/';
        this.user = data.login;
        this.token = data.password;
    }



    async getRepositoryContent(userName , repoName , path) {

        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${this.user}/practice-js-testing/contents/README.md`


        return this._fetch(url, options);

    }


    async createRepositories(repoName) {

        const data = {
            name: repoName,
            description: 'This is your first repo created by that library' };

        const options = this._fetchPostOptions(data);
        const url = `${this.url}${this.user}/repos`

        return this._fetch(url, options);
    }



    async exportUserInformation(userName) {

        const data = {
            userName: await this.getUserProfileName(userName),
            userAvatar: await this.getUserAvatar(userName),
            userGitHubSite: await this.getUserProfileUrl(userName),
        }
        return data;
    }

      async exportAuthenticatedUserRepositories() {
        return await this.selectedRepositoryData( this.getAuthenticatedUserRepositories() );
    }

    async exportUserRepositories(userName) {
        return await this.selectedRepositoryData( this.getUserRepositories(userName) );
    }

    async selectedRepositoryData( callback ) {

        const selectedRepositoryData = [];

        const data = await callback;

            if (data) {
                data.forEach( item => {

                    const repositoryData = {
                        id: item.id,
                        name: item.name.split("-").join(" "),
                        url: item.html_url,
                        language: item.language,
                        createdAt: item.created_at.slice(0,10),
                    };

                    selectedRepositoryData.push(repositoryData);
                });
        }
         return selectedRepositoryData;
    }

    async getUserRepositories(userName) {
        const options = this._fetchGetOptions();
        const url = `${this.url}users/${userName}/repos`

        return this._fetch(url , options, 'user repositories has not been downloaded');
    }

    async getUserSingleRepository(userName, repoName) {
        const options = this._fetchGetOptions();
        const url = `${this.url}repos/${userName}${repoName}`

        return this._fetch(url , options, 'user repository has not been downloaded');
    }

    async getAuthenticatedUserRepositories() {
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
                throw new Error(error)
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
