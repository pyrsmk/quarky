var scrollElement;

/*
    Get the base scrolling element

    Return
        Object
*/
function getScrollElement() {
    if(!scrollElement) {
        document.body.scrollTop += 1;
        document.body.scrollLeft += 1;
        if(document.body.scrollTop || document.body.scrollLeft) {
            scrollElement = document.body;
        }
        else {
            scrollElement = document.documentElement;
        }
        document.body.scrollTop -= 1;
        document.body.scrollLeft -= 1;
    }
    return scrollElement;
}

/*
    Return a css property, set a css property or set a list of properties

    Parameters
        String, Object name
        String, undefined value

    Return
        String, Object, null
*/
$._nodeMethods.css = function(name, value) {
    var // Translate CSS name to JS syntax
        translateName = function(name) {
            return name.replace(/-([a-z])/g, function(str, p1) {
                return p1.toUpperCase();
            });
        },
        // Set a CSS property
        setStyle = function(el, name, value) {
            name = translateName(name);
            if(name == 'opacity') {
                try {
                    el.filters['DXImageTransform.Microsoft.Alpha'].opacity = value * 100;
                }
                catch(e) {
                    try {
                        el.filters('alpha').opacity = value * 100;
                    }
                    catch(a) {
                        el.style.opacity = value;
                    }
                }
            }
            else {
                el.style[name] = value;
            }
        },
        // Get a CSS property
        getStyle = function(el, name) {
            name = translateName(name);
            if(name == 'opacity') {
                try {
                    return el.filters['DXImageTransform.Microsoft.Alpha'].opacity / 100;
                }
                catch(e) {
                    try {
                        return el.filters('alpha').opacity / 100;
                    }
                    catch(a) {
                        return el.style.opacity;
                    }
                }
            }
            return el.style[name] || null;
        };
    if(typeof name == 'string') {
        // Get a CSS property
        if(value === undefined) {
            return getStyle(this.node, name);
        }
        // Set a CSS property
        else{
            setStyle(this.node, name, value);
            return this;
        }
    }
    // Set a list of CSS properties
    else if(typeof name == 'object') {
        for(var i in name) {
            setStyle(this.node, i, name[i]);
        }
        return this;
    }
};

/*
    Return or set html content

    Parameters
        String html

    Return
        String, Object
*/
$._nodeMethods.html = function(html) {
    // Get node's html
    if(html === undefined) {
        if(this.node.nodeName == 'IFRAME') {
            return this.node.src.substr(29);
        }
        else {
            return this.node.innerHTML;
        }
    }
    // Set node's html
    else {
        if(this.node.nodeName == 'IFRAME') {
            this.node.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
        }
        else {
            this.node.innerHTML = html;
        }
        return this;
    }
};

/*
    Return or set text content

    Parameters
        String text

    Return
        String, Object
*/
$._nodeMethods.text = function(text) {
    // Get node's text
    if(text === undefined) {
        if('textContent' in this.node) {
            //return this.node.textContent.replace(/^\s*(.+?)\s*$/, '$1');
            return this.node.textContent;
        }
        else {
            return this.node.innerText;
        }
    }
    // Set node's text
    else {
        if('textContent' in this.node) {
            this.node.textContent = text;
        }
        else {
            this.node.innerText = text;
        }
        return this;
    }
};

/*
    Return an attribute, set a list of attributes, set just one or remove one

    Parameters
        String, Object name
        String, undefined value

    Return
        Array, String, Object
*/
$._nodeMethods.attr = function(name, value) {
    var i, j, k;
    if(typeof name == 'string') {
        // Get an attribute
        if(value === undefined) {
            return this.node.getAttribute(name);
        }
        // Remove an attribute
        else if(value === null) {
            this.node.removeAttribute(name);
            return this;
        }
        // Set an attribute
        else {
            this.node.setAttribute(name, value);
            return this;
        }
    }
    // Set a list of attributes
    else if(typeof name == 'object') {
        for(k in name) {
            this.node.setAttribute(i, name[k]);
        }
        return this;
    }
};

/*
    Return a list of data attributes, return one, set a list or one

    Parameters
        String, Object name
        String value

    Return
        Array, String, Object
*/
$._nodeMethods.data = function(name, value) {
    var i;
    // Get the data list
    if(name === undefined) {
        var values = {}, j,
            attributes = this.node.attributes;
        for(i=0, j=attributes.length; i<j; ++i) {
            if(/^data-/i.test(attributes[i].name)) {
                values[attributes[i].name.substring(5)] = attributes[i].value;
            }
        }
        return values;
    }
    // Set a list of data attributes
    else if(typeof name == 'object') {
        for(i in name) {
            this.attr('data-' + i, name[i]);
        }
    }
    // Get a data attribute
    else if(value === undefined) {
        return this.attr('data-' + name);
    }
    // Set a data attribute
    else {
        this.attr('data-' + name, value);
    }
    return this;
};

/*
    Return a value or set one

    Parameters
        String, Boolean value

    Return
        Array, String, Object
*/
$._nodeMethods.val = function(value) {
    // Return an input's value
    if(value === undefined){
        if(this.node.type == 'checkbox') {
            return this.node.checked;
        }
        else {
            return this.node.value;
        }
    }
    // Set an input's value
    else {
        if(this.node.type == 'checkbox'){
            this.node.checked = value;
        }
        else{
            this.node.value = value;
        }
        return this;
    }
};

/*
    Return node's parent

    Return
        Object
*/
$._nodeMethods.parent = function() {
    return $(this.node.parentNode);
};

/*
    Return node's previous sibling

    Return
        Object
*/
$._nodeMethods.previous = function() {
    var prev = this.node;
    do {
        prev = prev.previousSibling;
    }
    while(prev && prev.nodeType != 1);
    return $(prev);
};

/*
    Return node's next sibling

    Return
        Object
*/
$._nodeMethods.next = function() {
    var next = this.node;
    do {
        next = next.nextSibling;
    }
    while(next && next.nodeType != 1);
    return $(next);
};

/*
    Append a node

    Parameters
        Object nodes

    Return
        Object
*/
$._nodeMethods.append = function(nodes) {
    var node = this.node;
    $$(nodes).forEach(function() {
        node.appendChild(this.node);
    });
    return this;
};

/*
    Prepend a node

    Parameters
        Object nodes

    Return
        Object
*/
$._nodeMethods.prepend = function(nodes) {
    var node = this.node,
        before = this.children()[0].node;
    $$(nodes).forEach(function() {
        node.insertBefore(this.node, before);
    });
    return this;
};

/*
    Add a node before the current node

    Parameters
        Object nodes

    Return
        Object
*/
$._nodeMethods.before = function(nodes) {
    var node = this.parent().node,
        before = this.node;
    $$(nodes).forEach(function() {
        node.insertBefore(this.node, before);
    });
    return this;
};

/*
    Add a node after the current node

    Parameters
        Object nodes

    Return
        Object
*/
$._nodeMethods.after = function(nodes) {
    var next = this.next();
    if(next.node) {
        return next.before(nodes);
    }
    else {
        return this.parent().append(nodes);
    }
};

/*
    Remove the current node
*/
$._nodeMethods.remove = function() {
    this.parent().node.removeChild(this.node);
};

/*
    Return node's children

    Return
        Array
*/
$._nodeMethods.children = function() {
    return $$(this.node.children);
};

/*
    Add a class to the current node

    Parameters
        String cls

    Return
        Object
*/
$._nodeMethods.addClass = function(cls) {
    this.node.className += ' ' + cls;
    return this;
};

/*
    Test if a class exists

    Parameters
        String cls

    Return
        Boolean
*/
$._nodeMethods.hasClass = function(cls) {
    var re = new RegExp('(^|\\s)' + cls + '($|\\s)');
    return re.test(this.node.className);
};

/*
    Remove a class from the current node

    Parameters
        String cls

    Return
        Object
*/
$._nodeMethods.removeClass = function(cls) {
    var re = new RegExp('(^|\\s)' + cls + '($|\\s)');
    this.node.className = this.node.className.replace(re, ' ');
    return this;
};

/*
    Get class list

    Return
        Array
*/
$._nodeMethods.getClasses = function() {
    var classes = this.node.className.split(/\s+/);
    if(!classes[0]) {
        return [];
    }
    else {
        return classes;
    }
};

/*
    Remove all classes

    Return
        Object
*/
$._nodeMethods.clearClasses = function() {
    this.node.className = '';
    return this;
};

/*
    Set/get width

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.width = function(value) {
    if(value === undefined) {
        if(this.node === window) {
            return W.getViewportWidth();
        }
        else if(
            this.node === document ||
            this.node === document.documentElement ||
            this.node === document.body
        ) {
            return Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.clientWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth
            );
        }
        else {
            return this.node.offsetWidth;
        }
    }
    else {
        this.css('width', value + 'px');
        return this;
    }
};

/*
    Set/get height

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.height = function(value) {
    if(value === undefined) {
        if(this.node === window) {
            return W.getViewportHeight();
        }
        else if(
            this.node === document ||
            this.node === document.documentElement ||
            this.node === document.body
        ) {
            return Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
        }
        else {
            return this.node.offsetHeight;
        }
    }
    else {
        this.css('height', value + 'px');
        return this;
    }
};

/*
    Set/get top offset

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.top = function(value) {
    if(value === undefined) {
        return this.node.offsetTop;
    }
    else {
        this.css('top', value + 'px');
        return this;
    }
};

/*
    Set/get bottom offset

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.bottom = function(value) {
    if(value === undefined){
        var bottom = this.css('bottom');
        if(bottom) {
            return parseInt(bottom.replace(/[a-z]+/i, ''), 10);
        }
        return bottom;
    }
    else {
        this.css('bottom', value + 'px');
        return this;
    }
};

/*
    Set/get left offset

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.left = function(value) {
    if(value === undefined) {
        return this.node.offsetLeft;
    }
    else {
        this.css('left', value + 'px');
        return this;
    }
};

/*
    Set/get right offset

    Parameters
        Number value

    Return
        Number
*/
$._nodeMethods.right = function(value) {
    if(value === undefined) {
        var right = this.css('right');
        if(right) {
            return parseInt(right.replace(/[a-z]+/i, ''), 10);
        }
        return right;
    }
    else {
        this.css('right', value + 'px');
        return this;
    }
};

/*
    Clone

    Return
        Node
*/
$._nodeMethods.clone = function() {
    return $(this.node.cloneNode(true));
};

/*
    Add a listener

    Parameters
        String event
        Function func

    Return
        Object
*/
$._nodeMethods.on = function(event, func) {
    event = event.split(' ');
    for(var i=0, j=event.length; i<j; ++i) {
        if(this.node.addEventListener) {
            this.node.addEventListener(event[i], func, false);
        }
        else{
            this.node.attachEvent('on' + event[i], func);
        }
    }
    return this;
};

/*
    Set/get scrollTop

    Parameters
        Number value

    Return
        Number, Object
*/
$._nodeMethods.scrollTop = function(value) {
    if(
        this.node === window ||
        this.node === document ||
        this.node === document.documentElement ||
        this.node === document.body
    ) {
        if(value !== undefined) {
            getScrollElement().scrollTop = value;
            return this;
        }
        else {
            return getScrollElement().scrollTop;
        }
    }
    else {
        if(value !== undefined) {
            this.node.scrollTop = value;
            return this;
        }
        else {
            return this.node.scrollTop;
        }
    }
};

/*
    Set/get scrollLeft

    Parameters
        Number value

    Return
        Number, Object
*/
$._nodeMethods.scrollLeft = function(value) {
    if(
        this.node === window ||
        this.node === document ||
        this.node === document.documentElement ||
        this.node === document.body
    ) {
        if(value !== undefined) {
            getScrollElement().scrollLeft = value;
            return this;
        }
        else {
            return getScrollElement().scrollLeft;
        }
    }
    else{
        if(value !== undefined) {
            this.node.scrollLeft = value;
            return this;
        }
        else {
            return this.node.scrollLeft;
        }
    }
};

/*
    Get computed style

    Parameters
        String name
        Boolean clean

    Return
        String, Number, null
*/
$._nodeMethods.getComputedStyle = function(name, clean) {
    var value = null;
    if(this.node.currentStyle) {
        value = this.node.currentStyle[
            name.replace(
                /-([a-z])/g,
                function(s, p1) {
                    return p1.toUpperCase();
                }
            )
        ];
    }
    if(window.getComputedStyle) {
        value = window.getComputedStyle(this.node).getPropertyValue(name);
    }
    if(clean) {
        value = parseFloat(value.replace(/[a-z]+$/, ''));
    }
    return value;
};
