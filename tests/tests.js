var $ = quark.$,
	$$ = quark.$$;

QUnit.test('css()', function(assert) {
	assert.expect(2);
	$('.test').css('color', 'red');
	assert.ok($('.test').css('color') == 'red', 'Set/get');
	$('.test').css({color: 'green', backgroundColor: 'red'});
	assert.ok($('.test').css('color') == 'green' && $('.test').css('backgroundColor') == 'red', 'Set object');
});

QUnit.test('getComputedStyle()', function(assert) {
	assert.expect(2);
	$('.test').css('fontSize', '16px');
	assert.ok($('.test').getComputedStyle('font-size') == '16px', 'Get');
	assert.ok($('.test').getComputedStyle('font-size', true) == 16, 'Clean get');
});

QUnit.test('html()', function(assert) {
	assert.expect(1);
	$('.test').html('<span>1</span>');
	// toLowerCase() is used for IE8 to pass
	assert.ok($('.test').html().toLowerCase() == '<span>1</span>', 'Set/get');
	$('.test').html('');
});

QUnit.test('text()', function(assert) {
	assert.expect(1);
	$('.test').text('2');
	assert.ok($('.test').text() == '2', 'Set/get');
	$('.test').text('');
});

QUnit.test('attr()', function(assert) {
	assert.expect(1);
	$('.test').attr('test', '1');
	assert.ok($('.test').attr('test') == '1', 'Set/get');
	$('.test').attr('test', null);
});

QUnit.test('data()', function(assert) {
	assert.expect(2);
	$('.test').data('test1', '2');
	assert.ok($('.test').data('test1') == '2', 'Set/get');
	$('.test').data({
		test1: 1,
		test2: 2
	});
	var datalist = $('.test').data();
	assert.ok(datalist.test1 == '1' && datalist.test2 == '2', 'Set/get object');
	$('.test').data({
		test1: null,
		test2: null
	});
});

QUnit.test('val()', function(assert) {
	assert.expect(2);
	$('.input').val('1');
	assert.ok($('.input').val() == '1', 'Set/get input text');
	$('.checkbox').val(true);
	assert.ok($('.checkbox').val(), 'Set/get checkbox');
});

QUnit.test('parent()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	assert.ok($('.test span').parent().node.nodeName == 'DIV');
	$('.test').html('');
});

QUnit.test('previous()', function(assert) {
	assert.expect(2);
	$('.test').html('<span></span><a></a>');
	assert.ok($('.test a').previous().node.nodeName == 'SPAN', 'Found');
	assert.ok($('.test span').previous().node === null, 'Not found');
	$('.test').html('');
});

QUnit.test('next()', function(assert) {
	assert.expect(2);
	$('.test').html('<span></span><a></a>');
	assert.ok($('.test span').next().node.nodeName == 'A', 'Found');
	assert.ok($('.test a').next().node === null, 'Not found');
	$('.test').html('');
});

QUnit.test('append()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	$('.test').append($('<img>'));
	assert.ok($('.test').node.children[1].nodeName == 'IMG');
	$('.test').html('');
});

QUnit.test('prepend()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	$('.test').prepend($('<img>'));	
	assert.ok($('.test').node.children[0].nodeName == 'IMG');
	$('.test').html('');
});

QUnit.test('before()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	$('.test span').before($('<img>'));	
	assert.ok($('.test').node.children[0].nodeName == 'IMG');
	$('.test').html('');
});

QUnit.test('after()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	$('.test span').after($('<img>'));	
	assert.ok($('.test').node.children[1].nodeName == 'IMG');
	$('.test').html('');
});

QUnit.test('remove()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	$('.test span').remove();	
	assert.ok($('.test').node.children.length == 0);
});

QUnit.test('children()', function(assert) {
	assert.expect(1);
	$('.test').html('<span></span>');
	assert.ok($('.test').children().length === $('.test').node.children.length);
	$('.test').html('');
});

QUnit.test('Classes', function(assert) {
	assert.expect(4);
	$('.test').addClass('foo');
	assert.ok($('.test').hasClass('foo'), 'addClass() / hasClass()');
	$('.test').removeClass('foo');
	assert.ok(!$('.test').hasClass('foo'), 'removeClass() / hasClass()');
	$('.test').addClass('bar');
	var classes = $('.test').getClasses();
	assert.ok(classes[0] == 'test' && classes[1] == 'bar', 'getClasses()');
	var el = $('.test');
	$('.test').clearClasses();
	classes = el.getClasses();
	assert.ok(classes.length == 0, 'clearClasses()');
	el.addClass('test');
});

QUnit.test('width()', function(assert) {
	assert.expect(1);
	$('.test').width(100);
	assert.ok($('.test').width() == 100, 'Set/get');
});

QUnit.test('height()', function(assert) {
	assert.expect(1);
	$('.test').height(100);
	assert.ok($('.test').height() == 100, 'Set/get');
});

QUnit.test('top()', function(assert) {
	assert.expect(1);
	$('.test').top(100);
	assert.ok($('.test').top() == 100, 'Set/get');
	$('.test').css('top', 'auto');
});

QUnit.test('bottom()', function(assert) {
	assert.expect(1);
	$('.test').bottom(100);
	assert.ok($('.test').bottom() == 100, 'Set/get');
	$('.test').css('bottom', 'auto');
});

QUnit.test('left()', function(assert) {
	assert.expect(1);
	$('.test').left(100);
	assert.ok($('.test').left() == 100, 'Set/get');
	$('.test').css('left', 'auto');
});

QUnit.test('right()', function(assert) {
	assert.expect(1);
	$('.test').right(100);
	assert.ok($('.test').right() == 100, 'Set/get');
	$('.test').css('right', 'auto');
});

QUnit.test('scrollTop()', function(assert) {
	assert.expect(2);
	$('body').height(2000);
	$(window).scrollTop(100);
	assert.ok($(window).scrollTop() == 100, 'Set/get on window');
	$(window).scrollTop(0);
	$('body').css('height', 'auto');
	var el = $('<div>');
	el.width(200);
	el.height(200);
	$('.test').append(el)
			  .height(100)
			  .css('overflow', 'auto')
			  .scrollTop(10);
	assert.ok($('.test').scrollTop() == 10, 'Set/get on an element');
	$('.test').css({
		height: 'auto',
		overflow: 'visible'
	});
	el.remove();
});

QUnit.test('scrollLeft()', function(assert) {
	assert.expect(2);
	$('body').width(2000);
	$(window).scrollLeft(100);
	assert.ok($(window).scrollLeft() == 100, 'Set/get on window');
	$(window).scrollLeft(0);
	$('body').css('width', 'auto');
	var el = $('<div>');
	el.height(200);
	el.width(200);
	$('.test').append(el)
			  .width(100)
			  .css('overflow', 'auto')
			  .scrollLeft(10);
	assert.ok($('.test').scrollLeft() == 10, 'Set/get on an element');
	$('.test').css({
		width: 'auto',
		overflow: 'visible'
	});
	el.remove();
});

QUnit.test('clone()', function(assert) {
	assert.expect(1);
	assert.ok($('.test').clone().node.nodeName == 'DIV');
});

QUnit.test('on()', function(assert) {
	var done = assert.async();
	assert.expect(1);
	$('.test').on('click', function() {
		assert.ok(true);
		done();
	});
	if('createEvent' in document) {
		var event = document.createEvent('Events');
		event.initEvent('click', true, false);
		$('.test').node.dispatchEvent(event);
	}
	else {
		$('.test').node.fireEvent('onclick');
	}
});

QUnit.start();