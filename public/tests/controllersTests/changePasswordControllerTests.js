import {templates} from 'templates';
import {changePasswordController} from 'changePasswordController';
import {UserRequester} from 'userRequester';

mocha.setup('bdd');
const expect = chai.expect;

describe('Password changing controller tests', () => {

    it('Expect password change controller to exist', () => {
        let controller = changePasswordController;
        expect(controller).to.exist;
    });

    it('Expect password change controller to be a function', function() {
        let controller = changePasswordController;
        expect(controller).to.be.a('function');
    });


});
