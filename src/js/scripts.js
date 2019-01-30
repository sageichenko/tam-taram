//import debounce from './modules/debounce';

// function debounce(func, ms) {
//     let timer = null;
//
//     return function () {
//         if (timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             timer = null;
//             func(...[].slice.call(arguments));
//         }, ms);
//     };
// }

//const turningWidth = 425;

document.addEventListener('DOMContentLoaded', function () {
    initSlider('.slider');
});

function initSlider(selector) {
    $(selector).slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        rows: 3,
        arrows: false,
        vertical: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    arrows: true,
                    vertical: false,
                }
            }
        ]
    });
    //window.addEventListener('resize', handlerScreenDecrease);
}

// function destroySlider(selector) {
//     $(selector).slick('unslick');
//     console.log('unslick');
// }
//
// const handlerScreenDecrease = debounce( (ev) => {
//     const window = ev.target;
//     const width = window.innerWidth;
//     if (width <= turningWidth) {
//         destroySlider('.slider');
//     }
//
//     window.removeEventListener(handlerScreenDecrease);
//     window.addEventListener('resize', handlerScreenIncrease);
// }, 1000);
//
// const handlerScreenIncrease = debounce ( (ev) => {
//     const window = ev.target;
//     const width = window.innerWidth;
//     if (width >= turningWidth) {
//         initSlider('.slider');
//     }
//
//     window.removeEventListener(handlerScreenIncrease);
//     window.addEventListener('resize', handlerScreenDecrease);
// }, 1000);



