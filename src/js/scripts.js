document.addEventListener('DOMContentLoaded', function () {
    if (window.width > 425) {
        initSlider('.slider');
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

function initSlider(selector) {
    $(selector).slick({
        infinite: false,
        mobileFirst: true,
        nextArrow: '<bitton type="button" class="slider-arrow slick-next"></bitton>',
        prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',

        responsive: [
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    vertical: true,
                    verticalSwiping: false,
                    rows: 3,
                }
            },
            {
                breakpoint: 424,
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

function toggleMenu() {
    $('#menu')[0].classList.toggle('_hidden');
}

function openMenu() {
    $('#menu')[0].classList.remove('_hidden');
}

function closeMenu() {
    $('#menu')[0].classList.add('_hidden');
}
