var Slide = (function (_super) {
    __extends(Slide, _super);
    var dom = new DomManager();

    function Slide () {
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    };

    Slide.prototype.next = function () {
        var target = this.box.firstElementChild.lastElementChild.firstElementChild;
        target.parentNode.setAttribute('class', 'listLeft animationSpeed');
        setTimeout(function () {
            dom.replaceRight(target.parentNode);
            target.parentNode.removeAttribute('class');
        }, this.config.swipeSpeed);
    };

    Slide.prototype.prev = function (target) {
        var prev = target.parentNode.parentNode.firstChild;
        prev.setAttribute('class', 'clearSlide');
        dom.replaceLeft(target.parentNode);
        prev.setAttribute('class', 'listRight animationSpeed');
    };

    return Slide;

})(AbstractSlider);
