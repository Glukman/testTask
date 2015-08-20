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

var elManager = (function () {
    var ul, li, image;   

    function elManager () {};

    elManager.prototype.craeteDiv = function (images) {
        ul = document.createElement('ul');
        images.forEach(function (url, i) {
            ul.appendChild(this.createImage(url, i));
        }, this);
        ul.id = 'imageWrap';
        return ul;
    };

    elManager.prototype.createImage = function (url, i) {
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
    var newEl = new elManager();

    function Slider () {};

    Slider.prototype.mapImages = function (images) {
        document.getElementById('main').appendChild(newEl.craeteDiv(images));
    };

    return Slider;
})();

var abstractSlider = (function (_super) {

    __extends(abstractSlider, _super);

    var newEl = new elManager();

    function abstractSlider () {};

    abstractSlider.prototype.start = function (event) {
        x = event.changedTouches[0].pageX;
        z.addEventListener('touchmove', this.move);

    };

    abstractSlider.prototype.move = function (event) {
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

var fade = (function (_super) {
    __extends(fade, _super);
    var newEl = new elManager();

    function fade (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed/1000 + 's';
        this.swipeDelay = config.swipeDelay;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
    };

    
    fade.prototype.next = function (target) {
        target.setAttribute('class', 'fadeIn');
        setTimeout(function () {
            newEl.replaceRight(target.parentNode);
            target.removeAttribute('class');
        }, config.swipeSpeed);
    };

    fade.prototype.prev = function (target) {  
        var prev = target.parentNode.parentNode.firstChild;
        prev.setAttribute('class', 'clear');
        newEl.replaceLeft(target.parentNode);
        prev.setAttribute('class', 'fadeOut');    
    };

    fade.prototype.end = function (event) {};
    return fade;

})(abstractSlider);

var slide = (function (_super) {
    __extends(slide, _super);
    var x;
    var newEl = new elManager();
    function slide (config) {
        this.mode = config.mode;
        this.swipeSpeed = config.swipeSpeed/1000 + 's';
        this.swipeDelay = config.swipeDelay;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    };

    
    slide.prototype.next = function (target) {
                this.direction && newDiv.replaceRight(event.target);
        var start = parseInt(target.parentNode.style.left) || 0;

       // target.parentNode.style.left = start - 500;

    };

    slide.prototype.prev = function (target) {
                
                !this.direction && newDiv.replaceLeft(event.target);
        var start = parseInt(target.parentNode.style.left) || 0;

        // target.parentNode.style.left = start + 500;        
    };

    slide.prototype.end = function (event) {


    };
 
    return slide;

})(abstractSlider);

var slider = new fade(config);
slider.mapImages(config.images);

var z = document.getElementById('main');

z.addEventListener('touchstart', slider.start);
z.addEventListener('touchend', slider.end);
};