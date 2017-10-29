import {templates} from 'templates';
import {registerController} from 'registerController';
import {loginController} from 'loginController';
import {logoutController} from 'logoutController';
import {userController} from 'userController';
import {homeController} from 'homeController';
import {galleryController} from 'galleryController';
import {trainingsController} from 'trainingsController';
import {changePasswordController} from 'changePasswordController';
import {changeAvatarController} from 'changeAvatarController';
import {editProfileController} from 'editProfileController';
import {videosController} from 'videosController';
import {UserRequester} from 'userRequester';
import {fragrancesController } from 'fragrancesController';
import {fashionController} from 'fashionController';
import {entertainmentController} from 'entertainmentController';
import {subCategoryController} from 'subCategoryController';
import {postController} from 'postController';

const userRequester = new UserRequester();

let currentlyLoggedUser = userRequester.currentUser;

userRequester.onAuthStateChanged(function (user) {
    if (user) {
        currentlyLoggedUser = user;

        $('#loginBtn').addClass('hidden');
        $('#registerBtn').addClass('hidden');
        $('#currentUser').removeClass('hidden').text(`Hello, ${currentlyLoggedUser.displayName}`);
        $('#logoutBtn').removeClass('hidden').on('click', () => logoutController(currentlyLoggedUser));
    }
});

const router = new Navigo(null, false, '#!');

router
    .on(() => homeController())
    .on({
        '/home': () => homeController(),
        '/fashion': () => fashionController(),
        '/fashion/:id': (params) => postController(params),
        '/fragrances': () => fragrancesController(),
        '/fragrances/:id': (params) => postController(params),
        '/entertainment': () => entertainmentController(),
        '/entertainment/:category': (params) => subCategoryController(params),
        '/entertainment/:category/:id': (params) => postController(params),
        '/register': () => registerController(),
        '/login': () => loginController(),
        '/logout': () => logoutController(),
        '/user': () => userController(currentlyLoggedUser),
        '/changePassword': () => changePasswordController(currentlyLoggedUser),
        '/changeAvatar': () => changeAvatarController(currentlyLoggedUser),
        '/editProfile': () => editProfileController(currentlyLoggedUser),
        '/gallery': () => galleryController(),
        '/trainings': () => trainingsController(),
        '/videos': () => videosController()
    })
    .notFound(() => templates.getPage('notFound', {}))
    .resolve();