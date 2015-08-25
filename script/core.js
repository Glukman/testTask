var Slider = (function () {
    var dom = new DomManager();

    function Slider () {};

    Slider.prototype.init = function (config, box) {
        this.box = box;
        this.config = config;
        this.mapImages(config.images, this.box);
        this.initStyles();
        this.box.addEventListener('touchstart', this.start);
        this.box.addEventListener('mousedown', this.start);
        if (modes.indexOf(this.config.mode) !== -1) {
            this[this.config.mode + 'Mode']();
        }
    };

    Slider.prototype.mapImages = function (images, container) {
        container.appendChild(dom.craeteUl(images));
    };

    Slider.prototype.initStyles = function () {
        dom.applyStyles(this.config.swipeSpeed);
    };

    Slider.prototype.autoMode = function () {
        this.interval = setInterval(bind(function () {
            this.next();
        }, this), this.config.swipeDelay);
        this.box.removeEventListener('touchstart', this.start);
        this.box.removeEventListener('mousedown', this.start);
    };

    Slider.prototype.automanualMode = function () {
        this.interval = setInterval(bind(function () {
            this.next();
        }, this), this.config.swipeDelay);
    };

    return Slider;
})();

var AbstractSlider = (function (_super) {

    __extends(AbstractSlider, _super);
    var x;
    function AbstractSlider () {};

    AbstractSlider.prototype.removeListeners = function () {
        this.box.removeEventListener('touchmove', this.move);
        this.box.removeEventListener('mousemove', this.move);
    };

    AbstractSlider.prototype.coundDelta = function () {
        var delta;

        delta = event.changedTouches && event.changedTouches[0].pageX ?
            x - event.changedTouches[0].pageX :
            x - event.pageX;

        if (Math.abs(delta) < 5) {
            this.box.removeEventListener('touchmove', this.move);
            return;
        };

        return delta > 0;
    };

    AbstractSlider.prototype.start = function (event) {
        x = event.pageX || event.changedTouches[0].pageX;
        this.box.addEventListener('touchmove', this.move);
        this.box.addEventListener('mousemove', this.move);
    };

    AbstractSlider.prototype.move = function (event) {
        this.checkMode();
        this.direction = this.coundDelta();
        this.direction && this.next(event.target);
        !this.direction && this.prev(event.target);
        this.removeListeners();
    };

    AbstractSlider.prototype.checkMode = function () {
        if (this.config.mode === 'automanual') {
            this.interval && clearInterval(this.interval);
            this.automanualMode();
        }
    };

    return AbstractSlider;

})(Slider);