import {templates} from 'templates';
import {UserRequester} from 'userRequester';

const videosController = function() { //
    templates.getPage('videos', {}).done(() => {
        const userRequester = new UserRequester();
        const currentUser = userRequester.currentUser;
        userRequester.onAuthStateChanged(function(user) {
            if (user) {
                //Declaration for adding
                const $upload = $('#video-add');
                const $divBeginner = $('.beginner');
                const $divIntermediate = $('.intermediate');
                const $divAdvanced = $('.advanced');

                //Declaration for removal
                const $clearBeginner = $('#clearBeginner');
                const $clearIntermediate = $('#clearIntermediate');
                const $clearAdvanced = $("#clearAdvanced");


                // variables where I store the html string of the videos for each category
                // problem: on every refresh these variables are reset
                let beginnerVideos = '';
                let intermediateVideos = '';
                let advancedVideos = '';

                // Adds beginner videos from local storage
                (function() {
                    if (localStorage.getItem('beginner')) {
                        let visualizeBeginnerVideos = localStorage.getItem('beginner');
                        visualizeBeginnerVideos = visualizeBeginnerVideos.substring(0, visualizeBeginnerVideos.length - 1).split(',');
                        for (var vid of visualizeBeginnerVideos) {
                            $divBeginner.append(vid);
                        }
                    }
                })();

                // Adds intermediate videos from local storage
                (function() {
                    if (localStorage.getItem('intermediate')) {
                        let visualizeIntermediateVideos = localStorage.getItem('intermediate');
                        visualizeIntermediateVideos = visualizeIntermediateVideos.substring(0, visualizeIntermediateVideos.length - 1).split(',');
                        for (var vid of visualizeIntermediateVideos) {
                            $divIntermediate.append(vid);
                        }
                    }
                })();

                // Adds advanced videos from local storage
                (function() {
                    if (localStorage.getItem('advanced')) {
                        let visualizeAdvancedVideos = localStorage.getItem('advanced');
                        visualizeAdvancedVideos = visualizeAdvancedVideos.substring(0, visualizeAdvancedVideos.length - 1).split(',');
                        for (var vid of visualizeAdvancedVideos) {
                            $divAdvanced.append(vid);
                        }
                    }
                })();


                $upload.click(() => {
                    let vidUrl = $('#video-url').val();
                    var matches = vidUrl.match(/watch\?v=([a-zA-Z0-9\-_]+)/); //URL Validator
                    if (matches) {
                        vidUrl = vidUrl.replace('watch?v=', 'embed/'); //Setting the URL to be usable with iframe


                        //Checking real time which radio button is checked
                        const $beginnerChecked = $('#beginnerDifficulty').is(':checked');
                        const $intermediateChecked = $('#intermediateDifficulty').is(':checked');
                        const $advancedChecked = $('#advancedDifficulty').is(':checked');

                        //HTML of the video to be added as string
                        const newVideo = `<div class="col-sm-4"><iframe src="${vidUrl}" frameborder="0" allowfullscreen></iframe></div>`

                        //Adds the video
                        if ($beginnerChecked) {
                            if (localStorage.getItem('beginner')) {
                                localStorage.setItem('beginner', localStorage.getItem('beginner') + newVideo);
                            } else {
                                localStorage.setItem('beginner', newVideo);
                            }
                            location.reload();  // Refreshes the page so the function which appends the videos is called.
                        } else if ($intermediateChecked) {
                            if (localStorage.getItem('intermediate')) {
                                localStorage.setItem('intermediate', localStorage.getItem('intermediate') + newVideo);
                            } else {
                                localStorage.setItem('intermediate', newVideo);
                            }
                            location.reload();
                        } else if ($advancedChecked) {
                            if (localStorage.getItem('advanced')) {
                                localStorage.setItem('advanced', localStorage.getItem('advanced') + newVideo);
                            } else {
                                localStorage.setItem('advanced', newVideo);
                            }
                            location.reload();
                        };
                    } else {
                        toastr.error('You are either not logged in or the video URL you have entered is invalid. Please try again!', "Invalid Video URL or not logged in!");
                    };
                });

                $clearBeginner.click(() => {
                    localStorage.removeItem('beginner');
                    location.reload();
                });
                $clearIntermediate.click(() => {
                    localStorage.removeItem('intermediate');
                    location.reload();
                });
                $clearAdvanced.click(() => {
                    localStorage.removeItem('advanced');
                    location.reload();
                });
            } else {
                const $upload = $('#video-add');

                $upload.click(() => {
                    toastr.error('You are not logged in, please log in to use this function!', "Not logged in!")
                })
            }
        })
    });
};

export {videosController};
