var DomManager = (function () {
    var ul, li, image;

    function DomManager () {}

    DomManager.prototype.craeteUl = function (images) {
        ul = document.createElement('ul');
        images.forEach(function (url) {
            ul.appendChild(this.createImage(url));
        }, this);
        ul.id = 'imageWrap';
        return ul;
    };

    DomManager.prototype.createImage = function (url) {
        li = document.createElement('li');
        image = document.createElement('img');
        image.setAttribute('src', url);
        li.appendChild(image);
        li.ondragstart = function () {
            return false;
        };
        return li;
    };

    DomManager.prototype.applyStyles = function (speed) {
        var MILISECONDS = 1000,
        element = document.querySelector('style');
        element.innerHTML = '.transitionSpeed \n{\ntransition: ' + speed/MILISECONDS + 's \n}\n .animationSpeed \n \ {' +
            '\nanimation-duration: ' + speed/MILISECONDS + 's\n}';
    };

    DomManager.prototype.replaceLeft = function (element) {
        element.parentNode.appendChild(element.parentNode.firstChild);
    };

    DomManager.prototype.replaceRight = function (element) {
        element.parentNode.insertBefore(element.parentNode.lastChild, element.parentNode.firstChild);
    };

    return DomManager;
})();