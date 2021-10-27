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
           loginPanel.disableLoginSection();

           const gitHub = new GitHubSDK(data);
           const userPanel = new UserPanel();

           console.log(gitHub.getUserData(gitHub.user))
           console.log(gitHub.getRepositoryContent() )
           console.log(gitHub.createRepositories('HelloGitHub'))

           gitHub.exportUserInformation(gitHub.user)
                .then( data => userPanel.createUserPanel(data) )
                .catch( err => {
                    throw new Error('data can\'t be exported')
                })

            document.querySelector('.user__panel---signOut').addEventListener('click' , e => {
                e.preventDefault();

                userPanel.disableUserSection();
                loginPanel.enableLoginSection();
            })

            document.querySelector('.actions__yourRepo').addEventListener('click' , e => {
                e.preventDefault();
                document.querySelector('.respositories__tittle').innerText = 'Check your respositories';

                gitHub.exportAuthenticatedUserRepositories()
                    .then( data => userPanel.insertRepodata(data) )
                    .catch( err => {
                        throw new Error('data can\'t be exported')
                    })
                userPanel.disableUserSection();
                userPanel.enableYourRepoSection();
            })

            document.querySelector('.fa-times').addEventListener('click' , e => {
                e.preventDefault();

                userPanel.clearRepoSection();
                userPanel.disableYourRepoSection();
                userPanel.enableUserSection();
            })

            document.querySelector('.actions__otherUserRepo').addEventListener('click' , e => {
                e.preventDefault();

                userPanel.disableUserSection();
                userPanel.enableYourRepoSection();
                userPanel.enableRespositoriesForm();
                userPanel.clearRepoSection();
                document.querySelector('.respositories__tittle').innerText = 'Check selected User respositories';

                document.querySelector('.form__field--search').addEventListener('click' , e => {
                    e.preventDefault();

                    const userName = userPanel.getUserName();


                    gitHub.exportUserRepositories(userName)
                    .then( data => userPanel.createOtherUserRepositorySection(data) )
                    .catch( err => {
                        throw new Error('data can\'t be exported')
                    })
                })
            })




        } else {
            return alert('Incorrect data')
        }
    })
}

document.addEventListener('DOMContentLoaded' , init);
