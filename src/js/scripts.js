document.addEventListener('DOMContentLoaded', function () {
    initSlider('.slider');
    const $checkBox = $('#menu-check-box')[0];
    $checkBox.addEventListener('input', () => {
        toggleMenu();
    });
});

function initSlider(selector) {
    $(selector).slick({
        infinite: false,
        mobileFirst: true,

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

function toggleMenu () {
    $('#menu')[0].classList.toggle('_hidden');
}

function openMenu () {
    $('#menu')[0].classList.remove('_hidden');
}

function closeMenu () {
    $('#menu')[0].classList.add('_hidden');
}
