var app = app || {};

(function(window, document) {

// SECTIONS:
// S1 VARIABLES DECLARATION
// S2 CALLBACKS (nome elemento + evento + callback)
// S3 PRIVATE METHODS
// S4 GETTTERS
// S5 SETTERS
// S6 PUBLIC METHODS
// S7 INIT

"use strict";

var Docs = function () {

	// =========================================================================
	// S1. VARIABLES DECLARATION
	// =========================================================================
	var _win;
	var _doc;
	var _mustache;

	var _data;
	var _contentTemplate;
	var _content;

	var _editableID;

	var _currentSection;
	var _currentArgument;
	var _selectedElement;

	// =========================================================================
	// S2. CALLBACKS (nome elemento + evento + callback)
	// =========================================================================

	var _argumentClickCallback = function () {
		_markTheArgumentAsActive(this);

		_content.innerHTML = _mustache.render(_contentTemplate, _data);
		_bindEvents();
		_makeElementEditable();
	};

	var _bodyKeyupCallback = function (event) {

		if (_selectedElement) {
			_selectedElement.contentEditable = true;
		}

	};

	// var _editableDoubleclickCallback = function (event) {
		// var sectionName = this.getAttribute("data-sectionname");
		// var argumentName = this.getAttribute("data-argumentname");
//
		// if (sectionName && argumentName) { // argument
			// this.contentEditable = true;
		// }
		// else if (sectionName) { // section
			// this.contentEditable = true;
		// }
	// };

	var _getDataCallback = function (req, par1) {

		_data = JSON.parse(req.response);

//		console.log(Mustache.render(_contentTemplate, _data));

		_content.innerHTML = _mustache.render(_contentTemplate, _data);

		_bindEvents();

	};
	var _loadTemplateCallback = function (req, currentPage) {
		_contentTemplate = req.responseText;
		_sendRequest("data.json", _getDataCallback);
	};

	var _makeElementEditable = function () {
		var element = _doc.getElementById(_editableID);
		if (element) {
			_addClass(element, "selected");
			element.contentEditable = "true";
			element.focus();
			_editableID = null;
		}
	};

	var _sectionClickCallback = function () {
		_markTheSectionAsActive(this);

		_content.innerHTML = _mustache.render(_contentTemplate, _data);
		_bindEvents();
		_makeElementEditable();
	};

	// =========================================================================
	// S3. PRIVATE METHODS
	// =========================================================================

	var _addClass = function (element, newClass) {

		var tmpClass = element.className;

		if (tmpClass) {
			var index = tmpClass.indexOf(newClass);
			if (index === -1) {
				element.className = tmpClass + " " + newClass;
			}
		}

	};

	var _bindEvents = function () {
		var i, elements, len;

		for (i = 0, elements = _doc.getElementsByClassName("section"), len = elements.length; i < len; i += 1) {
			elements[i].addEventListener("click", _sectionClickCallback);
		}
		for (i = 0, elements = _doc.getElementsByClassName("argument"), len = elements.length; i < len; i += 1) {
			elements[i].addEventListener("click", _argumentClickCallback);
		}

		// for (i = 0, elements = _doc.getElementsByClassName("editable"), len = elements.length; i < len; i += 1) {
			// elements[i].addEventListener("dblclick", _editableDoubleclickCallback);
		// }

	};

	var _markTheArgumentAsActive = function (element) {

		var sectionName = element.getAttribute("data-sectionname");
		var argumentName = element.getAttribute("data-argumentname");

		if (argumentName && _currentArgument !== argumentName && sectionName) {
			_editableID = sectionName + "--" + argumentName;
			_currentArgument = argumentName;
			for (var i = 0; i < _data.length; i += 1) {
				if (_data[i].hasOwnProperty("section_name")) {
					if (_data[i].section_name === sectionName)  {
						var args = _data[i].arguments;
						if (args.length > 0) {
							for (var j = 0; j < args.length; j += 1) {
								if (args[j].hasOwnProperty("argument_name")) {
									if (args[j].argument_name === argumentName) {
										args[j].argument_active = true;
									}
									else {
										args[j].argument_active = false;
									}
								}
							}
						}
					}
				}
			}
		}

	};

	var _markTheSectionAsActive = function (element) {

		var sectionName = element.getAttribute("data-sectionname");

		if (sectionName && _currentSection !== sectionName) {
			_currentSection = sectionName;
			_editableID = sectionName;
			for (var i = 0; i < _data.length; i += 1) {
				if (_data[i].hasOwnProperty("section_name")) {
					if (_data[i].section_name === sectionName)  {
						_data[i].active = true;
					}
					else {
						_data[i].active = false;
					}

					var args = _data[i].arguments;
					if (args.length > 0) {
						for (var j = 0; j < args.length; j += 1) {
							if (args[j].hasOwnProperty("argument_name")) {
								args[j].argument_active = false;
							}
						}
					}
				}
			}
		}

	};

	// http://www.quirksmode.org/js/xmlhttp.html
	var _sendRequest = function (url, callback, postData) {
			var req = _createXMLHTTPObject();
			if (!req) return;
			var method = (postData) ? "POST" : "GET";
			req.open(method,url,true);
			// req.setRequestHeader('User-Agent','XMLHTTP/1.0');
			if (postData)
				req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				req.onreadystatechange = function () {
					if (req.readyState != 4) return;
					if (req.status != 200 && req.status != 304) {
					// console.log('HTTP error ' + req.status);
						return;
					}
					callback(req);
			};
			if (req.readyState == 4) return;
			req.send("data=" + JSON.stringify(postData));
	};
	var XMLHttpFactories = [
			function () {return new XMLHttpRequest();},
			function () {return new ActiveXObject("Msxml2.XMLHTTP");},
			function () {return new ActiveXObject("Msxml3.XMLHTTP");},
			function () {return new ActiveXObject("Microsoft.XMLHTTP");}
	];
	var _createXMLHTTPObject = function () {
			var xmlhttp = false;
			for (var i=0;i<XMLHttpFactories.length;i++) {
					try {
							xmlhttp = XMLHttpFactories[i]();
					}
					catch (e) {
							continue;
					}
					break;
			}
			return xmlhttp;
	};

	// =========================================================================
	// S4. GETTTERS
	// =========================================================================
	this.get = function () {

	};


	// =========================================================================
	// S5. SETTERS
	// =========================================================================
	this.set = function () {

	};

	// =========================================================================
	// S6. PUBLIC METHODS
	// =========================================================================
	this.public = function () {

	};


	// =========================================================================
	// S7. INIT
	// =========================================================================
	var _init = function() {
		_win = window;
		_doc = document;
		_mustache = _win.Mustache;

		_content = _doc.getElementById("content");

		_sendRequest("content.mustache", _loadTemplateCallback);

		_doc.body.addEventListener("keyup", _bodyKeyupCallback);

	};


	_init();



};


app.Docs = Docs;


})(this, this.document);
