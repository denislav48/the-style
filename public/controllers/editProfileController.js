import { templates } from 'templates';
import { userController } from 'userController';
import { UserRequester } from 'userRequester';

const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 20;

const editProfileController = function (user) {
    templates.getPage('editProfile', user)
        .done(() => {
            const $editBtn = $('#editBtn');

            $('#emailChangeInput').on('change', () => {
                $('#passwordInput').prop('disabled', false).focus();
            });

            $editBtn.on('click', () => {
                const username = $('#usernameChangeInput').val(); 
                const email = $('#emailChangeInput').val();
                const password = $('#passwordInput').val();
                const userRequester = new UserRequester();

                if (username !== user.displayName) {
                    const regex = /[^a-zA-Z0-9 ]+/g;
                    const hasInvalidCharacters = regex.test(username);
                    if (hasInvalidCharacters) {
                        toastr.error('The username can contain only characters, digits and space');
                        $('#usernameChangeInput').focus();
                        return;
                    }

                    const isValidUsername = USERNAME_MIN_LENGTH < username.length && username.length < USERNAME_MAX_LENGTH;
                    if (!isValidUsername) {
                        toastr.error(`The username should be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters long!`);
                        $('#usernameChangeInput').focus();
                        return;
                    }

                    const update = userRequester.currentUser.updateProfile({ displayName: username });
                    toastr.success(`Your username is now ${username}`);  

                    update
                        .then(() => {
                            location.hash = '/user';
                        });
                }

                if (email.trim !== '' && email !== user.email) {
                    if (password.trim() === '') {
                        toastr.error('Please enter your password!');
                    } else {
                        const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
                        const currentUser = userRequester.currentUser;
                        const reauth = Promise.resolve(currentUser.reauthenticateWithCredential(credential));

                        reauth
                            .then(() => {                            
                                const updated = Promise.resolve(currentUser.updateEmail(email));
                                
                                updated
                                    .then(() => {
                                        toastr.success('You have changed your email successfully!');
                                        location.hash = '/user';
                                    },
                                    function(error) {
                                        toastr.error(`${error.message}`);
                                });
                            },
                            function (error) {
                                toastr.error(`${error.message}`);
                            }
                        );
                    }
                }
            });
    });
};

export { editProfileController };