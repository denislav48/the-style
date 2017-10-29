import { templates } from 'templates';
import { UserRequester } from 'userRequester';

const changePasswordController = function (user) {
    templates.getPage('changePassword', user)
        .done(() => {
            const $changeBtn = $('#changeBtn');
            const $currentPass = $('#tb-currentPass');
            const $newPass = $('#tb-newPassword');
            const $confirmPass = $('#tb-confirmPassword');

            $changeBtn.on('click', () => {
                const newPass = $newPass.val();
                const confirmPass = $confirmPass.val();

                if (confirmPass !== newPass) {
                    toastr.error('Passwords do not match!');
                } else if (newPass.trim() === '') {
                    toastr.error('The new password cannot be empty!');
                } else {
                    const userRequester = new UserRequester();
                    const currentUser = userRequester.currentUser;
                    const credential = firebase.auth.EmailAuthProvider.credential(user.email, $currentPass.val());

                    const reauth = Promise.resolve(currentUser.reauthenticateWithCredential(credential));

                    reauth
                        .then(() => {
                            const updated = Promise.resolve(currentUser.updatePassword(newPass));

                            updated
                                .then(() => {
                                    toastr.success('You have changed your password successfully!');
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

            });
    });
};

export { changePasswordController };
