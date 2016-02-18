function rangeSlider(elem, config) {

    var html = document.documentElement,
        range = document.createElement('div'),
        dragger = document.createElement('span'),
        down = false,
        rangeWidth, rangeOffset, draggerWidth, cachePosition;

    var defaults = {
        value: 0, // set default value on initiation from `0` to `100` (percentage based)
        vertical: false, // vertical or horizontal?
        rangeClass: "", // add extra custom class for the range slider track
        draggerClass: "", // add extra custom class for the range slider dragger
        drag: function(v) { /* console.log(v); */ } // function to return the range slider value into something
    };

    for (var i in defaults) {
        if (typeof config[i] == "undefined") config[i] = defaults[i];
    }

    function addEventTo(el, ev, fn) {
        if (el.addEventListener) {
            el.addEventListener(ev, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = fn;
        }
    }

    var isVertical = config.vertical;

    elem.className = (elem.className + ' range-slider ' + (isVertical ? 'range-slider-vertical' : 'range-slider-horizontal')).replace(/^ +/, "");
    range.className = ('range-slider-track ' + config.rangeClass).replace(/ +$/, "");
    dragger.className = ('dragger ' + config.draggerClass).replace(/ +$/, "");

    addEventTo(range, "mousedown", function(e) {
        html.className = (html.className + ' no-select').replace(/^ +/, "");
        rangeWidth = range[!isVertical ? 'offsetWidth' : 'offsetHeight'];
        rangeOffset = range[!isVertical ? 'offsetLeft' : 'offsetTop'];
        draggerWidth = dragger[!isVertical ? 'offsetWidth' : 'offsetHeight'];
        down = true;
        updateDragger(e);
        return false;
    });

    addEventTo(document, "mousemove", function(e) {
        updateDragger(e);
    });

    addEventTo(document, "mouseup", function(e) {
        html.className = html.className.replace(/(^| )no-select( |$)/g, "");
        down = false;
    });

    addEventTo(window, "resize", function(e) {
        var woh = dragger[!isVertical ? 'offsetWidth' : 'offsetHeight'];
        dragger.style[!isVertical ? 'left' : 'top'] = (((cachePosition / 100) * range[!isVertical ? 'offsetWidth' : 'offsetHeight']) - (woh / 2)) + 'px';
        down = false;
    });

    function updateDragger(e) {
        e = e || window.event;
        var pos = !isVertical ? e.pageX : e.pageY;
        if (!pos) {
            pos = !isVertical ? e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft : e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if (down && pos >= rangeOffset && pos <= (rangeOffset + rangeWidth)) {
            dragger.style[!isVertical ? 'left' : 'top'] = (pos - rangeOffset - (draggerWidth / 2)) + 'px';
            cachePosition = Math.round(((pos - rangeOffset) / rangeWidth) * 100);
            config.drag(cachePosition);
        }
    }

    function initDragger() {
        var woh = dragger[!isVertical ? 'offsetWidth' : 'offsetHeight'];
        cachePosition = ((config.value / 100) * range[!isVertical ? 'offsetWidth' : 'offsetHeight']);
        dragger.style[!isVertical ? 'left' : 'top'] = (cachePosition - (woh / 2)) + 'px';
        config.drag(config.value);
    }

    range.appendChild(dragger);
    elem.appendChild(range);

    initDragger();

}
