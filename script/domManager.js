var domManager = (function () {
    var ul, li, image;

    function domManager () {}

    domManager.prototype.craeteDiv = function (images) {
        ul = document.createElement('ul');
        images.forEach(function (url) {
            ul.appendChild(this.createImage(url));
        }, this);
        ul.id = 'imageWrap';
        return ul;
    };

    domManager.prototype.createImage = function (url) {
        li = document.createElement('li');
        image = document.createElement('img');
        image.setAttribute('src', url);
        li.appendChild(image);
        li.ondragstart = function () {
            return false;
        };
        return li;
    };

    domManager.prototype.applyStyles = function (speed) {
        var style = '.transitionSpeed \n{\ntransition: ' + speed/1000 + 's \n}\n .animationSpeed \n \ {' +
            '\nanimation-duration: ' + speed/1000 + 's\n}';
        var element = document.querySelector('style');
        element.innerHTML = style;
    };

    domManager.prototype.replaceLeft = function (element) {
        element.parentNode.appendChild(element.parentNode.firstChild);
    };

    domManager.prototype.replaceRight = function (element) {
        element.parentNode.insertBefore(element.parentNode.lastChild, element.parentNode.firstChild);
    };

    return domManager;
})();