import {registerController} from 'registerController';
import {templates} from 'templates';
import {UserRequester} from 'userRequester';

mocha.setup('bdd');
const expect = chai.expect;

describe('Register controller tests', () => {

    it('Expect register controller to exist', () => {
        let controller = registerController;
        expect(controller).to.exist;
    });


    it('Expect register controller to be a function', () => {
        let controller = registerController;
        expect(controller).to.be.a('function');
    });

    it('Expect register controller to redirect to login page if registration was successful', () => {
        let user = UserRequester.currentUser;
        if (user) {
            registerController(user);
            expect(location.hash).to.equal('#/login');
        }
    });

    it('Expect register controller to reload the page if registration is a function and was successful', () => {
        let user = UserRequester.currentUser;
        if (user) {
            registerController(user);
            expect(location.reload()).to.be.a('function');
        }
    });

    it('Expect register controller to display correct message when the registratrion was successful', () => {
        let user = UserRequester.currentUser;
        if (user) {
            registerController(user);
            expect(toastr.success('You have successfully registered')).to.be.a('function');
        }
    });
});

mocha.run();