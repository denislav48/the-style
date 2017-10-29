import {templates} from 'templates';
import {changeAvatarController} from 'changeAvatarController';
import {UserRequester} from 'userRequester';

mocha.setup('bdd');
const expect = chai.expect;

describe('Avatar changing controller tests', () => {

    it('Expect avatar change controller to exist', () => {
        let controller = changeAvatarController;
        expect(controller).to.exist;
    });

    it('Expect avatar change controller to be a function', function() {
        let controller = changeAvatarController;
        expect(controller).to.be.a('function');
    });

    it('Expect avatar change controller to redirect to login if there is no user.', function () {
        var user = UserRequester.currentUser;
        if (!(user)) {
            changeAvatarController(user);
            expect(location.hash).to.equal('#/login');
        }
    });
});
