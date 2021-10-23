import { user } from "./config";

export default class UserPanel {
    constructor(data) {

    }

    async createUserPanel(data) {

        console.log(data)
        await this.insertUserPhoto(data.userAvatar);
        await this.insertUserName(data.userName);
        await this.insertUrlPath(data.userGitHubSite);
        // this.enableUserSection();
    }

    async insertUserPhoto(data) {
        const userPhoto = document.querySelector('.user__photo');
        userPhoto.setAttribute('src' , `${data}` );
    }

    async insertUserName(data) {
        const userName = document.querySelector('.user__profile--userName');
        userName.innerText = `Hello ${data}`
    }

    async insertUrlPath(data) {

        const urlLink = document.querySelector('.gitHubProfile');
        await urlLink.setAttribute('href' , `${data}` );

    }


    enableUserSection() {
        const userSection = document.querySelector('.user__panel')
        userSection.style.display = 'flex';
    }
}