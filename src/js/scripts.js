//import debounce from './modules/debounce';

function debounce(func, ms) {
    let timer = null;

    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            func(...[].slice.call(arguments));
        }, ms)
    }
}

class Slider {
    constructor($slider) {
        this.el = $slider;
        this._pos = 0;
        this._initValues();
        this.toggleAvailableMod(this.el);
        this._initEvents();

    }

    _initEvents() {
        this.el.addEventListener('click', event => {
            const $target = event.target;
            if ($target.classList.contains('arrow') && $target.classList.contains('_available')) {
                this.slide($target.getAttribute('data-direction'), this._list);
                this.toggleAvailableMod(this.el);
            }
        });

        window.addEventListener('resize', debounce(this._initValues.bind(this), 1000));
    }

    _initValues() {
        this._list = this.el.querySelector('.slider__list');
        this._sliderWidth = this.el.offsetWidth;
        console.log(this._sliderWidth);
        this._itemQty = this._list.childElementCount;
        this._itemWidth = this.el.querySelector('.slider__list-item').offsetWidth;
        this._offset = this.el.querySelectorAll('.slider__list-item')[1].offsetLeft - this.el.querySelectorAll('.slider__list-item')[0].offsetLeft - this._itemWidth; //(this._sliderWidth - this._visibleItemQty * this._itemWidth) / (this._visibleItemQty - 1);
        this._visibleItemQty = Math.ceil((this._sliderWidth + this._offset) / (this._itemWidth + this._offset));
        console.log(this._visibleItemQty);
        this._scrollWidth = this._sliderWidth + this._offset;
        this._minPos = -Math.floor(this._itemQty * this._itemWidth + (this._itemQty - 1) * this._offset - this._sliderWidth);  //-(Math.floor((this._itemQty - this._visibleItemQty) / this._visibleItemQty)) * this._scrollWidth - this._itemQty % this._visibleItemQty * (this._itemWidth + this._offset);

    }

    changePosRight() {
        return Math.max(this._pos - this._scrollWidth, this._minPos);
    }

    changePosLeft() {
        return Math.min(this._pos + this._scrollWidth, 0);
    }

    slide(direction, $el) {
        if (direction === 'right') {
            this._pos = this.changePosRight();

        } else if (direction === 'left') {
            this._pos = this.changePosLeft();
        }
        console.log(this._pos);
        $el.style.left = `${this._pos}px`;
    }

    removeAvailableMod($el) {
        $el.classList.remove('_available');
    }

    addAvailableMod($el) {
        $el.classList.add('_available');
    }

    toggleAvailableMod() {
        if (this._pos === 0) {
            this.removeAvailableMod(this.el.querySelector('.arrow._left'));
        } else {
            this.addAvailableMod(this.el.querySelector('.arrow._left'));
        }
        if (this._pos === this._minPos) {
            this.removeAvailableMod(this.el.querySelector('.arrow._right'));
        } else {
            this.addAvailableMod(this.el.querySelector('.arrow._right'));
        }

    }
}
/*-----------------------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    const sliders = [].map.call(document.getElementById('gallery').querySelectorAll('.slider'), item => {
        return new Slider(item);
    });
});



