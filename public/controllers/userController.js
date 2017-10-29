import {templates} from 'templates';

const userController = function (user) {
    if (user) {
        templates.getPage('user', user)
        .done(() => {
            //User profile favourites list
            let likes = localStorage.getItem('userLikes').split(',');

            let $userLikes = $('.list-group-item');
            for (let i = 0; i < likes.length; i += 1) {
                if (likes[i].length < 1) {
                    likes.splice(i, 1); //remove invalid likes
                }
                else {
                    let $likesInfo = $('<a href="#/trainings" />');
                    $likesInfo.text(likes[i]);
                    $userLikes.append($likesInfo).append('<br />');
                }
            }
        });
    } else {
        location.hash = '/login';
    }
};

export {userController};
