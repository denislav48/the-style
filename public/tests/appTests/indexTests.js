import {templates} from 'templates';
import {registerController} from 'registerController';
import {loginController} from 'loginController';
import {logoutController} from 'logoutController';
import {userController} from 'userController';
// import {homeController} from 'homeController';
// import {galleryController} from 'galleryController';
import {trainingsController} from 'trainingsController';
import {changePasswordController} from 'changePasswordController';
import {changeAvatarController} from 'changeAvatarController';
import {editProfileController} from 'editProfileController';
import {videosController} from 'videosController';
import {UserRequester} from 'userRequester';
// import {router} from 'index';

// mocha.setup('bdd');
// const expect = chai.expect;

// describe('Index file tests', () => {
//     it('Expect router to call loginController when location hash is /login', () => {
//         const loginControllerMock = sinon.spy(UserRequester, 'onAuthStateChanged');

//         location.hash = '/home';

//         expect(loginControllerMock).to.have.been.calledOnce;

//         loginControllerMock.restore();
//     });
// });
