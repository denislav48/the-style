import {templates} from 'templates';
import {UserRequester} from 'userRequester';
import {userController} from 'userController';

mocha.setup('bdd');
const expect = chai.expect;

describe('User controller tests', () => {

    it('Expect userController.js to exist', () => {
        let controller = userController;
        expect(controller).to.exist;
    });

    it('Expect userController.js to be a function', function () {
        let controller = userController;
        expect(controller).to.be.a('function');
    });

    it('Expect userController to redirect to login if there is no user.', function () {
        var user = UserRequester.currentUser;
        if (!(user)) {
            userController(user);
            expect(location.hash).to.equal('#/login');
        }
    });
});
