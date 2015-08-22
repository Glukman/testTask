var __extends = function (Child, Parent) {
    for (var key in Parent) {
        if (Parent.hasOwnProperty(key)) {
            Child[key] = Parent[key];
        }
    }
    function Surrogate() {
        this.constructor = Child;
    };
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
    Child._super = Parent.prototype;
};

var bind = function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    };
};