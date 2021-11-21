import './../css/style.css'
import GitHubSDK from './../js/GitHubSDK';
import config from './../js/config';

const init = () => {

    const data = { user: config.user , token: config.token }
    const gitHub = new GitHubSDK(data);
}

document.addEventListener('DOMContentLoaded' , init);