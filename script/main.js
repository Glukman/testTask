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

var divCreator = (function () {
    var div, image;   

    function divCreator () {};

    divCreator.prototype.craeteDiv = function (url) {
        div = document.createElement('div');
        div.appendChild(this.createImage(url));
        return div;
    };

    divCreator.prototype.createImage = function (url) {
        image = document.createElement('image');
        image.setAttribute('src', url);
        return image;
    };

    return divCreator;
})();

var Slider = (function () {
    var newDiv = new divCreator();

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
        detecting, delta, touch, x, y;
    function slideAnimation (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed;
        this.swipeDelay = config.swipeDelay;
    };

    slideAnimation.prototype.touchStart = function (e) {
        if (e.touches.length != 1 || started) {
            return;
        }

        detecting = true;

        touch = e.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;

    };

    slideAnimation.prototype.touchMove = function (e) {
        if (!started && !detecting) {
            return;
        };
        if (detecting) {
            this.detect(e);
        };
        if (started) {
            this.draw(e);
        };
    };

    slideAnimation.prototype.touchEnd = function (e) {
        if (e.changedTouches[0].indexOf(touch) == -1 || !started) {
            return;
        }

        e.preventDefault();

        swipeTo = delta < 0 ? 'left' : 'right';

        swipe(swipeTo);    
    };

     slideAnimation.prototype.detect = function (e) {
        if (e.changedTouches.indexOf(touch) == -1) {
            return;
        };
        if (abs(x - newX) >= abs(y - newY)) {

            e.preventDefault();
            started = true;
        };
        detecting = false;   
    };

    slideAnimation.prototype.draw = function (e) {
        e.preventDefault();

        if (e.changedTouches.indexOf(touch) == -1) {
            return;
        }

        delta = x - newX;

        if (delta > 0 && !leftPage || delta < 0 && !rightPage) {
            delta = delta / 5;
        }

        moveTo(delta);   
    };
    return slideAnimation;
})(Slider);

var slider = new slideAnimation(config);
slider.mapImages(config.images);

var z = document.getElementById('main');

z.addEventListener('touchstart', slider.touchStart);
z.addEventListener('touchmove', slider.touchMove.call(slider));
z.addEventListener('touchend', slider.touchEnd);
};
