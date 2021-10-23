import './../css/style.css'
import GitHubSDK from './../js/GitHubSDK';
import LoginPanel from './../js/LoginPanel';
import UserPanel from './../js/UserPanel';
import { user } from './config';

const init = () => {

    const loginPanel = new LoginPanel();

    loginPanel.findSubmitButton().addEventListener('click' , e => {
        e.preventDefault();
        const data = loginPanel.getLoginData();

        if( loginPanel.validateUserData(data) ) {
           loginPanel.disableLoginSection()

           const gitHub = new GitHubSDK(data);
           const userPanel = new UserPanel(gitHub);
           console.log(gitHub.getUserData())
           console.log(gitHub.getUserData())

           gitHub.exportUserInformation()
            .then( data => userPanel.createUserPanel(data) )
            .catch( err => {
                throw new Error('data can\'t be exported')
            })

            console.log( gitHub.getUserRepositories() )

        } else {
            return alert('Incorrect data')
        }
    })
}

document.addEventListener('DOMContentLoaded' , init);
