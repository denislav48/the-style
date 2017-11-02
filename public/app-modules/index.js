import {templates} from 'templates';
import {homeController} from 'homeController';
import {fragrancesController } from 'fragrancesController';
import {fashionController} from 'fashionController';
import {entertainmentController} from 'entertainmentController';
import {subCategoryController} from 'subCategoryController';
import {postController} from 'postController';


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