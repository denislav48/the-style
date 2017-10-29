SystemJS.config({
    "transpiler": "plugin-babel",
    "map": {
        //SystemJS files\\
        "plugin-babel": "../node-modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "../node-modules/systemjs-plugin-babel/systemjs-babel-browser.js",

        //App files\\
        "index": "../app-modules/index.js",
        "templates": "../app-modules/templates.js",
        "registerController": "../controllers/registerController.js",
        "loginController": "../controllers/loginController.js",
        "logoutController": "../controllers/logoutController.js",
        "userController": "../controllers/userController.js",
        "homeController": "../controllers/homeController.js",
        "galleryController": "../controllers/galleryController.js",
        "trainingsController": "../controllers/trainingsController.js",
        "editProfileController": "../controllers/editProfileController.js",
        "changeAvatarController": "../controllers/changeAvatarController.js",
        "changePasswordController": "../controllers/changePasswordController.js",
        "videosController": "../controllers/videosController.js",
        "userRequester": "../requesters/userRequester.js",
        "fragrancesController": "../controllers/fragrancesController.js",
        "fashionController": "../controllers/fashionController.js",
        "entertainmentController": "../controllers/entertainmentController.js",
        "subCategoryController": "../controllers/subCategoryController.js",
        "postController": "../controllers/postController.js",
     

        //App Tests files\\
        "registerControllerTests": "../tests/controllersTests/registerControllerTests.js",
        "userControllerTests": "../tests/controllersTests/userControllerTests.js",
        "trainingsControllerTests": "../tests/controllersTests/trainingsControllerTests.js",
        "videosControllerTests": "../tests/controllersTests/videosControllerTests.js",
        "changeAvatarControllerTests": "../tests/controllersTests/changeAvatarControllerTests.js",
        "changePasswordControllerTests" : "../tests/controllersTests/changePasswordControllerTests.js",
        "indexTests": "../tests/appTests/indexTests.js",
        "templatesTests": "../tests/appTests/templatesTests.js",
        "loginControllerTests": "../tests/controllersTests/loginControllerTests.js",


        //Libraries\\
        "jquery": "../node-modules/jquery/dist/jquery.js",
        //Routing:
        "navigo": "../node-modules/navigo/lib/navigo.min.js",
        //HTML:
        "handlebars": "../node-modules/handlebars/dist/handlebars.js",
        //Popup messages
        "toastr": "../node-modules/toastr/toastr.js",
        //UI stuffs (autocomplete, calendar etc.)
        "jqueryUi": "../node-modules/jquery-ui-dist/jquery-ui.js",
        "bootstrap": "node-modules/bootstrap/dist/js/bootstrap.min.js",
        "handlebars-paginate": "../node_modules/handlebars-paginate/index.js"
    }
});

// SystemJS.import('index');
