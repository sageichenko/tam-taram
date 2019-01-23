class Slider {
    constructor($slider) {
        this.el = $slider;
        this._list = $slider.querySelector('.slider__list');
        this._pos = 0;
        this._sliderWidth = $slider.offsetWidth;
        this._itemQty = this._list.childElementCount;
        this._itemWidth = $slider.querySelector('.slider__list-item').offsetWidth;
        //this._visibleItemQty =
        this._offset = (this._sliderWidth - 3 * this._itemWidth) / 2;
        this._scrollWidth = this._sliderWidth + this._offset + 9;
        this._minPos = -(Math.floor((this._itemQty - 3) / 3)) * this._scrollWidth - this._itemQty % 3 * (this._itemWidth + this._offset);

        this.toggleAvailableMod(this.el);

        $slider.addEventListener('click', event => {
            const $target = event.target;
            if ($target.classList.contains('arrow')) {
                this.slide($target.getAttribute('data-direction'), this._list);
                this.toggleAvailableMod(this.el);
            }
        });
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

document.addEventListener('DOMContentLoaded', function () {
    const sliders = [].map.call(document.getElementById('gallery').querySelectorAll('.slider'), item => {
        return new Slider(item);
    });
});


