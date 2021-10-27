import { user } from "./config";

export default class UserPanel {


    async createUserPanel(data) {

        await this.insertUserPhoto(data.userAvatar);
        await this.insertUserName(data.userName);
        await this.insertUrlPath(data.userGitHubSite);
        this.enableUserSection();
    }

    async insertRepodata(data) {

        data.forEach( item => {
            this.__createLiElementForID(item);
            this.__createLiElementForName(item);
            this.__createLiElementForUrl(item);
            this.__createLiElementForLanguage(item);
            this.__createLiElementForCreatedAt(item);
        })
    }

    createOtherUserRepositorySection(data) {
        this.insertRepodata(data)
    }

    clearRepoSection() {

        const repoSection = document.querySelector('.respositories__main')
        const repo = repoSection.querySelectorAll('li:not(.prototype)');

        repo.forEach( item => {
            item.remove()
        })

    }


    getUserName() {
        const userNameInputValue = document.querySelector('[name=userName]').value
        return userNameInputValue;
    }



    __createLiElementForID(data) {
        const liElementIdPrototype = document.querySelector('.list__item--id--prototype');
        const liElementId = liElementIdPrototype.cloneNode();
        liElementId.classList.remove('list__item--id--prototype');
        liElementId.classList.remove('prototype');
        liElementId.innerText = data.id;

        liElementIdPrototype.parentElement.appendChild(liElementId)
    }

    __createLiElementForName(data) {
        const liElementNamePrototype = document.querySelector('.list__item--name--prototype');
        const liElementName = liElementNamePrototype.cloneNode();
        liElementName.classList.remove('list__item--name--prototype');
        liElementName.classList.remove('prototype');
        liElementName.innerText = data.name;

        liElementNamePrototype.parentElement.appendChild(liElementName)
    }

    __createLiElementForUrl(data) {
        const liElementUrlPrototype = document.querySelector('.list__item--url--prototype');
        const liElementUrl = liElementUrlPrototype.cloneNode(true);
        liElementUrl.classList.remove('list__item--url--prototype');
        liElementUrl.classList.remove('prototype');

        liElementUrl.firstElementChild.setAttribute('href' , `${data.url}`);
        liElementUrl.firstElementChild.innerText = data.url;
        liElementUrlPrototype.parentElement.appendChild(liElementUrl);
    }

    __createLiElementForLanguage(data) {
        const liElementLanguagePrototype = document.querySelector('.list__item--language--prototype');
        const liElementLanguage = liElementLanguagePrototype.cloneNode();
        liElementLanguage.classList.remove('list__item--language--prototype');
        liElementLanguage.classList.remove('prototype');


        if( data.language === null) {
           liElementLanguage.innerText = 'Undefined';
        } else {
             liElementLanguage.innerText = data.language;
        }

        liElementLanguagePrototype.parentElement.appendChild(liElementLanguage)
    }

    __createLiElementForCreatedAt(data) {
        const liElementCreatedAtPrototype = document.querySelector('.list__item--createdAt--prototype');
        const liElementCreatedAt = liElementCreatedAtPrototype.cloneNode();
        liElementCreatedAt.classList.remove('list__item--createdAt--prototype');
        liElementCreatedAt.classList.remove('prototype');
        liElementCreatedAt.innerText = data.createdAt;

        liElementCreatedAtPrototype.parentElement.appendChild(liElementCreatedAt)
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

    enableYourRepoSection() {
        const repoSection = document.querySelector('.respositories');
        repoSection.style.display = 'flex';
    }

    disableYourRepoSection() {
        const repoSection = document.querySelector('.respositories');
        repoSection.style.display = 'none';
    }

    enableUserSection() {
        const userSection = document.querySelector('.user__panel')
        userSection.style.display = 'flex';
    }

    disableUserSection() {
        const userSection = document.querySelector('.user__panel')
        userSection.style.display = 'none';
    }

    enableRespositoriesForm() {
        const repoForm = document.querySelector('.respositories__form');
        repoForm.style.display = 'block';
    }

    disableRespositoriesForm() {
        const repoForm = document.querySelector('.respositories__form');
        repoForm.style.display = 'block';
    }
}