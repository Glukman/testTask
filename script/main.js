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

var divManager = (function () {
    var div, image;   

    function divManager () {};

    divManager.prototype.craeteDiv = function (url) {
        div = document.createElement('div');
        div.appendChild(this.createImage(url));
        return div;
    };

    divManager.prototype.createImage = function (url) {
        image = document.createElement('img');
        image.setAttribute('src', url);
        return image;
    };

    divManager.prototype.setToRight = function () {

    };

    divManager.prototype.setToLeft = function () {

    };

    return divManager;
})();

var Slider = (function () {
    var newDiv = new divManager();

    function Slider () {};

    Slider.prototype.mapImages = function (images) {
        var parent = document.getElementById('main');

        Array.prototype.forEach.call(images, function (image) {
             parent.appendChild(newDiv.craeteDiv(image));
        });
    };
    return Slider;
})();

var slideAnimation = (function (_super) {
    __extends(slideAnimation, _super);
    var started = false,
        delta, touch, x, y;
    function slideAnimation (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed;
        this.swipeDelay = config.swipeDelay;
    };

    slideAnimation.prototype.start = function (event) {
        //поймать текущий эл-т и координаты
        x = event.changedTouches[0].pageX;
    };

    slideAnimation.prototype.move = function (event) {
        //понять в какую сторону двигается
        //описать эту анимацию
        //начать двигать эл-т анимацией (писать в стайл)
        // right to left +!
        delta = x - event.changedTouches[0].pageX;

        delta > 0 && this.slideToLeft(event.target);

    };

    slideAnimation.prototype.slideToLeft = function (target) {
        target.className = 'bounceInRight';
        debugger;
    };

    slideAnimation.prototype.end = function (e) {
        //взять первую и ебануть в зад или наоборот.
    };

    
    return slideAnimation;
})(Slider);

var slider = new slideAnimation(config);
slider.mapImages(config.images);

var z = document.getElementById('main');

z.addEventListener('touchstart', slider.start);
z.addEventListener('touchmove', function (event) {
    slider.move.call(slider, event);
});
z.addEventListener('touchend', slider.end);
};
