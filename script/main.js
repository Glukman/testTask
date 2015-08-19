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

var divManager = (function () {
    var div, image;   

    function divManager () {};

    divManager.prototype.craeteDiv = function (images) {
        div = document.createElement('ul');
        images.forEach(function (url, i) {
            div.appendChild(this.createImage(url, i));
        }, this);
        div.id = 'imageWrap';
        div.style.left = -500;
        return div;
    };

    divManager.prototype.createImage = function (url, i) {
        image = document.createElement('li');
        image.setAttribute('i', i+1);
        image.setAttribute('src', url);
        image.style.left = '0px';
        return image;
    };

    divManager.prototype.replaceLeft = function (element) {
        element.parentNode.appendChild(element.parentNode.firstChild);
    };

    divManager.prototype.replaceRight = function (element) {
        element.parentNode.insertBefore(element.parentNode.lastChild, element.parentNode.firstChild);
    };

    return divManager;
})();

var Slider = (function () {
    var newDiv = new divManager();

    function Slider () {};

    Slider.prototype.mapImages = function (images) {
        document.getElementById('main').appendChild(newDiv.craeteDiv(images));
    };

    return Slider;
})();
// вынести абстрактный слайдер +
// перехуярить на список вмето дивов
// сделать пиксели в инт (хэлпер) +

var abstractSlider = (function (_super) {

    __extends(abstractSlider, _super);

    var newDiv = new divManager();

    function slideAnimation (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed/1000 + 's';
        this.swipeDelay = config.swipeDelay;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
    };

    slideAnimation.prototype.start = function (event) {
        x = event.changedTouches[0].pageX;
        z.addEventListener('touchmove', this.move);

    };

    slideAnimation.prototype.move = function (event) {
        var delta = x - event.changedTouches[0].pageX;

        if (Math.abs(delta) < 10) {
            z.removeEventListener('touchmove', this.move);
            return;
        };
        this.direction = (delta > 0); 
        this.direction && this.next(event.target);
        !this.direction && this.prev(event.target);
        z.removeEventListener('touchmove', this.move);
    };

    return abstractSlider;

})(Slider);

var slideAnimation = (function (_super) {
    __extends(slideAnimation, _super);
    var x;
    var newDiv = new divManager();
    function slideAnimation (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed/1000 + 's';
        this.swipeDelay = config.swipeDelay;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
    };

    
    slideAnimation.prototype.next = function (target) {
                this.direction && newDiv.replaceRight(event.target);
        var start = parseInt(target.parentNode.style.left) || 0;

       // target.parentNode.style.left = start - 500;

    };

    slideAnimation.prototype.prev = function (target) {
                
                !this.direction && newDiv.replaceLeft(event.target);
        var start = parseInt(target.parentNode.style.left) || 0;

        // target.parentNode.style.left = start + 500;        
    };

    slideAnimation.prototype.end = function (event) {


    };
 
    return slideAnimation;

})(abstractSlider);

var slider = new slideAnimation(config);
slider.mapImages(config.images);

var z = document.getElementById('main');

z.addEventListener('touchstart', slider.start);
z.addEventListener('touchend', slider.end);
};