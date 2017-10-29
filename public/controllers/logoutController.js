import {UserRequester} from 'userRequester';

const logoutController = function (user) {
    if (user) {
        const userRequester = new UserRequester();
        
        userRequester.signOut()
            .then(function () {
                $('#currentUser').addClass('hidden').text(``);
                $('#logoutBtn').addClass('hidden');
                $('#loginBtn').removeClass('hidden');
                $('#registerBtn').removeClass('hidden');

                toastr.success(`You have successfully logged out!`);
                location.hash = '/home';
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                toastr.error(`There was an error: ${errorCode} - ${errorMessage}
                        Please try again.`);
            });
    };
};

export { logoutController };