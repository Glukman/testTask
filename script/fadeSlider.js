var Fade = (function (_super) {
    __extends(Fade, _super);
    var dom = new DomManager();

    function Fade () {
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    };

    Fade.prototype.next = function () {
        var target = this.box.firstElementChild.lastElementChild.firstElementChild;
        target.setAttribute('class', 'fadeIn transitionSpeed');
        setTimeout(function () {
            dom.replaceRight(target.parentNode);
            target.removeAttribute('class');
        }, this.config.swipeSpeed);
    };

    Fade.prototype.prev = function (target) {
        var prev = target.parentNode.parentNode.firstChild;
        prev.setAttribute('class', 'fadeIn');
        dom.replaceLeft(target.parentNode);
        prev.setAttribute('class', 'fadeOut animationSpeed');
    };

    return Fade;

})(AbstractSlider);