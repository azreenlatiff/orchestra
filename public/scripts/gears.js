/**
 * Global JavaScript code helpful for all website pages. Based on zendesk-global.js in QSGlue.
 * 
 * File Loader
 * -----------
 * We provide a useful way to load multiple files (HTML and JS) asynchronously, and to execute a function after
 * all files have loaded.
 *   loadJs(jsFile);
 *   loadHtml(htmlFile, functionToAppendHtml);
 *   registerOnload(2, function() {
 *     console.log("Loaded all files.");
 *   });
 * 
 * Note that the individual file-loaded callback function is called BEFORE the overall load-complete callback.
 */

var numFilesLoaded = 0;

var onloadFunctions = new Object();

// Root folder is different for cloud9 preview mode
var rootLocation = "";
if(location.href.indexOf("//c9.io/") >= 0) {
    rootLocation = "https://c9.io/azreenlatiff/qswebsitegears/workspace/public";
}

function registerOnload(numToLoad, onloadFunction) {
    onloadFunctions["I-" + numToLoad] = onloadFunction;
}

// First callback argument is HTML
function loadHtml(htmlFile, successFunction) {
    jQuery.ajax({
      url: _getUrl(htmlFile),
	  success: function(data) {
          if(successFunction != null) successFunction(data);
          _fileLoaded(htmlFile);
      },
	  error: function(a,b,c) {
		  console.log("Error loading HTML: " + htmlFile, arguments);
	  },
	  dataType: "html"
	});
}

function loadJs(jsFile, successFunction, cache) {
    if(cache == null) cache = true;
    jQuery.ajax({
	  url: _getUrl(jsFile),
	  success: function(data) {
          if(successFunction != null) successFunction(data);
          _fileLoaded(jsFile);
      },
	  error: function(a,b,c) {
		  console.log("Error loading JS: " + htmlFile, arguments);
	  },
	  dataType: "script",
	  cache: cache
	});
}

function _getUrl(fileUrl) {
    if(fileUrl.indexOf("http") >= 0) return fileUrl;
    else if(fileUrl.indexOf("/") == 0) return rootLocation + fileUrl;
    else return fileUrl;
}

function _fileLoaded(fileName) {
    numFilesLoaded++;
    console.log(" -- Loaded:" + fileName + " (total " + numFilesLoaded + ")");
    
    var olf = onloadFunctions["I-" + numFilesLoaded];
    if(olf != null) olf();
}

function getQueryParam(param){
    // this condition suppress error
	if(location.href.match(param+'=')) return location.href.toString().split(param+'=')[1].split('&')[0];
    else return "";
}



/*
* Handle Logs, use log() instead of console.log()
*/

if (!window.console) {
    console = {};
	console.log = function(){};
	console.warn = function(){};
	console.error = function(){};
	console.info = function(){};
}

log.error = function() {
	console.error.apply(console, arguments);
};

log.debug = function() {
	//console.log.apply(console, arguments);
};

log.info = function() {
	console.log.apply(console, arguments);
};

log.trace = function() {
	console.trace();
};

var isIE = false;
if(navigator.appName == "Microsoft Internet Explorer") isIE = true;

function log() {
	if(isIE) {
		for(var i=0; i<arguments.length; i++) {
			console.log(arguments[i]);
		}
	} else {
		console.log.apply(console, arguments);
	}
}

if(isIE) {
	log.error = function() {
		var args = ["ERROR: " + arguments[0]];
		for(var i=1; i<arguments.length; i++) {
			args[args.length] = arguments[i];
		}
		log.apply(log, args);
	}
}

// Cookie.js from https://github.com/tdd/cookies-js-helper
(function(scope) {

  var _toString = Object.prototype.toString;
  function isDate(o)   { return '[object Date]'   == _toString.call(o); }
  function isRegExp(o) { return '[object RegExp]' == _toString.call(o); }
  
  var Cookie = {
    get: function get(name) {
      return Cookie.has(name) ? Cookie.list()[name] : null;
    },
    has: function has(name) {
      return new RegExp("(?:;\\s*|^)" + encodeURIComponent(name) + '=').test(document.cookie);
    },
    list: function list(nameRegExp) {
      var pairs = document.cookie.split(';'), pair, result = {};
      for (var index = 0, len = pairs.length; index < len; ++index) {
        pair = pairs[index].split('=');
        pair[0] = pair[0].replace(/^\s+|\s+$/, '');
        if (!isRegExp(nameRegExp) || nameRegExp.test(pair[0]))
          result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return result;
    },
    
    /**
     * Cookie.remove(name[, options]) -> String
     * - name (String): The name of the cookie you want to remove.
     * - options (Object): An optional set of settings for cookie removal. See Cookie.set for details.
     */
    remove: function remove(name, options) {
      var opt2 = {};
      for (var key in (options || {})) opt2[key] = options[key];
      opt2.expires = new Date(0);
      opt2.maxAge = -1;
      return Cookie.set(name, null, opt2);
    },
    
    /**
     * Cookie.set(name, value, [, options]) -> String
     * - name (String): The name of the cookie you want to set.
     * - value (Object): The value for the cookie you want to set.  It will undergo a basic `toString()`
     *     transform, so if it's a complex object you likely want to, say, use its JSON representation instead.
     * - options (Object): An optional set of settings for cookie setting. See below.
     *
     * Sets a cookie for the name and value you passed, honoring potential filtering options.
     * Returns the actual cookie string written to the underlying `document.cookie` property.
     *
     * Possible options are:
     *
     * * `path` sets the path within the current domain. Defaults to the current path. Minimum is '/'.
     *   Ignored if blank.
     * * `domain` sets the (sub)domain this cookie pertains to. At the shortest, the current root
     *   domain (e.g. 'example.com'), but can also be any depth of subdomain up to the current one
     *   (e.g. 'www.demo.example.com'). Ignored if blank.
     * * `maxAge` / `max_age` / `max-age` is one way to define when the cookie should expire; this
     *   is a time-to-live in _seconds_. Any of the three keys is accepted, in this order of
     *   decreasing priority (first found key short-circuits the latter ones).
     * * `expires` is the traditional way of setting a cookie expiry, using an absolute GMT date/time
     *   string with an RFC2822 format (e.g. 'Tue, 02 Feb 2010 22:04:47 GMT').  You can also pass
     *   a `Date` object set appropriately, in which case its `toUTCString()` method will be used.
     * * `secure` defines whether the cookie should only be passed through HTTPS connections.  It's
     *   used as `Boolean`-equivalent (so zero, `null`, `undefined` and the empty string are all false).
     */
    set: function set(name, value, options) {
      options = options || {};
      var def = [encodeURIComponent(name) + '=' + encodeURIComponent(value)];
      if (options.path) def.push('path=' + options.path);
      if (options.domain) def.push('domain=' + options.domain);
      var maxAge = 'maxAge' in options ? options.maxAge :
        ('max_age' in options ? options.max_age : options['max-age']), maxAgeNbr;
      if ('undefined' != typeof maxAge && 'null' != typeof maxAge && (!isNaN(maxAgeNbr = parseFloat(maxAge))))
        def.push('max-age=' + maxAgeNbr);
      var expires = isDate(options.expires) ? options.expires.toUTCString() : options.expires;
      if (expires) def.push('expires=' + expires);
      if (options.secure) def.push('secure');
      def = def.join(';');
      document.cookie = def;
      return def;
    },
    test: function test() {
      var key = '70ab3d396b85e670f25b93be05e027e4eb655b71', value = 'Élodie Jaubert';
      Cookie.remove(key);
      Cookie.set(key, value);
      var result = value == Cookie.get(key);
      Cookie.remove(key);
      return result;
    }
  };
  scope.Cookie = Cookie;
})(window);