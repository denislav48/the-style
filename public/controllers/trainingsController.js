import {templates} from 'templates';
import {UserRequester} from 'userRequester';

const trainingsController = function () {

    const trainingsRef = firebase.database().ref('Trainings/');
    let childArray = [];
    let imageId = 0;
    let allTrainingsLikes = [];

    trainingsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let child = {
                'trainingName': childSnapshot.key,
                'exercises': childSnapshot.val()
            };
            childArray.push(child);

            let exercises = child.exercises;
            for (let workout of exercises) {
                imageId += 1;
                workout['imgSrc'] = `../images/trainings/${imageId}.jpg`;
            }
        });

        templates.getPage('trainings', childArray)
            .done(() => {

                //Transfer users favourites trainings in array
                for (let i = 0; i < childArray.length; i += 1) {
                    for (let j = 0; j < childArray[i].exercises.length; j += 1) {
                        if (childArray[i].exercises[j].users !== undefined) {
                            let usersLikes = childArray[i].exercises[j].users.split(',');

                            //delete invalid users
                            for (let k = 0; k < usersLikes.length; k += 1) {
                                if (usersLikes[k].length < 1) {
                                    usersLikes.splice(k, 1);
                                }
                            }
                            let trainingLike = {
                                workout: childArray[i].trainingName,
                                index: j,
                                trainingName: childArray[i].exercises[j].title,
                                usersLikes: usersLikes
                            };
                            allTrainingsLikes.push(trainingLike);
                        }
                    }
                }

                const userRequester = new UserRequester();

                userRequester.onAuthStateChanged(function (user) {
                    if (user) {

                        let $allLikeButtons = $('.star');
                        let storage = "";
                        //Check if user is likes some trainings to update like button
                        for (let i = 0; i < allTrainingsLikes.length; i += 1) {
                            for (let j = 0; j < allTrainingsLikes[i].usersLikes.length; j += 1) {
                                if (user.displayName === allTrainingsLikes[i].usersLikes[j]) {
                                    $($allLikeButtons[i]).attr('src', '../images/icons/likeOn.png');
                                    //Add user liked trainings
                                    storage += `"${allTrainingsLikes[i].trainingName} training" from ${allTrainingsLikes[i].workout} program,`;
                                }
                            }
                        }
                        localStorage.setItem('userLikes', storage); //save user favourites trainings (for user profile)

                        //Upload users favourites training in firebase
                        $allLikeButtons.removeClass('hidden');
                        $($allLikeButtons).on('click', function (event) {
                            let $target = $(event.target);

                            let workoutName = $target.closest('.col-sm-4').find('.trainingName').text();
                            let trainingName = event.target.parentNode.firstElementChild.firstElementChild.dataset.workoutname;
                            let index = event.target.parentNode.dataset.index;

                            let currentTrainingUsersLike = "";
                            //Search if user likes this training
                            for (let i = 0; i < allTrainingsLikes.length; i += 1) {
                                if (trainingName === allTrainingsLikes[i].trainingName) {
                                    for (let j = 0; j < allTrainingsLikes[i].usersLikes.length; j += 1) {
                                        //takes users hwo also like current training
                                        currentTrainingUsersLike += `${allTrainingsLikes[i].usersLikes[j]},`;
                                    }
                                    break;
                                }
                            }

                            //Update users likes in database
                            if ($target.attr('src') === '../images/icons/likeOn.png') {  //Unlike training
                                currentTrainingUsersLike = currentTrainingUsersLike.split(`${user.displayName},`);
                                trainingsRef.child(workoutName.toString()).child(index.toString()).update({
                                    users: `${currentTrainingUsersLike}`
                                });
                                $target.attr('src', '../images/icons/likeOff.png');
                                toastr.error(`You remove "${trainingName} training" from favourites list!`);
                            }
                            else { //Like training
                                $target.attr('src', '../images/icons/likeOn.png');
                                trainingsRef.child(workoutName.toString()).child(index.toString()).update({
                                    users: `${currentTrainingUsersLike}${user.displayName},`
                                });

                                //Add currentUser like to likes of current training
                                currentTrainingUsersLike += `${user.displayName},`;
                                toastr.success(`You add "${trainingName} training" from ${workoutName} program in your favourites list!`);
                            }
                        });
                    }
                });

                let $currentImage = $('#currentImage');
                $('.workout').on('click', function (event) {
                    let target = event.target.parentNode;
                    $currentImage.attr('src', target.dataset.imgsrc);
                })
            });
    });
};

export {trainingsController};
