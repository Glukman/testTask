var slide = (function (_super) {
    __extends(slide, _super);
    var dom = new domManager();

    function slide () {
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    };

    slide.prototype.next = function () {
        var target = this.box.firstElementChild.lastElementChild.firstElementChild;
        target.parentNode.setAttribute('class', 'listLeft animationSpeed');
        setTimeout(function () {
            dom.replaceRight(target.parentNode);
            target.parentNode.removeAttribute('class');
        }, this.config.swipeSpeed);
    };

    slide.prototype.prev = function (target) {
        var prev = target.parentNode.parentNode.firstChild;
        prev.setAttribute('class', 'clearSlide');
        dom.replaceLeft(target.parentNode);
        prev.setAttribute('class', 'listRight animationSpeed');
    };

    return slide;

})(abstractSlider);
