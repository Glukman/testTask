window.onload = function () {

    var fadeSlider = new fade();
    fadeSlider.init(config, document.getElementById('fade'));

    var slider = new slide();
    slider.init(config, document.getElementById('slide'));

};