import debounce from './modules/debounce.js';

//const log = console.log;

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

document.addEventListener('DOMContentLoaded', function () {
    const gallery = $('#gallery')[0];
    initGallery(gallery);
    if (document.body.clientWidth > turningWidth) {
        window.addEventListener('resize', handlerDecreaseWindow);
        initSlider('.slider');
    } else {
        window.addEventListener('resize', handlerIncreaseWindow);
    }

    gallery.addEventListener('click', loadMore);

    const $toggleMenuCheckBox = $('#menu-check-box')[0];
    $toggleMenuCheckBox.addEventListener('input', () => {
        if ($toggleMenuCheckBox.checked) {
            openMenu();
            return;
        }

        closeMenu();
    });
});

function loadMore(ev) {
    const target = ev.target;
    if (target.classList.contains('load-btn')) {
        loadVideos(target.closest('.slider'), true);
    }
}

function initGallery(el) {
    el.innerHTML = Object.keys(videosData).map((key) => {
        return `<div class="row">
                <h2 class="heading-secondary video-gallery__heading">
                    ${key.split(' ').map((word) => {
                        return `<span>${word}</span>`;
                    }).join(' ')}
                </h2>
                <div data-slider-title="${key}" class="slider">
                    
                </div>
            </div>`;
    }).join('');

    el.querySelectorAll('.slider').forEach(item => {
        loadVideos(item,document.body.clientWidth > turningWidth);
    });
}

function loadVideos(el, needAllVideo) {
    let videos;
    for (const key of Object.keys(videosData)) {
        if (key === el.dataset.sliderTitle)
            videos = videosData[key].videoIDs;
    }

    if (videos) {
        el.innerHTML = `${((videos.length > 3 && !needAllVideo) ? videos.slice(0, 3) : videos)
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
            : ''}}`;
    }
}

function initSlider(selector) {
    $(selector).slick({
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

function removeSlider(selector) {
    $(selector).slick('unslick');
}

const handlerDecreaseWindow = debounce(() => {
    if (document.body.clientWidth <= turningWidth) {
        removeSlider('.slider');
        window.removeEventListener('resize', handlerDecreaseWindow);
        window.addEventListener('resize', handlerIncreaseWindow);
    }
}, 500);
const handlerIncreaseWindow = debounce(() => {
    if (document.body.clientWidth > turningWidth) {
        initSlider('.slider');
        window.removeEventListener('resize', handlerIncreaseWindow);
        window.addEventListener('resize', handlerDecreaseWindow);
    }
}, 500);

function toggleMenu() {
    $('#menu')[0].classList.toggle('_hidden');
}

function openMenu() {
    $('#menu')[0].classList.remove('_hidden');
}

function closeMenu() {
    $('#menu')[0].classList.add('_hidden');
}
