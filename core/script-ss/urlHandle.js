var querystring = require('core/querystring')

function getParams(url) {
	if (url == '') return '';
	var paramsStart = url.indexOf('?') + 1;
	var paramsEnd = url.indexOf('#') == -1 ? url.length : url.indexOf('#');
	var str = url.slice(paramsStart, paramsEnd);

	var options = querystring.parse(str)
	return options
}

var getUrl = function(url) {
	if (url == '') return '';

	var options = {};
	options = getParams(url);
	var tag = document.createElement('A');
	tag.href = url;
	options.hostDomain = tag.host;
	var rstr = options.hostDomain.replace(/\.(com|cn|net|org)/g, '');
	rstr = rstr.substr(rstr.lastIndexOf('.') + 1);
	options.rootDomain = options.hostDomain.substr(options.hostDomain.indexOf(rstr));

	return options;
}



function http_build_query(formdata, numeric_prefix, arg_separator) {
	// http://kevin.vanzonneveld.net
	// *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
	// *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
	// *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
	// *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
	var value, key, tmp = [];

	var _http_build_query_helper = function(key, val, arg_separator) {
		var k, tmp = [];
		if (val === true) {
			val = "1";
		} else if (val === false) {
			val = "0";
		}
		if (val != null) {
			if (typeof val === "object") {
				for (k in val) {
					if (val[k] != null) {
						tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
					}
				}
				return tmp.join(arg_separator);
			} else if (typeof val !== "function") {
				return encodeURIComponent(key) + "=" + encodeURIComponent(val);
			} else {
				throw new Error('There was an error processing for http_build_query().');
			}
		} else {
			return '';
		}
	};

	if (!arg_separator) {
		arg_separator = "&";
	}
	for (key in formdata) {
		value = formdata[key];
		if (numeric_prefix && !isNaN(key)) {
			key = String(numeric_prefix) + key;
		}
		var query = _http_build_query_helper(key, value, arg_separator);
		if (query !== '') {
			tmp.push(query);
		}
	}

	return tmp.join(arg_separator);
}

exports.redirect = function(url) {
	var isIe = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
	if (!url) location.href = location.href;
	if (isIe) {
		var referLink = document.createElement('a');
		referLink.href = url;
		document.body.appendChild(referLink);
		referLink.click();
	} else {
		location.href = url;
	}
}

exports.getUrl = getUrl;
exports.getParams = getParams;
exports.http_build_query = http_build_query;
