Quarky 1.1.0
=============

Quarky is a DOM utility designed to work with [quark](https://github.com/pyrsmk/quark). It aims to be small and only handles common tasks.

Install
-------

```shell
npm install quarky
```

Example
-------

```javascript
$('#foo').html("<p>I'm a new paragraph!</p>")
		 .css('color','red')
		 .addClass('bar');
```

API
---

- css(name) : get a CSS property
- css(name, string) : set a CSS property
- css(object) : set a CSS property list
- getComputedStyle(name, clean) : returns the computed style of one node, the name must be hyphenated (CSS syntax), if you want to have a number as the returned value set clean to true (optional)
- html() : get HTML contents
- html(string) : set HTML contents
- text() : get text contents
- text(string) : set text contents
- attr(name) : get an attribute
- attr(name, string) : set an attribute
- data() : get the node's data attribute list
- data(name) : get a data attribute
- data(name, string) : set a data attribute
- data(object) : set a data attribute list
- val() : get the value
- val(string) : set the value
- parent() : get the parent node
- previous() : get the previous node
- next() : get the next node
- append(node) : append a node to the container
- prepend(node) : prepend a node to the container
- before(node) : add a node before it
- after(node) : add a node after it
- remove() : remove the node
- children() : get node's children
- addClass(string) : add a class
- removeClass(string) : remove a class
- hasClass(string) : verify if the class exist for that node
- getClasses() : get all classes
- clearClasses() : clear all classes
- width() : get the width
- width(integer) : set the width (shortcut to `css('width',value)`)
- height() : get the height
- height(integer) : set the height (shortcut to `css('height',value)`)
- top() : get the top offset
- top(integer) : set the top offset (shortcut to `css('top',value)`)
- bottom() : get the bottom offset
- bottom(integer) : set the bottom offset (shortcut to `css('bottom',value)`)
- left() : get the left offset
- left(integer) : set the left offset (shortcut to `css('left',value)`)
- right() : get the right offset
- right(integer) : set the right offset (shortcut to `css('right',value)`)
- scrollTop() : get the scrollTop property
- scrollTop(integer) : set the scrollTop property
- scrollLeft() : get the scrollLeft property
- scrollLeft(integer) : set the scrollLeft property
- clone() : clone the node
- on(event, callback) : add one or a list of events (like `change mouseout click`)

License
-------

Quarky is published under the [MIT license](http://dreamysource.mit-license.org).
