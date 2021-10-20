import { user } from './config.js';
const config = require('./config.js')


export default class LoginData {

    getUserData() {

        const submitButton = this._findSubmitButton();

        submitButton.addEventListener('click' , e => {
            e.preventDefault();

            if( this._validateUserData() === true ) {
                const userData = { login: this.getUserLogin() , password: this.getUserPassword() }
                // return userData;
                console.log(userData)
            }
            return alert("Incorrect data");
        })
    }

    getUserLogin() {
        const loginInputValue = document.querySelector('[name=login]').value
        return loginInputValue;
    }

    getUserPassword() {
        const passwordInputValue = document.querySelector('[name=password]').value
        return passwordInputValue;
    }

    _validateUserData() {
        if( this.getUserLogin() === config.user && this.getUserPassword() === config.token ) { return true };
    }

    _findSubmitButton() {
        return document.querySelector('.form__field--submit');
    }
}