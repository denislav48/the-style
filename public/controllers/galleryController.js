import {templates} from 'templates';
import 'bootstrap';

const galleryController = function () {
    templates.getPage('gallery', {})
        .done(() => {
            jQuery(document).ready(function($) {

                $('#myCarousel').carousel({
                    interval: 5000
                });

                //Handles the carousel thumbnails
                $('[id^=carousel-selector-]').click(function () {
                    var id_selector = $(this).attr("id");
                        var id = /-(\d+)$/.exec(id_selector)[1];
                        jQuery('#myCarousel').carousel(parseInt(id));
                });
                // When the carousel slides, auto update the text
                $('#myCarousel').on('slid.bs.carousel', function (e) {
                    var id = $('.item.active').data('slide-number');
                    $('#carousel-text').html($('#slide-content-'+id).html());
                });
            });
        })
};

export {galleryController};
