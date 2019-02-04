//const debounce = require('./modules/debounce');

function debounce(func, ms) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            func(...[].slice.call(arguments));
        }, ms);
    };
}

const turningWidth = 425;

document.addEventListener('DOMContentLoaded',  function () {
    console.log(document.body.clientWidth);
    if (document.body.clientWidth >= turningWidth) {
        window.addEventListener('resize', handlerDecreaseWindow);
        initSlider('.slider');
    } else {
        window.addEventListener('resize', handlerIncreaseWindow);
    }

    const $checkBox = $('#menu-check-box')[0];
    $checkBox.addEventListener('input', () => {
        if ($checkBox.checked) {
            openMenu();
            return;
        }
        closeMenu();
    });
});

function removeSlider (selector) {
    console.log('remove slider');
    $(selector).slick('unslick');
}

function initSlider(selector) {
    console.log('init slider');
    $(selector).slick({
        infinite: false,
        mobileFirst: true,
        nextArrow: '<bitton type="button" class="slider-arrow slick-next"></bitton>',
        prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',

        responsive: [
            // {
            //     breakpoint: 0,
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1,
            //         arrows: false,
            //         vertical: true,
            //         verticalSwiping: false,
            //         rows: 3,
            //     }
            // },
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

const handlerDecreaseWindow = debounce( () => {
    if (document.body.clientWidth < turningWidth) {
        removeSlider('.slider');
        window.removeEventListener('resize', handlerDecreaseWindow);
        window.addEventListener('resize', handlerIncreaseWindow);
    }
}, 100);
const handlerIncreaseWindow = debounce(() => {
    if (document.body.clientWidth >= turningWidth) {
        initSlider('.slider');
        window.removeEventListener('resize', handlerIncreaseWindow);
        window.addEventListener('resize', handlerDecreaseWindow);
    }
}, 100);

function toggleMenu() {
    $('#menu')[0].classList.toggle('_hidden');
}

function openMenu() {
    $('#menu')[0].classList.remove('_hidden');
}

function closeMenu() {
    $('#menu')[0].classList.add('_hidden');
}
