import './../css/style.css'
import GitHubSDK from "./GitHubSDK";
import LoginData from './loginData';

const init = () => {

    const loginData = new LoginData;
    const github = new GitHubSDK( loginData );
    console.log(github)

    console.log( github.show() )


    // const ab = github.getUserData();
    // console.log(ab)
}



document.addEventListener('DOMContentLoaded' , init);