import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import GitHubSDK from "../src/js/GitHubSDK";
const config = require("./../src/js/config.js")


describe('GitHubSDK' , () => {

    describe('creating GitHubSDK instance', () => {

        it('should be able to create instance when login and password was correct', () => {


            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            expect(subject.user).toBe(data.user);
            expect(subject.token).toBe(data.token);
        });
    });

    describe('getUserData method' , () => {

        it('should return object with user data when login data was correct' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserData(subject.user).
                then( data => expect(typeof data).toBe('object') );
        });

        it('the entered login should match with the login from the method' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserData(subject.user)
                .then( data => expect(data.login).toBe(subject.user) )
        })
    })

    describe('getUserAvatar method' , () => {

        it('should return the url to the avatar as a string when the method works fine' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserAvatar(subject.user).
                then( data => expect(typeof data).toBe('string') );
        });
    });

    describe('getUserProfileUrl method' , () => {

        it('should return the url to the user gitHub profile as a string when the method works fine' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserProfileUrl(subject.user).
                then( data => expect(typeof data).toBe('string') );
        });

    });

    describe('getUserName method' , () => {

        it('should check is method exist' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            expect(typeof subject.getUserProfileName).toBe('function');
        });

        it('User gitHub name should match with user login' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserProfileName(subject.user)
                .then( name => expect(name).toBe(data.user) )
        });
    });

    describe('getRepositoriesOfAuthenticatedUser method' , () => {


        it('should return Array with repo' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getRepositoriesOfAuthenticatedUser()
                .then( data => expect(typeof data).toBe('object') )
        });

    });

    describe('getUserRepository method' , () => {


        it('should return Array with repo' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserRepository(subject.user , 'github-helloworld')
                .then( data => expect(typeof data).toBe('object') )
        });

        it('repo name should be equal to provided name' , () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            return subject.getUserRepository(subject.user , 'github-helloworld')
                .then( data => expect(data.name).toBe('github-helloworld') )
        });

    });

    describe('createRepository method' , () => {


        it('should create repo' , async () => {

            const data = { user: config.user , token: config.token };
            const subject = new GitHubSDK(data);

            const repoDetails = {
                name: 'helloWorld',
                description: 'This is your first repo created by that library'
            }

            const newRepo = await subject.createRepository(repoDetails);

            return subject.getUserRepository(subject.user , repoDetails.name)
                .then( data => expect(data.name).toBe(repoDetails.name) )
        });
    });
});