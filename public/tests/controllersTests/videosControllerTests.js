import {templates} from 'templates';
import {videosController} from 'videosController';

mocha.setup('bdd');
const expect = chai.expect;

describe('Videos controller tests', () => {

    it('Expect videos controller to exist', () => {
        let controller = videosController;
        expect(videosController).to.exist;
    });

    it('Expect videos controller to be a function', function() {
        let controller = videosController;

        expect(controller).to.be.a('function');
    });
});
