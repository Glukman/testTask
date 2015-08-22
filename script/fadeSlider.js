var fade = (function (_super) {
    __extends(fade, _super);
    var dom = new domManager();

    function fade () {
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
    };

    fade.prototype.next = function () {
        var target = this.box.firstElementChild.lastElementChild.firstElementChild;
        target.setAttribute('class', 'fadeIn transitionSpeed');
        setTimeout(function () {
            dom.replaceRight(target.parentNode);
            target.removeAttribute('class');
        }, this.config.swipeSpeed);
    };

    fade.prototype.prev = function (target) {
        var prev = target.parentNode.parentNode.firstChild;
        prev.setAttribute('class', 'fadeIn');
        dom.replaceLeft(target.parentNode);
        prev.setAttribute('class', 'fadeOut animationSpeed');
    };

    return fade;

})(abstractSlider);