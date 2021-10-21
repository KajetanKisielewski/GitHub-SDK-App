import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import LoginPanel from  "./../src/js/LoginPanel";
const config = require('./../src/js/config')

describe('LoginPanel' , () => {

    it('should return false when login is incorrect' , () => {

        const subject = new LoginPanel();

        const data = { login: 'Kajetan' , password: config.token }

        expect( subject.validateUserData(data) ).toBe(false);
    })

    it('should return false when password is incorrect' , () => {

        const subject = new LoginPanel();

        const data = { login: config.user , password: 'abc' }

        expect( subject.validateUserData(data) ).toBe(false);
    })

    it('should return true when login and password was correct' , () => {

        const subject = new LoginPanel();

        const data = { login: config.user , password: config.token }

        expect( subject.validateUserData(data) ).toBe(true);
    })

})