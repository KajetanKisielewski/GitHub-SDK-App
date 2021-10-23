import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import GitHubSDK from "../src/js/GitHubSDK";
const config = require("./../src/js/config.js")


describe('GitHubSDK' , () => {

    describe('creating GitHubSDK instance', () => {

        it('should be able to create instance when login and password was correct', () => {


            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(subject.user).toBe(data.login);
            expect(subject.token).toBe(data.password);
        });

        it('shouldn\'t be able to create instance when login is incorrect' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(subject.user).not.toBe('Kajetan');
            expect(subject.token).toBe(data.password);
        });

        it('shouldn\'t be able to create instance when  password is incorrect' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(subject.user).toEqual(data.login);
            expect(subject.token).not.toEqual('abcd');
        });
    });

    describe('getUserData method' , () => {

        it('should check is method exist' , () => {


            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(typeof subject.getUserData).toBe('function');
        });

        it('should return object with user data when login data was correct' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserData().
                then( data => expect(typeof data).toBe('object') );
        });

        it('should return data has not been downloaded when we can\'t downloaded' , () => {

            const data = { login: '' , password: '' }
            const subject = new GitHubSDK(data);

            return expect( subject.getUserData() ).rejects.toEqual(Error('data has not been downloaded'));
        })
    })

    describe('getUserAvatar method' , () => {

        it('should check is method exist' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(typeof subject.getUserAvatar).toBe('function');
        });

        it('should return the url to the avatar as a string when the method works fine' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserAvatar().
                then( data => expect(typeof data).toBe('string') );
        });

        it('avatar should Match with url' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            const myAvatarUrlAdress = 'https://avatars.githubusercontent.com/u/80226300?v=4'

            return subject.getUserAvatar().
                then( data => expect(data).toMatch(myAvatarUrlAdress) );
        });


        it('avatar shouldn\'t match with url' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            const devMentorAvatarUrlAdress = 'https://avatars.githubusercontent.com/u/55095257?v=4'

            return subject.getUserAvatar().
                then( data => expect(data).not.toMatch(devMentorAvatarUrlAdress) );
        });
    });

    describe('getUserProfileUrl method' , () => {

        it('should check is method exist' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(typeof subject.getUserProfileUrl).toBe('function');
        });

        it('should return the url to the user gitHub profile as a string when the method works fine' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserProfileUrl().
                then( data => expect(typeof data).toBe('string') );
        });

        it('url should Match with url' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            const myGitHubProfileUrl = 'https://github.com/KajetanKisielewski'

            return subject.getUserProfileUrl().
                then( data => expect(data).toMatch(myGitHubProfileUrl) );
        });
    });

    describe('getUserName method' , () => {

        it('should check is method exist' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            expect(typeof subject.getUserProfileName).toBe('function');
        });

        it('User gitHub name should match with user login' , () => {

            const data = { login: config.user , password: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserProfileName().
                then( name => expect(name).toBe(data.login) )
        });
    });
});