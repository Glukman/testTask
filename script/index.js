window.onload = function () {

    var fadeSlider = new Fade();
    fadeSlider.init(config, document.getElementById('fade'));

    var slider = new Slide();
    slider.init(config, document.getElementById('slide'));

};