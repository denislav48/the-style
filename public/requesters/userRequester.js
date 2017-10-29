class UserRequester {
    /**
     * Getter for currently logged user.
     * @returns {object} the currently logged in user. If no user is logged in, returns null.
     */
    get currentUser() {
        return firebase.auth().currentUser;
    }

    /**
     * Creates a new user account associated with the specified email address and password.
     * On successful creation of the user account, this user will also be signed in to your application.
     * User account creation can fail if the account already exists or the password is invalid.
     * Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.
     * @param {string} email The user's email address.
     * @param {string} password The user's passswowrd.
     * @returns {Promise} non-null Promise containing non-null user.
     */
    createUserWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    /**
     * Adds an observer for user state changes.
     * @param {non-null Object or function(nullable user)} nextOrObserver An observer object or a function triggered on change.
     * @param {function(non-null Error)} [error] Optional. A function triggered on auth error.
     * @param {function()} [completed] Optional. A function triggered when the observer is removed.
     * @returns {non-null function} The unsubscribe function for the observer.
     */
    onAuthStateChanged(nextOrObserver, error, completed) {
        return firebase.auth().onAuthStateChanged(nextOrObserver, error, completed);
    }

    /**
     * Asynchronously signs in using an email and password.
     * Fails with an error if the email address and password do not match.
     * Note: The user's password is NOT the password used to access the user's email account. The email address serves as a unique identifier for the user, and the password is used to access the user's account in your Firebase project.
     * @param {string} email The user's email address.
     * @param {string} password The user's passswowrd.
     * @returns {Promise} non-null Promise containing non-null user.
     */
    signInWithEmailAndPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * Signs out the current user.
     * @returns {Promise} non-null Promise containing void.
     */
    signOut() {
        return firebase.auth().signOut();
    }
}

export { UserRequester };