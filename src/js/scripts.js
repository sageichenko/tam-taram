import debounce from './modules/debounce.js';

let isSliderInit = false;

const turningWidth = 425;
const videosData = {
    'step by step': {
        videoIDs: [
            'z8M0Fa1JVco',
            'Wi2KcdoCuo4',
            '8H6dYUgQKB8',
            'PZjGrmHdFME',
            '_wLGr24VeoI',
            'DG4FAU5qmMY'
        ]
    },
    'craft education': {
        videoIDs: [
            'RmNWNLXmswk',
            '-tztXOz8Vc0',
            'kUfIVtyydgQ'
        ]
    }
    ,
    'inspiration': {
        videoIDs: [
            'VmmwwzR536g',
            'vz0k8O-Ef9Y',
            '6oPBFnsqJW8'
        ]
    }
};

$(document).ready(function () {
    const $gallery = $('#gallery');

    initGallery($gallery);
    $gallery.click(loadMore);

    $(window).resize(handlerResizeWindow);
    $(window).trigger('resize');

    const $toggleMenuCheckBox = $('#menu-check-box');

    $toggleMenuCheckBox.change(() => {
        if ($toggleMenuCheckBox.is(':checked')) {
            openMenu();
            return;
        }

        closeMenu();
    });
});

function loadMore(ev) {
    const target = ev.target;

    if (target.classList.contains('load-btn')) {
        const slider = target.closest('.slider');

        slider.classList.add('_open');

        loadVideos(slider);
    }
}

function initGallery($element) {
    $element.html(
        Object
            .keys(videosData)
            .map((key) => {
                return `<div class="row">
                <h2 class="heading-secondary video-gallery__heading">
                    ${key.split(' ').map((word) => {
                        return `<span>${word}</span>`;
                    }).join(' ')}
                </h2>
                <div data-slider-title="${key}" class="slider">
                </div>
            </div>`;
            }).join('')
    );
}

function loadVideos(element) {
    const $element = $(element);
    let videos;
    const needAllVideo = $element.hasClass('_open') || $(document).width() > turningWidth;

    for (const key of Object.keys(videosData)) {
        if (key === $element.attr('data-slider-title'))
            videos = videosData[key].videoIDs;
    }

    if (videos) {
        $element.html(`${((videos.length > 3 && needAllVideo) ? videos : videos.slice(0, 3))
            .map((id) => {
                return `<div class="video-box slider__item">
                            <a data-fancybox href="https://youtu.be/${id}">
                                <img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="video-preview"
                                     class="video-box__preview">
                                <div class="video-box__btn-play"><img src="img/play-button.png"
                                                                      alt="play-button"></div>
                            </a>
                        </div>`;
            }).join('')}${(videos.length > 3 && !needAllVideo)
            ? '<button class="load-btn video-gallery__btn">load more</button>'
            : ''}`
        );
    }
}

function initSlider($element) {
    isSliderInit = true;
    $element.slick({
        infinite: false,
        mobileFirst: true,
        nextArrow: '<bitton type="button" class="slider-arrow slick-next"></bitton>',
        prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',

        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true,
                    vertical: false,
                    verticalSwiping: false,
                    rows: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                    vertical: false,
                    verticalSwiping: false,
                    rows: 1
                }
            },

        ]
    });
}

function removeSlider($element) {
    if (isSliderInit) {
        isSliderInit = false;
        $element.slick('unslick');
    }
}

const handlerResizeWindow = debounce(() => {
    const $sliders = $('.slider');

    if ($(window).width() > turningWidth) {
        if (!isSliderInit) {
            [].forEach.call($sliders, (item) => {
                loadVideos(item);
            });
            initSlider($sliders);
        }
    } else {
        if (isSliderInit) {
            removeSlider($sliders);
        }
        [].forEach.call($sliders, (item) => {
            loadVideos(item);
        });
    }
}, 500);


function toggleMenu() {
    $('#menu').toggleClass('_hidden');
}

function openMenu() {
    $('#menu').removeClass('_hidden');
}

function closeMenu() {
    $('#menu').addClass('_hidden');
}
