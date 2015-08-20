window.onload = function () {

    var __extends = function (Child, Parent) {
        for (var key in Parent) {
            if (Parent.hasOwnProperty(key)) {
                Child[key] = Parent[key];
            }
        }
        function Surrogate() {this.constructor = Child;};
        Surrogate.prototype = Parent.prototype;
        Child.prototype = new Surrogate();
        Child._super = Parent.prototype;
    };

    var __pxToInt = function (px) {
        return parseInt(px) || 0;
    };

    var ModeManager = (function () {
        function ModeManager () {};
        ModeManager.prototype.autoMode = function () {};
        ModeManager.prototype.manualMode = function () {};
        ModeManager.prototype.autoManualMode = function () {};
        return ModeManager;
    })();

    var elManager = (function () {
        var ul, li, image;

        function elManager () {}

        elManager.prototype.craeteDiv = function (images) {
            ul = document.createElement('ul');
            images.forEach(function (url, i) {
                ul.appendChild(this.createImage(url, i));
            }, this);
            ul.id = 'imageWrap';
            return ul;
        };

        elManager.prototype.createImage = function (url) {
            li = document.createElement('li');
            image = document.createElement('img');
            image.setAttribute('src', url);
            li.appendChild(image);
            return li;
        };

        elManager.prototype.replaceLeft = function (element) {
            element.parentNode.appendChild(element.parentNode.firstChild);
        };

        elManager.prototype.replaceRight = function (element) {
            element.parentNode.insertBefore(element.parentNode.lastChild, element.parentNode.firstChild);
        };

        return elManager;
    })();

    var Slider = (function () {
        var newEl = new elManager(),
            modeManager = new ModeManager();

        function Slider () {};

        Slider.prototype.init = function (config, box) {
            this.box = box;
            this.config = config;
            this.mapImages(config.images, this.box);
            this.box.addEventListener('touchstart', this.start);
            this.box.addEventListener('touchend', this.end);
            this.box.addEventListener('click', modeManager.manualMode);
            this.box.addEventListener('oncontextmenu', modeManager.autoMode);
            this.box.addEventListener('ondblclick', modeManager.autoManualMode);
        };

        Slider.prototype.mapImages = function (images, container) {
            container.appendChild(newEl.craeteDiv(images));
        };

        return Slider;
    })();

    var abstractSlider = (function (_super) {

        __extends(abstractSlider, _super);

        var newEl = new elManager();

        function abstractSlider () {};

        abstractSlider.prototype.start = function (event) {
            x = event.changedTouches[0].pageX;
            this.box.addEventListener('touchmove', this.move);

        };

        abstractSlider.prototype.move = function (event) {
            var delta = x - event.changedTouches[0].pageX;

            if (Math.abs(delta) < 5) {
                this.box.removeEventListener('touchmove', this.move);
                return;
            };
            this.direction = (delta > 0);
            this.direction && this.next(event.target);
            !this.direction && this.prev(event.target);
            this.box.removeEventListener('touchmove', this.move);
        };

        return abstractSlider;

    })(Slider);

    var fade = (function (_super) {
        __extends(fade, _super);
        var newEl = new elManager();

        function fade () {
            this.start = this.start.bind(this);
            this.move = this.move.bind(this);
            this.end = this.end.bind(this);
        };

        fade.prototype.init = function (config, box) {
            this.box = box;
            this.config = config;
            this.mapImages(config.images, this.box);
            this.box.addEventListener('touchstart', fadeSlider.start);
            this.box.addEventListener('touchend', fadeSlider.end);
        };

        fade.prototype.next = function (target) {
            target.setAttribute('class', 'fadeIn');
            setTimeout(function () {
                newEl.replaceRight(target.parentNode);
                target.removeAttribute('class');
            }, this.config.swipeSpeed);
        };

        fade.prototype.prev = function (target) {
            var prev = target.parentNode.parentNode.firstChild;
            prev.setAttribute('class', 'clearFade');
            newEl.replaceLeft(target.parentNode);
            prev.setAttribute('class', 'fadeOut');
        };

        fade.prototype.end = function (event) {};

        return fade;

    })(abstractSlider);

    var slide = (function (_super) {
        __extends(slide, _super);
        var newEl = new elManager();

        function slide () {
            this.start = this.start.bind(this);
            this.move = this.move.bind(this);
            this.end = this.end.bind(this);
        };

        slide.prototype.next = function (target) {
            target.parentNode.setAttribute('class', 'listLeft');
            setTimeout(function () {
                newEl.replaceRight(target.parentNode);
                target.parentNode.removeAttribute('class');
            }, this.config.swipeSpeed);
        };

        slide.prototype.prev = function (target) {
            var prev = target.parentNode.parentNode.firstChild;
            prev.setAttribute('class', 'clearSlide');
            newEl.replaceLeft(target.parentNode);
            prev.setAttribute('class', 'listRight');
        };

        slide.prototype.end = function (event) {};

        return slide;

    })(abstractSlider);

    var fadeSlider = new fade();
    fadeSlider.init(config, document.getElementById('fade'));

    var slider = new slide();
    slider.init(config, document.getElementById('slide'));

};