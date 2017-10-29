import { templates } from 'templates';
import { UserRequester } from 'userRequester';
import { loginController } from 'loginController';

mocha.setup('bdd');
const expect = chai.expect;

describe('LoginController tests', () => {
    it('Expect to load login page', () => {
        loginController();

        expect(location.hash).to.equal('#/login');
    });
});