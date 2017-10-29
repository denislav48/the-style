import {templates} from 'templates';
import {UserRequester} from 'userRequester';

const registerController = function () {
    templates.getPage('register', {})
        .done(() => {

            const $registerBtn = $('#btn-register');
            const $username = $('#tb-username');
            const $email = $('#tb-email');
            const $pass = $('#tb-password');

            $registerBtn.on('click', () => {
                if ($email.val() && $pass.val()) {
                    const userRequester = new UserRequester();

                    const user = userRequester.createUserWithEmailAndPassword($email.val(), $pass.val())
                        .catch(function (error) {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            toastr.error(`There was an error: ${errorCode} - ${errorMessage}
                        Please try again.`);
                        });

                    user.then((usr) => {
                        userRequester.currentUser.updateProfile({
                            displayName: $username.val(),
                            photoURL: "images/default-user.jpg"
                        })
                            .then(() => {
                                toastr.success(`You have successfully registered as ${$username.val()}`);
                                location.hash = '/home';
                                location.reload();
                            });
                    });
                } else {
                    toastr.error('Fill all the fields!');
                }
            });
        });
};

export {registerController};
