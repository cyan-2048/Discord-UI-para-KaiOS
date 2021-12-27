function getCaretPosition(editableDiv) {
	var caretPos = 0,
		sel,
		range;

	sel = window.getSelection();
	if (sel.rangeCount) {
		range = sel.getRangeAt(0);
		if (range.commonAncestorContainer.parentNode == editableDiv) {
			caretPos = range.endOffset;
		}
	}

	return caretPos;
}

var focusTimeout;

window.addEventListener('keydown', (e) => {
	var d = document;
	var k = e.key;
	var a = document.activeElement;
	var qs = 'querySelector';
	var qa = 'querySelectorAll';

	if (
		((k == 'ArrowUp' &&
			(getCaretPosition(d[qs]('#writert')) !=
				d[qs]('#writert').innerText.length - 1 ||
				d[qs]('#writert').innerText.length - 1 == 0)) ||
			(k == 'ArrowDown' &&
				(getCaretPosition(d[qs]('#writert')) != 0 ||
					d[qs]('#writert').innerText.length - 1 == 0))) &&
		!e.repeat &&
		a.id == 'writert'
	) {
		let caret = getCaretPosition(d[qs]('#writert'));
		let contain = d[qs]('#message_container');

		if (caret == 0) {
			contain.focus();
		} else if (caret == d[qs]('#writert').innerText.length - 1) {
			contain.focus();
		}
	}

	setTimeout(() => {
		if ((k == 'ArrowUp' || k == 'ArrowDown') && a.id == 'message_container') {
			let text = d[qs]('#writert');
			if (a.scrollHeight - a.scrollTop === a.clientHeight) {
				text.focus();
			} else if (a.scrollTop === 0) {
				text.focus();
			}
		}
	}, 50);

	if (k == 'ArrowRight' && a.id == 'message_container')
		d[qs]('#writert').focus();
});

document.querySelector('#writert').onfocus = () => {
	changeSoftKeys(['Send', 'enter', 'Options']);
};

document.querySelector('#message_container').onfocus = () => {
	changeSoftKeys(['Channels', 'send', 'Options']);
};

function changeSoftKeys(arr) {
	var d = document;
	var qs = 'querySelector';
	d[qs]('footer .left').innerHTML = arr[0];
	d[qs]('footer .center').innerHTML = arr[1];
	d[qs]('footer .right').innerHTML = arr[2];
}
