const config = require('./config.js')

export default class LoginData {


    getLoginData() {
        const userData = { login: this.getUserLogin() , password: this.getUserPassword() }
        return userData;
    }

    getUserLogin() {
        const loginInputValue = document.querySelector('[name=login]').value
        return loginInputValue;
    }

    getUserPassword() {
        const passwordInputValue = document.querySelector('[name=password]').value
        return passwordInputValue;
    }

    validateUserData(data) {
        if( data.login === config.user && data.password === config.token ) { return true };
        return false;
    }

    findSubmitButton() {
        return document.querySelector('.form__field--submit');
    }

    disableLoginSection() {
        const loginSection = document.querySelector('.login__panel');
        loginSection.style.display = 'none';
    }

    enableLoginSection() {
        const loginSection = document.querySelector('.login__panel');
        loginSection.style.display = 'flex';
    }
}