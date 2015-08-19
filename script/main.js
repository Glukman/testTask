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

    divManager.prototype.craeteDiv = function (images) {
        div = document.createElement('div');
        images.forEach(function (url) {
            div.appendChild(this.createImage(url));
        }, this);
        div.id = 'imageWrap';
        div.style.left = -500;
        return div;
    };

    divManager.prototype.createImage = function (url) {
        image = document.createElement('img');
        image.setAttribute('src', url);
        image.setAttribute('class', 'image');
        return image;
    };

    divManager.prototype.replaceLeft = function (element) {
        element.style.left = 500;
        element.parentNode.appendChild(element.parentNode.firstChild);
    };

    divManager.prototype.replaceRight = function (element) {
        element.style.left = 500;
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
        this.direction && this.slideToLeft(event.target);
        !this.direction && this.slideToRight(event.target);
        z.removeEventListener('touchmove', this.move);

    };

    slideAnimation.prototype.slideToLeft = function (target) {
        
        var start = parseInt(target.style.left) || 0;

        target.style.transition = this.swipeSpeed;
        target.style.left = start - 500;

    };

    slideAnimation.prototype.slideToRight = function (target) {
        var start = parseInt(target.style.left);

        target.style.transition = this.swipeSpeed;
        target.style.left = start + 500;
    };

    slideAnimation.prototype.end = function (event) {
        this.direction && newDiv.replaceLeft(event.target);
        !this.direction && newDiv.replaceRight(event.target);
    };

    
    return slideAnimation;
})(Slider);

var slider = new slideAnimation(config);
slider.mapImages(config.images);

var z = document.getElementById('main');

z.addEventListener('touchstart', slider.start);
z.addEventListener('touchend', slider.end);
};
