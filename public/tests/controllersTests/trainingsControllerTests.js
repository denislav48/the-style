import {templates} from 'templates';
import {UserRequester} from 'userRequester';
import {trainingsController} from 'trainingsController';

mocha.setup('bdd');
const expect = chai.expect;

describe('Trainings controller tests', () => {

    it('Expect trainings controller to exist', () => {
        let controller = trainingsController;
        expect(controller).to.exist;
    });

    it('Expect trainings controller to be a function', () => {
        let controller = trainingsController;
        expect(controller).to.be.a('function');
    });


    it('Expect trainings controller to check if user is logged in', () => {
        let user = UserRequester.currentUser;
        if (user) {
            trainingsController(user);
            expect(user.onAuthStateChanged).to.exist;
        }
    });

    it('Expect localStorage to save user liked workouts', () => {
        let workout = '"Bring your knees training" from ABS program';
        localStorage.setItem('userLikes', workout);
        let user = UserRequester.currentUser;
        if (user) {
            expect(localStorage.getItem('userLikes')).to.equal('"Bring your knees training" from ABS program');
        }
    });
});