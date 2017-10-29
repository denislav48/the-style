import {templates} from 'templates';
import 'handlebars';

mocha.setup('bdd');
const expect = chai.expect;

describe('Templates tests', () => {
    it('Expect getPage() to exist', () => {
        expect(templates.getPage).to.exist;
    });

    it('Expect getPage() to compile Handlebars template', () => {
        const handlebarsMock = sinon.stub(Handlebars, 'compile');
        const request = templates.getPage('home', {});

        request
            .done(() => {
                expect(handlebarsMock.compile).to.have.been.calledOnce;
            });

        handlebarsMock.restore();
    });
});