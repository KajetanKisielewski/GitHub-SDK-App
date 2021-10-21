import './../css/style.css'
import GitHubSDK from './../js/GitHubSDK';
import LoginPanel from './../js/LoginPanel';
import UserPanel from './../js/UserPanel';

const init = () => {

    const loginPanel = new LoginPanel();

    loginPanel.findSubmitButton().addEventListener('click' , e => {
        e.preventDefault();
        const data = loginPanel.getLoginData();
        console.log(data)

        if( loginPanel.validateUserData(data) ) {
           loginPanel.disableLoginSection()
           console.log( loginPanel.validateUserData(data) )

           const userPanel = new UserPanel();
           userPanel.enableUserSection();

           const gitHub = new GitHubSDK(data);
           console.log(gitHub);
           console.log(gitHub.getUserData())
        } else {
            return alert('Incorrect data')
        }
    })
}

document.addEventListener('DOMContentLoaded' , init);