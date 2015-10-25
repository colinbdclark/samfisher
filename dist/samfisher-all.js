/*! Sam Fisher Motion Detection 1.1.2, Copyright 2015 Colin Clark | github.com/colinbdclark/samfisher*/
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Fluid Infusion v2.0
 *
 * Infusion is distributed under the Educational Community License 2.0 and new BSD licenses:
 * http://wiki.fluidproject.org/display/fluid/Fluid+Licensing
 *
 * For information on copyright, see the individual Infusion source code files:
 * https://github.com/fluid-project/infusion/
 */
/*
Copyright 2007-2010 University of Cambridge
Copyright 2007-2009 University of Toronto
Copyright 2007-2009 University of California, Berkeley
Copyright 2010-2011 Lucendo Development Ltd.
Copyright 2010 OCAD University
Copyright 2011 Charly Molter
Copyright 2014-2015 Raising the Floor - International

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global console */

var fluid_2_0_0_beta_1 = fluid_2_0_0_beta_1 || {};
var fluid = fluid || fluid_2_0_0_beta_1;

(function ($, fluid) {
    "use strict";

    fluid.version = "Infusion 2.0.0";

    // Export this for use in environments like node.js, where it is useful for
    // configuring stack trace behaviour
    fluid.Error = Error;

    fluid.environment = {
        fluid: fluid
    };

    fluid.global = fluid.global || typeof window !== "undefined" ?
        window : typeof self !== "undefined" ? self : {};

    // A standard utility to schedule the invocation of a function after the current
    // stack returns. On browsers this defaults to setTimeout(func, 1) but in
    // other environments can be customised - e.g. to process.nextTick in node.js
    // In future, this could be optimised in the browser to not dispatch into the event queue
    fluid.invokeLater = function (func) {
        return setTimeout(func, 1);
    };

    // The following flag defeats all logging/tracing activities in the most performance-critical parts of the framework.
    // This should really be performed by a build-time step which eliminates calls to pushActivity/popActivity and fluid.log.
    fluid.defeatLogging = true;

    // This flag enables the accumulating of all "activity" records generated by pushActivity into a running trace, rather
    // than removing them from the stack record permanently when receiving popActivity. This trace will be consumed by
    // visual debugging tools.
    fluid.activityTracing = false;
    fluid.activityTrace = [];

    var activityParser = /(%\w+)/g;

    // Renders a single activity element in a form suitable to be sent to a modern browser's console
    // unsupported, non-API function
    fluid.renderOneActivity = function (activity, nowhile) {
        var togo = nowhile === true ? [] : ["    while "];
        var message = activity.message;
        var index = activityParser.lastIndex = 0;
        while (true) {
            var match = activityParser.exec(message);
            if (match) {
                var key = match[1].substring(1);
                togo.push(message.substring(index, match.index));
                togo.push(activity.args[key]);
                index = activityParser.lastIndex;
            }
            else {
                break;
            }
        }
        if (index < message.length) {
            togo.push(message.substring(index));
        }
        return togo;
    };

    // Renders an activity stack in a form suitable to be sent to a modern browser's console
    // unsupported, non-API function
    fluid.renderActivity = function (activityStack, renderer) {
        renderer = renderer || fluid.renderOneActivity;
        return fluid.transform(activityStack, renderer);
    };

    // Definitions for ThreadLocals - lifted here from
    // FluidIoC.js so that we can issue calls to fluid.describeActivity for debugging purposes
    // in the core framework

    // unsupported, non-API function
    fluid.singleThreadLocal = function (initFunc) {
        var value = initFunc();
        return function (newValue) {
            return newValue === undefined ? value : value = newValue;
        };
    };

    // Currently we only support single-threaded environments - ensure that this function
    // is not used on startup so it can be successfully monkey-patched
    // only remaining uses of threadLocals are for activity reporting and in the renderer utilities
    // unsupported, non-API function
    fluid.threadLocal = fluid.singleThreadLocal;

    // unsupported, non-API function
    fluid.globalThreadLocal = fluid.threadLocal(function () {
        return {};
    });

    // Return an array of objects describing the current activity
    // unsupported, non-API function
    fluid.getActivityStack = function () {
        var root = fluid.globalThreadLocal();
        if (!root.activityStack) {
            root.activityStack = [];
        }
        return root.activityStack;
    };

    // Return an array of objects describing the current activity
    // unsupported, non-API function
    fluid.describeActivity = fluid.getActivityStack;

    // Renders either the current activity or the supplied activity to the console
    fluid.logActivity = function (activity) {
        activity = activity || fluid.describeActivity();
        var rendered = fluid.renderActivity(activity).reverse();
        fluid.log("Current activity: ");
        fluid.each(rendered, function (args) {
            fluid.doLog(args);
        });
    };

    // Execute the supplied function with the specified activity description pushed onto the stack
    // unsupported, non-API function
    fluid.pushActivity = function (type, message, args) {
        var record = {type: type, message: message, args: args, time: new Date().getTime()};
        if (fluid.activityTracing) {
            fluid.activityTrace.push(record);
        }
        if (fluid.passLogLevel(fluid.logLevel.TRACE)) {
            fluid.doLog(fluid.renderOneActivity(record, true));
        }
        var activityStack = fluid.getActivityStack();
        activityStack.push(record);
    };

    // Undo the effect of the most recent pushActivity, or multiple frames if an argument is supplied
    fluid.popActivity = function (popframes) {
        popframes = popframes || 1;
        if (fluid.activityTracing) {
            fluid.activityTrace.push({pop: popframes});
        }
        var activityStack = fluid.getActivityStack();
        var popped = activityStack.length - popframes;
        activityStack.length = popped < 0 ? 0 : popped;
    };
    // "this-ist" style Error so that we can distinguish framework errors whilst still retaining access to platform Error features
    // unsupported, non-API function
    fluid.FluidError = function (message) {
        this.message = message;
        this.stack = new Error().stack;
    };
    fluid.FluidError.prototype = new Error();

    // The framework's built-in "log" failure handler - this logs the supplied message as well as any framework activity in progress via fluid.log
    fluid.logFailure = function (args, activity) {
        fluid.log.apply(null, [fluid.logLevel.FAIL, "ASSERTION FAILED: "].concat(args));
        fluid.logActivity(activity);
    };

    fluid.renderLoggingArg = function (arg) {
        return fluid.isPrimitive(arg) || !fluid.isPlainObject(arg) ? arg : JSON.stringify(arg);
    };

    // The framework's built-in "fail" failure handler - this throws an exception of type <code>fluid.FluidError</code>
    fluid.builtinFail = function (args /*, activity*/) {
        var message = fluid.transform(args, fluid.renderLoggingArg).join("");
        throw new fluid.FluidError("Assertion failure - check console for more details: " + message);
    };

    /**
     * Signals an error to the framework. The default behaviour is to log a structured error message and throw an exception. This strategy may be configured using the legacy
     * API <code>fluid.pushSoftFailure</code> or else by adding and removing suitably namespaced listeners to the special event <code>fluid.failureEvent</code>
     *
     * @param {String} message the error message to log
     * @param ... Additional arguments, suitable for being sent to the native console.log function
     */
    fluid.fail = function (/* message, ... */) {
        var args = fluid.makeArray(arguments);
        var activity = fluid.makeArray(fluid.describeActivity()); // Take copy since we will destructively modify
        fluid.popActivity(activity.length); // clear any current activity - TODO: the framework currently has no exception handlers, although it will in time
        if (fluid.failureEvent) { // notify any framework failure prior to successfully setting up the failure event below
            fluid.failureEvent.fire(args, activity);
        } else {
            fluid.logFailure(args, activity);
            fluid.builtinFail(args, activity);
        }
    };

    // TODO: rescued from kettleCouchDB.js - clean up in time
    fluid.expect = function (name, target, members) {
        fluid.transform(fluid.makeArray(members), function (key) {
            if (typeof target[key] === "undefined") {
                fluid.fail(name + " missing required parameter " + key);
            }
        });
    };

    // Logging

    /** Returns whether logging is enabled **/
    fluid.isLogging = function () {
        return logLevelStack[0].priority > fluid.logLevel.IMPORTANT.priority;
    };

    /** Determines whether the supplied argument is a valid logLevel marker **/
    fluid.isLogLevel = function (arg) {
        return fluid.isMarker(arg) && arg.priority !== undefined;
    };

    /** Accepts one of the members of the <code>fluid.logLevel</code> structure. Returns <code>true</code> if
     *  a message supplied at that log priority would be accepted at the current logging level. Clients who
     *  issue particularly expensive log payload arguments are recommended to guard their logging statements with this
     *  function */

    fluid.passLogLevel = function (testLogLevel) {
        return testLogLevel.priority <= logLevelStack[0].priority;
    };

    /** Method to allow user to control the logging level. Accepts either a boolean, for which <code>true</code>
      * represents <code>fluid.logLevel.INFO</code> and <code>false</code> represents <code>fluid.logLevel.IMPORTANT</code> (the default),
      * or else any other member of the structure <code>fluid.logLevel</code>
      * Messages whose priority is strictly less than the current logging level will not be shown*/
    fluid.setLogging = function (enabled) {
        var logLevel;
        if (typeof enabled === "boolean") {
            logLevel = fluid.logLevel[enabled? "INFO" : "IMPORTANT"];
        } else if (fluid.isLogLevel(enabled)) {
            logLevel = enabled;
        } else {
            fluid.fail("Unrecognised fluid logging level ", enabled);
        }
        logLevelStack.unshift(logLevel);
        fluid.defeatLogging = !fluid.isLogging();
    };

    fluid.setLogLevel = fluid.setLogging;

    /** Undo the effect of the most recent "setLogging", returning the logging system to its previous state **/
    fluid.popLogging = function () {
        var togo = logLevelStack.length === 1? logLevelStack[0] : logLevelStack.shift();
        fluid.defeatLogging = !fluid.isLogging();
        return togo;
    };

    /** Actually do the work of logging <code>args</code> to the environment's console. If the standard "console"
     * stream is available, the message will be sent there.
     */
    fluid.doLog = function (args) {
        if (typeof (console) !== "undefined") {
            if (console.debug) {
                console.debug.apply(console, args);
            } else if (typeof (console.log) === "function") {
                console.log.apply(console, args);
            }
        }
    };

    /** Log a message to a suitable environmental console. If the first argument to fluid.log is
     * one of the members of the <code>fluid.logLevel</code> structure, this will be taken as the priority
     * of the logged message - else if will default to <code>fluid.logLevel.INFO</code>. If the logged message
     * priority does not exceed that set by the most recent call to the <code>fluid.setLogging</code> function,
     * the message will not appear.
     */
    fluid.log = function (/* message /*, ... */) {
        var directArgs = fluid.makeArray(arguments);
        var userLogLevel = fluid.logLevel.INFO;
        if (fluid.isLogLevel(directArgs[0])) {
            userLogLevel = directArgs.shift();
        }
        if (fluid.passLogLevel(userLogLevel)) {
            var arg0 = fluid.renderTimestamp(new Date()) + ":  ";
            var args = [arg0].concat(directArgs);
            fluid.doLog(args);
        }
    };

    // Functional programming utilities.

    // Type checking functions

    /** Returns true if the argument is a value other than null or undefined **/
    fluid.isValue = function (value) {
        return value !== undefined && value !== null;
    };

    /** Returns true if the argument is a primitive type **/
    fluid.isPrimitive = function (value) {
        var valueType = typeof (value);
        return !value || valueType === "string" || valueType === "boolean" || valueType === "number" || valueType === "function";
    };

    /** Determines whether the supplied object is an array. The strategy used is an optimised
     * approach taken from an earlier version of jQuery - detecting whether the toString() version
     * of the object agrees with the textual form [object Array], or else whether the object is a
     * jQuery object (the most common source of "fake arrays").
     */
    fluid.isArrayable = function (totest) {
        return totest && (totest.jquery || Object.prototype.toString.call(totest) === "[object Array]");
    };

    /** Determines whether the supplied object is a plain JSON-forming container - that is, it is either a plain Object
     * or a plain Array */
    fluid.isPlainObject = function (totest) {
        var string = Object.prototype.toString.call(totest);
        if (string === "[object Array]") {
            return true;
        } else if (string !== "[object Object]") {
            return false;
        } // FLUID-5226: This inventive strategy taken from jQuery detects whether the object's prototype is directly Object.prototype by virtue of having an "isPrototypeOf" direct member
        return !totest.constructor || !totest.constructor.prototype || Object.prototype.hasOwnProperty.call(totest.constructor.prototype, "isPrototypeOf");
    };

    /** Returns <code>primitive</code>, <code>array</code> or <code>object</code> depending on whether the supplied object has
     * one of those types, by use of the <code>fluid.isPrimitive</code>, <code>fluid.isPlainObject</code> and <code>fluid.isArrayable</code> utilities
     */
    fluid.typeCode = function (totest) {
        return fluid.isPrimitive(totest) || !fluid.isPlainObject(totest) ? "primitive" :
            fluid.isArrayable(totest) ? "array" : "object";
    };

    fluid.isDOMNode = function (obj) {
      // This could be more sound, but messy:
      // http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
      // The real problem is browsers like IE6, 7 and 8 which still do not feature a "constructor" property on DOM nodes
        return obj && typeof (obj.nodeType) === "number";
    };

    fluid.isDOMish = function (obj) {
        return fluid.isDOMNode(obj) || obj.jquery;
    };

    fluid.isComponent = function (obj) {
        return obj && obj.constructor === fluid.componentConstructor;
    };

    /** A basic utility that returns its argument unchanged */

    fluid.identity = function (arg) {
        return arg;
    };

    /** A function which raises a failure if executed */

    fluid.notImplemented = function () {
        fluid.fail("This operation is not implemented");
    };

    /** Return an empty container as the same type as the argument (either an
     * array or hash */
    fluid.freshContainer = function (tocopy) {
        return fluid.isArrayable(tocopy) ? [] : {};
    };

    fluid.isUncopyable = function (totest) {
        return fluid.isPrimitive(totest) || fluid.isDOMish(totest) || !fluid.isPlainObject(totest);
    };

    fluid.copyRecurse = function (tocopy, segs) {
        if (segs.length > fluid.strategyRecursionBailout) {
            fluid.fail("Runaway recursion encountered in fluid.copy - reached path depth of " + fluid.strategyRecursionBailout + " via path of " + segs.join(".") +
                "this object is probably circularly connected. Either adjust your object structure to remove the circularity or increase fluid.strategyRecursionBailout");
        }
        if (fluid.isUncopyable(tocopy)) {
            return tocopy;
        } else {
            return fluid.transform(tocopy, function (value, key) {
                segs.push(key);
                var togo = fluid.copyRecurse(value, segs);
                segs.pop();
                return togo;
            });
        }
    };

    /** Performs a deep copy (clone) of its argument. This will guard against cloning a circular object by terminating if it reaches a path depth
     * greater than <code>fluid.strategyRecursionBailout</code>
     **/

    fluid.copy = function (tocopy) {
        return fluid.copyRecurse(tocopy, []);
    };

    /** Corrected version of jQuery makeArray that returns an empty array on undefined rather than crashing.
      * We don't deal with as many pathological cases as jQuery **/
    fluid.makeArray = function (arg) {
        var togo = [];
        if (arg !== null && arg !== undefined) {
            if (fluid.isPrimitive(arg) || typeof(arg.length) !== "number") {
                togo.push(arg);
            }
            else {
                for (var i = 0; i < arg.length; ++ i) {
                    togo[i] = arg[i];
                }
            }
        }
        return togo;
    };

    function transformInternal(source, togo, key, args) {
        var transit = source[key];
        for (var j = 0; j < args.length - 1; ++j) {
            transit = args[j + 1](transit, key);
        }
        togo[key] = transit;
    }

    /** Return a list or hash of objects, transformed by one or more functions. Similar to
     * jQuery.map, only will accept an arbitrary list of transformation functions and also
     * works on non-arrays.
     * @param source {Array or Object} The initial container of objects to be transformed. If the source is
     * neither an array nor an object, it will be returned untransformed
     * @param fn1, fn2, etc. {Function} An arbitrary number of optional further arguments,
     * all of type Function, accepting the signature (object, index), where object is the
     * list member to be transformed, and index is its list index. Each function will be
     * applied in turn to each list member, which will be replaced by the return value
     * from the function.
     * @return The finally transformed list, where each member has been replaced by the
     * original member acted on by the function or functions.
     */
    fluid.transform = function (source) {
        if (fluid.isPrimitive(source)) {
            return source;
        }
        var togo = fluid.freshContainer(source);
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                transformInternal(source, togo, i, arguments);
            }
        } else {
            for (var key in source) {
                transformInternal(source, togo, key, arguments);
            }
        }
        return togo;
    };

    /** Better jQuery.each which works on hashes as well as having the arguments
     * the right way round.
     * @param source {Arrayable or Object} The container to be iterated over
     * @param func {Function} A function accepting (value, key) for each iterated
     * object.
     */
    fluid.each = function (source, func) {
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                func(source[i], i);
            }
        } else {
            for (var key in source) {
                func(source[key], key);
            }
        }
    };

    fluid.make_find = function (find_if) {
        var target = find_if ? false : undefined;
        return function (source, func, deffolt) {
            var disp;
            if (fluid.isArrayable(source)) {
                for (var i = 0; i < source.length; ++i) {
                    disp = func(source[i], i);
                    if (disp !== target) {
                        return find_if ? source[i] : disp;
                    }
                }
            } else {
                for (var key in source) {
                    disp = func(source[key], key);
                    if (disp !== target) {
                        return find_if ? source[key] : disp;
                    }
                }
            }
            return deffolt;
        };
    };

    /** Scan through a list or hash of objects, terminating on the first member which
     * matches a predicate function.
     * @param source {Arrayable or Object} The list or hash of objects to be searched.
     * @param func {Function} A predicate function, acting on a member. A predicate which
     * returns any value which is not <code>undefined</code> will terminate
     * the search. The function accepts (object, index).
     * @param deflt {Object} A value to be returned in the case no predicate function matches
     * a list member. The default will be the natural value of <code>undefined</code>
     * @return The first return value from the predicate function which is not <code>undefined</code>
     */
    fluid.find = fluid.make_find(false);
    /** The same signature as fluid.find, only the return value is the actual element for which the
     * predicate returns a value different from <code>false</code>
     */
    fluid.find_if = fluid.make_find(true);

    /** Scan through a list of objects, "accumulating" a value over them
     * (may be a straightforward "sum" or some other chained computation). "accumulate" is the name derived
     * from the C++ STL, other names for this algorithm are "reduce" or "fold".
     * @param list {Array} The list of objects to be accumulated over.
     * @param fn {Function} An "accumulation function" accepting the signature (object, total, index) where
     * object is the list member, total is the "running total" object (which is the return value from the previous function),
     * and index is the index number.
     * @param arg {Object} The initial value for the "running total" object.
     * @return {Object} the final running total object as returned from the final invocation of the function on the last list member.
     */
    fluid.accumulate = function (list, fn, arg) {
        for (var i = 0; i < list.length; ++i) {
            arg = fn(list[i], arg, i);
        }
        return arg;
    };

    /** Scan through a list or hash of objects, removing those which match a predicate. Similar to
     * jQuery.grep, only acts on the list in-place by removal, rather than by creating
     * a new list by inclusion.
     * @param source {Array|Object} The list or hash of objects to be scanned over.
     * @param fn {Function} A predicate function determining whether an element should be
     * removed. This accepts the standard signature (object, index) and returns a "truthy"
     * result in order to determine that the supplied object should be removed from the list.
     * @param target {Array|Object} (optional) A target object of the same type as <code>source</code>, which will
     * receive any objects removed from it.
     * @return <code>target</code>, containing the removed elements, if it was supplied, or else <code>source</code>
     * modified by the operation of removing the matched elements.
     */
    fluid.remove_if = function (source, fn, target) {
        if (fluid.isArrayable(source)) {
            for (var i = source.length - 1; i >= 0; --i) {
                if (fn(source[i], i)) {
                    if (target) {
                        target.unshift(source[i]);
                    }
                    source.splice(i, 1);
                }
            }
        } else {
            for (var key in source) {
                if (fn(source[key], key)) {
                    if (target) {
                        target[key] = source[key];
                    }
                    delete source[key];
                }
            }
        }
        return target || source;
    };

    /** Fills an array of given size with copies of a value or result of a function invocation
     * @param n {Number} The size of the array to be filled
     * @param generator {Object|Function} Either a value to be replicated or function to be called
     * @param applyFunc {Boolean} If true, treat the generator value as a function to be invoked with
     * argument equal to the index position
     */

    fluid.generate = function (n, generator, applyFunc) {
        var togo = [];
        for (var i = 0; i < n; ++ i) {
            togo[i] = applyFunc? generator(i) : generator;
        }
        return togo;
    };

    /** Returns an array of size count, filled with increasing integers, starting at 0 or at the index specified by first.
     * @param count {Number} Size of the filled array to be returned
     * @param first {Number} (optional, defaults to 0) First element to appear in the array
     */

    fluid.iota = function (count, first) {
        first = first || 0;
        var togo = [];
        for (var i = 0; i < count; ++i) {
            togo[togo.length] = first++;
        }
        return togo;
    };

    /** Extracts a particular member from each top-level member of a container, returning a new container of the same type
     * @param holder {Array|Object} The container to be filtered
     * @param name {String|Array of String} An EL path to be fetched from each top-level member
     */

    fluid.getMembers = function (holder, name) {
        return fluid.transform(holder, function(member) {
            return fluid.get(member, name);
        });
    };

    /** Accepts an object to be filtered, and a list of keys. Either all keys not present in
     * the list are removed, or only keys present in the list are returned.
     * @param toFilter {Array|Object} The object to be filtered - this will be NOT modified by the operation (current implementation
     * passes through $.extend shallow algorithm)
     * @param keys {Array of String} The list of keys to operate with
     * @param exclude {boolean} If <code>true</code>, the keys listed are removed rather than included
     * @return the filtered object (the same object that was supplied as <code>toFilter</code>
     */

    fluid.filterKeys = function (toFilter, keys, exclude) {
        return fluid.remove_if($.extend({}, toFilter), function (value, key) {
            return exclude ^ (keys.indexOf(key) === -1);
        });
    };

    /** A convenience wrapper for <code>fluid.filterKeys</code> with the parameter <code>exclude</code> set to <code>true</code>
     *  Returns the supplied object with listed keys removed */

    fluid.censorKeys = function (toCensor, keys) {
        return fluid.filterKeys(toCensor, keys, true);
    };

    // TODO: This is not as clever an idea as we think it is - this typically inner-loop function will optimise badly due to closure
    fluid.makeFlatten = function (index) {
        return function (obj) {
            var togo = [];
            fluid.each(obj, function (/* value, key */) {
                togo.push(arguments[index]);
            });
            return togo;
        };
    };

    /** Return the keys in the supplied object as an array. Note that this will return keys found in the prototype chain as well as "own properties", unlike Object.keys() **/
    fluid.keys = fluid.makeFlatten(1);

    /** Return the values in the supplied object as an array **/
    fluid.values = fluid.makeFlatten(0);

    /**
     * Searches through the supplied object, and returns <code>true</code> if the supplied value
     * can be found
     */
    fluid.contains = function (obj, value) {
        return obj ? (fluid.isArrayable(obj) ? obj.indexOf(value) !== -1 : fluid.find(obj, function (thisValue) {
            if (value === thisValue) {
                return true;
            }
        })) : undefined;
    };

    /**
     * Searches through the supplied object for the first value which matches the one supplied.
     * @param obj {Object} the Object to be searched through
     * @param value {Object} the value to be found. This will be compared against the object's
     * member using === equality.
     * @return {String} The first key whose value matches the one supplied
     */
    fluid.keyForValue = function (obj, value) {
        return fluid.find(obj, function (thisValue, key) {
            if (value === thisValue) {
                return key;
            }
        });
    };

    /** Converts an array into an object whose keys are the elements of the array, each with the value "true"
     * @param array {Array of String} The array to be converted to a hash
     * @return hash {Object} An object with value <code>true</code> for each key taken from a member of <code>array</code>
     */

    fluid.arrayToHash = function (array) {
        var togo = {};
        fluid.each(array, function (el) {
            togo[el] = true;
        });
        return togo;
    };

    /** Applies a stable sorting algorithm to the supplied array and comparator (note that Array.sort in JavaScript is not specified
     * to be stable). The algorithm used will be an insertion sort, which whilst quadratic in time, will perform well
     * on small array sizes.
     * @param array {Array} The array to be sorted. This input array will be modified in place.
     * @param func {Function} A comparator returning >0, 0, or <0 on pairs of elements representing their sort order (same contract as Array.sort comparator)
     */

    fluid.stableSort = function (array, func) {
        for (var i = 0; i < array.length; i++) {
            var k = array[i];
            for (var j = i; j > 0 && func(k, array[j - 1]) < 0; j--) {
                array[j] = array[j - 1];
            }
            array[j] = k;
        }
    };

    /** Converts a hash into an object by hoisting out the object's keys into an array element via the supplied String "key", and then transforming via an optional further function, which receives the signature
     * (newElement, oldElement, key) where newElement is the freshly cloned element, oldElement is the original hash's element, and key is the key of the element.
     * If the function is not supplied, the old element is simply deep-cloned onto the new element (same effect
     * as transform fluid.transforms.objectToArray)
     */
    fluid.hashToArray = function (hash, keyName, func) {
        var togo = [];
        fluid.each(hash, function (el, key) {
            var newEl = {};
            newEl[keyName] = key;
            if (func) {
                newEl = func(newEl, el, key) || newEl;
            } else {
                $.extend(true, newEl, el);
            }
            togo.push(newEl);
        });
        return togo;
    };

    /** Converts an array consisting of a mixture of arrays and non-arrays into the concatenation of any inner arrays
     * with the non-array elements
     */
    fluid.flatten = function (array) {
        var togo = [];
        fluid.each(array, function (element) {
            if (fluid.isArrayable(element)) {
                togo = togo.concat(element);
            } else {
                togo.push(element);
            }
        });
        return togo;
    };

    /**
     * Clears an object or array of its contents. For objects, each property is deleted.
     *
     * @param {Object|Array} target the target to be cleared
     */
    fluid.clear = function (target) {
        if (fluid.isArrayable(target)) {
            target.length = 0;
        } else {
            for (var i in target) {
                delete target[i];
            }
        }
    };

   /**
    * @param boolean ascending <code>true</code> if a comparator is to be returned which
    * sorts strings in descending order of length
    */
    fluid.compareStringLength = function (ascending) {
        return ascending ? function (a, b) {
            return a.length - b.length;
        } : function (a, b) {
            return b.length - a.length;
        };
    };

    /**
     * Returns the converted integer if the input string can be converted to an integer. Otherwise, return NaN.
     * @param {String} a string to be returned in integer
     */
    fluid.parseInteger = function (string) {
        return isFinite(string) && ((string % 1) === 0) ? Number(string) : NaN;
    };

    /** A set of special "marker values" used in signalling in function arguments and return values,
      * to partially compensate for JavaScript's lack of distinguished types. These should never appear
      * in JSON structures or other kinds of static configuration. An API specifically documents if it
      * accepts or returns any of these values, and if so, what its semantic is  - most are of private
      * use internal to the framework **/

    fluid.marker = function () {};

    fluid.makeMarker = function (value, extra) {
        var togo = Object.create(fluid.marker.prototype);
        togo.value = value;
        $.extend(togo, extra);
        return Object.freeze(togo);
    };

    /** A special "marker object" representing that a distinguished
     * (probably context-dependent) value should be substituted.
     */
    fluid.VALUE = fluid.makeMarker("VALUE");

    /** A special "marker object" representing that no value is present (where
     * signalling using the value "undefined" is not possible - e.g. the return value from a "strategy") */
    fluid.NO_VALUE = fluid.makeMarker("NO_VALUE");

    /** A marker indicating that a value requires to be expanded after component construction begins **/
    fluid.EXPAND = fluid.makeMarker("EXPAND");

    /** Determine whether an object is any marker, or a particular marker - omit the
     * 2nd argument to detect any marker
     */
    fluid.isMarker = function (totest, type) {
        if (!(totest instanceof fluid.marker)) {
            return false;
        }
        if (!type) {
            return true;
        }
        return totest.value === type.value;
    };

    fluid.logLevelsSpec = {
        "FATAL":      0,
        "FAIL":       5,
        "WARN":      10,
        "IMPORTANT": 12, // The default logging "off" level - corresponds to the old "false"
        "INFO":      15, // The default logging "on" level - corresponds to the old "true"
        "TRACE":     20
    };

    /** A structure holding all supported log levels as supplied as a possible first argument to fluid.log
     * Members with a higher value of the "priority" field represent lower priority logging levels */
    // Moved down here since it uses fluid.transform and fluid.makeMarker on startup
    fluid.logLevel = fluid.transform(fluid.logLevelsSpec, function (value, key) {
        return fluid.makeMarker(key, {priority: value});
    });
    var logLevelStack = [fluid.logLevel.IMPORTANT]; // The stack of active logging levels, with the current level at index 0


    // Model functions
    fluid.model = {}; // cannot call registerNamespace yet since it depends on fluid.model

    /** Copy a source "model" onto a target **/
    fluid.model.copyModel = function (target, source) {
        fluid.clear(target);
        $.extend(true, target, source);
    };

    /** Parse an EL expression separated by periods (.) into its component segments.
     * @param {String} EL The EL expression to be split
     * @return {Array of String} the component path expressions.
     * TODO: This needs to be upgraded to handle (the same) escaping rules (as RSF), so that
     * path segments containing periods and backslashes etc. can be processed, and be harmonised
     * with the more complex implementations in fluid.pathUtil(data binding).
     */
    fluid.model.parseEL = function (EL) {
        return EL === "" ? [] : String(EL).split(".");
    };

    /** Compose an EL expression from two separate EL expressions. The returned
     * expression will be the one that will navigate the first expression, and then
     * the second, from the value reached by the first. Either prefix or suffix may be
     * the empty string **/

    fluid.model.composePath = function (prefix, suffix) {
        return prefix === "" ? suffix : (suffix === "" ? prefix : prefix + "." + suffix);
    };

    /** Compose any number of path segments, none of which may be empty **/
    fluid.model.composeSegments = function () {
        return fluid.makeArray(arguments).join(".");
    };

    /** Returns the index of the last occurrence of the period character . in the supplied string */
    fluid.lastDotIndex = function (path) {
        return path.lastIndexOf(".");
    };

    /** Returns all of an EL path minus its final segment - if the path consists of just one segment, returns "" -
     * WARNING - this method does not follow escaping rules */
    fluid.model.getToTailPath = function (path) {
        var lastdot = fluid.lastDotIndex(path);
        return lastdot === -1 ? "" : path.substring(0, lastdot);
    };

    /** Returns the very last path component of an EL path
     * WARNING - this method does not follow escaping rules */
    fluid.model.getTailPath = function (path) {
        var lastdot = fluid.lastDotIndex(path);
        return path.substring(lastdot + 1);
    };

    /** Helpful alias for old-style API **/
    fluid.path = fluid.model.composeSegments;
    fluid.composePath = fluid.model.composePath;


    // unsupported, NON-API function
    fluid.requireDataBinding = function () {
        fluid.fail("Please include DataBinding.js in order to operate complex model accessor configuration");
    };

    fluid.model.setWithStrategy = fluid.model.getWithStrategy = fluid.requireDataBinding;

    // unsupported, NON-API function
    fluid.model.resolvePathSegment = function (root, segment, create, origEnv) {
        if (!origEnv && root.resolvePathSegment) {
            return root.resolvePathSegment(segment);
        }
        if (create && root[segment] === undefined) {
            // This optimisation in this heavily used function has a fair effect
            return root[segment] = {}; // jshint ignore:line
        }
        return root[segment];
    };

    // unsupported, NON-API function
    fluid.model.parseToSegments = function (EL, parseEL, copy) {
        return typeof(EL) === "number" || typeof(EL) === "string" ? parseEL(EL) : (copy ? fluid.makeArray(EL) : EL);
    };

    // unsupported, NON-API function
    fluid.model.pathToSegments = function (EL, config) {
        var parser = config && config.parser ? config.parser.parse : fluid.model.parseEL;
        return fluid.model.parseToSegments(EL, parser);
    };

    // Overall strategy skeleton for all implementations of fluid.get/set
    fluid.model.accessImpl = function (root, EL, newValue, config, initSegs, returnSegs, traverser) {
        var segs = fluid.model.pathToSegments(EL, config);
        var initPos = 0;
        if (initSegs) {
            initPos = initSegs.length;
            segs = initSegs.concat(segs);
        }
        var uncess = newValue === fluid.NO_VALUE ? 0 : 1;
        root = traverser(root, segs, initPos, config, uncess);
        if (newValue === fluid.NO_VALUE || newValue === fluid.VALUE) { // get or custom
            return returnSegs ? {root: root, segs: segs} : root;
        }
        else { // set
            root[segs[segs.length - 1]] = newValue;
        }
    };

    // unsupported, NON-API function
    fluid.model.accessSimple = function (root, EL, newValue, environment, initSegs, returnSegs) {
        return fluid.model.accessImpl(root, EL, newValue, environment, initSegs, returnSegs, fluid.model.traverseSimple);
    };

    // unsupported, NON-API function
    fluid.model.traverseSimple = function (root, segs, initPos, environment, uncess) {
        var origEnv = environment;
        var limit = segs.length - uncess;
        for (var i = 0; i < limit; ++i) {
            if (!root) {
                return root;
            }
            var segment = segs[i];
            if (environment && environment[segment]) {
                root = environment[segment];
            } else {
                root = fluid.model.resolvePathSegment(root, segment, uncess === 1, origEnv);
            }
            environment = null;
        }
        return root;
    };

    fluid.model.setSimple = function (root, EL, newValue, environment, initSegs) {
        fluid.model.accessSimple(root, EL, newValue, environment, initSegs, false);
    };

    /** Optimised version of fluid.get for uncustomised configurations **/

    fluid.model.getSimple = function (root, EL, environment, initSegs) {
        if (EL === null || EL === undefined || EL.length === 0) {
            return root;
        }
        return fluid.model.accessSimple(root, EL, fluid.NO_VALUE, environment, initSegs, false);
    };

    /** Even more optimised version which assumes segs are parsed and no configuration **/
    fluid.getImmediate = function (root, segs, i) {
        var limit = (i === undefined ? segs.length: i + 1);
        for (var j = 0; j < limit; ++ j) {
            root = root ? root[segs[j]] : undefined;
        }
        return root;
    };

    // unsupported, NON-API function
    // Returns undefined to signal complex configuration which needs to be farmed out to DataBinding.js
    // any other return represents an environment value AND a simple configuration we can handle here
    fluid.decodeAccessorArg = function (arg3) {
        return (!arg3 || arg3 === fluid.model.defaultGetConfig || arg3 === fluid.model.defaultSetConfig) ?
            null : (arg3.type === "environment" ? arg3.value : undefined);
    };

    fluid.set = function (root, EL, newValue, config, initSegs) {
        var env = fluid.decodeAccessorArg(config);
        if (env === undefined) {
            fluid.model.setWithStrategy(root, EL, newValue, config, initSegs);
        } else {
            fluid.model.setSimple(root, EL, newValue, env, initSegs);
        }
    };

    /** Evaluates an EL expression by fetching a dot-separated list of members
     * recursively from a provided root.
     * @param root The root data structure in which the EL expression is to be evaluated
     * @param {string/array} EL The EL expression to be evaluated, or an array of path segments
     * @param config An optional configuration or environment structure which can customise the fetch operation
     * @return The fetched data value.
     */

    fluid.get = function (root, EL, config, initSegs) {
        var env = fluid.decodeAccessorArg(config);
        return env === undefined ?
            fluid.model.getWithStrategy(root, EL, config, initSegs)
            : fluid.model.accessImpl(root, EL, fluid.NO_VALUE, env, null, false, fluid.model.traverseSimple);
    };

    fluid.getGlobalValue = function (path, env) {
        if (path) {
            env = env || fluid.environment;
            return fluid.get(fluid.global, path, {type: "environment", value: env});
        }
    };

    /**
     * Allows for the binding to a "this-ist" function
     * @param {Object} obj, "this-ist" object to bind to
     * @param {Object} fnName, the name of the function to call
     * @param {Object} args, arguments to call the function with
     */
    fluid.bind = function (obj, fnName, args) {
        return obj[fnName].apply(obj, fluid.makeArray(args));
    };

    /**
     * Allows for the calling of a function from an EL expression "functionPath", with the arguments "args", scoped to an framework version "environment".
     * @param {Object} functionPath - An EL expression
     * @param {Object} args - An array of arguments to be applied to the function, specified in functionPath
     * @param {Object} environment - (optional) The object to scope the functionPath to  (typically the framework root for version control)
     */
    fluid.invokeGlobalFunction = function (functionPath, args, environment) {
        var func = fluid.getGlobalValue(functionPath, environment);
        if (!func) {
            fluid.fail("Error invoking global function: " + functionPath + " could not be located");
        } else {
            return func.apply(null, fluid.isArrayable(args) ? args : fluid.makeArray(args));
        }
    };

    /** Registers a new global function at a given path
     */

    fluid.registerGlobalFunction = function (functionPath, func, env) {
        env = env || fluid.environment;
        fluid.set(fluid.global, functionPath, func, {type: "environment", value: env});
    };

    fluid.setGlobalValue = fluid.registerGlobalFunction;

    /** Ensures that an entry in the global namespace exists. If it does not, a new entry is created as {} and returned. If an existing
     * value is found, it is returned instead **/
    fluid.registerNamespace = function (naimspace, env) {
        env = env || fluid.environment;
        var existing = fluid.getGlobalValue(naimspace, env);
        if (!existing) {
            existing = {};
            fluid.setGlobalValue(naimspace, existing, env);
        }
        return existing;
    };

    // stubs for two functions in FluidDebugging.js
    fluid.dumpEl = fluid.identity;
    fluid.renderTimestamp = fluid.identity;

    /*** The Fluid instance id ***/

    // unsupported, NON-API function
    fluid.generateUniquePrefix = function () {
        return (Math.floor(Math.random() * 1e12)).toString(36) + "-";
    };

    var fluid_prefix = fluid.generateUniquePrefix();

    fluid.fluidInstance = fluid_prefix;

    var fluid_guid = 1;

    /** Allocate a string value that will be unique within this Infusion instance (frame or process), and
     * globally unique with high probability (50% chance of collision after a million trials) **/

    fluid.allocateGuid = function () {
        return fluid_prefix + (fluid_guid++);
    };

    /*** The Fluid Event system. ***/

    fluid.registerNamespace("fluid.event");

    // Fluid priority system for encoding relative positions of, e.g. listeners, transforms, options, in lists

    fluid.extremePriority = 4e9; // around 2^32 - allows headroom of 21 fractional bits for sub-priorities
    fluid.priorityTypes = {
        first: -1,
        last: 1,
        before: 0,
        after: 0
    };
    // TODO: This should be properly done with defaults blocks and a much more performant fluid.indexDefaults
    fluid.extremalPriorities = {
        // a built-in definition to allow test infrastructure "last" listeners to sort after all impl listeners, and authoring/debugging listeners to sort after those
        // these are "priority intensities", and will be flipped for "first" listeners
        none: 0,
        testing: 10,
        authoring: 20
    };

    // unsupported, NON-API function
    fluid.parsePriorityConstraint = function (constraint, fixedOnly, site) {
        var segs = constraint.split(":");
        var type = segs[0];
        var lookup = fluid.priorityTypes[type];
        if (lookup === undefined) {
            fluid.fail("Invalid constraint type in priority field " + constraint + ": the only supported values are " + fluid.keys(fluid.priorityTypes).join(", ") + " or numeric");
        }
        if (fixedOnly && lookup === 0) {
            fluid.fail("Constraint type in priority field " + constraint + " is not supported in a " + site + " record - you must use either a numeric value or first, last");
        }
        return {
            type: segs[0],
            target: segs[1]
        };
    };

    // unsupported, NON-API function
    fluid.parsePriority = function (priority, count, fixedOnly, site) {
        priority = priority || 0;
        var togo = {
            count: count || 0,
            fixed: null,
            constraint: null,
            site: site
        };
        if (typeof(priority) === "number") {
            togo.fixed = -priority;
        } else {
            togo.constraint = fluid.parsePriorityConstraint(priority, fixedOnly, site);
        }
        var multiplier = togo.constraint ? fluid.priorityTypes[togo.constraint.type] : 0;
        if (multiplier !== 0) {
            var target = togo.constraint.target || "none";
            var extremal = fluid.extremalPriorities[target];
            if (extremal === undefined) {
                fluid.fail("Unrecognised extremal priority target " + target + ": the currently supported values are " + fluid.keys(fluid.extremalPriorities).join(", ") + ": register your value in fluid.extremalPriorities");
            }
            togo.fixed = multiplier * (fluid.extremePriority + extremal);
        }
        if (togo.fixed !== null) {
            togo.fixed += togo.count / 1024; // use some fractional bits to encode count bias
        }

        return togo;
    };

    fluid.renderPriority = function (parsed) {
        return parsed.constraint ? (parsed.constraint.target ? parsed.constraint.type + ":" + parsed.constraint.target : parsed.constraint.type ) : Math.floor(parsed.fixed);
    };

    // unsupported, NON-API function
    fluid.compareByPriority = function (recA, recB) {
        if (recA.priority.fixed !== null && recB.priority.fixed !== null) {
            return recA.priority.fixed - recB.priority.fixed;
        } else { // sort constraint records to the end
            // relies on JavaScript boolean coercion rules (ECMA 9.3 toNumber)
            return (recA.priority.fixed === null) - (recB.priority.fixed === null);
        }
    };

    fluid.honourConstraint = function (array, firstConstraint, c) {
        var constraint = array[c].priority.constraint;
        var matchIndex = fluid.find(array, function (element, index) {
            return element.namespace === constraint.target ? index : undefined;
        }, -1);
        if (matchIndex === -1) { // TODO: We should report an error during firing if this condition persists until then
            return true;
        } else if (matchIndex >= firstConstraint) {
            return false;
        } else {
            var offset = constraint.type === "after" ? 1 : 0;
            var target = matchIndex + offset;
            var temp = array[c];
            for (var shift = c; shift >= target; -- shift) {
                array[shift] = array[shift - 1];
            }
            array[target] = temp;
            return true;
        }
    };

    // unsupported, NON-API function
    // Priorities accepted from users have higher numbers representing high priority (sort first) -
    fluid.sortByPriority = function (array) {
        fluid.stableSort(array, fluid.compareByPriority);

        var firstConstraint = fluid.find(array, function (element, index) {
            return element.priority.constraint && fluid.priorityTypes[element.priority.constraint.type] === 0 ? index : undefined;
        }, array.length);

        while (true) {
            if (firstConstraint === array.length) {
                return array;
            }
            var oldFirstConstraint = firstConstraint;
            for (var c = firstConstraint; c < array.length; ++ c) {
                var applied = fluid.honourConstraint(array, firstConstraint, c);
                if (applied) {
                    ++firstConstraint;
                }
            }
            if (firstConstraint === oldFirstConstraint) {
                var holders = array.slice(firstConstraint);
                fluid.fail("Could not find targets for any constraints in " + holders[0].priority.site + " ", holders, ": none of the targets (" + fluid.getMembers(holders, "priority.constraint.target").join(", ") +
                    ") matched any namespaces of the elements in (", array.slice(0, firstConstraint) + ") - this is caused by either an invalid or circular reference");
            }
        }
    };

    fluid.event.identifyListener = function (listener, soft) {
        if (typeof(listener) !== "string" && !listener.$$fluid_guid && !soft) {
            listener.$$fluid_guid = fluid.allocateGuid();
        }
        return listener.$$fluid_guid;
    };

    // unsupported, NON-API function
    fluid.event.impersonateListener = function (origListener, newListener) {
        fluid.event.identifyListener(origListener);
        newListener.$$fluid_guid = origListener.$$fluid_guid;
    };


    // unsupported, NON-API function
    fluid.event.sortListeners = function (listeners) {
        var togo = [];
        fluid.each(listeners, function (oneNamespace) {
            var headHard; // notify only the first listener with hard namespace - or else all if all are soft
            for (var i = 0; i < oneNamespace.length; ++ i) {
                var thisListener = oneNamespace[i];
                if (!thisListener.softNamespace && !headHard) {
                    headHard = thisListener;
                }
            }
            if (headHard) {
                togo.push(headHard);
            } else {
                togo = togo.concat(oneNamespace);
            }
        });
        return fluid.sortByPriority(togo);
    };

    // unsupported, non-API function
    fluid.event.invokeListener = function (listener, args) {
        if (typeof(listener) === "string") {
            listener = fluid.event.resolveListener(listener); // just resolves globals
        }
        return listener.apply(null, args);
    };

    // unsupported, NON-API function
    fluid.event.resolveListener = function (listener) {
        var listenerName = listener.globalName || (typeof(listener) === "string" ? listener : null);
        if (listenerName) {
            var listenerFunc = fluid.getGlobalValue(listenerName);
            if (!listenerFunc) {
                fluid.fail("Unable to look up name " + listenerName + " as a global function");
            } else {
                listener = listenerFunc;
            }
        }
        return listener;
    };

    /** Generate a name for a component for debugging purposes */
    fluid.nameComponent = function (that) {
        return that ? "component with typename " + that.typeName + " and id " + that.id : "[unknown component]";
    };

    fluid.event.nameEvent = function (that, eventName) {
        return eventName + " of " + fluid.nameComponent(that);
    };

    /** Construct an "event firer" object which can be used to register and deregister
     * listeners, to which "events" can be fired. These events consist of an arbitrary
     * function signature. General documentation on the Fluid events system is at
     * http://wiki.fluidproject.org/display/fluid/The+Fluid+Event+System .
     * @param {Object} options - A structure to configure this event firer. Supported fields:
     *     {String} name - a name for this firer
     *     {Boolean} preventable - If <code>true</code> the return value of each handler will
     * be checked for <code>false</code> in which case further listeners will be shortcircuited, and this
     * will be the return value of fire()
     */
    fluid.makeEventFirer = function (options) {
        options = options || {};
        var name = options.name || "<anonymous>";
        var that;

        var lazyInit = function () { // Lazy init function to economise on object references for events which are never listened to
            that.listeners = {};
            that.byId = {};
            that.sortedListeners = [];
            that.addListener = function (listener, namespace, priority, softNamespace, listenerId) {
                if (that.destroyed) {
                    fluid.fail("Cannot add listener to destroyed event firer " + that.name);
                }
                if (!listener) {
                    return;
                }
                if (typeof(listener) === "string") {
                    listener = {globalName: listener};
                }
                var id = listenerId || fluid.event.identifyListener(listener);
                namespace = namespace || id;
                var record = {listener: listener,
                    namespace: namespace,
                    softNamespace: softNamespace,
                    listenerId: listenerId,
                    priority: fluid.parsePriority(priority, that.sortedListeners.length, false, "listeners")
                };
                that.byId[id] = record;

                var thisListeners = (that.listeners[namespace] = fluid.makeArray(that.listeners[namespace]));
                thisListeners[softNamespace ? "push" : "unshift"] (record);

                that.sortedListeners = fluid.event.sortListeners(that.listeners);
            };
            that.addListener.apply(null, arguments);
        };
        that = {
            eventId: fluid.allocateGuid(),
            name: name,
            ownerId: options.ownerId,
            typeName: "fluid.event.firer",
            destroy: function () {
                that.destroyed = true;
            },
            addListener: function () {
                lazyInit.apply(null, arguments);
            },

            removeListener: function (listener) {
                if (!that.listeners) { return; }
                var namespace, id, record;
                if (typeof (listener) === "string") {
                    namespace = listener;
                    record = that.listeners[namespace];
                    if (!record) { // it was an id and not a namespace - take the namespace from its record later
                        id = namespace;
                        namespace = null;
                    }
                }
                else if (typeof(listener) === "function") {
                    id = fluid.event.identifyListener(listener, true);
                    if (!id) {
                        fluid.fail("Cannot remove unregistered listener function ", listener, " from event " + that.name);
                    }
                }
                var rec = that.byId[id];
                var softNamespace = rec && rec.softNamespace;
                namespace = namespace || (rec && rec.namespace) || id;
                delete that.byId[id];
                record = that.listeners[namespace];
                if (record) {
                    if (softNamespace) {
                        fluid.remove_if(record, function (thisLis) {
                            return thisLis.listener.$$fluid_guid === id || thisLis.listenerId === id;
                        });
                    } else {
                        record.shift();
                    }
                    if (record.length === 0) {
                        delete that.listeners[namespace];
                    }
                }
                that.sortedListeners = fluid.event.sortListeners(that.listeners);
            },
            fire: function () {
                var listeners = that.sortedListeners;
                if (!listeners || that.destroyed) { return; }
                fluid.log(fluid.logLevel.TRACE, "Firing event " + name + " to list of " + listeners.length + " listeners");
                for (var i = 0; i < listeners.length; ++i) {
                    var lisrec = listeners[i];
                    lisrec.listener = fluid.event.resolveListener(lisrec.listener);
                    var listener = lisrec.listener;
                    var ret = listener.apply(null, arguments);
                    var value;
                    if (options.preventable && ret === false || that.destroyed) {
                        value = false;
                    }
                    if (value !== undefined) {
                        return value;
                    }
                }
            }
        };
        return that;
    };

    // unsupported, NON-API function
    fluid.event.addListenerToFirer = function (firer, value, namespace, wrapper) {
        wrapper = wrapper || fluid.identity;
        if (fluid.isArrayable(value)) {
            for (var i = 0; i < value.length; ++i) {
                fluid.event.addListenerToFirer(firer, value[i], namespace, wrapper);
            }
        } else if (typeof (value) === "function" || typeof (value) === "string") {
            wrapper(firer).addListener(value, namespace);
        } else if (value && typeof (value) === "object") {
            wrapper(firer).addListener(value.listener, namespace || value.namespace, value.priority, value.softNamespace, value.listenerId);
        }
    };

    // unsupported, NON-API function - non-IOC passthrough
    fluid.event.resolveListenerRecord = function (records) {
        return { records: records };
    };

    fluid.expandImmediate = function (material) {
        fluid.fail("fluid.expandImmediate could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor " + material);
    };

    // unsupported, NON-API function
    fluid.mergeListeners = function (that, events, listeners) {
        fluid.each(listeners, function (value, key) {
            var firer, namespace;
            if (key.charAt(0) === "{") {
                firer = fluid.expandImmediate(key, that);
                if (!firer) {
                    fluid.fail("Error in listener record: key " + key + " could not be looked up to an event firer - did you miss out \"events.\" when referring to an event firer?");
                }
            } else {
                var keydot = key.indexOf(".");

                if (keydot !== -1) {
                    namespace = key.substring(keydot + 1);
                    key = key.substring(0, keydot);
                }
                if (!events[key]) {
                    fluid.fail("Listener registered for event " + key + " which is not defined for this component");
                }
                firer = events[key];
            }
            var record = fluid.event.resolveListenerRecord(value, that, key, namespace, true);
            fluid.event.addListenerToFirer(firer, record.records, namespace, record.adderWrapper);
        });
    };

    // unsupported, NON-API function
    fluid.eventFromRecord = function (eventSpec, eventKey, that) {
        var isIoCEvent = eventSpec && (typeof (eventSpec) !== "string" || eventSpec.charAt(0) === "{");
        var event;
        if (isIoCEvent) {
            if (!fluid.event.resolveEvent) {
                fluid.fail("fluid.event.resolveEvent could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor ",
                    eventSpec);
            } else {
                event = fluid.event.resolveEvent(that, eventKey, eventSpec);
            }
        } else {
            event = fluid.makeEventFirer({
                name: fluid.event.nameEvent(that, eventKey),
                preventable: eventSpec === "preventable",
                ownerId: that.id
            });
        }
        return event;
    };

    // unsupported, NON-API function - this is patched from FluidIoC.js
    fluid.instantiateFirers = function (that, options) {
        fluid.each(options.events, function (eventSpec, eventKey) {
            that.events[eventKey] = fluid.eventFromRecord(eventSpec, eventKey, that);
        });
    };

    // unsupported, NON-API function
    fluid.mergeListenerPolicy = function (target, source, key) {
        if (typeof (key) !== "string") {
            fluid.fail("Error in listeners declaration - the keys in this structure must resolve to event names - got " + key + " from ", source);
        }
        // cf. triage in mergeListeners
        var hasNamespace = key.charAt(0) !== "{" && key.indexOf(".") !== -1;
        return hasNamespace ? (source || target) : fluid.arrayConcatPolicy(target, source);
    };

    // unsupported, NON-API function
    fluid.makeMergeListenersPolicy = function (merger) {
        return function (target, source) {
            target = target || {};
            fluid.each(source, function (listeners, key) {
                target[key] = merger(target[key], listeners, key);
            });
            return target;
        };
    };

    fluid.validateListenersImplemented = function (that) {
        var errors = [];
        fluid.each(that.events, function (event, name) {
            fluid.each(event.sortedListeners, function (lisrec) {
                if (lisrec.listener === fluid.notImplemented || lisrec.listener.globalName === "fluid.notImplemented") {
                    errors.push({name: name, namespace: lisrec.namespace, componentSource: fluid.model.getSimple(that.options.listeners, [name + "." + lisrec.namespace, 0, "componentSource"])});
                }
            });
        });
        return errors;
    };

    /** Removes duplicated and empty elements from an already sorted array **/
    fluid.unique = function (array) {
        return fluid.remove_if(array, function (element, i) {
            return !element || i > 0 && element === array[i - 1];
        });
    };

    fluid.arrayConcatPolicy = function (target, source) {
        return fluid.makeArray(target).concat(fluid.makeArray(source));
    };

    /*** FLUID ERROR SYSTEM ***/

    fluid.failureEvent = fluid.makeEventFirer({name: "failure event"});

    fluid.failureEvent.addListener(fluid.builtinFail, "fail");
    fluid.failureEvent.addListener(fluid.logFailure, "log", "before:fail");

    /**
     * Configure the behaviour of fluid.fail by pushing or popping a disposition record onto a stack.
     * @param {Number|Function} condition
     & Supply either a function, which will be called with two arguments, args (the complete arguments to
     * fluid.fail) and activity, an array of strings describing the current framework invocation state.
     * Or, the argument may be the number <code>-1</code> indicating that the previously supplied disposition should
     * be popped off the stack
     */
    fluid.pushSoftFailure = function (condition) {
        if (typeof (condition) === "function") {
            fluid.failureEvent.addListener(condition, "fail");
        } else if (condition === -1) {
            fluid.failureEvent.removeListener("fail");
        } else if (typeof(condition) === "boolean") {
            fluid.fail("pushSoftFailure with boolean value is no longer supported");
        }
    };

    /*** DEFAULTS AND OPTIONS MERGING SYSTEM ***/

    // A function to tag the types of all Fluid components
    fluid.componentConstructor = function () {};

    /** Create a "type tag" component with no state but simply a type name and id. The most
     *  minimal form of Fluid component */
    // No longer a publically supported function - we don't abolish this because it is too annoying to prevent
    // circularity during the bootup of the IoC system if we try to construct full components before it is complete
    // unsupported, non-API function
    fluid.typeTag = function (name) {
        var that = Object.create(fluid.componentConstructor.prototype);
        that.typeName = name;
        that.id = fluid.allocateGuid();
        return that;
    };

    var gradeTick = 1; // tick counter for managing grade cache invalidation
    var gradeTickStore = {};

    fluid.defaultsStore = {};

    var resolveGradesImpl = function (gs, gradeNames, base) {
        var raw = true;
        if (base) {
            raw = gradeNames.length === 1; // We are just resolving a single grade and populating the cache
        }
        else {
            gradeNames = fluid.makeArray(gradeNames);
        }
        for (var i = gradeNames.length - 1; i >= 0; -- i) {
            var gradeName = gradeNames[i];
            if (gradeName && !gs.gradeHash[gradeName]) {
                var isDynamic = gradeName.charAt(0) === "{";
                var options = (isDynamic ? null : (raw ? fluid.rawDefaults(gradeName) : fluid.getGradedDefaults(gradeName))) || {};
                var thisTick = gradeTickStore[gradeName] || (gradeTick - 1); // a nonexistent grade is recorded as previous to current
                gs.lastTick = Math.max(gs.lastTick, thisTick);
                gs.gradeHash[gradeName] = true;
                gs.gradeChain.push(gradeName);
                gs.optionsChain.push(options);
                var oGradeNames = fluid.makeArray(options.gradeNames);
                for (var j = oGradeNames.length - 1; j >= 0; -- j) { // from stronger to weaker grades
                    var oGradeName = oGradeNames[j];
                    if (raw) {
                        resolveGradesImpl(gs, oGradeName);
                    } else {
                        if (!gs.gradeHash[oGradeName]) {
                            gs.gradeHash[oGradeName] = true; // these have already been resolved
                            gs.gradeChain.push(oGradeName);
                        }
                    }
                }
            }
        }
        return gs;
    };

    // unsupported, NON-API function
    fluid.resolveGradeStructure = function (defaultName, gradeNames) {
        var gradeStruct = {
            lastTick: 0,
            gradeChain: [],
            gradeHash: {},
            optionsChain: []
        };
        // stronger grades appear to the right in defaults - dynamic grades are stronger still - FLUID-5085
        // we supply these in reverse order to resolveGradesImpl with weak grades at the right
        return resolveGradesImpl(gradeStruct, [defaultName].concat(fluid.makeArray(gradeNames)), true);
    };

    var mergedDefaultsCache = {};

    // unsupported, NON-API function
    fluid.gradeNamesToKey = function (defaultName, gradeNames) {
        return defaultName + "|" + gradeNames.join("|");
    };

    fluid.hasGrade = function (options, gradeName) {
        return !options || !options.gradeNames ? false : fluid.contains(options.gradeNames, gradeName);
    };

    // unsupported, NON-API function
    fluid.resolveGrade = function (defaults, defaultName, gradeNames) {
        var gradeStruct = fluid.resolveGradeStructure(defaultName, gradeNames);
        var mergeArgs = gradeStruct.optionsChain.reverse();
        var mergePolicy = {};
        for (var i = 0; i < mergeArgs.length; ++ i) {
            if (mergeArgs[i] && mergeArgs[i].mergePolicy) {
                mergePolicy = $.extend(true, mergePolicy, mergeArgs[i].mergePolicy);
            }
        }
        mergeArgs = [mergePolicy, {}].concat(mergeArgs);
        var mergedDefaults = fluid.merge.apply(null, mergeArgs);
        mergedDefaults.gradeNames = gradeStruct.gradeChain.reverse();
        return {defaults: mergedDefaults, lastTick: gradeStruct && gradeStruct.lastTick};
    };

    // unsupported, NON-API function
    fluid.getGradedDefaults = function (defaultName, gradeNames) {
        gradeNames = fluid.makeArray(gradeNames);
        var key = fluid.gradeNamesToKey(defaultName, gradeNames);
        var mergedDefaults = mergedDefaultsCache[key];
        if (mergedDefaults) {
            var lastTick = 0; // check if cache should be invalidated through real latest tick being later than the one stored
            var searchGrades = mergedDefaults.defaults.gradeNames || [];
            for (var i = 0; i < searchGrades.length; ++ i) {
                lastTick = Math.max(lastTick, gradeTickStore[searchGrades[i]] || 0);
            }
            if (lastTick > mergedDefaults.lastTick) {
                fluid.log("Clearing cache for component " + defaultName + " with gradeNames ", searchGrades);
                mergedDefaults = null;
            }
        }
        if (!mergedDefaults) {
            var defaults = fluid.rawDefaults(defaultName);
            if (!defaults) {
                return defaults;
            }
            mergedDefaults = mergedDefaultsCache[key] = fluid.resolveGrade(defaults, defaultName, gradeNames);
        }
        return mergedDefaults.defaults;
    };

    // unsupported, NON-API function
    fluid.upgradePrimitiveFunc = function (rec, key) {
        if (rec && fluid.isPrimitive(rec)) {
            var togo = {};
            togo[key || (typeof(rec) === "string" && rec.charAt(0) !== "{" ? "funcName" : "func")] = rec;
            togo.args = fluid.NO_VALUE;
            return togo;
        } else {
            return rec;
        }
    };

    // unsupported, NON-API function
    // Modify supplied options record to include "componentSource" annotation required by FLUID-5082
    // TODO: This function really needs to act recursively in order to catch listeners registered for subcomponents - fix with FLUID-5614
    fluid.annotateListeners = function (componentName, options) {
        options.listeners = fluid.transform(options.listeners, function (record) {
            var togo = fluid.makeArray(record);
            return fluid.transform(togo, function (onerec) {
                onerec = fluid.upgradePrimitiveFunc(onerec, "listener");
                onerec.componentSource = componentName;
                return onerec;
            });
        });
        options.invokers = fluid.transform(options.invokers, function (record) {
            record = fluid.upgradePrimitiveFunc(record);
            if (record) {
                record.componentSource = componentName;
            }
            return record;
        });
    };

    // unsupported, NON-API function
    fluid.rawDefaults = function (componentName, options) {
        if (options === undefined) {
            var entry = fluid.defaultsStore[componentName];
            return entry && entry.options;
        } else {
            fluid.pushActivity("registerDefaults", "registering defaults for grade %componentName with options %options",
                {componentName: componentName, options: options});
            var optionsCopy = fluid.expandCompact ? fluid.expandCompact(options) : fluid.copy(options);
            fluid.annotateListeners(componentName, optionsCopy);
            var callerInfo = fluid.getCallerInfo && fluid.getCallerInfo(6);
            fluid.defaultsStore[componentName] = {
                options: optionsCopy,
                callerInfo: callerInfo
            };
            gradeTickStore[componentName] = gradeTick++;
            fluid.popActivity();
        }
    };

    // unsupported, NON-API function
    fluid.doIndexDefaults = function (defaultName, defaults, index, indexSpec) {
        var requiredGrades = fluid.makeArray(indexSpec.gradeNames);
        for (var i = 0; i < requiredGrades.length; ++ i) {
            if (!fluid.hasGrade(defaults, requiredGrades[i])) { return; }
        }
        var indexFunc = typeof(indexSpec.indexFunc) === "function" ? indexSpec.indexFunc : fluid.getGlobalValue(indexSpec.indexFunc);
        var keys = indexFunc(defaults) || [];
        for (var j = 0; j < keys.length; ++ j) {
            (index[keys[j]] = index[keys[j]] || []).push(defaultName);
        }
    };

    /** Evaluates an index specification over all the defaults records registered into the system.
     * @param indexName {String} The name of this index record (currently ignored)
     * @param indexSpec {Object} Specification of the index to be performed - fields:
     *     gradeNames: {String/Array of String} List of grades that must be matched by this indexer
     *     indexFunc:  {String/Function} An index function which accepts a defaults record and returns a list of keys
     * @return A structure indexing keys to lists of matched gradenames
     */
    // The expectation is that this function is extremely rarely used with respect to registration of defaults
    // in the system, so currently we do not make any attempts to cache the results. The field "indexName" is
    // supplied in case a future implementation chooses to implement caching
    fluid.indexDefaults = function (indexName, indexSpec) {
        var index = {};
        for (var defaultName in fluid.defaultsStore) {
            var defaults = fluid.getGradedDefaults(defaultName);
            fluid.doIndexDefaults(defaultName, defaults, index, indexSpec);
        }
        return index;
    };

    /**
     * Retrieves and stores a grade's configuration centrally.
     * @param {String} gradeName the name of the grade whose options are to be read or written
     * @param {Object} (optional) an object containing the options to be set
     */

    fluid.defaults = function (componentName, options) {
        if (options === undefined) {
            return fluid.getGradedDefaults(componentName);
        }
        else {
            if (options && options.options) {
                fluid.fail("Probable error in options structure for " + componentName +
                    " with option named \"options\" - perhaps you meant to write these options at top level in fluid.defaults? - ", options);
            }
            fluid.rawDefaults(componentName, options);
            var gradedDefaults = fluid.getGradedDefaults(componentName);
            if (!fluid.hasGrade(gradedDefaults, "fluid.function")) {
                fluid.makeComponentCreator(componentName);
            }
        }
    };

    fluid.makeComponentCreator = function (componentName) {
        var creator = function () {
            var defaults = fluid.getGradedDefaults(componentName);
            if (!defaults.gradeNames || defaults.gradeNames.length === 0) {
                fluid.fail("Cannot make component creator for type " + componentName + " which does not have any gradeNames defined");
            } else if (!defaults.initFunction) {
                var blankGrades = [];
                for (var i = 0; i < defaults.gradeNames.length; ++ i) {
                    var gradeName = defaults.gradeNames[i];
                    var rawDefaults = fluid.rawDefaults(gradeName);
                    if (!rawDefaults) {
                        blankGrades.push(gradeName);
                    }
                }
                if (blankGrades.length === 0) {
                    fluid.fail("Cannot make component creator for type " + componentName + " which does not have an initFunction defined");
                } else {
                    fluid.fail("The grade hierarchy of component with type " + componentName + " is incomplete - it inherits from the following grade(s): " +
                     blankGrades.join(", ") + " for which the grade definitions are corrupt or missing. Please check the files which might include these " +
                     "grades and ensure they are readable and have been loaded by this instance of Infusion");
                }
            } else {
                return fluid.initComponent(componentName, arguments);
            }
        };
        var existing = fluid.getGlobalValue(componentName);
        if (existing) {
            $.extend(creator, existing);
        }
        fluid.setGlobalValue(componentName, creator);
    };

    // Cheapskate implementation which avoids dependency on DataBinding.js
    // TODO: This is apparently still used by the core merging algorithm, for reasons we no longer understand, even though
    // it has long been disused by DataBinding itself
    fluid.model.mergeModel = function (target, source) {
        if (fluid.isPlainObject(target)) {
            var copySource = fluid.copy(source);
            $.extend(true, source, target);
            $.extend(true, source, copySource);
        }
        return source;
    };

    var emptyPolicy = {};
    // unsupported, NON-API function
    fluid.derefMergePolicy = function (policy) {
        return (policy? policy["*"]: emptyPolicy) || emptyPolicy;
    };

    // unsupported, NON-API function
    fluid.compileMergePolicy = function (mergePolicy) {
        var builtins = {}, defaultValues = {};
        var togo = {builtins: builtins, defaultValues: defaultValues};

        if (!mergePolicy) {
            return togo;
        }
        fluid.each(mergePolicy, function (value, key) {
            var parsed = {}, builtin = true;
            if (typeof(value) === "function") {
                parsed.func = value;
            }
            else if (typeof(value) === "object") {
                parsed = value;
            }
            else if (!fluid.isDefaultValueMergePolicy(value)) {
                var split = value.split(/\s*,\s*/);
                for (var i = 0; i < split.length; ++ i) {
                    parsed[split[i]] = true;
                }
            }
            else {
                // Convert to ginger self-reference - NB, this can only be parsed by IoC
                fluid.set(defaultValues, key, "{that}.options." + value);
                togo.hasDefaults = true;
                builtin = false;
            }
            if (builtin) {
                fluid.set(builtins, fluid.composePath(key, "*"), parsed);
            }
        });
        return togo;
    };

    // TODO: deprecate this method of detecting default value merge policies before 1.6 in favour of
    // explicit typed records a la ModelTransformations
    // unsupported, NON-API function
    fluid.isDefaultValueMergePolicy = function (policy) {
        return typeof(policy) === "string" &&
            (policy.indexOf(",") === -1 && !/replace|nomerge|noexpand/.test(policy));
    };

    // unsupported, NON-API function
    fluid.mergeOneImpl = function (thisTarget, thisSource, j, sources, newPolicy, i, segs) {
        var togo = thisTarget;

        var primitiveTarget = fluid.isPrimitive(thisTarget);

        if (thisSource !== undefined) {
            if (!newPolicy.func && thisSource !== null && fluid.isPlainObject(thisSource) &&
                    !fluid.isDOMish(thisSource) && thisSource !== fluid.VALUE && !newPolicy.nomerge) {
                if (primitiveTarget) {
                    togo = thisTarget = fluid.freshContainer(thisSource);
                }
                // recursion is now external? We can't do it from here since sources are not all known
                // options.recurse(thisTarget, i + 1, segs, sources, newPolicyHolder, options);
            } else {
                sources[j] = undefined;
                if (newPolicy.func) {
                    togo = newPolicy.func.call(null, thisTarget, thisSource, segs[i - 1], segs, i); // NB - change in this mostly unused argument
                } else {
                    togo = fluid.isValue(thisTarget) ? fluid.model.mergeModel(thisTarget, thisSource) : thisSource;
                }
            }
        }
        return togo;
    };
    // NB - same quadratic worry about these as in FluidIoC in the case the RHS trundler is live -
    // since at each regeneration step driving the RHS we are discarding the "cursor arguments" these
    // would have to be regenerated at each step - although in practice this can only happen once for
    // each object for all time, since after first resolution it will be concrete.
    function regenerateCursor (source, segs, limit, sourceStrategy) {
        for (var i = 0; i < limit; ++ i) {
            source = sourceStrategy(source, segs[i], i, fluid.makeArray(segs)); // copy for FLUID-5243
        }
        return source;
    }

    function regenerateSources (sources, segs, limit, sourceStrategies) {
        var togo = [];
        for (var i = 0; i < sources.length; ++ i) {
            var thisSource = regenerateCursor(sources[i], segs, limit, sourceStrategies[i]);
            if (thisSource !== undefined) {
                togo.push(thisSource);
            }
        }
        return togo;
    }

    // unsupported, NON-API function
    fluid.fetchMergeChildren = function (target, i, segs, sources, mergePolicy, options) { /* unused parameter left for documentation purposes */ // jshint ignore:line
        var thisPolicy = fluid.derefMergePolicy(mergePolicy);
        for (var j = sources.length - 1; j >= 0; -- j) { // this direction now irrelevant - control is in the strategy
            var source = sources[j];
            // NB - this detection relies on strategy return being complete objects - which they are
            // although we need to set up the roots separately. We need to START the process of evaluating each
            // object root (sources) COMPLETELY, before we even begin! Even if the effect of this is to cause a
            // dispatch into ourselves almost immediately. We can do this because we can take control over our
            // TARGET objects and construct them early. Even if there is a self-dispatch, it will be fine since it is
            // DIRECTED and so will not trouble our "slow" detection of properties. After all self-dispatches end, control
            // will THEN return to "evaluation of arguments" (expander blocks) and only then FINALLY to this "slow"
            // traversal of concrete properties to do the final merge.
            if (source !== undefined) {
                fluid.each(source, function (newSource, name) {
                    if (!(name in target)) { // only request each new target key once -- all sources will be queried per strategy
                        segs[i] = name;
                        if (!fluid.getImmediate(options.exceptions, segs, i)) {
                            options.strategy(target, name, i + 1, segs, sources, mergePolicy);
                        }
                    }
                });  /* function in loop */ // jshint ignore:line
                if (thisPolicy.replace) { // this branch primarily deals with a policy of replace at the root
                    break;
                }
            }
        }
        return target;
    };

    // A special marker object which will be placed at a current evaluation point in the tree in order
    // to protect against circular evaluation
    fluid.inEvaluationMarker = Object.freeze({"__CURRENTLY_IN_EVALUATION__": true});

    // A path depth above which the core "process strategies" will bail out, assuming that the
    // structure has become circularly linked. Helpful in environments such as Firebug which will
    // kill the browser process if they happen to be open when a stack overflow occurs. Also provides
    // a more helpful diagnostic.
    fluid.strategyRecursionBailout = 50;

    // unsupported, NON-API function
    fluid.makeMergeStrategy = function (options) {
        var strategy = function (target, name, i, segs, sources, policy) {
            if (i > fluid.strategyRecursionBailout) {
                fluid.fail("Overflow/circularity in options merging, current path is ", segs, " at depth " , i, " - please protect components from merging using the \"nomerge\" merge policy");
            }
            if (fluid.isPrimitive(target)) { // For "use strict"
                return undefined; // Review this after FLUID-4925 since the only trigger is in slow component lookahead
            }
            if (fluid.isTracing) {
                fluid.tracing.pathCount.push(fluid.path(segs.slice(0, i)));
            }

            var oldTarget;
            if (name in target) { // bail out if our work has already been done
                oldTarget = target[name];
                if (!options.evaluateFully) { // see notes on this hack in "initter" - early attempt to deal with FLUID-4930
                    return oldTarget;
                }
            }
            else {
                if (target !== fluid.inEvaluationMarker) { // TODO: blatant "coding to the test" - this enables the simplest "re-trunking" in
                    // FluidIoCTests to function. In practice, we need to throw away this implementation entirely in favour of the
                    // "iterative deepening" model coming with FLUID-4925
                    target[name] = fluid.inEvaluationMarker;
                }
            }
            if (sources === undefined) { // recover our state in case this is an external entry point
                segs = fluid.makeArray(segs); // avoid trashing caller's segs
                sources = regenerateSources(options.sources, segs, i - 1, options.sourceStrategies);
                policy = regenerateCursor(options.mergePolicy, segs, i - 1, fluid.concreteTrundler);
            }
            // var thisPolicy = fluid.derefMergePolicy(policy);
            var newPolicyHolder = fluid.concreteTrundler(policy, name);
            var newPolicy = fluid.derefMergePolicy(newPolicyHolder);

            var start, limit, mul;
            if (newPolicy.replace) {
                start = 1 - sources.length; limit = 0; mul = -1; /* on one line for easier visual comparison of the two algorithms  */ // jshint ignore:line
            }
            else {
                start = 0; limit = sources.length - 1; mul = +1; /* on one line for easier visual comparison of the two algorithms  */ // jshint ignore:line
            }
            var newSources = [];
            var thisTarget;

            for (var j = start; j <= limit; ++j) { // TODO: try to economise on this array and on gaps
                var k = mul * j;
                var thisSource = options.sourceStrategies[k](sources[k], name, i, segs); // Run the RH algorithm in "driving" mode
                if (thisSource !== undefined) {
                    newSources[k] = thisSource;
                    if (oldTarget === undefined) {
                        if (mul === -1) { // if we are going backwards, it is "replace"
                            thisTarget = target[name] = thisSource;
                            break;
                        }
                        else {
                            // write this in early, since early expansions may generate a trunk object which is written in to by later ones
                            thisTarget = fluid.mergeOneImpl(thisTarget, thisSource, j, newSources, newPolicy, i, segs, options);
                            if (target !== fluid.inEvaluationMarker) {
                                target[name] = thisTarget;
                            }
                        }
                    }
                }
            }
            if (oldTarget !== undefined) {
                thisTarget = oldTarget;
            }
            if (newSources.length > 0) {
                if (fluid.isPlainObject(thisTarget)) {
                    fluid.fetchMergeChildren(thisTarget, i, segs, newSources, newPolicyHolder, options);
                }
            }
            if (oldTarget === undefined && newSources.length === 0) {
                delete target[name]; // remove the evaluation marker - nothing to evaluate
            }
            return thisTarget;
        };
        options.strategy = strategy;
        return strategy;
    };

    // A simple stand-in for "fluid.get" where the material is covered by a single strategy
    fluid.driveStrategy = function (root, pathSegs, strategy) {
        pathSegs = fluid.makeArray(pathSegs);
        for (var i = 0; i < pathSegs.length; ++ i) {
            if (!root) {
                return undefined;
            }
            root = strategy(root, pathSegs[i], i + 1, pathSegs);
        }
        return root;
    };

    // A very simple "new inner trundler" that just performs concrete property access
    // Note that every "strategy" is also a "trundler" of this type, considering just the first two arguments
    fluid.concreteTrundler = function (source, seg) {
        return !source? undefined : source[seg];
    };

    /** Merge a collection of options structures onto a target, following an optional policy.
     * This method is now used only for the purpose of merging "dead" option documents in order to
     * cache graded component defaults. Component option merging is now performed by the
     * fluid.makeMergeOptions pathway which sets up a deferred merging process. This function
     * will not be removed in the Fluid 2.0 release but it is recommended that users not call it
     * directly.
     * The behaviour of this function is explained more fully on
     * the page http://wiki.fluidproject.org/display/fluid/Options+Merging+for+Fluid+Components .
     * @param policy {Object/String} A "policy object" specifiying the type of merge to be performed.
     * If policy is of type {String} it should take on the value "replace" representing
     * a static policy. If it is an
     * Object, it should contain a mapping of EL paths onto these String values, representing a
     * fine-grained policy. If it is an Object, the values may also themselves be EL paths
     * representing that a default value is to be taken from that path.
     * @param options1, options2, .... {Object} an arbitrary list of options structure which are to
     * be merged together. These will not be modified.
     */

    fluid.merge = function (policy /*, ... sources */) {
        var sources = Array.prototype.slice.call(arguments, 1);
        var compiled = fluid.compileMergePolicy(policy).builtins;
        var options = fluid.makeMergeOptions(compiled, sources, {});
        options.initter();
        return options.target;
    };

    // unsupported, NON-API function
    fluid.simpleGingerBlock = function (source, recordType) {
        var block = {
            target: source,
            simple: true,
            strategy: fluid.concreteTrundler,
            initter: fluid.identity,
            recordType: recordType,
            priority: fluid.mergeRecordTypes[recordType]
        };
        return block;
    };

    // unsupported, NON-API function
    fluid.makeMergeOptions = function (policy, sources, userOptions) {
        // note - we close over the supplied policy as a shared object reference - it will be updated during discovery
        var options = {
            mergePolicy: policy,
            sources: sources
        };
        options = $.extend(options, userOptions);
        options.target = options.target || fluid.freshContainer(options.sources[0]);
        options.sourceStrategies = options.sourceStrategies || fluid.generate(options.sources.length, fluid.concreteTrundler);
        options.initter = function () {
            // This hack is necessary to ensure that the FINAL evaluation doesn't balk when discovering a trunk path which was already
            // visited during self-driving via the expander. This bi-modality is sort of rubbish, but we currently don't have "room"
            // in the strategy API to express when full evaluation is required - and the "flooding API" is not standardised. See FLUID-4930
            options.evaluateFully = true;
            fluid.fetchMergeChildren(options.target, 0, [], options.sources, options.mergePolicy, options);
        };
        fluid.makeMergeStrategy(options);
        return options;
    };

    // unsupported, NON-API function
    fluid.transformOptions = function (options, transRec) {
        fluid.expect("Options transformation record", transRec, ["transformer", "config"]);
        var transFunc = fluid.getGlobalValue(transRec.transformer);
        return transFunc.call(null, options, transRec.config);
    };

    // unsupported, NON-API function
    fluid.findMergeBlocks = function (mergeBlocks, recordType) {
        return fluid.remove_if(fluid.makeArray(mergeBlocks), function (block) { return block.recordType !== recordType; });
    };

    // unsupported, NON-API function
    fluid.transformOptionsBlocks = function (mergeBlocks, transformOptions, recordTypes) {
        fluid.each(recordTypes, function (recordType) {
            var blocks = fluid.findMergeBlocks(mergeBlocks, recordType);
            fluid.each(blocks, function (block) {
                var source = block.source ? "source" : "target"; // TODO: Problem here with irregular presentation of options which consist of a reference in their entirety
                block[block.simple || source === "target" ? "target": "source"] = fluid.transformOptions(block[source], transformOptions);
            });
        });
    };

    // unsupported, NON-API function
    fluid.deliverOptionsStrategy = fluid.identity;
    fluid.computeComponentAccessor = fluid.identity;
    fluid.computeDynamicComponents = fluid.identity;

    // The types of merge record the system supports, with the weakest records first
    fluid.mergeRecordTypes = {
        defaults:           1000,
        defaultValueMerge:  900,
        subcomponentRecord: 800,
        user:               700,
        distribution:       100 // and above
    };

    // Utility used in the framework (primarily with distribution assembly), unconnected with new ChangeApplier
    // unsupported, NON-API function
    fluid.model.applyChangeRequest = function (model, request) {
        var segs = request.segs;
        if (segs.length === 0) {
            if (request.type === "ADD") {
                $.extend(true, model, request.value);
            } else {
                fluid.clear(model);
            }
        } else if (request.type === "ADD") {
            fluid.model.setSimple(model, request.segs, request.value);
        } else {
            for (var i = 0; i < segs.length - 1; ++ i) {
                model = model[segs[i]];
                if (!model) {
                    return;
                }
            }
            var last = segs[segs.length - 1];
            delete model[last];
        }
    };

    /** Delete the value in the supplied object held at the specified path
     * @param target {Object} The object holding the value to be deleted (possibly empty)
     * @param segs {Array of String} the path of the value to be deleted
     */
    // unsupported, NON-API function
    fluid.destroyValue = function (target, segs) {
        if (target) {
            fluid.model.applyChangeRequest(target, {type: "DELETE", segs: segs});
        }
    };

    /**
     * Merges the component's declared defaults, as obtained from fluid.defaults(),
     * with the user's specified overrides.
     *
     * @param {Object} that the instance to attach the options to
     * @param {String} componentName the unique "name" of the component, which will be used
     * to fetch the default options from store. By recommendation, this should be the global
     * name of the component's creator function.
     * @param {Object} userOptions the user-specified configuration options for this component
     */
    // unsupported, NON-API function
    fluid.mergeComponentOptions = function (that, componentName, userOptions, localOptions) {
        var rawDefaults = fluid.rawDefaults(componentName);
        var defaults = fluid.getGradedDefaults(componentName, rawDefaults && rawDefaults.gradeNames ? null : localOptions.gradeNames);
        var sharedMergePolicy = {};

        var mergeBlocks = [];

        if (fluid.expandComponentOptions) {
            mergeBlocks = mergeBlocks.concat(fluid.expandComponentOptions(sharedMergePolicy, defaults, userOptions, that));
        }
        else {
            mergeBlocks = mergeBlocks.concat([fluid.simpleGingerBlock(defaults, "defaults"),
                                              fluid.simpleGingerBlock(userOptions, "user")]);
        }
        var options = {}; // ultimate target
        var sourceStrategies = [], sources = [];
        var baseMergeOptions = {
            target: options,
            sourceStrategies: sourceStrategies
        };
        // Called both from here and from IoC whenever there is a change of block content or arguments which
        // requires them to be resorted and rebound
        var updateBlocks = function () {
            fluid.each(mergeBlocks, function (block) {
                if (fluid.isPrimitive(block.priority)) {
                    block.priority = fluid.parsePriority(block.priority, 0, false, "options distribution");
                }
            });
            fluid.sortByPriority(mergeBlocks);
            sourceStrategies.length = 0;
            sources.length = 0;
            fluid.each(mergeBlocks, function (block) {
                sourceStrategies.push(block.strategy);
                sources.push(block.target);
            });
        };
        updateBlocks();
        var mergeOptions = fluid.makeMergeOptions(sharedMergePolicy, sources, baseMergeOptions);
        mergeOptions.mergeBlocks = mergeBlocks;
        mergeOptions.updateBlocks = updateBlocks;
        mergeOptions.destroyValue = function (segs) { // This method is a temporary hack to assist FLUID-5091
            for (var i = 0; i < mergeBlocks.length; ++ i) {
                fluid.destroyValue(mergeBlocks[i].target, segs);
            }
            fluid.destroyValue(baseMergeOptions.target, segs);
        };

        var compiledPolicy;
        var mergePolicy;
        function computeMergePolicy() {
            // Decode the now available mergePolicy
            mergePolicy = fluid.driveStrategy(options, "mergePolicy", mergeOptions.strategy);
            mergePolicy = $.extend({}, fluid.rootMergePolicy, mergePolicy);
            compiledPolicy = fluid.compileMergePolicy(mergePolicy);
            // TODO: expandComponentOptions has already put some builtins here - performance implications of the now huge
            // default mergePolicy material need to be investigated as well as this deep merge
            $.extend(true, sharedMergePolicy, compiledPolicy.builtins); // ensure it gets broadcast to all sharers
        }
        computeMergePolicy();
        mergeOptions.computeMergePolicy = computeMergePolicy;

        if (compiledPolicy.hasDefaults) {
            if (fluid.generateExpandBlock) {
                mergeBlocks.push(fluid.generateExpandBlock({
                        options: compiledPolicy.defaultValues,
                        recordType: "defaultValueMerge",
                        priority: fluid.mergeRecordTypes.defaultValueMerge
                    }, that, {}));
                updateBlocks();
            }
            else {
                fluid.fail("Cannot operate mergePolicy ", mergePolicy, " for component ", that, " without including FluidIoC.js");
            }
        }
        that.options = options;
        fluid.driveStrategy(options, "gradeNames", mergeOptions.strategy);

        fluid.deliverOptionsStrategy(that, options, mergeOptions); // do this early to broadcast and receive "distributeOptions"

        fluid.computeComponentAccessor(that, userOptions && userOptions.localRecord);

        var transformOptions = fluid.driveStrategy(options, "transformOptions", mergeOptions.strategy);
        if (transformOptions) {
            fluid.transformOptionsBlocks(mergeBlocks, transformOptions, ["user", "subcomponentRecord"]);
            updateBlocks(); // because the possibly simple blocks may have changed target
        }

        if (!baseMergeOptions.target.mergePolicy) {
            computeMergePolicy();
        }

        return mergeOptions;
    };

    // The Fluid Component System proper

    // The base system grade definitions

    fluid.defaults("fluid.function", {});

    /** Invoke a global function by name and named arguments. A courtesy to allow declaratively encoded function calls
     * to use named arguments rather than bare arrays.
     * @param name {String} A global name which can be resolved to a Function. The defaults for this name must
     * resolve onto a grade including "fluid.function". The defaults record should also contain an entry
     * <code>argumentMap</code>, a hash of argument names onto indexes.
     * @param spec {Object} A named hash holding the argument values to be sent to the function. These will be looked
     * up in the <code>argumentMap</code> and resolved into a flat list of arguments.
     * @return {Any} The return value from the function
     */

    fluid.invokeGradedFunction = function (name, spec) {
        var defaults = fluid.defaults(name);
        if (!defaults || !defaults.argumentMap || !fluid.hasGrade(defaults, "fluid.function")) {
            fluid.fail("Cannot look up name " + name +
                " to a function with registered argumentMap - got defaults ", defaults);
        }
        var args = [];
        fluid.each(defaults.argumentMap, function (value, key) {
            args[value] = spec[key];
        });
        return fluid.invokeGlobalFunction(name, args);
    };

    fluid.noNamespaceDistributionPrefix = "no-namespace-distribution-";

    fluid.mergeOneDistribution = function (target, source, key) {
        var namespace = source.namespace || key || fluid.noNamespaceDistributionPrefix + fluid.allocateGuid();
        source.namespace = namespace;
        target[namespace] = source;
    };

    fluid.distributeOptionsPolicy = function (target, source) {
        target = target || {};
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++ i) {
                fluid.mergeOneDistribution(target, source[i]);
            }
        } else if (typeof(source.target) === "string") {
            fluid.mergeOneDistribution(target, source);
        } else {
            fluid.each(source, function (oneSource, key) {
                fluid.mergeOneDistribution(target, oneSource, key);
            });
        }
        return target;
    };

    fluid.mergingArray = function () {};
    fluid.mergingArray.prototype = [];

    // Defer all evaluation of all nested members to resolve FLUID-5668
    fluid.membersMergePolicy = function (target, source) {
        target = target || {};
        fluid.each(source, function (oneSource, key) {
            if (!target[key]) {
                target[key] = new fluid.mergingArray();
            }
            if (oneSource instanceof fluid.mergingArray) {
                target[key].push.apply(target[key], oneSource);
            } else if (oneSource !== undefined) {
                target[key].push(oneSource);
            }
        });
        return target;
    };

    fluid.invokerStrategies = fluid.arrayToHash(["func", "funcName", "listener", "this", "method"]);

    // Resolve FLUID-5741, FLUID-5184 by ensuring that we avoid mixing incompatible invoker strategies
    fluid.invokersMergePolicy = function (target, source) {
        target = target || {};
        fluid.each(source, function (oneInvoker, name) {
            if (!oneInvoker) {
                target[name] = oneInvoker;
                return;
            } else {
                oneInvoker = fluid.upgradePrimitiveFunc(oneInvoker);
            }
            var oneT = target[name];
            if (!oneT) {
                oneT = target[name] = {};
            }
            for (var key in fluid.invokerStrategies) {
                if (key in oneInvoker) {
                    for (var key2 in fluid.invokerStrategies) {
                        oneT[key2] = undefined; // can't delete since stupid driveStrategy bug from recordStrategy reinstates them
                    }
                }
            }
            $.extend(oneT, oneInvoker);
        });
        return target;
    };

    fluid.rootMergePolicy = {
        gradeNames: fluid.arrayConcatPolicy,
        distributeOptions: fluid.distributeOptionsPolicy,
        members: {
            noexpand: true,
            func: fluid.membersMergePolicy
        },
        invokers: {
            noexpand: true,
            func: fluid.invokersMergePolicy
        },
        transformOptions: "replace",
        listeners: fluid.makeMergeListenersPolicy(fluid.mergeListenerPolicy)
    };

    fluid.defaults("fluid.component", {
        initFunction: "fluid.initLittleComponent",
        mergePolicy: fluid.rootMergePolicy,
        argumentMap: {
            options: 0
        },
        events: { // Three standard lifecycle points common to all components
            onCreate:     null,
            onDestroy:    null,
            afterDestroy: null
        }
    });

    fluid.defaults("fluid.emptySubcomponent", {
        gradeNames: ["fluid.component"]
    });

    /** Compute a "nickname" given a fully qualified typename, by returning the last path
     * segment.
     */

    fluid.computeNickName = function (typeName) {
        var segs = fluid.model.parseEL(typeName);
        return segs[segs.length - 1];
    };

    /** A specially recognised grade tag which directs the IoC framework to instantiate this component first amongst
     * its set of siblings, since it is likely to bear a context-forming type name. This will be removed from the framework
     * once we have implemented FLUID-4925 "wave of explosions" */

    fluid.defaults("fluid.typeFount", {
        gradeNames: ["fluid.component"]
    });

    /**
     * Creates a new "little component": a that-ist object with options merged into it by the framework.
     * This method is a convenience for creating small objects that have options but don't require full
     * View-like features such as the DOM Binder or events
     *
     * @param {Object} name the name of the little component to create
     * @param {Object} options user-supplied options to merge with the defaults
     */
    // NOTE: the 3rd argument localOptions is NOT to be advertised as part of the stable API, it is present
    // just to allow backward compatibility whilst grade specifications are not mandatory - similarly for 4th arg "receiver"
    // NOTE historical name to avoid confusion with fluid.initComponent below - this will all be refactored with FLUID-4925
    fluid.initLittleComponent = function (name, userOptions, localOptions, receiver) {
        var that = fluid.typeTag(name);
        that.lifecycleStatus = "constructing";
        localOptions = localOptions || {gradeNames: "fluid.component"};

        that.destroy = fluid.makeRootDestroy(that); // overwritten by FluidIoC for constructed subcomponents
        var mergeOptions = fluid.mergeComponentOptions(that, name, userOptions, localOptions);
        mergeOptions.exceptions = {members: {model: true, modelRelay: true}}; // don't evaluate these in "early flooding" - they must be fetched explicitly
        var options = that.options;
        that.events = {};
        // deliver to a non-IoC side early receiver of the component (currently only initView)
        (receiver || fluid.identity)(that, options, mergeOptions.strategy);
        fluid.computeDynamicComponents(that, mergeOptions);

        // TODO: ****THIS**** is the point we must deliver and suspend!! Construct the "component skeleton" first, and then continue
        // for as long as we can continue to find components.
        for (var i = 0; i < mergeOptions.mergeBlocks.length; ++ i) {
            mergeOptions.mergeBlocks[i].initter();
        }
        mergeOptions.initter();
        delete options.mergePolicy;

        fluid.instantiateFirers(that, options);
        fluid.mergeListeners(that, that.events, options.listeners);

        return that;
    };

    fluid.diagnoseFailedView = fluid.identity;

    // unsupported, NON-API function
    fluid.makeRootDestroy = function (that) {
        return function () {
            fluid.doDestroy(that);
            that.events.afterDestroy.fire(that, "", null);
        };
    };

    /** Returns <code>true</code> if the supplied reference holds a component which has been destroyed **/

    fluid.isDestroyed = function (that) {
        return that.lifecycleStatus === "destroyed";
    };

    // unsupported, NON-API function
    fluid.doDestroy = function (that, name, parent) {
        that.events.onDestroy.fire(that, name || "", parent);
        that.lifecycleStatus = "destroyed";
        for (var key in that.events) {
            if (key !== "afterDestroy" && typeof(that.events[key].destroy) === "function") {
                that.events[key].destroy();
            }
        }
        if (that.applier) { // TODO: Break this out into the grade's destroyer
            that.applier.destroy();
        }
    };

    // unsupported, NON-API function
    fluid.initComponent = function (componentName, initArgs) {
        var options = fluid.defaults(componentName);
        if (!options.gradeNames) {
            fluid.fail("Cannot initialise component " + componentName + " which has no gradeName registered");
        }
        var args = [componentName].concat(fluid.makeArray(initArgs));
        var that;
        fluid.pushActivity("initComponent", "constructing component of type %componentName with arguments %initArgs",
            {componentName: componentName, initArgs: initArgs});
        that = fluid.invokeGlobalFunction(options.initFunction, args);
        fluid.diagnoseFailedView(componentName, that, options, args);
        if (fluid.initDependents) {
            fluid.initDependents(that);
        }
        var errors = fluid.validateListenersImplemented(that);
        if (errors.length > 0) {
            fluid.fail(fluid.transform(errors, function (error) {
                return "Error constructing component ", that, " - the listener for event " + error.name + " with namespace " + error.namespace + (
                    (error.componentSource ? " which was defined in grade " + error.componentSource : "") + " needs to be overridden with a concrete implementation");
            })).join("\n");
        }
        that.lifecycleStatus = "constructed";
        that.events.onCreate.fire(that);
        fluid.popActivity();
        return that;
    };

    // unsupported, NON-API function
    fluid.initSubcomponentImpl = function (that, entry, args) {
        var togo;
        if (typeof (entry) !== "function") {
            var entryType = typeof (entry) === "string" ? entry : entry.type;
            togo = entryType === "fluid.emptySubcomponent" ?
                null : fluid.invokeGlobalFunction(entryType, args);
        } else {
            togo = entry.apply(null, args);
        }
        return togo;
    };

    // ******* SELECTOR ENGINE *********

    // selector regexps copied from jQuery - recent versions correct the range to start C0
    // The initial portion of the main character selector: "just add water" to add on extra
    // accepted characters, as well as the "\\\\." -> "\." portion necessary for matching
    // period characters escaped in selectors
    var charStart = "(?:[\\w\\u00c0-\\uFFFF*_-";

    fluid.simpleCSSMatcher = {
        regexp: new RegExp("([#.]?)(" + charStart + "]|\\\\.)+)", "g"),
        charToTag: {
            "": "tag",
            "#": "id",
            ".": "clazz"
        }
    };

    fluid.IoCSSMatcher = {
        regexp: new RegExp("([&#]?)(" + charStart + "]|\\.|\\/)+)", "g"),
        charToTag: {
            "": "context",
            "&": "context",
            "#": "id"
        }
    };

    var childSeg = new RegExp("\\s*(>)?\\s*", "g");
//    var whiteSpace = new RegExp("^\\w*$");

    // Parses a selector expression into a data structure holding a list of predicates
    // 2nd argument is a "strategy" structure, e.g.  fluid.simpleCSSMatcher or fluid.IoCSSMatcher
    // unsupported, non-API function
    fluid.parseSelector = function (selstring, strategy) {
        var togo = [];
        selstring = selstring.trim();
        //ws-(ss*)[ws/>]
        var regexp = strategy.regexp;
        regexp.lastIndex = 0;
        var lastIndex = 0;
        while (true) {
            var atNode = []; // a list of predicates at a particular node
            var first = true;
            while (true) {
                var segMatch = regexp.exec(selstring);
                if (!segMatch) {
                    break;
                }
                if (segMatch.index !== lastIndex) {
                    if (first) {
                        fluid.fail("Error in selector string - cannot match child selector expression starting at " + selstring.substring(lastIndex));
                    }
                    else {
                        break;
                    }
                }
                var thisNode = {};
                var text = segMatch[2];
                var targetTag = strategy.charToTag[segMatch[1]];
                if (targetTag) {
                    thisNode[targetTag] = text;
                }
                atNode[atNode.length] = thisNode;
                lastIndex = regexp.lastIndex;
                first = false;
            }
            childSeg.lastIndex = lastIndex;
            var fullAtNode = {predList: atNode};
            var childMatch = childSeg.exec(selstring);
            if (!childMatch || childMatch.index !== lastIndex) {
                fluid.fail("Error in selector string - can not match child selector expression at " + selstring.substring(lastIndex));
            }
            if (childMatch[1] === ">") {
                fullAtNode.child = true;
            }
            togo[togo.length] = fullAtNode;
            // >= test here to compensate for IE bug http://blog.stevenlevithan.com/archives/exec-bugs
            if (childSeg.lastIndex >= selstring.length) {
                break;
            }
            lastIndex = childSeg.lastIndex;
            regexp.lastIndex = childSeg.lastIndex;
        }
        return togo;
    };

    // Message resolution and templating

   /**
    * Converts a string to a regexp with the specified flags given in parameters
    * @param {String} a string that has to be turned into a regular expression
    * @param {String} the flags to provide to the reg exp
    */
    // TODO: this is an abominably inefficient technique for something that could simply be done by means of indexOf and slice
    fluid.stringToRegExp = function (str, flags) {
        return new RegExp(str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), flags);
    };

    /**
     * Simple string template system.
     * Takes a template string containing tokens in the form of "%value".
     * Returns a new string with the tokens replaced by the specified values.
     * Keys and values can be of any data type that can be coerced into a string.
     *
     * @param {String}    template    a string (can be HTML) that contains tokens embedded into it
     * @param {object}    values      a collection of token keys and values
     */
    fluid.stringTemplate = function (template, values) {
        var keys = fluid.keys(values);
        keys = keys.sort(fluid.compareStringLength());
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var re = fluid.stringToRegExp("%" + key, "g");
            template = template.replace(re, values[key]);
        }
        return template;
    };

})(jQuery, fluid_2_0_0_beta_1);

/*
Copyright 2007-2010 University of Cambridge
Copyright 2007-2009 University of Toronto
Copyright 2007-2009 University of California, Berkeley
Copyright 2010 OCAD University
Copyright 2010-2011 Lucendo Development Ltd.

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0_0_beta_1 = fluid_2_0_0_beta_1 || {};
var fluid = fluid || fluid_2_0_0_beta_1;

(function ($, fluid) {
    "use strict";

    /** Render a timestamp from a Date object into a helpful fixed format for debug logs to millisecond accuracy
     * @param date {Date} The date to be rendered
     * @return {String} A string format consisting of hours:minutes:seconds.millis for the datestamp padded to fixed with 
     */

    fluid.renderTimestamp = function (date) {
        var zeropad = function (num, width) {
            if (!width) { width = 2; }
            var numstr = (num === undefined ? "" : num.toString());
            return "00000".substring(5 - width + numstr.length) + numstr;
        };
        return zeropad(date.getHours()) + ":" + zeropad(date.getMinutes()) + ":" + zeropad(date.getSeconds()) + "." + zeropad(date.getMilliseconds(), 3);
    };

    fluid.isTracing = false;

    fluid.registerNamespace("fluid.tracing");

    fluid.tracing.pathCount = [];

    fluid.tracing.summarisePathCount = function (pathCount) {
        pathCount = pathCount || fluid.tracing.pathCount;
        var togo = {};
        for (var i = 0; i < pathCount.length; ++ i) {
            var path = pathCount[i];
            if (!togo[path]) {
                togo[path] = 1;
            }
            else {
                ++togo[path];
            }
        }
        var toReallyGo = [];
        fluid.each(togo, function (el, path) {
            toReallyGo.push({path: path, count: el});
        });
        toReallyGo.sort(function (a, b) {return b.count - a.count;});
        return toReallyGo;
    };

    fluid.tracing.condensePathCount = function (prefixes, pathCount) {
        prefixes = fluid.makeArray(prefixes);
        var prefixCount = {};
        fluid.each(prefixes, function(prefix) {
            prefixCount[prefix] = 0;
        });
        var togo = [];
        fluid.each(pathCount, function (el) {
            var path = el.path;
            if (!fluid.find(prefixes, function(prefix) {
                if (path.indexOf(prefix) === 0) {
                    prefixCount[prefix] += el.count;
                    return true;
                }
            })) {
                togo.push(el);
            }
        });
        fluid.each(prefixCount, function(count, path) {
            togo.unshift({path: path, count: count});
        });
        return togo;
    };

    // Exception stripping code taken from https://github.com/emwendelin/javascript-stacktrace/blob/master/stacktrace.js
    // BSD licence, see header

    fluid.detectStackStyle = function (e) {
        var style = "other";
        var stackStyle = {
            offset: 0
        };
        if (e["arguments"]) {
            style = "chrome";
        } else if (typeof window !== "undefined" && window.opera && e.stacktrace) {
            style = "opera10";
        } else if (e.stack) {
            style = "firefox";
            // Detect FireFox 4-style stacks which are 1 level less deep
            stackStyle.offset = e.stack.indexOf("Trace exception") === -1? 1 : 0;
        } else if (typeof window !== "undefined" && window.opera && !("stacktrace" in e)) { //Opera 9-
            style = "opera";
        }
        stackStyle.style = style;
        return stackStyle;
    };

    fluid.obtainException = function () {
        try {
            throw new Error("Trace exception");
        }
        catch (e) {
            return e;
        }
    };

    var stackStyle = fluid.detectStackStyle(fluid.obtainException());

    fluid.registerNamespace("fluid.exceptionDecoders");

    fluid.decodeStack = function () {
        if (stackStyle.style !== "firefox") {
            return null;
        }
        var e = fluid.obtainException();
        return fluid.exceptionDecoders[stackStyle.style](e);
    };

    fluid.exceptionDecoders.firefox = function (e) {
        var delimiter = "at ";
        var lines = e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n");
        return fluid.transform(lines, function (line) {
            line = line.replace(/\)/g, "");
            var atind = line.indexOf(delimiter);
            return atind === -1? [line] : [line.substring(atind + delimiter.length), line.substring(0, atind)];
        });
    };

    // Main entry point for callers. 
    fluid.getCallerInfo = function (atDepth) {
        atDepth = (atDepth || 3) - stackStyle.offset;
        var stack = fluid.decodeStack();
        var element = stack && stack[atDepth][0];
        if (element) {
            var lastslash = element.lastIndexOf("/");
            if (lastslash === -1) {
                lastslash = 0;
            }
            var nextColon = element.indexOf(":", lastslash);
            return {
                path: element.substring(0, lastslash),
                filename: element.substring(lastslash + 1, nextColon),
                index: element.substring(nextColon + 1)
            };
        } else {
            return null;
        }
    };

    /** Generates a string for padding purposes by replicating a character a given number of times
     * @param c {Character} A character to be used for padding
     * @param count {Integer} The number of times to repeat the character
     * @return A string of length <code>count</code> consisting of repetitions of the supplied character
     */
    // UNOPTIMISED 
    fluid.generatePadding = function (c, count) {
        var togo = "";
        for (var i = 0; i < count; ++ i) {
            togo += c;
        }
        return togo;
    };
     
    // Marker so that we can render a custom string for properties which are not direct and concrete
    fluid.SYNTHETIC_PROPERTY = {};

    // utility to avoid triggering custom getter code which could throw an exception - e.g. express 3.x's request object 
    fluid.getSafeProperty = function (obj, key) {
        var desc = Object.getOwnPropertyDescriptor(obj, key); // supported on all of our environments - is broken on IE8
        return desc && !desc.get ? obj[key] : fluid.SYNTHETIC_PROPERTY;
    };

    function printImpl (obj, small, options) {
        function out(str) {
            options.output += str;
        }
        var big = small + options.indentChars, isFunction = typeof(obj) === "function";
        if (options.maxRenderChars !== undefined && options.output.length > options.maxRenderChars) {
            return true;
        }
        if (obj === null) {
            out("null");
        } else if (obj === undefined) {
            out("undefined"); // NB - object invalid for JSON interchange
        } else if (obj === fluid.SYNTHETIC_PROPERTY) {
            out("[Synthetic property]");
        } else if (fluid.isPrimitive(obj) && !isFunction) {
            out(JSON.stringify(obj));
        }
        else {
            if (options.stack.indexOf(obj) !== -1) {
                out("(CIRCULAR)"); // NB - object invalid for JSON interchange
                return;
            }
            options.stack.push(obj);
            var i;
            if (fluid.isArrayable(obj)) {
                if (obj.length === 0) {
                    out("[]");
                } else {
                    out("[\n" + big);
                    for (i = 0; i < obj.length; ++ i) {
                        if (printImpl(obj[i], big, options)) {
                            return true;
                        }
                        if (i !== obj.length - 1) {
                            out(",\n" + big);
                        }
                    }
                    out("\n" + small + "]");
                }
            }
            else {
                out("{" + (isFunction ? " Function" : "") + "\n" + big); // NB - Function object invalid for JSON interchange
                var keys = fluid.keys(obj);
                for (i = 0; i < keys.length; ++ i) {
                    var key = keys[i];
                    var value = fluid.getSafeProperty(obj, key);
                    out(JSON.stringify(key) + ": ");
                    if (printImpl(value, big, options)) {
                        return true;
                    }
                    if (i !== keys.length - 1) {
                        out(",\n" + big);
                    }
                }
                out("\n" + small + "}");
            }
            options.stack.pop();
        }
        return;
    }

    /** Render a complex JSON object into a nicely indented format suitable for human readability.
     * @param obj {Object} The object to be rendered
     * @param options {Object} An options structure governing the rendering process. This supports the following options:
     *     <code>indent</code> {Integer} the number of space characters to be used to indent each level of containment (default value: 4)
     *     <code>maxRenderChars</code> {Integer} rendering the object will cease once this number of characters has been generated
     */
    fluid.prettyPrintJSON = function (obj, options) {
        options = $.extend({indent: 4, stack: [], output: ""}, options);
        options.indentChars = fluid.generatePadding(" ", options.indent);
        printImpl(obj, "", options);
        return options.output;
    };

    /**
     * Dumps a DOM element into a readily recognisable form for debugging - produces a
     * "semi-selector" summarising its tag name, class and id, whichever are set.
     *
     * @param {jQueryable} element The element to be dumped
     * @return A string representing the element.
     */
    fluid.dumpEl = function (element) {
        var togo;

        if (!element) {
            return "null";
        }
        if (element.nodeType === 3 || element.nodeType === 8) {
            return "[data: " + element.data + "]";
        }
        if (element.nodeType === 9) {
            return "[document: location " + element.location + "]";
        }
        if (!element.nodeType && fluid.isArrayable(element)) {
            togo = "[";
            for (var i = 0; i < element.length; ++ i) {
                togo += fluid.dumpEl(element[i]);
                if (i < element.length - 1) {
                    togo += ", ";
                }
            }
            return togo + "]";
        }
        element = $(element);
        togo = element.get(0).tagName;
        if (element.id) {
            togo += "#" + element.id;
        }
        if (element.attr("class")) {
            togo += "." + element.attr("class");
        }
        return togo;
    };

})(jQuery, fluid_2_0_0_beta_1);

/*
Copyright 2011-2013 OCAD University
Copyright 2010-2015 Lucendo Development Ltd.

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0_0_beta_1 = fluid_2_0_0_beta_1 || {};

(function ($, fluid) {
    "use strict";
    
    /** NOTE: The contents of this file are by default NOT PART OF THE PUBLIC FLUID API unless explicitly annotated before the function **/

    /** The Fluid "IoC System proper" - resolution of references and
     * completely automated instantiation of declaratively defined
     * component trees */

    // Currently still uses manual traversal - once we ban manually instantiated components,
    // it will use the instantiator's records instead.
    fluid.visitComponentChildren = function (that, visitor, options, segs) {
        segs = segs || [];
        for (var name in that) {
            var component = that[name];
            // This entire algorithm is primitive and expensive and will be removed once we can abolish manual init components
            if (!fluid.isComponent(component) || (options.visited && options.visited[component.id])) {
                continue;
            }
            segs.push(name);
            if (options.visited) { // recall that this is here because we may run into a component that has been cross-injected which might otherwise cause cyclicity
                options.visited[component.id] = true;
            }
            if (visitor(component, name, segs, segs.length - 1)) {
                return true;
            }
            if (!options.flat) {
                fluid.visitComponentChildren(component, visitor, options, segs);
            }
            segs.pop();
        }
    };
    
    fluid.getContextHash = function (instantiator, that) {
        var shadow = instantiator.idToShadow[that.id];
        return shadow && shadow.contextHash;
    };
    
    fluid.componentHasGrade = function (that, gradeName) {
        var contextHash = fluid.getContextHash(fluid.globalInstantiator, that);
        return !!(contextHash && contextHash[gradeName]);
    };
    
    // A variant of fluid.visitComponentChildren that supplies the signature expected for fluid.matchIoCSelector
    // this is: thatStack, contextHashes, memberNames, i - note, the supplied arrays are NOT writeable and shared through the iteration
    fluid.visitComponentsForMatching = function (that, options, visitor) {
        var instantiator = fluid.getInstantiator(that);
        options = $.extend({
            visited: {},
            instantiator: instantiator
        }, options);
        var thatStack = [that];
        var contextHashes = [fluid.getContextHash(instantiator, that)];
        var visitorWrapper = function (component, name, segs) {
            thatStack.length = 1;
            contextHashes.length = 1;
            for (var i = 0; i < segs.length; ++ i) {
                var child = thatStack[i][segs[i]];
                thatStack[i + 1] = child;
                contextHashes[i + 1] = fluid.getContextHash(instantiator, child) || {};
            }
            return visitor(component, thatStack, contextHashes, segs, segs.length);
        };
        fluid.visitComponentChildren(that, visitorWrapper, options, []);
    };

    fluid.getMemberNames = function (instantiator, thatStack) {
        var path = instantiator.idToPath(thatStack[thatStack.length - 1].id);
        var segs = instantiator.parseEL(path);
            // TODO: we should now have no longer shortness in the stack
        segs.unshift.apply(segs, fluid.generate(thatStack.length - segs.length, ""));
        
        return segs;
    };

    // thatStack contains an increasing list of MORE SPECIFIC thats.
    // this visits all components starting from the current location (end of stack)
    // in visibility order UP the tree.
    fluid.visitComponentsForVisibility = function (instantiator, thatStack, visitor, options) {
        options = options || {
            visited: {},
            flat: true,
            instantiator: instantiator
        };
        var memberNames = fluid.getMemberNames(instantiator, thatStack);
        for (var i = thatStack.length - 1; i >= 0; --i) {
            var that = thatStack[i];

            // explicitly visit the direct parent first
            options.visited[that.id] = true;
            if (visitor(that, memberNames[i], memberNames, i)) {
                return;
            }
            
            if (fluid.visitComponentChildren(that, visitor, options, memberNames)) {
                return;
            }
            memberNames.pop();
        }
    };

    fluid.mountStrategy = function (prefix, root, toMount) {
        var offset = prefix.length;
        return function (target, name, i, segs) {
            if (i <= prefix.length) { // Avoid OOB to not trigger deoptimisation!
                return;
            }
            for (var j = 0; j < prefix.length; ++ j) {
                if (segs[j] !== prefix[j]) {
                    return;
                }
            }
            return toMount(target, name, i - prefix.length, segs.slice(offset));
        };
    };

    fluid.invokerFromRecord = function (invokerec, name, that) {
        fluid.pushActivity("makeInvoker", "beginning instantiation of invoker with name %name and record %record as child of %that",
            {name: name, record: invokerec, that: that});
        var invoker = invokerec ? fluid.makeInvoker(that, invokerec, name) : undefined;
        fluid.popActivity();
        return invoker;
    };

    fluid.memberFromRecord = function (memberrecs, name, that) {
        var togo;
        for (var i = 0; i < memberrecs.length; ++ i) { // memberrecs is the special "fluid.mergingArray" type which is not Arrayable
            var expanded = fluid.expandImmediate(memberrecs[i], that);
            if (!fluid.isPlainObject(togo)) { // poor man's "merge" algorithm to hack FLUID-5668 for now
                togo = expanded;
            } else {
                togo = $.extend(true, togo, expanded);
            }
        }
        return togo;
    };

    fluid.recordStrategy = function (that, options, optionsStrategy, recordPath, recordMaker, prefix, exceptions) {
        prefix = prefix || [];
        return {
            strategy: function (target, name, i) {
                if (i !== 1) {
                    return;
                }
                var record = fluid.driveStrategy(options, [recordPath, name], optionsStrategy);
                if (record === undefined) {
                    return;
                }
                fluid.set(target, [name], fluid.inEvaluationMarker);
                var member = recordMaker(record, name, that);
                fluid.set(target, [name], member);
                return member;
            },
            initter: function () {
                var records = fluid.driveStrategy(options, recordPath, optionsStrategy) || {};
                for (var name in records) {
                    if (!exceptions || !exceptions[name]) {
                        fluid.getForComponent(that, prefix.concat([name]));
                    }
                }
            }
        };
    };

    // patch Fluid.js version for timing
    fluid.instantiateFirers = function (that) {
        var shadow = fluid.shadowForComponent(that);
        var initter = fluid.get(shadow, ["eventStrategyBlock", "initter"]) || fluid.identity;
        initter();
    };

    fluid.makeDistributionRecord = function (contextThat, sourceRecord, sourcePath, targetSegs, exclusions, sourceType) {
        sourceType = sourceType || "distribution";

        var source = fluid.copy(fluid.get(sourceRecord, sourcePath));
        fluid.each(exclusions, function (exclusion) {
            fluid.model.applyChangeRequest(source, {segs: exclusion, type: "DELETE"});
        });

        var record = {options: {}};
        fluid.model.applyChangeRequest(record, {segs: targetSegs, type: "ADD", value: source});
        fluid.checkComponentRecord(record);
        return $.extend(record, {contextThat: contextThat, recordType: sourceType});
    };

    // Part of the early "distributeOptions" workflow. Given the description of the blocks to be distributed, assembles "canned" records
    // suitable to be either registered into the shadow record for later or directly pushed to an existing component, as well as honouring
    // any "removeSource" annotations by removing these options from the source block.
    fluid.filterBlocks = function (contextThat, sourceBlocks, sourceSegs, targetSegs, exclusions, removeSource) {
        var togo = [];
        fluid.each(sourceBlocks, function (block) {
            var source = fluid.get(block.source, sourceSegs);
            if (source) {
                togo.push(fluid.makeDistributionRecord(contextThat, block.source, sourceSegs, targetSegs, exclusions, block.recordType));
                var rescued = $.extend({}, source);
                if (removeSource) {
                    fluid.model.applyChangeRequest(block.source, {segs: sourceSegs, type: "DELETE"});
                }
                fluid.each(exclusions, function (exclusion) {
                    var orig = fluid.get(rescued, exclusion);
                    fluid.set(block.source, sourceSegs.concat(exclusion), orig);
                });
            }
        });
        return togo;
    };

    // Use this peculiar signature since the actual component and shadow itself may not exist yet. Perhaps clean up with FLUID-4925
    fluid.noteCollectedDistribution = function (parentShadow, memberName, distribution) {
        fluid.model.setSimple(parentShadow, ["collectedDistributions", memberName, distribution.id], true);
    };

    fluid.isCollectedDistribution = function (parentShadow, memberName, distribution) {
        return fluid.model.getSimple(parentShadow, ["collectedDistributions", memberName, distribution.id]);
    };

    fluid.clearCollectedDistributions = function (parentShadow, memberName) {
        fluid.model.applyChangeRequest(parentShadow, {segs: ["collectedDistributions", memberName], type: "DELETE"});
    };

    fluid.collectDistributions = function (distributedBlocks, parentShadow, distribution, thatStack, contextHashes, memberNames, i) {
        var lastMember = memberNames[memberNames.length - 1];
        if (!fluid.isCollectedDistribution(parentShadow, lastMember, distribution) &&
                fluid.matchIoCSelector(distribution.selector, thatStack, contextHashes, memberNames, i)) {
            distributedBlocks.push.apply(distributedBlocks, distribution.blocks);
            fluid.noteCollectedDistribution(parentShadow, lastMember, distribution);
        }
    };

    // Slightly silly function to clean up the "appliedDistributions" records. In general we need to be much more aggressive both
    // about clearing instantiation garbage (e.g. onCreate and most of the shadow)
    // as well as caching frequently-used records such as the "thatStack" which
    // would mean this function could be written in a sensible way
    fluid.registerCollectedClearer = function (shadow, parentShadow, memberName) {
        if (!shadow.collectedClearer && parentShadow) {
            shadow.collectedClearer = function () {
                fluid.clearCollectedDistributions(parentShadow, memberName);
            };
        }
    };

    fluid.receiveDistributions = function (parentThat, gradeNames, memberName, that) {
        var instantiator = fluid.getInstantiator(parentThat || that);
        var thatStack = instantiator.getThatStack(parentThat || that); // most specific is at end
        thatStack.unshift(fluid.rootComponent);
        var memberNames = fluid.getMemberNames(instantiator, thatStack);
        var shadows = fluid.transform(thatStack, function (thisThat) {
            return instantiator.idToShadow[thisThat.id];
        });
        var parentShadow = shadows[shadows.length - (parentThat ? 1 : 2)];
        var contextHashes = fluid.getMembers(shadows, "contextHash");
        if (parentThat) { // if called before construction of component from assembleCreatorArguments - NB this path will be abolished/amalgamated
            memberNames.push(memberName);
            contextHashes.push(fluid.gradeNamesToHash(gradeNames));
            thatStack.push(that);
        } else {
            fluid.registerCollectedClearer(shadows[shadows.length - 1], parentShadow, memberNames[memberNames.length - 1]);
        }
        var distributedBlocks = [];
        for (var i = 0; i < thatStack.length - 1; ++ i) {
            fluid.each(shadows[i].distributions, function (distribution) {
                fluid.collectDistributions(distributedBlocks, parentShadow, distribution, thatStack, contextHashes, memberNames, i);
            });  /* function in loop */ /* jshint ignore:line */
        }
        return distributedBlocks;
    };
    
    fluid.computeTreeDistance = function (path1, path2) {
        var i = 0;
        while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
            ++i;
        }
        return path1.length + path2.length - 2*i;
    };
    
    // Called from applyDistributions (immediate application route) as well as mergeRecordsToList (pre-instantiation route)
    fluid.computeDistributionPriority = function (targetThat, distributedBlock) {
        if (!distributedBlock.priority) {
            var instantiator = fluid.getInstantiator(targetThat);
            var targetStack = instantiator.getThatStack(targetThat);
            var targetPath = fluid.getMemberNames(instantiator, targetStack);
            var sourceStack = instantiator.getThatStack(distributedBlock.contextThat);
            var sourcePath = fluid.getMemberNames(instantiator, sourceStack);
            var distance = fluid.computeTreeDistance(targetPath, sourcePath);
            distributedBlock.priority = fluid.mergeRecordTypes.distribution + distance;
        }
        return distributedBlock;
    };

    // convert "preBlocks" as produced from fluid.filterBlocks into "real blocks" suitable to be used by the expansion machinery.
    fluid.applyDistributions = function (that, preBlocks, targetShadow) {
        var distributedBlocks = fluid.transform(preBlocks, function (preBlock) {
            return fluid.generateExpandBlock(preBlock, that, targetShadow.mergePolicy);
        }, function (distributedBlock) {
            return fluid.computeDistributionPriority(that, distributedBlock);
        });
        var mergeOptions = targetShadow.mergeOptions;
        mergeOptions.mergeBlocks.push.apply(mergeOptions.mergeBlocks, distributedBlocks);
        mergeOptions.updateBlocks();
        return distributedBlocks;
    };
    
    // TODO: This implementation is obviously poor and has numerous flaws - in particular it does no backtracking as well as matching backwards through the selector
    fluid.matchIoCSelector = function (selector, thatStack, contextHashes, memberNames, i) {
        var thatpos = thatStack.length - 1;
        var selpos = selector.length - 1;
        while (true) {
            var mustMatchHere = thatpos === thatStack.length - 1 || selector[selpos].child;

            var that = thatStack[thatpos];
            var selel = selector[selpos];
            var match = true;
            for (var j = 0; j < selel.predList.length; ++j) {
                var pred = selel.predList[j];
                if (pred.context && !(contextHashes[thatpos][pred.context] || memberNames[thatpos] === pred.context)) {
                    match = false;
                    break;
                }
                if (pred.id && that.id !== pred.id) {
                    match = false;
                    break;
                }
            }
            if (selpos === 0 && thatpos > i && mustMatchHere) {
                match = false; // child selector must exhaust stack completely - FLUID-5029
            }
            if (match) {
                if (selpos === 0) {
                    return true;
                }
                --thatpos;
                --selpos;
            }
            else {
                if (mustMatchHere) {
                    return false;
                }
                else {
                    --thatpos;
                }
            }
            if (thatpos < i) {
                return false;
            }
        }
    };
    
    /** Query for all components matching a selector in a particular tree
     * @param root {Component} The root component at which to start the search
     * @param selector {String} An IoCSS selector, in form of a string. Note that since selectors supplied to this function implicitly
     * match downwards, they need not contain the "head context" followed by whitespace required in the distributeOptions form. E.g.
     * simply <code>"fluid.viewComponent"</code> will match all viewComponents below the root.
     * @param flat {Boolean} [Optional] <code>true</code> if the search should just be performed at top level of the component tree
     * Note that with <code>flat=true</code> this search will scan every component in the tree and may well be very slow.
     */
    // supported, PUBLIC API function 
    fluid.queryIoCSelector = function (root, selector, flat) {
        var parsed = fluid.parseSelector(selector, fluid.IoCSSMatcher);
        var togo = [];

        fluid.visitComponentsForMatching(root, {flat: flat}, function (that, thatStack, contextHashes, memberNames, i) {
            if (fluid.matchIoCSelector(parsed, thatStack, contextHashes, memberNames, i)) {
                togo.push(that);
            }
        });
        return togo;
    };

    fluid.isIoCSSSelector = function (context) {
        return context.indexOf(" ") !== -1; // simple-minded check for an IoCSS reference
    };

    fluid.pushDistributions = function (targetHead, selector, blocks) {
        var targetShadow = fluid.shadowForComponent(targetHead);
        var id = fluid.allocateGuid();
        var distributions = (targetShadow.distributions = targetShadow.distributions || []);
        distributions.push({
            id: id, // This id is used in clearDistributions
            selector: selector,
            blocks: blocks
        });
        return id;
    };

    fluid.clearDistribution = function (targetHead, id) {
        var targetShadow = fluid.shadowForComponent(targetHead);
        fluid.remove_if(targetShadow.distributions, function (distribution) {
            return distribution.id === id;
        });
    };
    
    fluid.clearDistributions = function (shadow) {
        fluid.each(shadow.outDistributions, function (outDist) {
            fluid.clearDistribution(outDist.targetComponent, outDist.distributionId);
        });
    };

    // Modifies a parsed selector to extract and remove its head context which will be matched upwards
    fluid.extractSelectorHead = function (parsedSelector) {
        var predList = parsedSelector[0].predList;
        var context = predList[0].context;
        predList.length = 0;
        return context;
    };
    
    fluid.parseExpectedOptionsPath = function (path, role) {
        var segs = fluid.model.parseEL(path);
        if (segs[0] !== "options") {
            fluid.fail("Error in options distribution path ", path, " - only " + role + " paths beginning with \"options\" are supported");
        }
        return segs.slice(1);
    };
    
    fluid.replicateProperty = function (source, property, targets) {
        if (source[property] !== undefined) {
            fluid.each(targets, function (target) {
                target[property] = source[property];
            });
        }
    };

    fluid.undistributableOptions = ["gradeNames", "distributeOptions", "argumentMap", "initFunction", "mergePolicy", "progressiveCheckerOptions"]; // automatically added to "exclusions" of every distribution

    fluid.distributeOptions = function (that, optionsStrategy) {
        var thatShadow = fluid.shadowForComponent(that);
        var records = fluid.driveStrategy(that.options, "distributeOptions", optionsStrategy);
        fluid.each(records, function (record) {
            var targetRef = fluid.parseContextReference(record.target);
            var targetComp, selector, context;
            if (fluid.isIoCSSSelector(targetRef.context)) {
                selector = fluid.parseSelector(targetRef.context, fluid.IoCSSMatcher);
                var headContext = fluid.extractSelectorHead(selector);
                if (headContext === "/") {
                    targetComp = fluid.rootComponent;
                } else {
                    context = headContext;
                }
            }
            else {
                context = targetRef.context;
            }
            targetComp = targetComp || fluid.resolveContext(context, that);
            if (!targetComp) {
                fluid.fail("Error in options distribution record ", record, " - could not resolve context {"+context+"} to a root component");
            }
            var targetSegs = fluid.model.parseEL(targetRef.path);
            var preBlocks;
            if (record.record !== undefined) {
                preBlocks = [(fluid.makeDistributionRecord(that, record.record, [], targetSegs, []))];
            }
            else {
                var source = fluid.parseContextReference(record.source || "{that}.options"); // TODO: This is probably not a sensible default
                if (source.context !== "that") {
                    fluid.fail("Error in options distribution record ", record, " only a context of {that} is supported");
                }
                var sourceSegs = fluid.parseExpectedOptionsPath(source.path, "source");
                var fullExclusions = fluid.makeArray(record.exclusions).concat(sourceSegs.length === 0 ? fluid.undistributableOptions : []);

                var exclusions = fluid.transform(fullExclusions, function (exclusion) {
                    return fluid.model.parseEL(exclusion);
                });

                preBlocks = fluid.filterBlocks(that, thatShadow.mergeOptions.mergeBlocks, sourceSegs, targetSegs, exclusions, record.removeSource);
                thatShadow.mergeOptions.updateBlocks(); // perhaps unnecessary
            }
            fluid.replicateProperty(record, "priority", preBlocks);
            fluid.replicateProperty(record, "namespace", preBlocks);
            // TODO: inline material has to be expanded in its original context!

            if (selector) {
                var distributionId = fluid.pushDistributions(targetComp, selector, preBlocks);
                thatShadow.outDistributions = thatShadow.outDistributions || [];
                thatShadow.outDistributions.push({
                    targetComponent: targetComp,
                    distributionId: distributionId
                });
            }
            else { // The component exists now, we must rebalance it
                var targetShadow = fluid.shadowForComponent(targetComp);
                fluid.applyDistributions(that, preBlocks, targetShadow);
            }
        });
    };

    fluid.gradeNamesToHash = function (gradeNames) {
        var contextHash = {};
        fluid.each(gradeNames, function (gradeName) {
            contextHash[gradeName] = true;
            contextHash[fluid.computeNickName(gradeName)] = true;
        });
        return contextHash;
    };

    fluid.cacheShadowGrades = function (that, shadow) {
        var contextHash = fluid.gradeNamesToHash(that.options.gradeNames);
        if (!contextHash[shadow.memberName]) {
            contextHash[shadow.memberName] = "memberName"; // This is filtered out again in recordComponent - TODO: Ensure that ALL resolution uses the scope chain eventually
        }
        shadow.contextHash = contextHash;
        fluid.each(contextHash, function (troo, context) {
            shadow.ownScope[context] = that;
            if (shadow.parentShadow && shadow.parentShadow.that.type !== "fluid.rootComponent") {
                shadow.parentShadow.childrenScope[context] = that;
            }
        });
    };

    // First sequence point where the mergeOptions strategy is delivered from Fluid.js - here we take care
    // of both receiving and transmitting options distributions
    fluid.deliverOptionsStrategy = function (that, target, mergeOptions) {
        var shadow = fluid.shadowForComponent(that, shadow);
        fluid.cacheShadowGrades(that, shadow);
        shadow.mergeOptions = mergeOptions;
    };

    fluid.expandDynamicGrades = function (that, shadow, gradeNames, dynamicGrades) {
        var resolved = [];
        // Receive distributions first since these may cause arrival of more contextAwareness blocks.
        // TODO: this closure algorithm is not reliable since we only get one shot at a "function" grade source when
        // really we should perform complete closure over all other sources of options before we try it at the very end - particularly important for contextAwareness
        var distributedBlocks = fluid.receiveDistributions(null, null, null, that);
        if (distributedBlocks.length > 0) {
            var readyBlocks = fluid.applyDistributions(that, distributedBlocks, shadow);
            // rely on the fact that "dirty tricks are not permitted" wrt. resolving gradeNames - each element must be a literal entry or array
            // holding primitive or EL values - otherwise we would have to go all round the houses and reenter the top of fluid.computeDynamicGrades
            var gradeNamesList = fluid.transform(fluid.getMembers(readyBlocks, ["source", "gradeNames"]), fluid.makeArray);
            resolved = resolved.concat.apply(resolved, gradeNamesList);
        }
        fluid.each(dynamicGrades, function (dynamicGrade) {
            var expanded = fluid.expandImmediate(dynamicGrade, that, shadow.localDynamic);
            if (typeof(expanded) === "function") {
                expanded = expanded();
            }
            if (expanded) {
                resolved = resolved.concat(expanded);
            }
        });
        return resolved;
    };

    // Discover further grades that are entailed by the given base typeName and the current total "dynamic grades list" held in the argument "resolved".
    // These are looked up conjointly in the grade registry, and then any further dynamic grades references  
    // are expanded and added into the list and concatenated into "resolved". Additional grades discovered during this function are returned as
    // "furtherResolved".
    fluid.collectDynamicGrades = function (that, shadow, defaultsBlock, gradeNames, dynamicGrades, resolved) {
        var newDefaults = fluid.copy(fluid.getGradedDefaults(that.typeName, resolved));
        gradeNames.length = 0; // acquire derivatives of dynamic grades (FLUID-5054)
        gradeNames.push.apply(gradeNames, newDefaults.gradeNames);

        fluid.cacheShadowGrades(that, shadow);
        // This cheap strategy patches FLUID-5091 for now - some more sophisticated activity will take place
        // at this site when we have a full fix for FLUID-5028
        shadow.mergeOptions.destroyValue(["mergePolicy"]);
        shadow.mergeOptions.destroyValue(["components"]);
        shadow.mergeOptions.destroyValue(["invokers"]);

        defaultsBlock.source = newDefaults;
        shadow.mergeOptions.updateBlocks();
        shadow.mergeOptions.computeMergePolicy(); // TODO: we should really only do this if its content changed - this implies moving all options evaluation over to some (cheap) variety of the ChangeApplier

        var furtherResolved = fluid.remove_if(gradeNames, function (gradeName) {
            return gradeName.charAt(0) === "{" && !fluid.contains(dynamicGrades, gradeName);
        }, []);
        dynamicGrades.push.apply(dynamicGrades, furtherResolved);
        furtherResolved = fluid.expandDynamicGrades(that, shadow, gradeNames, furtherResolved);

        resolved.push.apply(resolved, furtherResolved);

        return furtherResolved;
    };

    fluid.computeDynamicGrades = function (that, shadow, strategy) {
        delete that.options.gradeNames; // Recompute gradeNames for FLUID-5012 and others

        var gradeNames = fluid.driveStrategy(that.options, "gradeNames", strategy);
        // TODO: In complex distribution cases, a component might end up with multiple default blocks
        var defaultsBlock = fluid.findMergeBlocks(shadow.mergeOptions.mergeBlocks, "defaults")[0];
        var dynamicGrades = fluid.remove_if(gradeNames, function (gradeName) {
            return gradeName.charAt(0) === "{" || !fluid.hasGrade(defaultsBlock.target, gradeName);
        }, []);
        var resolved = fluid.expandDynamicGrades(that, shadow, gradeNames, dynamicGrades);
        if (resolved.length !== 0) {
            var furtherResolved;
            do { // repeatedly collect dynamic grades whilst they arrive (FLUID-5155)
                furtherResolved = fluid.collectDynamicGrades(that, shadow, defaultsBlock, gradeNames, dynamicGrades, resolved);
            }
            while (furtherResolved.length !== 0);
        }
        if (shadow.collectedClearer) {
            shadow.collectedClearer();
            delete shadow.collectedClearer;
        }
    };

    fluid.computeDynamicComponentKey = function (recordKey, sourceKey) {
        return recordKey + (sourceKey === 0 ? "" : "-" + sourceKey); // TODO: configurable name strategies
    };

    fluid.registerDynamicRecord = function (that, recordKey, sourceKey, record, toCensor) {
        var key = fluid.computeDynamicComponentKey(recordKey, sourceKey);
        var cRecord = fluid.copy(record);
        delete cRecord[toCensor];
        fluid.set(that.options, ["components", key], cRecord);
        return key;
    };

    fluid.computeDynamicComponents = function (that, mergeOptions) {
        var shadow = fluid.shadowForComponent(that);
        var localSub = shadow.subcomponentLocal = {};
        var records = fluid.driveStrategy(that.options, "dynamicComponents", mergeOptions.strategy);
        fluid.each(records, function (record, recordKey) {
            if (!record.sources && !record.createOnEvent) {
                fluid.fail("Cannot process dynamicComponents record ", record, " without a \"sources\" or \"createOnEvent\" entry");
            }
            if (record.sources) {
                var sources = fluid.expandOptions(record.sources, that);
                fluid.each(sources, function (source, sourceKey) {
                    var key = fluid.registerDynamicRecord(that, recordKey, sourceKey, record, "sources");
                    localSub[key] = {"source": source, "sourcePath": sourceKey};
                });
            }
            else if (record.createOnEvent) {
                var event = fluid.event.expandOneEvent(that, record.createOnEvent);
                fluid.set(shadow, ["dynamicComponentCount", recordKey], 0);
                var listener = function () {
                    var key = fluid.registerDynamicRecord(that, recordKey, shadow.dynamicComponentCount[recordKey]++, record, "createOnEvent");
                    var localRecord = {"arguments": fluid.makeArray(arguments)};
                    fluid.initDependent(that, key, localRecord);
                };
                event.addListener(listener);
                fluid.recordListener(event, listener, shadow);
            }
        });
    };

    // Second sequence point for mergeOptions from Fluid.js - here we construct all further
    // strategies required on the IoC side and mount them into the shadow's getConfig for universal use
    fluid.computeComponentAccessor = function (that, localRecord) {
        var instantiator = fluid.globalInstantiator;
        var shadow = fluid.shadowForComponent(that);
        shadow.localDynamic = localRecord; // for signalling to dynamic grades from dynamic components
        var options = that.options;
        var strategy = shadow.mergeOptions.strategy;
        var optionsStrategy = fluid.mountStrategy(["options"], options, strategy);
        shadow.invokerStrategy = fluid.recordStrategy(that, options, strategy, "invokers", fluid.invokerFromRecord);
        shadow.eventStrategyBlock = fluid.recordStrategy(that, options, strategy, "events", fluid.eventFromRecord, ["events"]);
        var eventStrategy = fluid.mountStrategy(["events"], that, shadow.eventStrategyBlock.strategy, ["events"]);
        shadow.memberStrategy = fluid.recordStrategy(that, options, strategy, "members", fluid.memberFromRecord, null, {model: true, modelRelay: true});
        // NB - ginger strategy handles concrete, rationalise
        shadow.getConfig = {strategies: [fluid.model.funcResolverStrategy, fluid.makeGingerStrategy(that),
            optionsStrategy, shadow.invokerStrategy.strategy, shadow.memberStrategy.strategy, eventStrategy]};

        fluid.computeDynamicGrades(that, shadow, strategy, shadow.mergeOptions.mergeBlocks);
        fluid.distributeOptions(that, strategy);
        if (shadow.contextHash["fluid.resolveRoot"]) {
            var memberName;
            if (shadow.contextHash["fluid.resolveRootSingle"]) {
                var singleRootType = fluid.getForComponent(that, ["options", "singleRootType"]);
                if (!singleRootType) {
                    fluid.fail("Cannot register object with grades " + Object.keys(shadow.contextHash).join(", ") + " as fluid.resolveRootSingle since it has not defined option singleRootType");
                }
                memberName = fluid.typeNameToMemberName(singleRootType);
            } else {
                memberName = fluid.computeGlobalMemberName(that);
            }
            var parent = fluid.resolveRootComponent;
            if (parent[memberName]) {
                instantiator.clearComponent(parent, memberName);
            }
            instantiator.recordKnownComponent(parent, that, memberName, false);
        }

        return shadow.getConfig;
    };

    // About the SHADOW:
    // Allocated at: instantiator's "recordComponent"
    // Contents:
    //     path {String} Principal allocated path (point of construction) in tree
    //     that {Component} The component itself
    //     contextHash {String to Boolean} Map of context names which this component matches
    //     mergePolicy, mergeOptions: Machinery for last phase of options merging
    //     invokerStrategy, eventStrategyBlock, memberStrategy, getConfig: Junk required to operate the accessor
    //     listeners: Listeners registered during this component's construction, to be cleared during clearListeners
    //     distributions, collectedClearer: Managing options distributions
    //     subcomponentLocal: Signalling local record from computeDynamicComponents to assembleCreatorArguments
    //     dynamicLocal: Local signalling for dynamic grades
    
    fluid.shadowForComponent = function (component) {
        var instantiator = fluid.getInstantiator(component);
        return instantiator && component ? instantiator.idToShadow[component.id] : null;
    };

    // Access the member at a particular path in a component, forcing it to be constructed gingerly if necessary
    // supported, PUBLIC API function 
    fluid.getForComponent = function (component, path) {
        var shadow = fluid.shadowForComponent(component);
        var getConfig = shadow ? shadow.getConfig : undefined;
        return fluid.get(component, path, getConfig);
    };

    // An EL segment resolver strategy that will attempt to trigger creation of
    // components that it discovers along the EL path, if they have been defined but not yet
    // constructed.
    fluid.makeGingerStrategy = function (that) {
        var instantiator = fluid.getInstantiator(that);
        return function (component, thisSeg, index, segs) {
            var atval = component[thisSeg];
            if (atval === fluid.inEvaluationMarker && index === segs.length) {
                fluid.fail("Error in component configuration - a circular reference was found during evaluation of path segment \"" + thisSeg +
                    "\": for more details, see the activity records following this message in the console, or issue fluid.setLogging(fluid.logLevel.TRACE) when running your application");
            }
            if (index > 1) {
                return atval;
            }
            if (atval === undefined && component.hasOwnProperty(thisSeg)) { // avoid recomputing properties that have been explicitly evaluated to undefined
                return fluid.NO_VALUE;
            }
            if (atval === undefined) { // pick up components in instantiation here - we can cut this branch by attaching early
                var parentPath = instantiator.idToShadow[component.id].path;
                var childPath = instantiator.composePath(parentPath, thisSeg);
                atval = instantiator.pathToComponent[childPath];
            }
            if (atval === undefined) {
                // TODO: This check is very expensive - once gingerness is stable, we ought to be able to
                // eagerly compute and cache the value of options.components - check is also incorrect and will miss injections
                var subRecord = fluid.getForComponent(component, ["options", "components", thisSeg]);
                if (subRecord) {
                    if (subRecord.createOnEvent) {
                        fluid.fail("Error resolving path segment \"" + thisSeg + "\" of path " + segs.join(".") + " since component with record ", subRecord,
                            " has annotation \"createOnEvent\" - this very likely represents an implementation error. Either alter the reference so it does not " +
                            " match this component, or alter your workflow to ensure that the component is instantiated by the time this reference resolves");
                    }
                    fluid.initDependent(component, thisSeg);
                    atval = component[thisSeg];
                }
            }
            return atval;
        };
    };
    
    // Listed in dependence order
    fluid.frameworkGrades = ["fluid.component", "fluid.modelComponent", "fluid.viewComponent", "fluid.rendererComponent"];
        
    fluid.filterBuiltinGrades = function (gradeNames) {
        return fluid.remove_if(fluid.makeArray(gradeNames), function (gradeName) {
            return fluid.frameworkGrades.indexOf(gradeName) !== -1;
        });
    };

    fluid.dumpGradeNames = function (that) {
        return that.options && that.options.gradeNames ?
            " gradeNames: " + JSON.stringify(fluid.filterBuiltinGrades(that.options.gradeNames)) : "";
    };

    fluid.dumpThat = function (that) {
        return "{ typeName: \"" + that.typeName + "\"" + fluid.dumpGradeNames(that) + " id: " + that.id + "}";
    };

    fluid.dumpThatStack = function (thatStack, instantiator) {
        var togo = fluid.transform(thatStack, function(that) {
            var path = instantiator.idToPath(that.id);
            return fluid.dumpThat(that) + (path? (" - path: " + path) : "");
        });
        return togo.join("\n");
    };

    fluid.resolveContext = function (context, that, fast) {
        if (context === "that") {
            return that;
        }
        var foundComponent;
        var instantiator = fluid.globalInstantiator; // fluid.getInstantiator(that); // this hash lookup takes over 1us!
        if (fast) {
            var shadow = instantiator.idToShadow[that.id];
            return shadow.ownScope[context];
        } else {
            var thatStack = instantiator.getFullStack(that);
            fluid.visitComponentsForVisibility(instantiator, thatStack, function (component, name) {
                var shadow = fluid.shadowForComponent(component);
                // TODO: Some components, e.g. the static environment and typeTags do not have a shadow, which slows us down here
                if (context === name || shadow && shadow.contextHash && shadow.contextHash[context] || context === component.typeName) {
                    foundComponent = component;
                    return true; // YOUR VISIT IS AT AN END!!
                }
                if (fluid.getForComponent(component, ["options", "components", context]) && !component[context]) {
      // This is an expensive guess since we make it for every component up the stack - must apply the WAVE OF EXPLOSIONS (FLUID-4925) to discover all components first
      // This line attempts a hopeful construction of components that could be guessed by nickname through finding them unconstructed
      // in options. In the near future we should eagerly BEGIN the process of constructing components, discovering their
      // types and then attaching them to the tree VERY EARLY so that we get consistent results from different strategies.
                    foundComponent = fluid.getForComponent(component, context);
                    return true;
                }
            });
            return foundComponent;
        }
    };
    
    fluid.makeStackFetcher = function (parentThat, localRecord, fast) {
        var fetcher = function (parsed) {
            if (parentThat && parentThat.lifecycleStatus === "destroyed") {
                fluid.fail("Cannot resolve reference " + fluid.renderContextReference(parsed) + " from component " + fluid.dumpThat(parentThat) + " which has been destroyed");
            }
            var context = parsed.context;
            if (localRecord && context in localRecord) {
                return fluid.get(localRecord[context], parsed.path);
            }
            var foundComponent = fluid.resolveContext(context, parentThat, fast);
            if (!foundComponent && parsed.path !== "") {
                var ref = fluid.renderContextReference(parsed);
                fluid.fail("Failed to resolve reference " + ref + " - could not match context with name " +
                    context + " from component " + fluid.dumpThat(parentThat), parentThat);
            }
            return fluid.getForComponent(foundComponent, parsed.path);
        };
        return fetcher;
    };

    fluid.makeStackResolverOptions = function (parentThat, localRecord, fast) {
        return $.extend(fluid.copy(fluid.rawDefaults("fluid.makeExpandOptions")), {
            localRecord: localRecord || {},
            fetcher: fluid.makeStackFetcher(parentThat, localRecord, fast),
            contextThat: parentThat,
            exceptions: {members: {model: true, modelRelay: true}}
        });
    };

    fluid.clearListeners = function (shadow) {
        // TODO: bug here - "afterDestroy" listeners will be unregistered already unless they come from this component
        fluid.each(shadow.listeners, function (rec) {
            rec.event.removeListener(rec.listenerId || rec.listener);
        });
        delete shadow.listeners;
    };

    fluid.recordListener = function (event, listener, shadow, listenerId) {
        if (event.ownerId !== shadow.that.id) { // don't bother recording listeners registered from this component itself
            var listeners = shadow.listeners;
            if (!listeners) {
                listeners = shadow.listeners = [];
            }
            listeners.push({event: event, listener: listener, listenerId: listenerId});
        }
    };
    
    fluid.constructScopeObjects = function (instantiator, parent, child, childShadow) {
        var parentShadow = parent ? instantiator.idToShadow[parent.id] : null;
        childShadow.childrenScope = parentShadow ? Object.create(parentShadow.ownScope) : {};
        childShadow.ownScope = Object.create(childShadow.childrenScope);
        childShadow.parentShadow = parentShadow;
    };
    
    fluid.clearChildrenScope = function (instantiator, parentShadow, child, childShadow) {
        fluid.each(childShadow.contextHash, function (troo, context) {
            if (parentShadow.childrenScope[context] === child) {
                delete parentShadow.childrenScope[context]; // TODO: ambiguous resolution
            }
        });
    };

    // unsupported, non-API function - however, this structure is of considerable interest to those debugging
    // into IoC issues. The structures idToShadow and pathToComponent contain a complete map of the component tree
    // forming the surrounding scope
    fluid.instantiator = function () {
        var that = fluid.typeTag("instantiator");
        $.extend(that, {
            lifecycleStatus: "constructed",
            pathToComponent: {},
            idToShadow: {},
            modelTransactions: {init: {}}, // a map of transaction id to map of component id to records of components enlisted in a current model initialisation transaction
            composePath: fluid.model.composePath, // For speed, we declare that no component's name may contain a period
            composeSegments: fluid.model.composeSegments,
            parseEL: fluid.model.parseEL,
            events: {
                onComponentAttach: fluid.makeEventFirer({name: "instantiator's onComponentAttach event"}),
                onComponentClear: fluid.makeEventFirer({name: "instantiator's onComponentClear event"})
            }
        });
        // TODO: this API can shortly be removed
        that.idToPath = function (id) {
            var shadow = that.idToShadow[id];
            return shadow ? shadow.path : "";
        };
        // Note - the returned stack is assumed writeable and does not include the root
        that.getThatStack = function (component) {
            var shadow = that.idToShadow[component.id];
            if (shadow) {
                var path = shadow.path;
                var parsed = that.parseEL(path);
                var root = that.pathToComponent[""], togo = [];
                for (var i = 0; i < parsed.length; ++ i) {
                    root = root[parsed[i]];
                    togo.push(root);
                }
                return togo;
            }
            else { return [];}
        };
        that.getFullStack = function (component) {
            var thatStack = component? that.getThatStack(component) : [];
            thatStack.unshift(fluid.resolveRootComponent);
            return thatStack;
        };
        function recordComponent(parent, component, path, name, created) {
            var shadow;
            if (created) {
                shadow = that.idToShadow[component.id] = {};
                shadow.that = component;
                shadow.path = path;
                shadow.memberName = name;
                fluid.constructScopeObjects(that, parent, component, shadow);
            } else {
                shadow = that.idToShadow[component.id];
                shadow.injectedPaths = shadow.injectedPaths || [];
                shadow.injectedPaths.push(path);
                var parentShadow = that.idToShadow[parent.id]; // structural parent shadow - e.g. resolveRootComponent
                var keys = fluid.keys(shadow.contextHash);
                keys.push(name); // add local name - FLUID-5696
                fluid.remove_if(keys, function (key) {
                    return shadow.contextHash && shadow.contextHash[key] === "memberName";
                });
                fluid.each(keys, function (context) {
                    if (!parentShadow.childrenScope[context]) {
                        parentShadow.childrenScope[context] = component;
                    }
                });
            }
            if (that.pathToComponent[path]) {
                fluid.fail("Error during instantiation - path " + path + " which has just created component " + fluid.dumpThat(component) +
                    " has already been used for component " + fluid.dumpThat(that.pathToComponent[path]) + " - this is a circular instantiation or other oversight." +
                    " Please clear the component using instantiator.clearComponent() before reusing the path.");
            }
            that.pathToComponent[path] = component;
        }
        that.recordRoot = function (component) {
            recordComponent(null, component, "", "", true);
        };
        that.recordKnownComponent = function (parent, component, name, created) {
            parent[name] = component;
            if (fluid.isComponent(component) || component.type === "instantiator") {
                var parentPath = that.idToShadow[parent.id].path;
                var path = that.composePath(parentPath, name);
                recordComponent(parent, component, path, name, created);
                that.events.onComponentAttach.fire(component, path, that, created);
            } else {
                fluid.fail("Cannot record non-component with value ", component, " at path \"" + name + "\" of parent ", parent);
            }
        };
        that.clearComponent = function (component, name, child, options, noModTree, path) {
            // options are visitor options for recursive driving
            var shadow = that.idToShadow[component.id];
            // use flat recursion since we want to use our own recursion rather than rely on "visited" records
            options = options || {flat: true, instantiator: that};
            child = child || component[name];
            path = path || shadow.path;
            if (path === undefined) {
                fluid.fail("Cannot clear component " + name + " from component ", component,
                    " which was not created by this instantiator");
            }

            var childPath = that.composePath(path, name);
            var childShadow = that.idToShadow[child.id];
            var created = childShadow.path === childPath;
            that.events.onComponentClear.fire(child, childPath, component, created);

            // only recurse on components which were created in place - if the id record disagrees with the
            // recurse path, it must have been injected
            if (created) {
                // Clear injected instance of this component from all other paths - historically we didn't bother
                // to do this since injecting into a shorter scope is an error - but now we have resolveRoot area
                fluid.each(childShadow.injectedPaths, function (injectedPath) {
                    var parentPath = fluid.model.getToTailPath(injectedPath);
                    var otherParent = that.pathToComponent[parentPath];
                    that.clearComponent(otherParent, fluid.model.getTailPath(injectedPath), child);
                });
                fluid.visitComponentChildren(child, function(gchild, gchildname, segs, i) {
                    var parentPath = that.composeSegments.apply(null, segs.slice(0, i));
                    that.clearComponent(child, gchildname, null, options, true, parentPath);
                }, options, that.parseEL(childPath));
                fluid.doDestroy(child, name, component);
                fluid.clearDistributions(childShadow);
                fluid.clearListeners(childShadow);
                child.events.afterDestroy.fire(child, name, component);
                delete that.idToShadow[child.id];
            }
            fluid.clearChildrenScope(that, shadow, child, childShadow);
            delete that.pathToComponent[childPath];
            if (!noModTree) {
                delete component[name]; // there may be no entry - if creation is not concluded
            }
        };
        return that;
    };

    // The global instantiator, holding all components instantiated in this context (instance of Infusion)
    fluid.globalInstantiator = fluid.instantiator();
    
    // Look up the globally registered instantiator for a particular component - we now only really support a
    // single, global instantiator, but this method is left as a notation point in case this ever reverts
    fluid.getInstantiator = function (component) {
        var instantiator = fluid.globalInstantiator;
        return component && instantiator.idToShadow[component.id] ? instantiator : null;
    };
    
    // The grade supplied to components which will be resolvable from all parts of the component tree
    fluid.defaults("fluid.resolveRoot");
    // In addition to being resolvable at the root, "resolveRootSingle" component will have just a single instance available. Fresh
    // instances will displace older ones.
    fluid.defaults("fluid.resolveRootSingle", {
        gradeNames: "fluid.resolveRoot"
    });
    
    fluid.constructRootComponents = function (instantiator) {
        // Instantiate the primordial components at the root of each context tree
        fluid.rootComponent = instantiator.rootComponent = fluid.typeTag("fluid.rootComponent");
        instantiator.recordRoot(fluid.rootComponent);
        
        // The component which for convenience holds injected instances of all components with fluid.resolveRoot grade
        fluid.resolveRootComponent = instantiator.resolveRootComponent = fluid.typeTag("fluid.resolveRootComponent");
        instantiator.recordKnownComponent(fluid.rootComponent, fluid.resolveRootComponent, "resolveRootComponent", true);
      
        // obliterate resolveRoot's scope objects and replace by the real root scope - which is unused by its own children 
        var rootShadow = instantiator.idToShadow[fluid.rootComponent.id];
        var resolveRootShadow = instantiator.idToShadow[fluid.resolveRootComponent.id];
        resolveRootShadow.ownScope = rootShadow.ownScope;
        resolveRootShadow.childrenScope = rootShadow.childrenScope;
        
        instantiator.recordKnownComponent(fluid.resolveRootComponent, instantiator, "instantiator", true); // needs to have a shadow so it can be injected
        resolveRootShadow.childrenScope.instantiator = instantiator; // needs to be mounted since it never passes through cacheShadowGrades
    };
    
    fluid.constructRootComponents(fluid.globalInstantiator); // currently a singleton - in future, alternative instantiators might come back

    /** Expand a set of component options either immediately, or with deferred effect.
     *  The current policy is to expand immediately function arguments within fluid.assembleCreatorArguments which are not the main options of a
     *  component. The component's own options take <code>{defer: true}</code> as part of
     *  <code>outerExpandOptions</code> which produces an "expandOptions" structure holding the "strategy" and "initter" pattern
     *  common to ginger participants.
     *  Probably not to be advertised as part of a public API, but is considerably more stable than most of the rest
     *  of the IoC API structure especially with respect to the first arguments.
     */

// TODO: Can we move outerExpandOptions to 2nd place? only user of 3 and 4 is fluid.makeExpandBlock
    fluid.expandOptions = function (args, that, mergePolicy, localRecord, outerExpandOptions) {
        if (!args) {
            return args;
        }
        fluid.pushActivity("expandOptions", "expanding options %args for component %that ", {that: that, args: args});
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord);
        expandOptions.mergePolicy = mergePolicy;
        var expanded = outerExpandOptions && outerExpandOptions.defer ?
            fluid.makeExpandOptions(args, expandOptions) : fluid.expand(args, expandOptions);
        fluid.popActivity();
        return expanded;
    };

    fluid.localRecordExpected = fluid.arrayToHash(["type", "options", "container", "createOnEvent", "priority", "recordType"]); // last element unavoidably polluting

    fluid.checkComponentRecord = function (localRecord) {
        fluid.each(localRecord, function (value, key) {
            if (!fluid.localRecordExpected[key]) {
                fluid.fail("Probable error in subcomponent record ", localRecord, " - key \"" + key +
                    "\" found, where the only legal options are " +
                    fluid.keys(fluid.localRecordExpected).join(", "));
            }
        });
    };

    fluid.mergeRecordsToList = function (that, mergeRecords) {
        var list = [];
        fluid.each(mergeRecords, function (value, key) {
            value.recordType = key;
            if (key === "distributions") {
                list.push.apply(list, fluid.transform(value, function (distributedBlock) {
                    return fluid.computeDistributionPriority(that, distributedBlock);
                }));
            }
            else {
                if (!value.options) { return; }
                value.priority = fluid.mergeRecordTypes[key];
                if (value.priority === undefined) {
                    fluid.fail("Merge record with unrecognised type " + key + ": ", value);
                }
                list.push(value);
            }
        });
        return list;
    };

    // TODO: overall efficiency could huge be improved by resorting to the hated PROTOTYPALISM as an optimisation
    // for this mergePolicy which occurs in every component. Although it is a deep structure, the root keys are all we need
    var addPolicyBuiltins = function (policy) {
        fluid.each(["gradeNames", "mergePolicy", "argumentMap", "components", "dynamicComponents", "events", "listeners", "modelListeners", "distributeOptions", "transformOptions"], function (key) {
            fluid.set(policy, [key, "*", "noexpand"], true);
        });
        return policy;
    };

    // used from Fluid.js
    fluid.generateExpandBlock = function (record, that, mergePolicy, localRecord) {
        var expanded = fluid.expandOptions(record.options, record.contextThat || that, mergePolicy, localRecord, {defer: true});
        expanded.priority = record.priority;
        expanded.namespace = record.namespace;
        expanded.recordType = record.recordType;
        return expanded;
    };

    var expandComponentOptionsImpl = function (mergePolicy, defaults, initRecord, that) {
        var defaultCopy = fluid.copy(defaults);
        addPolicyBuiltins(mergePolicy);
        var shadow = fluid.shadowForComponent(that);
        shadow.mergePolicy = mergePolicy;
        var mergeRecords = {
            defaults: {options: defaultCopy}
        };

        $.extend(mergeRecords, initRecord.mergeRecords);
        // Do this here for gradeless components that were corrected by "localOptions"
        if (mergeRecords.subcomponentRecord) {
            fluid.checkComponentRecord(mergeRecords.subcomponentRecord);
        }
        
        var expandList = fluid.mergeRecordsToList(that, mergeRecords);

        var togo = fluid.transform(expandList, function (value) {
            return fluid.generateExpandBlock(value, that, mergePolicy, initRecord.localRecord);
        });
        return togo;
    };

    fluid.fabricateDestroyMethod = function (that, name, instantiator, child) {
        return function () {
            instantiator.clearComponent(that, name, child);
        };
    };
    
    // Computes a name for a component appearing at the global root which is globally unique, from its nickName and id
    fluid.computeGlobalMemberName = function (that) {
        var nickName = fluid.computeNickName(that.typeName);
        return nickName + "-" + that.id;
    };
    
    // Maps a type name to the member name to be used for it at a particular path level where it is intended to be unique
    // Note that "." is still not supported within a member name
    // supported, PUBLIC API function
    fluid.typeNameToMemberName = function (typeName) {
        return typeName.replace(/\./g, "_");
    };

    // This is the initial entry point from the non-IoC side reporting the first presence of a new component - called from fluid.mergeComponentOptions
    fluid.expandComponentOptions = function (mergePolicy, defaults, userOptions, that) {
        var initRecord = userOptions; // might have been tunnelled through "userOptions" from "assembleCreatorArguments"
        var instantiator = userOptions && userOptions.marker === fluid.EXPAND ? userOptions.instantiator : null;
        if (!instantiator) { // it is a top-level component which needs to be attached to the global root
            instantiator = fluid.globalInstantiator;
            initRecord = { // upgrade "userOptions" to the same format produced by fluid.assembleCreatorArguments via the subcomponent route
                mergeRecords: {user: {options: fluid.expandCompact(userOptions, true)}},
                memberName: fluid.computeGlobalMemberName(that),
                instantiator: instantiator,
                parentThat: fluid.rootComponent
            };
        }
        that.destroy = fluid.fabricateDestroyMethod(initRecord.parentThat, initRecord.memberName, instantiator, that);
        fluid.pushActivity("expandComponentOptions", "expanding component options %options with record %record for component %that",
            {options: fluid.get(initRecord.mergeRecords, "user.options"), record: initRecord, that: that});
            
        instantiator.recordKnownComponent(initRecord.parentThat, that, initRecord.memberName, true);
        var togo = expandComponentOptionsImpl(mergePolicy, defaults, initRecord, that);
        
        fluid.popActivity();
        return togo;
    };

    /** Given a typeName, determine the final concrete
     * "invocation specification" consisting of a concrete global function name
     * and argument list which is suitable to be executed directly by fluid.invokeGlobalFunction.
     */
    // options is just a disposition record containing memberName, componentRecord
    fluid.assembleCreatorArguments = function (parentThat, typeName, options) {
        var upDefaults = fluid.defaults(typeName); // we're not responsive to dynamic changes in argMap, but we don't believe in these anyway
        if (!upDefaults || !upDefaults.argumentMap) {
            fluid.fail("Error in assembleCreatorArguments: cannot look up component type name " + typeName + " to a component creator grade with an argumentMap");
        }

        var fakeThat = {}; // fake "that" for receiveDistributions since we try to match selectors before creation for FLUID-5013
        var distributions = parentThat ? fluid.receiveDistributions(parentThat, upDefaults.gradeNames, options.memberName, fakeThat) : [];

        var localDynamic = options.localDynamic;
        var localRecord = $.extend({}, fluid.censorKeys(options.componentRecord, ["type"]), localDynamic);
 
        var argMap = upDefaults.argumentMap;
        var findKeys = Object.keys(argMap).concat(["type"]);

        fluid.each(findKeys, function (name) {
            for (var i = 0; i < distributions.length; ++ i) { // Apply non-options material from distributions (FLUID-5013)
                if (distributions[i][name] !== undefined) {
                    localRecord[name] = distributions[i][name];
                }
            }
        });
        typeName = localRecord.type || typeName;
        
        delete localRecord.type;
        delete localRecord.options;

        var mergeRecords = {distributions: distributions};

        if (options.componentRecord !== undefined) {
            // Deliberately put too many things here so they can be checked in expandComponentOptions (FLUID-4285)
            mergeRecords.subcomponentRecord = $.extend({}, options.componentRecord);
        }
        var args = [];
        fluid.each(argMap, function (index, name) {
            var arg;
            if (name === "options") {
                arg = {marker: fluid.EXPAND,
                           localRecord: localDynamic,
                           mergeRecords: mergeRecords,
                           instantiator: fluid.getInstantiator(parentThat),
                           parentThat: parentThat,
                           memberName: options.memberName};
            } else {
                var value = localRecord[name];
                arg = fluid.expandImmediate(value, parentThat, localRecord);
            }
            args[index] = arg;
        });

        var togo = {
            args: args,
            funcName: typeName
        };
        return togo;
    };

    /** Instantiate the subcomponent with the supplied name of the supplied top-level component. Although this method
     * is published as part of the Fluid API, it should not be called by general users and may not remain stable. It is
     * currently the only mechanism provided for instantiating components whose definitions are dynamic, and will be
     * replaced in time by dedicated declarative framework described by FLUID-5022.
     * @param that {Component} the parent component for which the subcomponent is to be instantiated
     * @param name {String} the name of the component - the index of the options block which configures it as part of the
     * <code>components</code> section of its parent's options
     */
    fluid.initDependent = function (that, name, localRecord) {
        if (that[name]) { return; } // TODO: move this into strategy
        var component = that.options.components[name];
        fluid.pushActivity("initDependent", "instantiating dependent component with name \"%name\" with record %record as child of %parent",
            {name: name, record: component, parent: that});
        var instance;
        var instantiator = fluid.globalInstantiator;
        var shadow = instantiator.idToShadow[that.id];
        var localDynamic = localRecord || shadow.subcomponentLocal && shadow.subcomponentLocal[name];

        if (typeof(component) === "string") {
            that[name] = fluid.inEvaluationMarker;
            instance = fluid.expandImmediate(component, that);
            if (instance) {
                instantiator.recordKnownComponent(that, instance, name, false);
            } else {
                delete that[name];
            }
        }
        else if (component.type) {
            var type = fluid.expandImmediate(component.type, that, localDynamic);
            if (!type) {
                fluid.fail("Error in subcomponent record: ", component.type, " could not be resolved to a type for component ", name,
                    " of parent ", that);
            }
            var invokeSpec = fluid.assembleCreatorArguments(that, type, {componentRecord: component, memberName: name, localDynamic: localDynamic});
            instance = fluid.initSubcomponentImpl(that, {type: invokeSpec.funcName}, invokeSpec.args);
        }
        else {
            fluid.fail("Unrecognised material in place of subcomponent " + name + " - no \"type\" field found");
        }
        fluid.popActivity();
        return instance;
    };

    fluid.bindDeferredComponent = function (that, componentName, component) {
        var events = fluid.makeArray(component.createOnEvent);
        fluid.each(events, function(eventName) {
            var event = eventName.charAt(0) === "{" ? fluid.expandOptions(eventName, that) : that.events[eventName];
            if (!event || !event.addListener) {
                fluid.fail("Error instantiating createOnEvent component with name " + componentName + " of parent ", that, " since event specification " +
                    eventName + " could not be expanded to an event - got ", event);
            }
            event.addListener(function () {
                fluid.pushActivity("initDeferred", "instantiating deferred component %componentName of parent %that due to event %eventName",
                 {componentName: componentName, that: that, eventName: eventName});
                if (that[componentName]) {
                    fluid.globalInstantiator.clearComponent(that, componentName);
                }
                fluid.initDependent(that, componentName);
                fluid.popActivity();
            }, null, component.priority);
        });
    };

    fluid.priorityForComponent = function (component) {
        return component.priority? component.priority :
            (component.type === "fluid.typeFount" || fluid.hasGrade(fluid.defaults(component.type), "fluid.typeFount"))?
            "first" : undefined;
    };

    fluid.initDependents = function (that) {
        fluid.pushActivity("initDependents", "instantiating dependent components for component %that", {that: that});
        var shadow = fluid.shadowForComponent(that);
        shadow.memberStrategy.initter();
        shadow.invokerStrategy.initter();

        fluid.getForComponent(that, "modelRelay");
        fluid.getForComponent(that, "model"); // trigger this as late as possible - but must be before components so that child component has model on its onCreate

        var options = that.options;
        var components = options.components || {};
        var componentSort = [];

        fluid.each(components, function (component, name) {
            if (!component.createOnEvent) {
                var priority = fluid.priorityForComponent(component);
                componentSort.push({namespace: name, priority: fluid.parsePriority(priority)});
            }
            else {
                fluid.bindDeferredComponent(that, name, component);
            }
        });
        fluid.sortByPriority(componentSort);
        fluid.each(componentSort, function (entry) {
            fluid.initDependent(that, entry.namespace);
        });
        if (shadow.subcomponentLocal) {
            fluid.clear(shadow.subcomponentLocal); // still need repo for event-driven dynamic components - abolish these in time
        }

        fluid.popActivity();
    };

    
    /** BEGIN NEXUS METHODS **/
    
    fluid.pathForComponent = function (component, instantiator) {
        instantiator = instantiator || fluid.getInstantiator(component);
        var shadow = instantiator.idToShadow[component.id];
        if (!shadow) {
            fluid.fail("Cannot get path for ", component, " which is not a component");
        }
        return instantiator.parseEL(shadow.path);
    };
    
    /** Construct a component with the supplied options at the specified path in the component tree. The parent path of the location must already be a component.
     * @param path {String|Array of String} Path where the new component is to be constructed, represented as a string or array of segments
     * @param options {Object} Top-level options supplied to the component - must at the very least include a field <code>type</code> holding the component's type 
     * @param instantiator {Instantiator} [optional] The instantiator holding the component to be created - if blank, the global instantiator will be used
     */
    fluid.construct = function (path, options, instantiator) {
        var record = fluid.destroy(path, instantiator);
        // TODO: We must construct a more principled scheme for designating child components than this - especially once options become immutable
        fluid.set(record.parent, ["options", "components", record.memberName], {
            type: options.type,
            options: options
        });
        return fluid.initDependent(record.parent, record.memberName);
    };

    /** Destroys a component held at the specified path. The parent path must represent a component, although the component itself may be nonexistent
     * @param path {String|Array of String} Path where the new component is to be destroyed, represented as a string or array of segments
     * @param instantiator {Instantiator} [optional] The instantiator holding the component to be destroyed - if blank, the global instantiator will be used
     */
    fluid.destroy = function (path, instantiator) {
        instantiator = instantiator || fluid.globalInstantiator;
        var segs = fluid.model.parseToSegments(path, instantiator.parseEL, true);
        if (segs.length === 0) {
            fluid.fail("Cannot destroy the root component");
        }
        var memberName = segs.pop(), parentPath = instantiator.composeSegments.apply(null, segs);
        var parent = instantiator.pathToComponent[parentPath];
        if (!parent) {
            fluid.fail("Cannot modify component with nonexistent parent at path ", path);
        }
        if (parent[memberName]) {
            parent[memberName].destroy();
        }
        return {
            parent: parent,
            memberName: memberName
        };
    };
    
    /** END NEXUS METHODS **/
    
    /** BEGIN IOC DEBUGGING METHODS **/
    fluid["debugger"] = function () {
        /* jshint ignore:start */
        debugger;
        /* jshint ignore:end */
    };
    
    fluid.defaults("fluid.debuggingProbe", {
        gradeNames: ["fluid.component"]
    });
    
    // probe looks like:
    // target: {preview other}.listeners.eventName
    // priority: first/last
    // func: console.log/fluid.log/fluid.debugger
    fluid.probeToDistribution = function (probe) {
        var instantiator = fluid.globalInstantiator;
        var parsed = fluid.parseContextReference(probe.target);
        var segs = fluid.model.parseToSegments(parsed.path, instantiator.parseEL, true);
        if (segs[0] !== "options") {
            segs.unshift("options"); // compensate for this insanity until we have the great options flattening
        }
        var parsedPriority = fluid.parsePriority(probe.priority);
        if (parsedPriority.constraint && !parsedPriority.constraint.target) {
            parsedPriority.constraint.target = "authoring";
        }
        return {
            target: "{/ " + parsed.context + "}." + instantiator.composeSegments.apply(null, segs),
            record: {
                func: probe.func,
                funcName: probe.funcName,
                args: probe.args,
                priority: fluid.renderPriority(parsedPriority)
            }
        };
    };
    
    fluid.registerProbes = function (probes) {
        var probeDistribution = fluid.transform(probes, fluid.probeToDistribution);
        var memberName = "fluid_debuggingProbe_" + fluid.allocateGuid();
        fluid.construct([memberName], {
            type: "fluid.debuggingProbe",
            distributeOptions: probeDistribution
        });
        return memberName;
    };
    
    fluid.deregisterProbes = function (probeName) {
        fluid.destroy([probeName]);
    };
    
    /** END IOC DEBUGGING METHODS **/

    fluid.thisistToApplicable = function (record, recthis, that) {
        return {
            apply: function (noThis, args) {
                // Resolve this material late, to deal with cases where the target has only just been brought into existence
                // (e.g. a jQuery target for rendered material) - TODO: Possibly implement cached versions of these as we might do for invokers
                var resolvedThis = fluid.expandOptions(recthis, that);
                if (typeof(resolvedThis) === "string") {
                    resolvedThis = fluid.getGlobalValue(resolvedThis);
                }
                if (!resolvedThis) {
                    fluid.fail("Could not resolve reference " + recthis + " to a value");
                }
                var resolvedFunc = resolvedThis[record.method];
                if (typeof(resolvedFunc) !== "function") {
                    fluid.fail("Object ", resolvedThis, " at reference " + recthis + " has no member named " + record.method + " which is a function ");
                }
                fluid.log("Applying arguments ", args, " to method " + record.method + " of instance ", resolvedThis);
                return resolvedFunc.apply(resolvedThis, args);
            }
        };
    };

    fluid.changeToApplicable = function (record, that) {
        return {
            apply: function (noThis, args) {
                var parsed = fluid.parseValidModelReference(that, "changePath listener record", record.changePath);
                var value = fluid.expandOptions(record.value, that, {}, {"arguments": args});
                fluid.fireSourcedChange(parsed.applier, parsed.path, value, record.source);
            }
        };
    };

    // Convert "exotic records" into an applicable form ("this/method" for FLUID-4878 or "changePath" for FLUID-3674)
    fluid.recordToApplicable = function (record, that) {
        if (record.changePath) {
            return fluid.changeToApplicable(record, that);
        }
        var recthis = record["this"];
        if (record.method ^ recthis) {
            fluid.fail("Record ", that, " must contain both entries \"method\" and \"this\" if it contains either");
        }
        return record.method ? fluid.thisistToApplicable(record, recthis, that) : null;
    };
    
    fluid.getGlobalValueNonComponent = function (funcName, context) { // TODO: Guard this in listeners as well
        var defaults = fluid.defaults(funcName);
        if (defaults && fluid.hasGrade(defaults, "fluid.component")) {
            fluid.fail("Error in function specification - cannot invoke function " + funcName + " in the context of " + context + ": component creator functions can only be used as subcomponents");
        }
        return fluid.getGlobalValue(funcName);
    };

    fluid.makeInvoker = function (that, invokerec, name) {
        invokerec = fluid.upgradePrimitiveFunc(invokerec); // shorthand case for direct function invokers (FLUID-4926)
        if (invokerec.args !== undefined && invokerec.args !== fluid.NO_VALUE && !fluid.isArrayable(invokerec.args)) {
            invokerec.args = fluid.makeArray(invokerec.args);
        }
        var func = fluid.recordToApplicable(invokerec, that);
        var invokePre = fluid.preExpand(invokerec.args);
        var localRecord = {};
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord, true);
        func = func || (invokerec.funcName? fluid.getGlobalValueNonComponent(invokerec.funcName, "an invoker") : fluid.expandImmediate(invokerec.func, that));
        if (!func || !func.apply) {
            fluid.fail("Error in invoker record: could not resolve members func, funcName or method to a function implementation - got " + func + " from ", invokerec);
        } else if (func === fluid.notImplemented) {
            fluid.fail("Error constructing component ", that, " - the invoker named " + name + " which was defined in grade " + invokerec.componentSource + " needs to be overridden with a concrete implementation");
        }
        return function invokeInvoker () {
            if (fluid.defeatLogging === false) {
                fluid.pushActivity("invokeInvoker", "invoking invoker with name %name and record %record from component %that", {name: name, record: invokerec, that: that});
            }
            var togo, finalArgs;
            localRecord["arguments"] = arguments;
            if (invokerec.args === undefined || invokerec.args === fluid.NO_VALUE) {
                finalArgs = arguments;
            } else {
                fluid.expandImmediateImpl(invokePre, expandOptions);
                finalArgs = invokePre.source;
            }
            togo = func.apply(null, finalArgs);
            if (fluid.defeatLogging === false) {
                fluid.popActivity();
            }
            return togo;
        };
    };

    // weird higher-order function so that we can staightforwardly dispatch original args back onto listener
    fluid.event.makeTrackedListenerAdder = function (source) {
        var shadow = fluid.shadowForComponent(source);
        return function (event) {
            return {addListener: function (listener, namespace, priority, softNamespace, listenerId) {
                    fluid.recordListener(event, listener, shadow, listenerId);
                    event.addListener.apply(null, arguments);
                }
            };
        };
    };

    fluid.event.listenerEngine = function (eventSpec, callback, adder) {
        var argstruc = {};
        function checkFire() {
            var notall = fluid.find(eventSpec, function(value, key) {
                if (argstruc[key] === undefined) {
                    return true;
                }
            });
            if (!notall) {
                var oldstruc = argstruc;
                argstruc = {}; // guard against the case the callback perversely fires one of its prerequisites (FLUID-5112)
                callback(oldstruc);
            }
        }
        fluid.each(eventSpec, function (event, eventName) {
            adder(event).addListener(function () {
                argstruc[eventName] = fluid.makeArray(arguments);
                checkFire();
            });
        });
    };

    fluid.event.dispatchListener = function (that, listener, eventName, eventSpec, indirectArgs) {
        if (eventSpec.args !== undefined && eventSpec.args !== fluid.NO_VALUE && !fluid.isArrayable(eventSpec.args)) {
            eventSpec.args = fluid.makeArray(eventSpec.args);
        }
        listener = fluid.event.resolveListener(listener); // In theory this optimisation is too aggressive if global name is not defined yet
        var dispatchPre = fluid.preExpand(eventSpec.args);
        var localRecord = {};
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord, true);
        var togo = function () {
            if (fluid.defeatLogging === false) {
                fluid.pushActivity("dispatchListener", "firing to listener to event named %eventName of component %that",
                    {eventName: eventName, that: that});
            }

            var args = indirectArgs ? arguments[0] : arguments, finalArgs;
            localRecord["arguments"] = args;
            if (eventSpec.args !== undefined && eventSpec.args !== fluid.NO_VALUE) {
                fluid.expandImmediateImpl(dispatchPre, expandOptions);
                finalArgs = dispatchPre.source;
            } else {
                finalArgs = args;
            }
            var togo = listener.apply(null, finalArgs);
            if (fluid.defeatLogging === false) {
                fluid.popActivity();
            }
            return togo;
        };
        fluid.event.impersonateListener(listener, togo); // still necessary for FLUID-5254 even though framework's listeners now get explicit guids
        return togo;
    };

    fluid.event.resolveSoftNamespace = function (key) {
        if (typeof(key) !== "string") {
            return null;
        } else {
            var lastpos = Math.max(key.lastIndexOf("."), key.lastIndexOf("}"));
            return key.substring(lastpos + 1);
        }
    };

    fluid.event.resolveListenerRecord = function (lisrec, that, eventName, namespace, standard) {
        var badRec = function (record, extra) {
            fluid.fail("Error in listener record - could not resolve reference ", record, " to a listener or firer. " +
                "Did you miss out \"events.\" when referring to an event firer?" + extra);
        };
        fluid.pushActivity("resolveListenerRecord", "resolving listener record for event named %eventName for component %that",
            {eventName: eventName, that: that});
        var records = fluid.makeArray(lisrec);
        var transRecs = fluid.transform(records, function (record) {
            // TODO: FLUID-5242 fix - we copy here since distributeOptions does not copy options blocks that it distributes and we can hence corrupt them.
            // need to clarify policy on options sharing - for slightly better efficiency, copy should happen during distribution and not here
            var expanded = fluid.isPrimitive(record) || record.expander ? {listener: record} : fluid.copy(record);
            var methodist = fluid.recordToApplicable(record, that);
            if (methodist) {
                expanded.listener = methodist;
            }
            else {
                expanded.listener = expanded.listener || expanded.func || expanded.funcName;
            }
            if (!expanded.listener) {
                badRec(record, " Listener record must contain a member named \"listener\", \"func\", \"funcName\" or \"method\"");
            }
            var softNamespace = record.method ?
                fluid.event.resolveSoftNamespace(record["this"]) + "." + record.method :
                fluid.event.resolveSoftNamespace(expanded.listener);
            if (!expanded.namespace && !namespace && softNamespace) {
                expanded.softNamespace = true;
                expanded.namespace = (record.componentSource ? record.componentSource : that.typeName) + "." + softNamespace;
            }
            var listener = expanded.listener = fluid.expandOptions(expanded.listener, that);
            if (!listener) {
                badRec(record, "");
            }
            var firer = false;
            if (listener.typeName === "fluid.event.firer") {
                listener = listener.fire;
                firer = true;
            }
            expanded.listener = (standard && (expanded.args && listener !== "fluid.notImplemented" || firer)) ? fluid.event.dispatchListener(that, listener, eventName, expanded) : listener;
            expanded.listenerId = fluid.allocateGuid();
            return expanded;
        });
        var togo = {
            records: transRecs,
            adderWrapper: standard ? fluid.event.makeTrackedListenerAdder(that) : null
        };
        fluid.popActivity();
        return togo;
    };

    fluid.event.expandOneEvent = function (that, event) {
        var origin;
        if (typeof(event) === "string" && event.charAt(0) !== "{") {
            // Shorthand for resolving onto our own events, but with GINGER WORLD!
            origin = fluid.getForComponent(that, ["events", event]);
        }
        else {
            origin = fluid.expandOptions(event, that);
        }
        if (!origin || origin.typeName !== "fluid.event.firer") {
            fluid.fail("Error in event specification - could not resolve base event reference ", event, " to an event firer: got ", origin);
        }
        return origin;
    };

    fluid.event.expandEvents = function (that, event) {
        return typeof(event) === "string" ?
            fluid.event.expandOneEvent(that, event) :
            fluid.transform(event, function (oneEvent) {
                return fluid.event.expandOneEvent(that, oneEvent);
            });
    };

    fluid.event.resolveEvent = function (that, eventName, eventSpec) {
        fluid.pushActivity("resolveEvent", "resolving event with name %eventName attached to component %that",
            {eventName: eventName, that: that});
        var adder = fluid.event.makeTrackedListenerAdder(that);
        if (typeof(eventSpec) === "string") {
            eventSpec = {event: eventSpec};
        }
        var event = eventSpec.typeName === "fluid.event.firer" ? eventSpec : eventSpec.event || eventSpec.events;
        if (!event) {
            fluid.fail("Event specification for event with name " + eventName + " does not include a base event specification: ", eventSpec);
        }

        var origin = event.typeName === "fluid.event.firer" ? event : fluid.event.expandEvents(that, event);

        var isMultiple = origin.typeName !== "fluid.event.firer";
        var isComposite = eventSpec.args || isMultiple;
        // If "event" is not composite, we want to share the listener list and FIRE method with the original
        // If "event" is composite, we need to create a new firer. "composite" includes case where any boiling
        // occurred - this was implemented wrongly in 1.4.
        var firer;
        if (isComposite) {
            firer = fluid.makeEventFirer({name: " [composite] " + fluid.event.nameEvent(that, eventName)});
            var dispatcher = fluid.event.dispatchListener(that, firer.fire, eventName, eventSpec, isMultiple);
            if (isMultiple) {
                fluid.event.listenerEngine(origin, dispatcher, adder);
            }
            else {
                adder(origin).addListener(dispatcher);
            }
        }
        else {
            firer = {typeName: "fluid.event.firer"};
            firer.fire = function () {
                var outerArgs = fluid.makeArray(arguments);
                fluid.pushActivity("fireSynthetic", "firing synthetic event %eventName ", {eventName: eventName});
                var togo = origin.fire.apply(null, outerArgs);
                fluid.popActivity();
                return togo;
            };
            firer.addListener = function (listener, namespace, priority, softNamespace, listenerId) {
                var dispatcher = fluid.event.dispatchListener(that, listener, eventName, eventSpec);
                adder(origin).addListener(dispatcher, namespace, priority, softNamespace, listenerId);
            };
            firer.removeListener = function (listener) {
                origin.removeListener(listener);
            };
        }
        fluid.popActivity();
        return firer;
    };

    /** BEGIN unofficial IoC material **/
    // The following three functions are unsupported ane only used in the renderer expander.
    // The material they produce is no longer recognised for component resolution.

    fluid.withEnvironment = function (envAdd, func, root) {
        root = root || fluid.globalThreadLocal();
        try {
            for (var key in envAdd) {
                root[key] = envAdd[key];
            }
            $.extend(root, envAdd);
            return func();
        } finally {
            for (var key in envAdd) { /* jshint ignore:line */ /* duplicate "key" */
                delete root[key]; // TODO: users may want a recursive "scoping" model
            }
        }
    };

    fluid.fetchContextReference = function (parsed, directModel, env, elResolver, externalFetcher) {
        // The "elResolver" is a hack to make certain common idioms in protoTrees work correctly, where a contextualised EL
        // path actually resolves onto a further EL reference rather than directly onto a value target
        if (elResolver) {
            parsed = elResolver(parsed, env);
        }
        var base = parsed.context? env[parsed.context] : directModel;
        if (!base) {
            var resolveExternal = externalFetcher && externalFetcher(parsed);
            return resolveExternal || base;
        }
        return parsed.noDereference? parsed.path : fluid.get(base, parsed.path);
    };

    fluid.makeEnvironmentFetcher = function (directModel, elResolver, envGetter, externalFetcher) {
        envGetter = envGetter || fluid.globalThreadLocal;
        return function(parsed) {
            var env = envGetter();
            return fluid.fetchContextReference(parsed, directModel, env, elResolver, externalFetcher);
        };
    };

    /** END of unofficial IoC material **/
    
    /* Compact expansion machinery - for short form invoker and expander references such as @expand:func(arg) and func(arg) */

    fluid.coerceToPrimitive = function (string) {
        return string === "false" ? false : (string === "true" ? true :
            (isFinite(string) ? Number(string) : string));
    };

    fluid.compactStringToRec = function (string, type) {
        var openPos = string.indexOf("(");
        var closePos = string.indexOf(")");
        if (openPos === -1 ^ closePos === -1 || openPos > closePos) {
            fluid.fail("Badly-formed compact " + type + " record without matching parentheses: ", string);
        }
        if (openPos !== -1 && closePos !== -1) {
            var trail = string.substring(closePos + 1);
            if ($.trim(trail) !== "") {
                fluid.fail("Badly-formed compact " + type + " - unexpected material following close parenthesis: " + trail);
            }
            var prefix = string.substring(0, openPos);
            var body = string.substring(openPos + 1, closePos);
            var args = fluid.transform(body.split(","), $.trim, fluid.coerceToPrimitive);
            var togo = fluid.upgradePrimitiveFunc(prefix, null);
            togo.args = args;
            return togo;
        }
        else if (type === "expander") {
            fluid.fail("Badly-formed compact expander record without parentheses: ", string);
        }
        return string;
    };

    fluid.expandPrefix = "@expand:";

    fluid.expandCompactString = function (string, active) {
        var rec = string;
        if (string.indexOf(fluid.expandPrefix) === 0) {
            var rem = string.substring(fluid.expandPrefix.length);
            rec = {
                expander: fluid.compactStringToRec(rem, "expander")
            };
        }
        else if (active) {
            rec = fluid.compactStringToRec(string, active);
        }
        return rec;
    };

    var singularPenRecord = {
        listeners: "listener",
        modelListeners: "modelListener"
    };

    var singularRecord = $.extend({
        invokers: "invoker"
    }, singularPenRecord);

    fluid.expandCompactRec = function (segs, target, source) {
        fluid.guardCircularExpansion(segs, segs.length);
        var pen = segs.length > 0 ? segs[segs.length - 1] : "";
        var active = singularRecord[pen];
        if (!active && segs.length > 1) {
            active = singularPenRecord[segs[segs.length - 2]]; // support array of listeners and modelListeners
        }
        fluid.each(source, function (value, key) {
            if (fluid.isPlainObject(value)) {
                target[key] = fluid.freshContainer(value);
                segs.push(key);
                fluid.expandCompactRec(segs, target[key], value);
                segs.pop();
                return;
            }
            else if (typeof(value) === "string") {
                value = fluid.expandCompactString(value, active);
            }
            target[key] = value;
        });
    };

    fluid.expandCompact = function (options) {
        var togo = {};
        fluid.expandCompactRec([], togo, options);
        return togo;
    };
    
    /** End compact record expansion machinery **/
    
    fluid.isIoCReference = function (ref) {
        return typeof(ref) === "string" && ref.charAt(0) === "{" && ref.indexOf("}") > 0;
    };

    fluid.extractEL = function (string, options) {
        if (options.ELstyle === "ALL") {
            return string;
        }
        else if (options.ELstyle.length === 1) {
            if (string.charAt(0) === options.ELstyle) {
                return string.substring(1);
            }
        }
        else if (options.ELstyle === "${}") {
            var i1 = string.indexOf("${");
            var i2 = string.lastIndexOf("}");
            if (i1 === 0 && i2 !== -1) {
                return string.substring(2, i2);
            }
        }
    };

    fluid.extractELWithContext = function (string, options) {
        var EL = fluid.extractEL(string, options);
        if (fluid.isIoCReference(EL)) {
            return fluid.parseContextReference(EL);
        }
        return EL? {path: EL} : EL;
    };

    fluid.parseContextReference = function (reference, index, delimiter) {
        index = index || 0;
        var endcpos = reference.indexOf("}", index + 1);
        if (endcpos === -1) {
            fluid.fail("Cannot parse context reference \"" + reference + "\": Malformed context reference without }");
        }
        var context = reference.substring(index + 1, endcpos);
        var endpos = delimiter? reference.indexOf(delimiter, endcpos + 1) : reference.length;
        var path = reference.substring(endcpos + 1, endpos);
        if (path.charAt(0) === ".") {
            path = path.substring(1);
        }
        return {context: context, path: path, endpos: endpos};
    };

    fluid.renderContextReference = function (parsed) {
        return "{" + parsed.context + "}" + (parsed.path ? "." + parsed.path : "");
    };
    
    // TODO: Once we eliminate expandSource, all of this tree of functions can be hived off to RendererUtilities
    fluid.resolveContextValue = function (string, options) {
        function fetch(parsed) {
            fluid.pushActivity("resolveContextValue", "resolving context value %string", {string: string});
            var togo = options.fetcher(parsed);
            fluid.pushActivity("resolvedContextValue", "resolved value %string to value %value", {string: string, value: togo});
            fluid.popActivity(2);
            return togo;
        }
        var parsed;
        if (options.bareContextRefs && fluid.isIoCReference(string)) {
            parsed = fluid.parseContextReference(string);
            return fetch(parsed);
        }
        else if (options.ELstyle && options.ELstyle !== "${}") {
            parsed = fluid.extractELWithContext(string, options);
            if (parsed) {
                return fetch(parsed);
            }
        }
        while (typeof(string) === "string") {
            var i1 = string.indexOf("${");
            var i2 = string.indexOf("}", i1 + 2);
            if (i1 !== -1 && i2 !== -1) {
                if (string.charAt(i1 + 2) === "{") {
                    parsed = fluid.parseContextReference(string, i1 + 2, "}");
                    i2 = parsed.endpos;
                }
                else {
                    parsed = {path: string.substring(i1 + 2, i2)};
                }
                var subs = fetch(parsed);
                var all = (i1 === 0 && i2 === string.length - 1);
                // TODO: test case for all undefined substitution
                if (subs === undefined || subs === null) {
                    return subs;
                }
                string = all? subs : string.substring(0, i1) + subs + string.substring(i2 + 1);
            }
            else {
                break;
            }
        }
        return string;
    };

    // This function appears somewhat reusable, but not entirely - it probably needs to be packaged
    // along with the particular "strategy". Very similar to the old "filter"... the "outer driver" needs
    // to execute it to get the first recursion going at top level. This was one of the most odd results
    // of the reorganisation, since the "old work" seemed much more naturally expressed in terms of values
    // and what happened to them. The "new work" is expressed in terms of paths and how to move amongst them.
    fluid.fetchExpandChildren = function (target, i, segs, source, mergePolicy, options) {
        if (source.expander) { // possible expander at top level
            var expanded = fluid.expandExpander(target, source, options);
            if (fluid.isPrimitive(expanded) || fluid.isDOMish(expanded) || !fluid.isPlainObject(expanded) || (fluid.isArrayable(expanded) ^ fluid.isArrayable(target))) {
                return expanded;
            }
            else { // make an attempt to preserve the root reference if possible
                $.extend(true, target, expanded);
            }
        }
        // NOTE! This expects that RHS is concrete! For material input to "expansion" this happens to be the case, but is not
        // true for other algorithms. Inconsistently, this algorithm uses "sourceStrategy" below. In fact, this "fetchChildren"
        // operation looks like it is a fundamental primitive of the system. We do call "deliverer" early which enables correct
        // reference to parent nodes up the tree - however, anyone processing a tree IN THE CHAIN requires that it is produced
        // concretely at the point STRATEGY returns. Which in fact it is...............
        fluid.each(source, function (newSource, key) {
            if (newSource === undefined) {
                target[key] = undefined; // avoid ever dispatching to ourselves with undefined source
            }
            else if (key !== "expander") {
                segs[i] = key;
                if (fluid.getImmediate(options.exceptions, segs, i) !== true) {
                    options.strategy(target, key, i + 1, segs, source, mergePolicy);
                }
            }
        });
        return target;
    };

    // TODO: This method is unnecessary and will quadratic inefficiency if RHS block is not concrete.
    // The driver should detect "homogeneous uni-strategy trundling" and agree to preserve the extra
    // "cursor arguments" which should be advertised somehow (at least their number)
    function regenerateCursor (source, segs, limit, sourceStrategy) {
        for (var i = 0; i < limit; ++ i) {
            // copy segs to avoid aliasing with FLUID-5243
            source = sourceStrategy(source, segs[i], i, fluid.makeArray(segs));
        }
        return source;
    }

    fluid.isUnexpandable = function (source) { // slightly more efficient compound of fluid.isCopyable and fluid.isComponent - review performance
        return fluid.isPrimitive(source) || !fluid.isPlainObject(source);
    };

    fluid.expandSource = function (options, target, i, segs, deliverer, source, policy, recurse) {
        var expanded, isTrunk;
        var thisPolicy = fluid.derefMergePolicy(policy);
        if (typeof (source) === "string" && !thisPolicy.noexpand) {
            if (!options.defaultEL || source.charAt(0) === "{") { // hard-code this for performance
                fluid.pushActivity("expandContextValue", "expanding context value %source held at path %path", {source: source, path: fluid.path.apply(null, segs.slice(0, i))});
                expanded = fluid.resolveContextValue(source, options);
                fluid.popActivity(1);
            } else {
                expanded = source;
            }
        }
        else if (thisPolicy.noexpand || fluid.isUnexpandable(source)) {
            expanded = source;
        }
        else if (source.expander) {
            expanded = fluid.expandExpander(deliverer, source, options);
        }
        else {
            expanded = fluid.freshContainer(source);
            isTrunk = true;
        }
        if (expanded !== fluid.NO_VALUE) {
            deliverer(expanded);
        }
        if (isTrunk) {
            recurse(expanded, source, i, segs, policy);
        }
        return expanded;
    };
    
    fluid.guardCircularExpansion = function (segs, i) {
        if (i > fluid.strategyRecursionBailout) {
            fluid.fail("Overflow/circularity in options expansion, current path is ", segs, " at depth " , i, " - please ensure options are not circularly connected, or protect from expansion using the \"noexpand\" policy or expander");
        }
    };

    fluid.makeExpandStrategy = function (options) {
        var recurse = function (target, source, i, segs, policy) {
            return fluid.fetchExpandChildren(target, i || 0, segs || [], source, policy, options);
        };
        var strategy = function (target, name, i, segs, source, policy) {
            fluid.guardCircularExpansion(segs, i);
            if (!target) {
                return;
            }
            if (target.hasOwnProperty(name)) { // bail out if our work has already been done
                return target[name];
            }
            if (source === undefined) { // recover our state in case this is an external entry point
                source = regenerateCursor(options.source, segs, i - 1, options.sourceStrategy);
                policy = regenerateCursor(options.mergePolicy, segs, i - 1, fluid.concreteTrundler);
            }
            var thisSource = options.sourceStrategy(source, name, i, segs);
            var thisPolicy = fluid.concreteTrundler(policy, name);
            function deliverer(value) {
                target[name] = value;
            }
            return fluid.expandSource(options, target, i, segs, deliverer, thisSource, thisPolicy, recurse);
        };
        options.recurse = recurse;
        options.strategy = strategy;
        return strategy;
    };

    fluid.defaults("fluid.makeExpandOptions", {
        ELstyle:          "${}",
        bareContextRefs:  true,
        target:           fluid.inCreationMarker
    });

    fluid.makeExpandOptions = function (source, options) {
        options = $.extend({}, fluid.rawDefaults("fluid.makeExpandOptions"), options);
        options.defaultEL = options.ELStyle === "${}" && options.bareContextRefs; // optimisation to help expander
        options.expandSource = function (source) {
            return fluid.expandSource(options, null, 0, [], fluid.identity, source, options.mergePolicy, false);
        };
        if (!fluid.isUnexpandable(source)) {
            options.source = source;
            options.target = fluid.freshContainer(source);
            options.sourceStrategy = options.sourceStrategy || fluid.concreteTrundler;
            fluid.makeExpandStrategy(options);
            options.initter = function () {
                options.target = fluid.fetchExpandChildren(options.target, 0, [], options.source, options.mergePolicy, options);
            };
        }
        else { // these init immediately since we must deliver a valid root target
            options.strategy = fluid.concreteTrundler;
            options.initter = fluid.identity;
            if (typeof(source) === "string") {
                options.target = options.expandSource(source);
            }
            else {
                options.target = source;
            }
        }
        return options;
    };

    // supported, PUBLIC API function
    fluid.expand = function (source, options) {
        var expandOptions = fluid.makeExpandOptions(source, options);
        expandOptions.initter();
        return expandOptions.target;
    };
    
    fluid.preExpandRecurse = function (root, source, holder, member, rootSegs) { // on entry, holder[member] = source
        fluid.guardCircularExpansion(rootSegs, rootSegs.length);
        function pushExpander(expander) {
            root.expanders.push({expander: expander, holder: holder, member: member});
            delete holder[member];
        }
        if (fluid.isIoCReference(source)) {
            var parsed = fluid.parseContextReference(source);
            var segs = fluid.model.parseEL(parsed.path);
            pushExpander({
                typeFunc: fluid.expander.fetch,
                context: parsed.context,
                segs: segs
            });
        } else if (fluid.isPlainObject(source)) {
            if (source.expander) {
                source.expander.typeFunc = fluid.getGlobalValue(source.expander.type || "fluid.invokeFunc");
                pushExpander(source.expander);
            } else {
                fluid.each(source, function (value, key) {
                    rootSegs.push(key);
                    fluid.preExpandRecurse(root, value, source, key, rootSegs);
                    rootSegs.pop();
                });
            }
        }
    };
    
    fluid.preExpand = function (source) {
        var root = {
            expanders: [],
            source: fluid.isUnexpandable(source) ? source : fluid.copy(source)
        };
        fluid.preExpandRecurse(root, root.source, root, "source", []);
        return root;
    };
    
    // Main pathway for freestanding material that is not part of a component's options
    fluid.expandImmediate = function (source, that, localRecord) {
        var options = fluid.makeStackResolverOptions(that, localRecord, true); // TODO: ELstyle and target are now ignored
        var root = fluid.preExpand(source);
        fluid.expandImmediateImpl(root, options);
        return root.source;
    };
    
    // High performance expander for situations such as invokers, listeners, where raw materials can be cached - consumes "root" structure produced by preExpand
    fluid.expandImmediateImpl = function (root, options) {
        var expanders = root.expanders;
        for (var i = 0; i < expanders.length; ++ i) {
            var expander = expanders[i];
            expander.holder[expander.member] = expander.expander.typeFunc(null, expander, options);
        }
    };

    fluid.expandExpander = function (deliverer, source, options) {
        var expander = fluid.getGlobalValue(source.expander.type || "fluid.invokeFunc");
        if (!expander) {
            fluid.fail("Unknown expander with type " + source.expander.type);
        }
        return expander(deliverer, source, options);
    };

    fluid.registerNamespace("fluid.expander");
    
    fluid.expander.fetch = function (deliverer, source, options) {
        var localRecord = options.localRecord, context = source.expander.context, segs = source.expander.segs;
        var inLocal = localRecord[context] !== undefined;
        // somewhat hack to anticipate "fits" for FLUID-4925 - we assume that if THIS component is in construction, its reference target might be too
        var component = inLocal ? localRecord[context] : fluid.resolveContext(context, options.contextThat, options.contextThat.lifecycleStatus === "constructed");
        if (component) {
            var root = component;
            if (inLocal || component.lifecycleStatus === "constructed") {
                for (var i = 0; i < segs.length; ++ i) {
                    root = root ? root[segs[i]] : undefined;
                }
            } else if (component.lifecycleStatus !== "destroyed") {
                root = fluid.getForComponent(component, segs);
            } else {
                fluid.fail("Cannot resolve path " + segs.join(".") + " into component ", component, " which has been destroyed");
            }
            if (root === undefined && !inLocal) { // last-ditch attempt to get exotic EL value from component
                root = fluid.getForComponent(component, segs);
            }
            return root;
        }
    };

    /** "light" expanders, starting with the default expander invokeFunc,
         which makes an arbitrary function call (after expanding arguments) and are then replaced in
         the configuration with the call results. These will probably be abolished and replaced with
         equivalent model transformation machinery **/

    // This one is now positioned as the "universal expander" - default if no type supplied
    fluid.invokeFunc = function (deliverer, source, options) {
        var expander = source.expander;
        var args = fluid.makeArray(expander.args);
        expander.args = args; // head off case where args is an EL reference which resolves to an array
        if (options.recurse) { // only available in the path from fluid.expandOptions - this will be abolished in the end
            args = options.recurse([], args);
        } else {
            expander = fluid.expandImmediate(expander, options.contextThat, options.localRecord);
            args = expander.args;
        }
        var funcEntry = expander.func || expander.funcName;
        var func = (options.expandSource ? options.expandSource(funcEntry) : funcEntry) || fluid.recordToApplicable(expander, options.contextThat);
        if (!func) {
            fluid.fail("Error in expander record - " + funcEntry + " could not be resolved to a function for component ", options.contextThat);
        }
        return func.apply ? func.apply(null, args) : fluid.invokeGlobalFunction(func, args);
    };

    // The "noexpand" expander which simply unwraps one level of expansion and ceases.
    fluid.noexpand = function (deliverer, source) {
        return source.expander.value ? source.expander.value : source.expander.tree;
    };

})(jQuery, fluid_2_0_0_beta_1);

/*
Copyright 2008-2010 University of Cambridge
Copyright 2008-2009 University of Toronto
Copyright 2010-2011 Lucendo Development Ltd.
Copyright 2010-2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0_0_beta_1 = fluid_2_0_0_beta_1 || {};

(function ($, fluid) {
    "use strict";

    /** NOTE: The contents of this file are by default NOT PART OF THE PUBLIC FLUID API unless explicitly annotated before the function **/

    /** MODEL ACCESSOR ENGINE **/

    /** Standard strategies for resolving path segments **/

    fluid.model.makeEnvironmentStrategy = function (environment) {
        return function (root, segment, index) {
            return index === 0 && environment[segment] ?
                environment[segment] : undefined;
        };
    };

    fluid.model.defaultCreatorStrategy = function (root, segment) {
        if (root[segment] === undefined) {
            root[segment] = {};
            return root[segment];
        }
    };

    fluid.model.defaultFetchStrategy = function (root, segment) {
        return root[segment];
    };

    fluid.model.funcResolverStrategy = function (root, segment) {
        if (root.resolvePathSegment) {
            return root.resolvePathSegment(segment);
        }
    };

    fluid.model.traverseWithStrategy = function (root, segs, initPos, config, uncess) {
        var strategies = config.strategies;
        var limit = segs.length - uncess;
        for (var i = initPos; i < limit; ++i) {
            if (!root) {
                return root;
            }
            var accepted;
            for (var j = 0; j < strategies.length; ++ j) {
                accepted = strategies[j](root, segs[i], i + 1, segs);
                if (accepted !== undefined) {
                    break; // May now short-circuit with stateless strategies
                }
            }
            if (accepted === fluid.NO_VALUE) {
                accepted = undefined;
            }
            root = accepted;
        }
        return root;
    };

    /** Returns both the value and the path of the value held at the supplied EL path **/
    fluid.model.getValueAndSegments = function (root, EL, config, initSegs) {
        return fluid.model.accessWithStrategy(root, EL, fluid.NO_VALUE, config, initSegs, true);
    };

    // Very lightweight remnant of trundler, only used in resolvers
    fluid.model.makeTrundler = function (config) {
        return function (valueSeg, EL) {
            return fluid.model.getValueAndSegments(valueSeg.root, EL, config, valueSeg.segs);
        };
    };

    fluid.model.getWithStrategy = function (root, EL, config, initSegs) {
        return fluid.model.accessWithStrategy(root, EL, fluid.NO_VALUE, config, initSegs);
    };

    fluid.model.setWithStrategy = function (root, EL, newValue, config, initSegs) {
        fluid.model.accessWithStrategy(root, EL, newValue, config, initSegs);
    };

    fluid.model.accessWithStrategy = function (root, EL, newValue, config, initSegs, returnSegs) {
        // This function is written in this unfortunate style largely for efficiency reasons. In many cases
        // it should be capable of running with 0 allocations (EL is preparsed, initSegs is empty)
        if (!fluid.isPrimitive(EL) && !fluid.isArrayable(EL)) {
            var key = EL.type || "default";
            var resolver = config.resolvers[key];
            if (!resolver) {
                fluid.fail("Unable to find resolver of type " + key);
            }
            var trundler = fluid.model.makeTrundler(config); // very lightweight trundler for resolvers
            var valueSeg = {root: root, segs: initSegs};
            valueSeg = resolver(valueSeg, EL, trundler);
            if (EL.path && valueSeg) { // every resolver supports this piece of output resolution
                valueSeg = trundler(valueSeg, EL.path);
            }
            return returnSegs ? valueSeg : (valueSeg ? valueSeg.root : undefined);
        }
        else {
            return fluid.model.accessImpl(root, EL, newValue, config, initSegs, returnSegs, fluid.model.traverseWithStrategy);
        }
    };

    // Implementation notes: The EL path manipulation utilities here are equivalents of the simpler ones
    // that are provided in Fluid.js and elsewhere - they apply escaping rules to parse characters .
    // as \. and \ as \\ - allowing us to process member names containing periods. These versions are mostly 
    // in use within model machinery, whereas the cheaper versions based on String.split(".") are mostly used
    // within the IoC machinery.
    // Performance testing in early 2015 suggests that modern browsers now allow these to execute slightly faster
    // than the equivalent machinery written using complex regexps - therefore they will continue to be maintained
    // here. However, there is still a significant performance gap with respect to the performance of String.split(".")
    // especially on Chrome, so we will continue to insist that component member names do not contain a "." character
    // for the time being.
    // See http://jsperf.com/parsing-escaped-el for some experiments

    fluid.registerNamespace("fluid.pathUtil");

    fluid.pathUtil.getPathSegmentImpl = function (accept, path, i) {
        var segment = null;
        if (accept) {
            segment = "";
        }
        var escaped = false;
        var limit = path.length;
        for (; i < limit; ++i) {
            var c = path.charAt(i);
            if (!escaped) {
                if (c === ".") {
                    break;
                }
                else if (c === "\\") {
                    escaped = true;
                }
                else if (segment !== null) {
                    segment += c;
                }
            }
            else {
                escaped = false;
                if (segment !== null) {
                    segment += c;
                }
            }
        }
        if (segment !== null) {
            accept[0] = segment;
        }
        return i;
    };

    var globalAccept = []; // TODO: reentrancy risk here. This holder is here to allow parseEL to make two returns without an allocation.

    /** A version of fluid.model.parseEL that apples escaping rules - this allows path segments
     * to contain period characters . - characters "\" and "}" will also be escaped. WARNING -
     * this current implementation is EXTREMELY slow compared to fluid.model.parseEL and should
     * not be used in performance-sensitive applications */
    // supported, PUBLIC API function
    fluid.pathUtil.parseEL = function (path) {
        var togo = [];
        var index = 0;
        var limit = path.length;
        while (index < limit) {
            var firstdot = fluid.pathUtil.getPathSegmentImpl(globalAccept, path, index);
            togo.push(globalAccept[0]);
            index = firstdot + 1;
        }
        return togo;
    };

    // supported, PUBLIC API function
    fluid.pathUtil.composeSegment = function (prefix, toappend) {
        toappend = toappend.toString();
        for (var i = 0; i < toappend.length; ++i) {
            var c = toappend.charAt(i);
            if (c === "." || c === "\\" || c === "}") {
                prefix += "\\";
            }
            prefix += c;
        }
        return prefix;
    };

    /** Escapes a single path segment by replacing any character ".", "\" or "}" with
     * itself prepended by \
     */
    // supported, PUBLIC API function
    fluid.pathUtil.escapeSegment = function (segment) {
        return fluid.pathUtil.composeSegment("", segment);
    };

    /**
     * Compose a prefix and suffix EL path, where the prefix is already escaped.
     * Prefix may be empty, but not null. The suffix will become escaped.
     */
    // supported, PUBLIC API function
    fluid.pathUtil.composePath = function (prefix, suffix) {
        if (prefix.length !== 0) {
            prefix += ".";
        }
        return fluid.pathUtil.composeSegment(prefix, suffix);
    };

    /**
     * Compose a set of path segments supplied as arguments into an escaped EL expression. Escaped version
     * of fluid.model.composeSegments
     */

    // supported, PUBLIC API function
    fluid.pathUtil.composeSegments = function () {
        var path = "";
        for (var i = 0; i < arguments.length; ++ i) {
            path = fluid.pathUtil.composePath(path, arguments[i]);
        }
        return path;
    };
    
    /** Helpful utility for use in resolvers - matches a path which has already been
     * parsed into segments **/

    fluid.pathUtil.matchSegments = function (toMatch, segs, start, end) {
        if (end - start !== toMatch.length) {
            return false;
        }
        for (var i = start; i < end; ++ i) {
            if (segs[i] !== toMatch[i - start]) {
                return false;
            }
        }
        return true;
    };

    fluid.model.unescapedParser = {
        parse: fluid.model.parseEL,
        compose: fluid.model.composeSegments
    };

    // supported, PUBLIC API record
    fluid.model.defaultGetConfig = {
        parser: fluid.model.unescapedParser,
        strategies: [fluid.model.funcResolverStrategy, fluid.model.defaultFetchStrategy]
    };

    // supported, PUBLIC API record
    fluid.model.defaultSetConfig = {
        parser: fluid.model.unescapedParser,
        strategies: [fluid.model.funcResolverStrategy, fluid.model.defaultFetchStrategy, fluid.model.defaultCreatorStrategy]
    };

    fluid.model.escapedParser = {
        parse: fluid.pathUtil.parseEL,
        compose: fluid.pathUtil.composeSegments
    };

    // supported, PUBLIC API record
    fluid.model.escapedGetConfig = {
        parser: fluid.model.escapedParser,
        strategies: [fluid.model.defaultFetchStrategy]
    };

    // supported, PUBLIC API record
    fluid.model.escapedSetConfig = {
        parser: fluid.model.escapedParser,
        strategies: [fluid.model.defaultFetchStrategy, fluid.model.defaultCreatorStrategy]
    };

    /** MODEL COMPONENT HIERARCHY AND RELAY SYSTEM **/

    fluid.initRelayModel = function (that) {
        fluid.deenlistModelComponent(that);
        return that.model;
    };

    // TODO: This utility compensates for our lack of control over "wave of explosions" initialisation - we may
    // catch a model when it is apparently "completely initialised" and that's the best we can do, since we have
    // missed its own initial transaction

    fluid.isModelComplete = function (that) {
        return "model" in that && that.model !== fluid.inEvaluationMarker;
    };

    // Enlist this model component as part of the "initial transaction" wave - note that "special transaction" init
    // is indexed by component, not by applier, and has special record type (complete + initModel), not transaction
    fluid.enlistModelComponent = function (that) {
        var instantiator = fluid.getInstantiator(that);
        var enlist = instantiator.modelTransactions.init[that.id];
        if (!enlist) {
            enlist = {
                that: that,
                applier: fluid.getForComponent(that, "applier"), // required for FLUID-5504 even though currently unused
                complete: fluid.isModelComplete(that)
            };
            instantiator.modelTransactions.init[that.id] = enlist;
        }
        return enlist;
    };
    
    fluid.clearTransactions = function () {
        var instantiator = fluid.globalInstantiator;
        fluid.clear(instantiator.modelTransactions);
        instantiator.modelTransactions.init = {};
    };
    
    fluid.failureEvent.addListener(fluid.clearTransactions, "clearTransactions", "before:fail");

    // Utility to coordinate with our crude "oscillation prevention system" which limits each link to 2 updates (presumably
    // in opposite directions). In the case of the initial transaction, we need to reset the count given that genuine
    // changes are arising in the system with each new enlisted model. TODO: if we ever get users operating their own
    // transactions, think of a way to incorporate this into that workflow
    fluid.clearLinkCounts = function (transRec, relaysAlso) {
        fluid.each(transRec, function (value, key) {
            if (typeof(value) === "number") {
                transRec[key] = 0;
            } else if (relaysAlso && value.options && typeof(value.relayCount) === "number") {
                value.relayCount = 0;
            }
        });
    };

    fluid.sortCompleteLast = function (reca, recb) {
        return (reca.completeOnInit ? 1 : 0) - (recb.completeOnInit ? 1 : 0);
    };

    // Operate all coordinated transactions by bringing models to their respective initial values, and then commit them all
    fluid.operateInitialTransaction = function (instantiator, mrec) {
        var transId = fluid.allocateGuid();
        var transRec = fluid.getModelTransactionRec(instantiator, transId);
        var transac;
        var transacs = fluid.transform(mrec, function (recel) {
            transac = recel.that.applier.initiate("init", transId);
            transRec[recel.that.applier.applierId] = {transaction: transac};
            return transac;
        });
        // TODO: This sort has very little effect in any current test (can be replaced by no-op - see FLUID-5339) - but
        // at least can't be performed in reverse order ("FLUID-3674 event coordination test" will fail) - need more cases
        var recs = fluid.values(mrec).sort(fluid.sortCompleteLast);
        fluid.each(recs, function (recel) {
            var that = recel.that;
            var transac = transacs[that.id];
            if (recel.completeOnInit) {
                fluid.initModelEvent(that, that.applier, transac, that.applier.changeListeners.listeners);
            } else {
                fluid.each(recel.initModels, function (initModel) {
                    transac.fireChangeRequest({type: "ADD", segs: [], value: initModel});
                    fluid.clearLinkCounts(transRec, true);
                });
            }
            var shadow = fluid.shadowForComponent(that);
            shadow.modelComplete = true; // technically this is a little early, but this flag is only read in fluid.connectModelRelay
        });

        transac.commit(); // committing one representative transaction will commit them all
    };

    // This modelComponent has now concluded initialisation - commit its initialisation transaction if it is the last such in the wave
    fluid.deenlistModelComponent = function (that) {
        var instantiator = fluid.getInstantiator(that);
        var mrec = instantiator.modelTransactions.init;
        if (!mrec[that.id]) { // avoid double evaluation through currently hacked "members" implementation
            return;
        }
        that.model = undefined; // Abuse of the ginger system - in fact it is "currently in evaluation" - we need to return a proper initial model value even if no init occurred yet
        mrec[that.id].complete = true; // flag means - "complete as in ready to participate in this transaction"
        var incomplete = fluid.find_if(mrec, function (recel) {
            return recel.complete !== true;
        });
        if (!incomplete) {
            fluid.operateInitialTransaction(instantiator, mrec);
            // NB: Don't call fluid.concludeTransaction since "init" is not a standard record - this occurs in commitRelays for the corresponding genuine record as usual
            instantiator.modelTransactions.init = {};
        }
    };

    fluid.transformToAdapter = function (transform, targetPath) {
        var basedTransform = {};
        basedTransform[targetPath] = transform;
        return function (trans, newValue /*, sourceSegs, targetSegs */) {
            // TODO: More efficient model that can only run invalidated portion of transform (need to access changeMap of source transaction)
            fluid.model.transformWithRules(newValue, basedTransform, {finalApplier: trans});
        };
    };

    fluid.parseModelReference = function (that, ref) {
        var parsed = fluid.parseContextReference(ref);
        parsed.segs = that.applier.parseEL(parsed.path);
        return parsed;
    };

    fluid.parseValidModelReference = function (that, name, ref) {
        var reject = function (message) {
            fluid.fail("Error in " + name + ": " + ref + message);
        };
        var parsed, target;
        if (ref.charAt(0) === "{") {
            parsed = fluid.parseModelReference(that, ref);
            if (parsed.segs[0] !== "model") {
                reject(" must be a reference into a component model beginning with \"model\"");
            } else {
                parsed.modelSegs = parsed.segs.slice(1);
                delete parsed.path;
            }
            target = fluid.resolveContext(parsed.context, that);
            if (!target) {
                reject(" must be a reference to an existing component");
            }
        } else {
            target = that;
            parsed = {
                path: ref,
                modelSegs: that.applier.parseEL(ref)
            };
        }
        if (!target.applier) {
            fluid.getForComponent(target, ["applier"]);
        }
        if (!target.applier) {
            reject(" must be a reference to a component with a ChangeApplier (descended from fluid.modelComponent)");
        }
        parsed.that = target;
        parsed.applier = target.applier;
        if (!parsed.path) { // ChangeToApplicable amongst others rely on this
            parsed.path = target.applier.composeSegments.apply(null, parsed.modelSegs);
        }
        return parsed;
    };

    // Gets global record for a particular transaction id - looks up applier id to transaction,
    // as well as looking up source id (linkId in below) to count/true
    fluid.getModelTransactionRec = function (instantiator, transId) {
        if (!transId) {
            fluid.fail("Cannot get transaction record without transaction id");
        }
        if (!instantiator) {
            return null;
        }
        var transRec = instantiator.modelTransactions[transId];
        if (!transRec) {
            transRec = instantiator.modelTransactions[transId] = {
                externalChanges: {} // index by applierId to changePath to listener record
            };
        }
        return transRec;
    };

    fluid.recordChangeListener = function (component, applier, sourceListener) {
        var shadow = fluid.shadowForComponent(component);
        fluid.recordListener(applier.modelChanged, sourceListener, shadow);
    };
    
    // Configure this parameter to tweak the number of relays the model will attempt per transaction before bailing out with an error
    fluid.relayRecursionBailout = 100;

    // Used with various arg combinations from different sources. For standard "implicit relay" or fully lensed relay,
    // the first 4 args will be set, and "options" will be empty

    // For a model-dependent relay, this will be used in two halves - firstly, all of the model
    // sources will bind to the relay transform document itself. In this case the argument "targetApplier" within "options" will be set.
    // In this case, the component known as "target" is really the source - it is a component reference discovered by parsing the
    // relay document.

    // Secondly, the relay itself will schedule an invalidation (as if receiving change to "*" of its source - which may in most
    // cases actually be empty) and play through its transducer. "Source" component itself is never empty, since it is used for listener
    // degistration on destruction (check this is correct for external model relay). However, "sourceSegs" may be empty in the case
    // there is no "source" component registered for the link. This change is played in a "half-transactional" way - that is, we wait
    // for all other changes in the system to settle before playing the relay document, in order to minimise the chances of multiple
    // firing and corruption. This is done via the "preCommit" hook registered at top level in establishModelRelay. This listener
    // is transactional but it does not require the transaction to conclude in order to fire - it may be reused as many times as
    // required within the "overall" transaction whilst genuine (external) changes continue to arrive.

    fluid.registerDirectChangeRelay = function (target, targetSegs, source, sourceSegs, linkId, transducer, options) {
        var instantiator = fluid.getInstantiator(target);
        var targetApplier = options.targetApplier || target.applier; // implies the target is a relay document
        var sourceApplier = options.sourceApplier || source.applier; // implies the source is a relay document - listener will be transactional
        var applierId = targetApplier.applierId;
        targetSegs = fluid.makeArray(targetSegs);
        sourceSegs = sourceSegs ? fluid.makeArray(sourceSegs) : sourceSegs; // take copies since originals will be trashed
        var sourceListener = function (newValue, oldValue, path, changeRequest, trans, applier) {
            var transId = trans.id;
            var transRec = fluid.getModelTransactionRec(instantiator, transId);
            if (applier && trans && !transRec[applier.applierId]) { // don't trash existing record which may contain "options" (FLUID-5397)
                transRec[applier.applierId] = {transaction: trans}; // enlist the outer user's original transaction
            }
            var existing = transRec[applierId];
            transRec[linkId] = transRec[linkId] || 0;
            // Crude "oscillation prevention" system limits each link to maximum of 2 operations per cycle (presumably in opposite directions)
            var relay = true; // TODO: See FLUID-5303 - we currently disable this check entirely to solve FLUID-5293 - perhaps we might remove link counts entirely
            if (relay) {
                ++transRec[linkId];
                if (transRec[linkId] > fluid.relayRecursionBailout) {
                    fluid.fail("Error in model relay specification at component ", target, " - operated more than " + fluid.relayRecursionBailout + " relays without model value settling - current model contents are ", trans.newHolder.model);
                }
                if (!existing) {
                    var newTrans = targetApplier.initiate("relay", transId); // non-top-level transaction will defeat postCommit
                    existing = transRec[applierId] = {transaction: newTrans, relayCount: 0, options: options};
                }
                if (transducer && !options.targetApplier) {
                    // TODO: This is just for safety but is still unusual and now abused. The transducer doesn't need the "newValue" since all the transform information
                    // has been baked into the transform document itself. However, we now rely on this special signalling value to make sure we regenerate transforms in 
                    // the "forwardAdapter"
                    transducer(existing.transaction, options.sourceApplier ? undefined : newValue, sourceSegs, targetSegs);
                } else if (newValue !== undefined) {
                    existing.transaction.fireChangeRequest({type: "ADD", segs: targetSegs, value: newValue});
                }
            }
        };
        sourceListener.relayListenerId = fluid.allocateGuid();
        if (sourceSegs) {
            fluid.log(fluid.logLevel.TRACE, "Adding relay listener with id " + sourceListener.relayListenerId + " to source applier with id " +
                sourceApplier.applierId + " from target applier with id " + applierId + " for target component with id " + target.id);
            sourceApplier.modelChanged.addListener({
                isRelay: true,
                segs: sourceSegs,
                transactional: options.transactional
            }, sourceListener);
        }
        if (source) { // TODO - we actually may require to register on THREE sources in the case modelRelay is attached to a
            // component which is neither source nor target. Note there will be problems if source, say, is destroyed and recreated,
            // and holder is not - relay will in that case be lost. Need to integrate relay expressions with IoCSS.
            fluid.recordChangeListener(source, sourceApplier, sourceListener);
            if (target !== source) {
                fluid.recordChangeListener(target, sourceApplier, sourceListener);
            }
        }
    };

    // When called during parsing a contextualised model relay document, these arguments are reversed - "source" refers to the
    // current component, and "target" refers successively to the various "source" components.
    // "options" will be transformPackage
    fluid.connectModelRelay = function (source, sourceSegs, target, targetSegs, options) {
        var linkId = fluid.allocateGuid();
        function enlistComponent(component) {
            var enlist = fluid.enlistModelComponent(component);

            if (enlist.complete) {
                var shadow = fluid.shadowForComponent(component);
                if (shadow.modelComplete) {
                    enlist.completeOnInit = true;
                }
            }
        }
        enlistComponent(target);
        enlistComponent(source); // role of "source" and "target" may have been swapped in a modelRelay document

        if (options.update) { // it is a call via parseImplicitRelay for a relay document
            if (options.targetApplier) {
                // register changes from the model onto changes to the model relay document
                fluid.registerDirectChangeRelay(source, sourceSegs, target, targetSegs, linkId, null, {
                    transactional: false,
                    targetApplier: options.targetApplier,
                    update: options.update
                });
            } else {
                // if parsing a contextualised MR, skip the "orthogonal" registration - instead
                // register the "half-transactional" listener which binds changes from the relay itself onto the target
                fluid.registerDirectChangeRelay(target, targetSegs, source, [], linkId+"-transform", options.forwardAdapter, {transactional: true, sourceApplier: options.forwardApplier});
            }
        } else { // more efficient branch where relay is uncontextualised
            fluid.registerDirectChangeRelay(target, targetSegs, source, sourceSegs, linkId, options.forwardAdapter, {transactional: false});
            if (sourceSegs) {
                fluid.registerDirectChangeRelay(source, sourceSegs, target, targetSegs, linkId, options.backwardAdapter, {transactional: false});
            }
        }
    };

    fluid.model.guardedAdapter = function (componentThat, cond, func, args) {
        // TODO: We can't use fluid.isModelComplete here because of the broken half-transactional system - it may appear that model has arrived halfway through init transaction
        var instantiator = fluid.getInstantiator(componentThat);
        var enlist = instantiator.modelTransactions.init[componentThat.id];
        var condValue = cond[enlist ? "init" : "live"];
        if (condValue) {
            func.apply(null, args);
        }
    };

    fluid.makeTransformPackage = function (componentThat, transform, sourcePath, targetPath, forwardCond, backwardCond) {
        var that = {
            forwardHolder: {model: transform},
            backwardHolder: {model: null}
        };
        that.generateAdapters = function (trans) {
            // can't commit "half-transaction" or events will fire - violate encapsulation in this way
            that.forwardAdapterImpl = fluid.transformToAdapter(trans ? trans.newHolder.model : that.forwardHolder.model, targetPath);
            if (sourcePath !== null) {
                that.backwardHolder.model = fluid.model.transform.invertConfiguration(transform);
                that.backwardAdapterImpl = fluid.transformToAdapter(that.backwardHolder.model, sourcePath);
            }
        };
        that.forwardAdapter = function (transaction, newValue) { // create a stable function reference for this possibly changing adapter
            if (newValue === undefined) {
                that.generateAdapters(); // TODO: Quick fix for incorrect scheduling of invalidation/transducing
                // "it so happens" that fluid.registerDirectChangeRelay invokes us with empty newValue in the case of invalidation -> transduction
            }
            fluid.model.guardedAdapter(componentThat, forwardCond, that.forwardAdapterImpl, arguments);
        };
        // fired from fluid.model.updateRelays via invalidator event
        that.runTransform = function (trans) {
            trans.commit(); // this will reach the special "half-transactional listener" registered in fluid.connectModelRelay,
            // branch with options.targetApplier - by committing the transaction, we update the relay document in bulk and then cause
            // it to execute (via "transducer")
            trans.reset();
        };
        that.forwardApplier = fluid.makeHolderChangeApplier(that.forwardHolder);
        that.forwardApplier.isRelayApplier = true; // special annotation so these can be discovered in the transaction record
        that.invalidator = fluid.makeEventFirer({name: "Invalidator for model relay with applier " + that.forwardApplier.applierId});
        if (sourcePath !== null) {
            that.backwardApplier = fluid.makeHolderChangeApplier(that.backwardHolder);
            that.backwardAdapter = function () {
                fluid.model.guardedAdapter(componentThat, backwardCond, that.backwardAdapterImpl, arguments);
            };
        }
        that.update = that.invalidator.fire; // necessary so that both routes to fluid.connectModelRelay from here hit the first branch
        var implicitOptions = {
            targetApplier: that.forwardApplier, // this special field identifies us to fluid.connectModelRelay
            update: that.update,
            refCount: 0
        };
        that.forwardHolder.model = fluid.parseImplicitRelay(componentThat, transform, [], implicitOptions);
        that.refCount = implicitOptions.refCount;
        that.generateAdapters();
        that.invalidator.addListener(that.generateAdapters);
        that.invalidator.addListener(that.runTransform);
        return that;
    };

    fluid.singleTransformToFull = function (singleTransform) {
        var withPath = $.extend(true, {valuePath: ""}, singleTransform);
        return {
            "": {
                transform: withPath
            }
        };
    };

    fluid.model.relayConditions = {
        initOnly: {init: true,  live: false},
        liveOnly: {init: false, live: true},
        never:    {init: false, live: false},
        always:   {init: true,  live: true}
    };

    fluid.model.parseRelayCondition = function (condition) {
        return fluid.model.relayConditions[condition || "always"];
    };

    fluid.parseModelRelay = function (that, mrrec) {
        var parsedSource = mrrec.source ? fluid.parseValidModelReference(that, "modelRelay record member \"source\"", mrrec.source) :
            {path: null, modelSegs: null};
        var parsedTarget = fluid.parseValidModelReference(that, "modelRelay record member \"target\"", mrrec.target);

        var transform = mrrec.singleTransform ? fluid.singleTransformToFull(mrrec.singleTransform) : mrrec.transform;
        if (!transform) {
            fluid.fail("Cannot parse modelRelay record without element \"singleTransform\" or \"transform\":", mrrec);
        }
        var forwardCond = fluid.model.parseRelayCondition(mrrec.forward), backwardCond = fluid.model.parseRelayCondition(mrrec.backward);
        var transformPackage = fluid.makeTransformPackage(that, transform, parsedSource.path, parsedTarget.path, forwardCond, backwardCond);
        if (transformPackage.refCount === 0) {
            // This first call binds changes emitted from the relay ends to each other, synchronously
            fluid.connectModelRelay(parsedSource.that || that, parsedSource.modelSegs, parsedTarget.that, parsedTarget.modelSegs, {
                forwardAdapter: transformPackage.forwardAdapter,
                backwardAdapter: transformPackage.backwardAdapter
            });
        } else {
            // This second call binds changes emitted from the relay document itself onto the relay ends (using the "half-transactional system")
            fluid.connectModelRelay(parsedSource.that || that, parsedSource.modelSegs, parsedTarget.that, parsedTarget.modelSegs, transformPackage);
        }
    };

    fluid.parseImplicitRelay = function (that, modelRec, segs, options) {
        var value;
        if (typeof(modelRec) === "string" && modelRec.charAt(0) === "{") {
            var parsed = fluid.parseModelReference(that, modelRec);
            var target = fluid.resolveContext(parsed.context, that);
            if (parsed.segs[0] === "model") {
                var modelSegs = parsed.segs.slice(1);
                ++options.refCount;
                fluid.connectModelRelay(that, segs, target, modelSegs, options);
            } else {
                value = fluid.getForComponent(target, parsed.segs);
            }
        } else if (fluid.isPrimitive(modelRec) || !fluid.isPlainObject(modelRec)) {
            value = modelRec;
        } else if (modelRec.expander && fluid.isPlainObject(modelRec.expander)) {
            value = fluid.expandOptions(modelRec, that);
        } else {
            value = fluid.freshContainer(modelRec);
            fluid.each(modelRec, function (innerValue, key) {
                segs.push(key);
                var innerTrans = fluid.parseImplicitRelay(that, innerValue, segs, options);
                if (innerTrans !== undefined) {
                    value[key] = innerTrans;
                }
                segs.pop();
            });
        }
        return value;
    };


    // Conclude the transaction by firing to all external listeners in priority order
    fluid.model.notifyExternal = function (transRec) {
        var allChanges = transRec ? fluid.values(transRec.externalChanges) : [];
        fluid.sortByPriority(allChanges);
        for (var i = 0; i < allChanges.length; ++ i) {
            var change = allChanges[i];
            var targetApplier = change.args[5]; // NOTE: This argument gets here via fluid.model.storeExternalChange from fluid.notifyModelChanges
            if (!targetApplier.destroyed) { // 3rd point of guarding for FLUID-5592
                change.listener.apply(null, change.args);
            }
        }
        fluid.clearLinkCounts(transRec, true); // "options" structures for relayCount are aliased
    };

    fluid.model.commitRelays = function (instantiator, transactionId) {
        var transRec = instantiator.modelTransactions[transactionId];
        fluid.each(transRec, function (transEl) {
        // EXPLAIN: This must commit ALL current transactions, not just those for relays - why?
            if (transEl.transaction) { // some entries are links
                transEl.transaction.commit("relay");
                transEl.transaction.reset();
            }
        });
    };

    fluid.model.updateRelays = function (instantiator, transactionId) {
        var transRec = instantiator.modelTransactions[transactionId];
        var updates = 0;
        fluid.each(transRec, function (transEl) {
            // TODO: integrate the "source" if any into this computation, and fire the relay if it has changed - perhaps by adding a listener
            // to it that updates changeRecord.changes (assuming we can find it)
            if (transEl.options && transEl.transaction && transEl.transaction.changeRecord.changes > 0 && transEl.relayCount < 2 && transEl.options.update) {
                transEl.relayCount++;
                fluid.clearLinkCounts(transRec);
                transEl.options.update(transEl.transaction, transRec);
                ++updates;
            }
        });
        return updates;
    };

    fluid.establishModelRelay = function (that, optionsModel, optionsML, optionsMR, applier) {
        fluid.mergeModelListeners(that, optionsML);

        var enlist = fluid.enlistModelComponent(that);
        fluid.each(optionsMR, function (mrrec) {
            fluid.parseModelRelay(that, mrrec);
        });

        var initModels = fluid.transform(optionsModel, function (modelRec) {
            return fluid.parseImplicitRelay(that, modelRec, [], {refCount: 0});
        });
        enlist.initModels = initModels;

        var instantiator = fluid.getInstantiator(that);

        function updateRelays(transaction) {
            while (fluid.model.updateRelays(instantiator, transaction.id) > 0){}
        }

        function commitRelays(transaction, applier, code) {
            if (code !== "relay") { // don't commit relays if this commit is already a relay commit
                fluid.model.commitRelays(instantiator, transaction.id);
            }
        }

        function concludeTransaction(transaction, applier, code) {
            if (code !== "relay") {
                fluid.model.notifyExternal(instantiator.modelTransactions[transaction.id]);
                delete instantiator.modelTransactions[transaction.id];
            }
        }

        applier.preCommit.addListener(updateRelays);
        applier.preCommit.addListener(commitRelays);
        applier.postCommit.addListener(concludeTransaction);
        
        return null;
    };

    // supported, PUBLIC API grade
    fluid.defaults("fluid.modelComponent", {
        gradeNames: ["fluid.component"],
        changeApplierOptions: {
            relayStyle: true,
            cullUnchanged: true
        },
        members: {
            model: "@expand:fluid.initRelayModel({that}, {that}.modelRelay)",
            applier: "@expand:fluid.makeHolderChangeApplier({that}, {that}.options.changeApplierOptions)",
            modelRelay: "@expand:fluid.establishModelRelay({that}, {that}.options.model, {that}.options.modelListeners, {that}.options.modelRelay, {that}.applier)"
        },
        mergePolicy: {
            model: {
                noexpand: true,
                func: fluid.arrayConcatPolicy // TODO: bug here in case a model consists of an array
            },
            modelListeners: fluid.makeMergeListenersPolicy(fluid.arrayConcatPolicy),
            modelRelay: {
                noexpand: true,
                func: fluid.arrayConcatPolicy
            }
        }
    });

    fluid.modelChangedToChange = function (args) {
        return {
            value: args[0],
            oldValue: args[1],
            path: args[2]
        };
    };

    fluid.resolveModelListener = function (that, record) {
        var togo = function () {
            if (fluid.isDestroyed(that)) { // first guarding point to resolve FLUID-5592
                return;
            }
            var change = fluid.modelChangedToChange(arguments);
            var args = [change];
            var localRecord = {change: change, "arguments": args};
            if (record.args) {
                args = fluid.expandOptions(record.args, that, {}, localRecord);
            }
            fluid.event.invokeListener(record.listener, fluid.makeArray(args));
        };
        fluid.event.impersonateListener(record.listener, togo);
        return togo;
    };

    fluid.mergeModelListeners = function (that, listeners) {
        var listenerCount = 0;
        fluid.each(listeners, function (value, path) {
            if (typeof(value) === "string") {
                value = {
                    funcName: value
                };
            }
            var records = fluid.event.resolveListenerRecord(value, that, "modelListeners", null, false);
            var parsed = fluid.parseValidModelReference(that, "modelListeners entry", path);
            // Bypass fluid.event.dispatchListener by means of "standard = false" and enter our custom workflow including expanding "change":
            fluid.each(records.records, function (record) {
                var func = fluid.resolveModelListener(that, record);
                var spec = {
                    listener: func, // for initModelEvent
                    listenerIndex: listenerCount,
                    segs: parsed.modelSegs,
                    path: parsed.path,
                    includeSource: record.includeSource,
                    excludeSource: record.excludeSource,
                    priority: record.priority,
                    transactional: true
                };
                ++listenerCount;
                 // update "spec" so that we parse priority information just once
                spec = parsed.applier.modelChanged.addListener(spec, func, record.namespace, record.softNamespace);

                fluid.recordChangeListener(that, parsed.applier, func);
                function initModelEvent() {
                    if (fluid.isModelComplete(parsed.that)) {
                        var trans = parsed.applier.initiate("init");
                        fluid.initModelEvent(that, parsed.applier, trans, [spec]);
                        trans.commit();
                    }
                }
                if (that !== parsed.that && !fluid.isModelComplete(that)) { // TODO: Use FLUID-4883 "latched events" when available
                    // Don't confuse the end user by firing their listener before the component is constructed
                    // TODO: Better detection than this is requred - we assume that the target component will not be discovered as part
                    // of the initial transaction wave, but if it is, it will get a double notification - we really need "wave of explosions"
                    // since we are currently too early in initialisation of THIS component in order to tell if other will be found
                    // independently.
                    var onCreate = fluid.getForComponent(that, ["events", "onCreate"]);
                    onCreate.addListener(initModelEvent);
                }
            });
        });
    };


    /** CHANGE APPLIER **/

    /** Add a listener to a ChangeApplier event that only acts in the case the event
     * has not come from the specified source (typically ourself)
     * @param modelEvent An model event held by a changeApplier (typically applier.modelChanged)
     * @param path The path specification to listen to
     * @param source The source value to exclude (direct equality used)
     * @param func The listener to be notified of a change
     * @param [eventName] - optional - the event name to be listened to - defaults to "modelChanged"
     * @param [namespace] - optional - the event namespace
     */
     // TODO: Source guarding is not supported by the current ChangeApplier, these methods are no-ops
    fluid.addSourceGuardedListener = function(applier, path, source, func, eventName, namespace, softNamespace) {
        eventName = eventName || "modelChanged";
        var wrapped = function (newValue, oldValue, path, changes) { // TODO: adapt signature
            if (!applier.hasChangeSource(source, changes)) {
                return func.apply(null, arguments);
            }
        };
        fluid.event.impersonateListener(func, wrapped);
        return applier[eventName].addListener(path, wrapped, namespace, softNamespace);
    };

    /** Convenience method to fire a change event to a specified applier, including
     * a supplied "source" identified (perhaps for use with addSourceGuardedListener)
     */
    fluid.fireSourcedChange = function (applier, path, value, source) {
        applier.fireChangeRequest({
            path: path,
            value: value,
            source: source
        });
    };

    /** Dispatches a list of changes to the supplied applier */
    fluid.requestChanges = function (applier, changes) {
        for (var i = 0; i < changes.length; ++i) {
            applier.fireChangeRequest(changes[i]);
        }
    };


    // Automatically adapts requestChange onto fireChangeRequest
    fluid.bindRequestChange = function (that) {
        // The name "requestChange" will be deprecated in 1.5, removed in 2.0
        that.requestChange = that.change = function (path, value, type) {
            var changeRequest = {
                path: path,
                value: value,
                type: type
            };
            that.fireChangeRequest(changeRequest);
        };
    };

    fluid.identifyChangeListener = function (listener) {
        return fluid.event.identifyListener(listener) || listener;
    };


    fluid.model.isChangedPath = function (changeMap, segs) {
        for (var i = 0; i <= segs.length; ++ i) {
            if (typeof(changeMap) === "string") {
                return true;
            }
            if (i < segs.length && changeMap) {
                changeMap = changeMap[segs[i]];
            }
        }
        return false;
    };

    fluid.model.setChangedPath = function (options, segs, value) {
        var notePath = function (record) {
            segs.unshift(record);
            fluid.model.setSimple(options, segs, value);
            segs.shift();
        };
        if (!fluid.model.isChangedPath(options.changeMap, segs)) {
            ++options.changes;
            notePath("changeMap");
        }
        if (!fluid.model.isChangedPath(options.deltaMap, segs)) {
            ++options.deltas;
            notePath("deltaMap");
        }
    };

    fluid.model.fetchChangeChildren = function (target, i, segs, source, options) {
        fluid.each(source, function (value, key) {
            segs[i] = key;
            fluid.model.applyChangeStrategy(target, key, i, segs, value, options);
            segs.length = i;
        });
    };

    // Called with two primitives which are compared for equality. This takes account of "floating point slop" to avoid
    // continuing to propagate inverted values as changes
    // TODO: replace with a pluggable implementation
    fluid.model.isSameValue = function (a, b) {
        if (typeof(a) !== "number" || typeof(b) !== "number") {
            return a === b;
        } else {
            // Don't use isNaN because of https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior
            if (a === b || a !== a && b !== b) { // Either the same concrete number or both NaN
                return true;
            } else {
                var relError = Math.abs((a - b) / b);
                return relError < 1e-12; // 64-bit floats have approx 16 digits accuracy, this should deal with most reasonable transforms
            }
        }
    };

    fluid.model.applyChangeStrategy = function (target, name, i, segs, source, options) {
        var targetSlot = target[name];
        var sourceCode = fluid.typeCode(source);
        var targetCode = fluid.typeCode(targetSlot);
        var changedValue = fluid.NO_VALUE;
        if (sourceCode === "primitive") {
            if (!fluid.model.isSameValue(targetSlot, source)) {
                changedValue = source;
                ++options.unchanged;
            }
        } else if (targetCode !== sourceCode || sourceCode === "array" && source.length !== targetSlot.length) {
            // RH is not primitive - array or object and mismatching or any array rewrite
            changedValue = fluid.freshContainer(source);
        }
        if (changedValue !== fluid.NO_VALUE) {
            target[name] = changedValue;
            if (options.changeMap) {
                fluid.model.setChangedPath(options, segs, options.inverse ? "DELETE" : "ADD");
            }
        }
        if (sourceCode !== "primitive") {
            fluid.model.fetchChangeChildren(target[name], i + 1, segs, source, options);
        }
    };

    fluid.model.stepTargetAccess = function (target, type, segs, startpos, endpos, options) {
        for (var i = startpos; i < endpos; ++ i) {
            if (!target) {
                continue;
            }
            var oldTrunk = target[segs[i]];
            target = fluid.model.traverseWithStrategy(target, segs, i, options[type === "ADD" ? "resolverSetConfig" : "resolverGetConfig"],
                segs.length - i - 1);
            if (oldTrunk !== target && options.changeMap) {
                fluid.model.setChangedPath(options, segs.slice(0, i + 1), "ADD");
            }
        }
        return {root: target, last: segs[endpos]};
    };

    fluid.model.defaultAccessorConfig = function (options) {
        options = options || {};
        options.resolverSetConfig = options.resolverSetConfig || fluid.model.escapedSetConfig;
        options.resolverGetConfig = options.resolverGetConfig || fluid.model.escapedGetConfig;
        return options;
    };

    // Changes: "MERGE" action abolished
    // ADD/DELETE at root can be destructive
    // changes tracked in optional final argument holding "changeMap: {}, changes: 0, unchanged: 0"
    fluid.model.applyHolderChangeRequest = function (holder, request, options) {
        options = fluid.model.defaultAccessorConfig(options);
        options.deltaMap = options.changeMap ? {} : null;
        options.deltas = 0;
        var length = request.segs.length;
        var pen, atRoot = length === 0;
        if (atRoot) {
            pen = {root: holder, last: "model"};
        } else {
            if (!holder.model) {
                holder.model = {};
                fluid.model.setChangedPath(options, [], options.inverse ? "DELETE" : "ADD");
            }
            pen = fluid.model.stepTargetAccess(holder.model, request.type, request.segs, 0, length - 1, options);
        }
        if (request.type === "ADD") {
            var value = request.value;
            var segs = fluid.makeArray(request.segs);
            fluid.model.applyChangeStrategy(pen.root, pen.last, length - 1, segs, value, options, atRoot);
        } else if (request.type === "DELETE") {
            if (pen.root && pen.root[pen.last] !== undefined) {
                delete pen.root[pen.last];
                if (options.changeMap) {
                    fluid.model.setChangedPath(options, request.segs, "DELETE");
                }
            }
        } else {
            fluid.fail("Unrecognised change type of " + request.type);
        }
        return options.deltas ? options.deltaMap : null;
    };
    
    /** Compare two models for equality using a deep algorithm. It is assumed that both models are JSON-equivalent and do
     * not contain circular links.
     * @param modela The first model to be compared
     * @param modelb The second model to be compared
     * @param options {Object} If supplied, will receive a map and summary of the change content between the objects. Structure is:
     *     changeMap: {Object/String} An isomorphic map of the object structures to values "ADD" or "DELETE" indicating
     * that values have been added/removed at that location. Note that in the case the object structure differs at the root, <code>changeMap</code> will hold
     * the plain String value "ADD" or "DELETE"
     *     changes: {Integer} Counts the number of changes between the objects - The two objects are identical iff <code>changes === 0</code>.
     *     unchanged: {Integer} Counts the number of leaf (primitive) values at which the two objects are identical. Note that the current implementation will
     * double-count, this summary should be considered indicative rather than precise.
     * @return <code>true</code> if the models are identical
     */
    // TODO: This algorithm is quite inefficient in that both models will be copied once each
    // supported, PUBLIC API function
    fluid.model.diff = function (modela, modelb, options) {
        options = options || {changes: 0, unchanged: 0, changeMap: {}}; // current algorithm can't avoid the expense of changeMap
        var typea = fluid.typeCode(modela);
        var typeb = fluid.typeCode(modelb);
        var togo;
        if (typea === "primitive" && typeb === "primitive") {
            togo = fluid.model.isSameValue(modela, modelb);
        } else if (typea === "primitive" ^ typeb === "primitive") {
            togo = false;
        } else {
            // Apply both forward and reverse changes - if no changes either way, models are identical
            // "ADD" reported in the reverse direction must be accounted as a "DELETE"
            var holdera = {
                model: fluid.copy(modela)
            };
            fluid.model.applyHolderChangeRequest(holdera, {value: modelb, segs: [], type: "ADD"}, options);
            var holderb = {
                model: fluid.copy(modelb)
            };
            options.inverse = true;
            fluid.model.applyHolderChangeRequest(holderb, {value: modela, segs: [], type: "ADD"}, options);
            togo = options.changes === 0;
        }
        if (togo === false && options.changes === 0) { // catch all primitive cases
            options.changes = 1;
            options.changeMap = modelb === undefined ? "DELETE" : "ADD";
        } else if (togo === true && options.unchanged === 0) {
            options.unchanged = 1;
        }
        return togo;
    };

    // Here we only support for now very simple expressions which have at most one
    // wildcard which must appear in the final segment
    fluid.matchChanges = function (changeMap, specSegs, newHolder) {
        var root = newHolder.model;
        var map = changeMap;
        var outSegs = ["model"];
        var wildcard = false;
        var togo = [];
        for (var i = 0; i < specSegs.length; ++ i) {
            var seg = specSegs[i];
            if (seg === "*") {
                if (i === specSegs.length - 1) {
                    wildcard = true;
                } else {
                    fluid.fail("Wildcard specification in modelChanged listener is only supported for the final path segment: " + specSegs.join("."));
                }
            } else {
                outSegs.push(seg);
                map = fluid.isPrimitive(map) ? map : map[seg];
                root = root ? root[seg] : undefined;
            }
        }
        if (map) {
            if (wildcard) {
                fluid.each(root, function (value, key) {
                    togo.push(outSegs.concat(key));
                });
            } else {
                togo.push(outSegs);
            }
        }
        return togo;
    };

    fluid.storeExternalChange = function (transRec, applier, invalidPath, spec, args) {
        var pathString = applier.composeSegments.apply(null, invalidPath);
        var keySegs = [applier.applierId, fluid.event.identifyListener(spec.listener), spec.listenerIndex, pathString];
        var keyString = keySegs.join("|");
        // These are unbottled in fluid.concludeTransaction
        transRec.externalChanges[keyString] = {listener: spec.listener, priority: spec.priority, args: args};
    };
    
    fluid.isExcludedChangeSource = function (transaction, spec) {
        if (!spec.excludeSource) { // mergeModelListeners initModelEvent fabricates a fake spec that bypasses processing
            return false;
        }
        var excluded = spec.excludeSource["*"];
        for (var source in transaction.sources) {
            if (spec.excludeSource[source]) {
                excluded = true;
            }
            if (spec.includeSource[source]) {
                excluded = false;
            }
        }
        return excluded;
    };

    fluid.notifyModelChanges = function (listeners, changeMap, newHolder, oldHolder, changeRequest, transaction, applier, that) {
        var instantiator = fluid.getInstantiator && fluid.getInstantiator(that); // may return nothing for non-component holder
        var transRec = transaction && fluid.getModelTransactionRec(instantiator, transaction.id);
        for (var i = 0; i < listeners.length; ++ i) {
            var spec = listeners[i];
            var invalidPaths = fluid.matchChanges(changeMap, spec.segs, newHolder);
            for (var j = 0; j < invalidPaths.length; ++ j) {
                if (applier.destroyed) { // 2nd guarding point for FLUID-5592
                    return;
                }
                var invalidPath = invalidPaths[j];
                spec.listener = fluid.event.resolveListener(spec.listener);
                // TODO: process namespace and softNamespace rules, and propagate "sources" in 4th argument
                var args = [fluid.model.getSimple(newHolder, invalidPath), fluid.model.getSimple(oldHolder, invalidPath), invalidPath.slice(1), changeRequest, transaction, applier];
                // FLUID-5489: Do not notify of null changes which were reported as a result of invalidating a higher path
                // TODO: We can improve greatly on efficiency by i) reporting a special code from fluid.matchChanges which signals the difference between invalidating a higher and lower path,
                // ii) improving fluid.model.diff to create fewer intermediate structures and no copies
                // TODO: The relay invalidation system is broken and must always be notified (branch 1) - since our old/new value detection is based on the wrong (global) timepoints in the transaction here,
                // rather than the "last received model" by the holder of the transform document
                if (!spec.isRelay) {
                    var isNull = fluid.model.diff(args[0], args[1]);
                    if (isNull) {
                        continue;
                    }
                    var sourceExcluded = fluid.isExcludedChangeSource(transaction, spec);
                    if (sourceExcluded) {
                        continue;
                    }
                }
                if (transRec && !spec.isRelay && spec.transactional) { // bottle up genuine external changes so we can sort and dedupe them later
                    fluid.storeExternalChange(transRec, applier, invalidPath, spec, args);
                } else {
                    spec.listener.apply(null, args);
                }
            }
        }
    };

    fluid.bindELMethods = function (applier) {
        applier.parseEL = function (EL) {
            return fluid.model.pathToSegments(EL, applier.options.resolverSetConfig);
        };
        applier.composeSegments = function () {
            return applier.options.resolverSetConfig.parser.compose.apply(null, arguments);
        };
    };

    fluid.initModelEvent = function (that, applier, trans, listeners) {
        fluid.notifyModelChanges(listeners, "ADD", trans.oldHolder, fluid.emptyHolder, null, trans, applier, that);
    };

    fluid.emptyHolder = { model: undefined };
    
    fluid.preFireChangeRequest = function (applier, changeRequest) {
        if (!changeRequest.type) {
            changeRequest.type = "ADD";
        }
        changeRequest.segs = changeRequest.segs || applier.parseEL(changeRequest.path);
    };
    
    fluid.ChangeApplier = function () {};

    fluid.makeHolderChangeApplier = function (holder, options) {
        options = fluid.model.defaultAccessorConfig(options);
        var applierId = fluid.allocateGuid();
        var that = new fluid.ChangeApplier();
        $.extend(that, {
            applierId: applierId,
            holder: holder,
            changeListeners: {
                listeners: [],
                transListeners: []
            },
            options: options,
            modelChanged: {},
            preCommit: fluid.makeEventFirer({name: "preCommit event for ChangeApplier " }),
            postCommit: fluid.makeEventFirer({name: "postCommit event for ChangeApplier "})
        });
        that.destroy = function () {
            that.preCommit.destroy();
            that.postCommit.destroy();
            that.destroyed = true;
        };
        that.modelChanged.addListener = function (spec, listener, namespace, softNamespace) {
            if (typeof(spec) === "string") {
                spec = {path: spec};
            } else {
                spec = fluid.copy(spec);
            }
            spec.id = fluid.event.identifyListener(listener);
            spec.namespace = namespace;
            spec.softNamespace = softNamespace;
            if (typeof(listener) === "string") { // The reason for "globalName" is so that listener names can be resolved on first use and not on registration
                listener = {globalName: listener};
            }
            spec.listener = listener;
            if (spec.transactional !== false) {
                spec.transactional = true;
            }
            spec.segs = spec.segs || that.parseEL(spec.path);
            var collection = that.changeListeners[spec.transactional ? "transListeners" : "listeners"];
            spec.excludeSource = fluid.arrayToHash(fluid.makeArray(spec.excludeSource || (spec.includeSource ? "*" : undefined)));
            spec.includeSource = fluid.arrayToHash(fluid.makeArray(spec.includeSource));
            spec.priority = fluid.parsePriority(spec.priority, collection.length, true, "model listener");
            collection.push(spec);
            return spec;
        };
        that.modelChanged.removeListener = function (listener) {
            var id = fluid.event.identifyListener(listener);
            var namespace = typeof(listener) === "string" ? listener: null;
            var removePred = function (record) {
                return record.id === id || record.namespace === namespace;
            };
            fluid.remove_if(that.changeListeners.listeners, removePred);
            fluid.remove_if(that.changeListeners.transListeners, removePred);
        };
        that.fireChangeRequest = function (changeRequest) {
            var ation = that.initiate();
            ation.fireChangeRequest(changeRequest);
            ation.commit();
        };

        that.initiate = function (source, transactionId) {
            source = source || "local";
            var defeatPost = source === "relay"; // defeatPost is supplied for all non-top-level transactions
            var trans = {
                instanceId: fluid.allocateGuid(), // for debugging only
                id: transactionId || fluid.allocateGuid(),
                sources: {},
                changeRecord: {
                    resolverSetConfig: options.resolverSetConfig, // here to act as "options" in applyHolderChangeRequest
                    resolverGetConfig: options.resolverGetConfig
                },
                reset: function () {
                    trans.oldHolder = holder;
                    trans.newHolder = { model: fluid.copy(holder.model) };
                    trans.changeRecord.changes = 0;
                    trans.changeRecord.unchanged = 0; // just for type consistency - we don't use these values in the ChangeApplier
                    trans.changeRecord.changeMap = {};
                },
                commit: function (code) {
                    that.preCommit.fire(trans, that, code);
                    if (trans.changeRecord.changes > 0) {
                        var oldHolder = {model: holder.model};
                        holder.model = trans.newHolder.model;
                        fluid.notifyModelChanges(that.changeListeners.transListeners, trans.changeRecord.changeMap, holder, oldHolder, null, trans, that, holder);
                    }
                    if (!defeatPost) {
                        that.postCommit.fire(trans, that, code);
                    }
                },
                fireChangeRequest: function (changeRequest) {
                    fluid.preFireChangeRequest(that, changeRequest);
                    changeRequest.transactionId = trans.id;
                    var deltaMap = fluid.model.applyHolderChangeRequest(trans.newHolder, changeRequest, trans.changeRecord);
                    fluid.notifyModelChanges(that.changeListeners.listeners, deltaMap, trans.newHolder, holder, changeRequest, trans, that, holder);
                }
            };
            trans.sources[source] = true;
            trans.reset();
            fluid.bindRequestChange(trans);
            return trans;
        };
        that.hasChangeSource = function (source, changes) { // compatibility for old API
            return changes ? changes[source] : false;
        };

        fluid.bindRequestChange(that);
        fluid.bindELMethods(that);
        return that;
    };

})(jQuery, fluid_2_0_0_beta_1);

/*! Bergson 0.9.4, Copyright 2015 Colin Clark | github.com/colinbdclark/bergson */

/*
 * Bergson Clocks
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require, performance*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * Clock is the base grade for all Clocks.
     */
    fluid.defaults("berg.clock", {
        gradeNames: ["fluid.component"],

        freq: 1, // Ticks per second.

        members: {
            /**
             * The clock's current time, in seconds.
             */
            time: 0,

            /**
             * The frequency (in Hz) that the clock is
             * running at.
             * This value is not guaranteed to be precise all clocks.
             */
            freq: "{that}.options.freq",

            /**
             * The duration, in seconds, between ticks.
             * This value is not guaranteed to be precise for all clocks.
             */
            tickDuration: {
                expander: {
                    funcName: "berg.clock.calcTickDuration",
                    args: "{that}.freq"
                }
            }
        },

        invokers: {
            start: "fluid.identity()",
            tick: "fluid.identity()",
            stop: "fluid.identity()"
        },

        events: {
            onTick: null
        },

        listeners: {
            onDestroy: [
                "{that}.stop()"
            ]
        }
    });

    berg.clock.calcTickDuration = function (freq) {
        return 1.0 / freq;
    };

    /**
     * Offline Clock
     *
     * An Offline Clock tracks time relatively
     * (i.e. without reference to a "real" source of time
     * such as the system clock).
     *
     * This clock can be driven manually
     * (perhaps by an offline frame or audio sample renderer)
     * by invoking its tick() method.
     */
    fluid.defaults("berg.clock.offline", {
        gradeNames: ["berg.clock"],

        invokers: {
            tick: {
                funcName: "berg.clock.offline.tick",
                args: ["{that}"]
            }
        }
    });

    berg.clock.offline.tick = function (that) {
        that.time = that.time + that.tickDuration;
        that.events.onTick.fire(that.time, that.freq);
    };


    /**
     * A Realtime Clock tracks time based on actual system time
     * (i.e. performance.now)
     */
    fluid.defaults("berg.clock.realtime", {
        gradeNames: ["berg.clock"],

        members: {
            time: "@expand:berg.clock.realtime.now()"
        },

        invokers: {
            tick: {
                funcName: "berg.clock.realtime.tick",
                args: ["{that}"]
            }
        }
    });

    // TODO: Remove this in favour of a direct call
    // to performance.now() once Safari supports it
    // in Web Workers.
    berg.clock.realtime.now = function () {
        return performance.now() / 1000;
    };

    // Terrible hack to workaround Safari's lack of
    // support for performance.now().
    if (typeof performance === "undefined") {
        berg.clock.realtime.now = function () {
            return Date.now() / 1000;
        };
    }

    berg.clock.realtime.tick = function (that) {
        that.time = berg.clock.realtime.now();
        that.events.onTick.fire(that.time, that.freq);
    };

}());
;/* Bergson Priority Queue
 *
 * Based on Marijn Haverbeke's Binary Heap,
 * published in the 1st edition of Eloquent JavaScript
 * http://eloquentjavascript.net/1st_edition/appendix2.html
 *
 * License: Creative Commons Attribution 3.0 Unported
 * Copyright 2013 Marijn Haverbeke
 * Copyright 2015 Colin Clark
 */
/*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    fluid.registerNamespace("berg");

    /**
     * Priority Queue
     *
     * Stores elements sorted by their order of priority.
     * This implementation uses a binary heap algorithm in order to
     * efficiently keep items sorted.
     *
     * @return the new queue instance
     */
    berg.priorityQueue = function () {
        var that = {
            items: []
        };

        /**
         * Adds a new item to the queue.
         *
         * @param the item to add
         */
        that.push = function (item) {
            if (!item) {
                return;
            }

            if (item.priority === undefined) {
                throw new Error("An item without a priority cannot be added to the queue.");
            }

            // Add the new element to the end of the array.
            that.items.push(item);
            // Allow it to bubble up.
            that.bubbleUp(that.items.length - 1);
        };

        /**
         * Returns the highest-priority element from the queue.
         * This method will not remove the item from the queue.
         *
         * @return the highest-priority element
         */
        that.peek = function () {
            return that.items[0];
        };

        /**
         * Removes the highest-priority element from the queue and returns it.
         *
         * @return the highest-priority element in the queue
         */
        that.pop = function () {
            // Store the first element so we can return it later.
            var result = that.items[0],
                end = that.items.pop();

            // If there are any elements left, put the end element at the
            // start, and let it sink down.
            if (that.items.length > 0) {
                that.items[0] = end;
                that.sinkDown(0);
            }

            return result;
        };

        /**
         * Removes the specified item from the queue.
         *
         * @param item the item to remove
         */
        that.remove = function (item) {
            var len = that.items.length;
            // To remove a value, we must search through the array to find it.
            for (var i = 0; i < len; i++) {
                if (that.items[i] !== item) {
                    continue;
                }
                // When it is found, the process seen in 'pop' is repeated
                // to fill up the hole.
                var end = that.items.pop();
                // If the element we popped was the one we needed to remove,
                // we're done.
                if (i === len - 1) {
                    break;
                }
                // Otherwise, we replace the removed element with the popped
                // one, and allow it to float up or sink down as appropriate.
                that.items[i] = end;
                that.bubbleUp(i);
                that.sinkDown(i);

                break;
            }
        };

        /**
         * Returns the number of items in the queue.
         *
         * @return the number of items
         */
        that.size = function () {
            return that.items.length;
        };

        /**
         * Clears all items from the queue.
         */
        that.clear = function () {
            that.items.length = 0;
        };

        // Unsupported, non-API method.
        that.bubbleUp = function (n) {
            // Fetch the element that has to be moved.
            var item = that.items[n];

            // When at 0, an element can not go up any further.
            while (n > 0) {
                // Compute the parent element's index, and fetch it.
                var parentN = (n - 1) >> 1,
                    parent = that.items[parentN];
                // If the parent has a lesser score, things are in order and we
                // are done.
                if (parent.priority <= item.priority) {
                    break;
                }

                // Otherwise, swap the parent with the current element and
                // continue.
                that.items[parentN] = item;
                that.items[n] = parent;
                n = parentN;
            }
        };

        // Unsupported, non-API method.
        that.sinkDown = function (n) {
            // Look up the target element and its score.
            var length = that.items.length,
                item = that.items[n],
                child1;

            while (true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) * 2,
                    child1N = child2N - 1,
                    swap = null; // The new position of the item, if any.

                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    child1 = that.items[child1N];

                    // If the score is less than our element's, we need to swap.
                    if (child1.priority < item.priority) {
                        swap = child1N;
                    }
                }

                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = that.items[child2N],
                        right = swap === null ? item : child1;

                    if (child2.priority < right.priority) {
                        swap = child2N;
                    }
                }

                // No need to swap further, we are done.
                if (swap === null) {
                    break;
                }

                // Otherwise, swap and continue.
                that.items[n] = that.items[swap];
                that.items[swap] = item;
                n = swap;
            }
        };

        return that;
    };

}());
;/*
 * Bergson postMessage Components
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require, self*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    // A function that returns "self",
    // in order to prevent Infusion from chewing it.
    // TODO: Will a mergePolicy address this?
    berg.getGlobalSelf = function () {
        return self;
    };

    fluid.defaults("berg.postMessageSender", {
        gradeNames: ["fluid.component"],

        members: {
            messageTarget: "@expand:berg.getGlobalSelf()"
        },

        invokers: {
            postMessage: "berg.postMessageSender.postMessage({arguments}.0, {arguments}.1, {that}.messageTarget)"
        }
    });

    berg.postMessageSender.postMessage = function (type, args, messageTarget) {
        if (typeof type !== "string") {
            throw new Error("Can't post a message without a message type.");
        }

        var message = {
            type: type,
            args: args
        };

        messageTarget.postMessage(message);
    };


    fluid.defaults("berg.postMessageListener", {
        gradeNames: ["fluid.component"],

        members: {
            messageSource: "@expand:berg.getGlobalSelf()"
        },

        events: {
            onError: null
        },

        listeners: {
            onCreate: [
                "berg.postMessageListener.bind({that})"
            ],

            onError: [
                {
                    namespace: "failOnError",
                    funcName: "fluid.fail"
                }
            ]
        }
    });

    berg.postMessageListener.bind = function (that) {
        that.messageSource.addEventListener("message", function (e) {
            var msg = e.data;

            if (!msg.type) {
                that.events.onError.fire("Received a remote message without a type. " +
                    fluid.prettyPrintJSON(msg));
            }

            var invoker = that[msg.type];
            if (!that.options.invokers[msg.type] || !invoker) {
                that.events.onError.fire("Received a message of type " + msg.type +
                    ", which did not resolve to a component invoker. Invokers: " +
                    fluid.prettyPrintJSON(that.options.invokers));
            }

            var args = fluid.makeArray(msg.args);
            invoker.apply(null, args);
        }, false);
    };

}());
;/*
 * Bergson Scheduler
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * Scheduler
     *
     * Responsible for scheduling "score event specifications"
     * at defined moments in time.
     *
     * Schedulers are typically driven by a Clock instance.
     *
     * Bergson provides two primary scheduling primitives:
     *  1. "once", which will schedule a one-time event
     *  2. "repeat", which schedules a repeating event
     *
     * Score Event Specifications:
     *
     * One-time events:
     *    {
     *        type: "once",
     *
     *        // a future time in seconds when the callback should be invoked
     *        time: 2,
     *
     *        // a function to invoke at the specified time
     *        callback: function (time, this) {}
     *    }
     *
     * Repeating events:
     *    {
     *        type: "repeat",
     *
     *        // The frequency, in Hz, at which to repeat
     *        freq: 5,
     *
     *        // A future time in seconds at which to start repeating. Defaults to 0.
     *        time: 2,
     *
     *        // A future time in seconds at which to stop. Defaults to Infinity
     *        //(i.e. never stop)
     *        end: 20,
     *
     *        // A function to invoke repeatedly.
     *        callback: callback
     *    }
     *
     * Note: the Bergson scheduler operates a simple "rounding"
     * quantization scheme for changes that are finer-grained
     * than the resolution of its clock. So, for example, if the
     * clock is running at a freq of 1 tick/second, an event scheduled
     * at time 1.5 seconds or less will be invoked at the 1 second tick, while
     * events scheduled at a time greater than half a tick
     * will be invoked at the 2 second tick.
     *
     * The order of events scheduled for the same clock time is indeterminate.
     *
     */
    fluid.defaults("berg.scheduler", {
        gradeNames: ["fluid.modelComponent"],

        members: {
            queue: "@expand:berg.priorityQueue()",

            // By default, we schedule ahead by half a tick's duration.
            lookahead: "@expand:berg.scheduler.calcLookahead({clock})"
        },

        model: {
            timeScale: 1.0
        },

        components: {
            clock: { // Should be supplied by the user.
                type: "berg.clock.offline"
            }
        },

        invokers: {
            /**
             * Starts this scheduler's clock.
             */
            start: "{clock}.start()",

            /**
             * Stops this scheduler's clock.
             */
            stop: "{clock}.stop()",

            /**
             * Causes the scheduler to evaluate its
             * queue of scheduled callback and fire those that
             * are appropriate for the current clock time.
             *
             * This function is invoked automatically when the
             * scheduler's clock fires its onTick event.
             *
             * @param {Number} now - the current clock time, in seconds
             */
            tick: "berg.scheduler.tick({arguments}.0, {that})",

            /**
             * Schedules one or more score event specifications.
             *
             * @param {Object||Array} scoreSpecs - the score event specifications to schedule
             */
            schedule: "berg.scheduler.schedule({arguments}.0, {that})",

            /**
             * Schedules a callback to be fired once at the specified time.
             *
             * @param {Number} time - the time from now, in seconds, to schedule the callback
             * @param {Function} callback - the callback to schedule
             */
            once: "berg.scheduler.once({arguments}.0, {arguments}.1, {that})",

            /**
             * Schedules a callback to be fired repeatedly at the specified frequency.
             *
             * @param {Number} freq - the frequency (per second) to repeat at
             * @param {Function} callback - the callback to schedule
             * @param {Number} time - the time (in seconds) to start repeating at
             * @param {Number} end - the time (in seconds) to stop repeating at; this value is inclusive
             */
            repeat: {
                funcName: "berg.scheduler.repeat",
                args: [
                    "{arguments}.0",
                    "{arguments}.1",
                    "{arguments}.2",
                    "{arguments}.3",
                    "{that}"
                ]
            },

            /**
             * Clears a scheduled event,
             * causing it not to be evaluated by this scheduler
             * if it hasn't already fired or is repeating.
             *
             * @param {Object} eventSpec - the event specification to clear
             */
            clear: "{that}.queue.remove({arguments}.0)",

            /**
             * Clears all scheduled events.
             */
            clearAll: "{that}.queue.clear()",

            /**
             * Scales the scheduled time of all currently and future events.
             *
             * @param {Number} value - the timeScale value (default is 1.0)
             */
            setTimeScale: {
                changePath: "timeScale",
                value: "{arguments}.0"
            },

            // Unsupported, non-API function.
            scheduleEvent: {
                funcName: "berg.scheduler.scheduleEvent",
                args: ["{arguments}.0", "{that}"]
            },

            // Unsupported, non-API function.
            invokeCallback: {
                funcName: "berg.scheduler.invokeCallback",
                args: ["{arguments}.0", "{arguments}.1"]
            }
        },

        modelListeners: {
            timeScale: {
                funcName: "berg.scheduler.scaleEventTimes",
                args: ["{that}.queue", "{change}.value"],
                excludeSource: "init"
            }
        },

        listeners: {
            "{clock}.events.onTick": {
                func: "{scheduler}.tick"
            }
        }
    });

    berg.scheduler.calcLookahead = function (clock) {
        return clock.tickDuration / 2;
    };

    // Unsupported, non-API function.
    berg.scheduler.calcPriority = function (baseTime, timeOffset, timeScale) {
        return baseTime + (timeOffset * timeScale);
    };

    // Unsupported, non-API function.
    berg.scheduler.scaleEventTimes = function (queue, timeScale) {
        for (var i = 0; i < queue.items.length; i++) {
            var item = queue.items[i];
            item.priority = berg.scheduler.calcPriority(item.scheduledAt, item.time, timeScale);
        }
    };

    // Unsupported, non-API function.
    berg.scheduler.expandRepeatingEventSpec = function (now, eventSpec) {
        if (typeof eventSpec.time !== "number") {
            eventSpec.time = 0;
        }
        eventSpec.interval = 1.0 / eventSpec.freq;
        eventSpec.end = typeof eventSpec.end !== "number" ?
            Infinity : eventSpec.end + now;
    };

    // Unsupported, non-API function.
    berg.scheduler.validateEventSpec = function (eventSpec) {
        // TODO: Provide a means to perform implementation-specific validation.
        if (eventSpec.type === "repeat" && typeof eventSpec.freq !== "number") {
            throw new Error("No freq was specified for scheduled event: " +
                fluid.prettyPrintJSON(eventSpec));
        }

        if (typeof eventSpec.time !== "number") {
            throw new Error("No time was specified for scheduled event: " +
                fluid.prettyPrintJSON(eventSpec));
        }
    };

    berg.scheduler.invokeCallback = function (now, scoreEvent) {
        scoreEvent.callback(now, scoreEvent);
    };

    // Unsupported, non-API function.
    berg.scheduler.evaluateScoreEvent = function (now, scoreEvent, that) {
        that.invokeCallback(now, scoreEvent);

        // If it's a repeating event, queue it back up.
        if (scoreEvent.type === "repeat" && scoreEvent.end > now) {
            scoreEvent.priority = berg.scheduler.calcPriority(now, scoreEvent.interval, that.model.timeScale);
            that.queue.push(scoreEvent);
        }
    };

    berg.scheduler.expandEventSpec = function (eventSpec) {
        // TODO: Should we warn on omitted type?
        if (!eventSpec.type) {
            eventSpec.type = "once";
        }

        // Ensure all event specs have IDs (for debugging and complex scheduling cases).
        if (!eventSpec.id) {
            eventSpec.id = fluid.allocateGuid();
        }
    };

    // Unsupported, non-API function.
    berg.scheduler.scheduleEvent = function (eventSpec, that) {
        var now = that.clock.time,
            timeScale = that.model.timeScale;

        berg.scheduler.expandEventSpec(eventSpec);
        if (eventSpec.type === "repeat") {
            berg.scheduler.expandRepeatingEventSpec(now, eventSpec);
        }

        if (typeof eventSpec.scheduledAt !== "number") {
            eventSpec.scheduledAt = now;
        }

        berg.scheduler.validateEventSpec(eventSpec);
        eventSpec.priority = berg.scheduler.calcPriority(now, eventSpec.time, timeScale);

        if (eventSpec.priority <= now) {
            berg.scheduler.evaluateScoreEvent(now, eventSpec, that);
        } else {
            that.queue.push(eventSpec);
        }

        return eventSpec;
    };

    // Unsupported, non-API function.
    berg.scheduler.scheduleEvents = function (eventSpecs, that) {
        eventSpecs.forEach(function (eventSpec) {
            that.scheduleEvent(eventSpec);
        });

        return eventSpecs;
    };

    berg.scheduler.schedule = function (eventSpec, that) {
        return fluid.isArrayable(eventSpec) ?
            berg.scheduler.scheduleEvents(eventSpec, that) :
            that.scheduleEvent(eventSpec);
    };

    berg.scheduler.once = function (time, callback, that) {
        var eventSpec = {
            type: "once",
            time: time,
            callback: callback
        };

        return that.scheduleEvent(eventSpec);
    };

    berg.scheduler.repeat = function (freq, callback, time, end, that) {
        var eventSpec = {
            type: "repeat",
            freq: freq,
            time: time,
            end: end,
            callback: callback
        };

        return that.scheduleEvent(eventSpec);
    };

    berg.scheduler.tick = function (now, that) {
        var next = that.queue.peek();

        // Check to see if this event should fire now
        // (or should have fired earlier!)
        while (next && next.priority <= now + that.lookahead) {
            // Take it out of the queue and invoke its callback.
            that.queue.pop();
            berg.scheduler.evaluateScoreEvent(now, next, that);
            next = that.queue.peek();
        }
    };

}());
;/*
 * Bergson Worker-based Scheduler
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * A Scheduler that runs in a Web Worker or other environment
     * where it delegates callback invocation to an out-of-thread proxy
     * using postMessage().
     */
    fluid.defaults("berg.scheduler.postMessage", {
        gradeNames: [
            "berg.postMessageListener",
            "berg.postMessageSender",
            "berg.scheduler"
        ],

        invokers: {
            invokeCallback: {
                funcName: "berg.scheduler.postMessage.post",
                args: ["invokeCallback", ["{arguments}.0", "{arguments}.1"], "{that}"]
            }
        }
    });

    // TODO: Apparent Infusion options merging bug.
    // Try with compact invoker syntax or "func",
    // and it will fail due to creating a merged invoker record
    // containing both "funcName" and "func".
    berg.scheduler.postMessage.post = function (type, args, that) {
        that.postMessage(type, args);
    };

    /**
     * A Proxy Scheduler that communicates with  a
     * Web Worker-based PostMessageScheduler via postMessage.
     *
     * The Proxy Scheduler is responsible for maintaining a map
     * of functions by id so that they can be invoked in the current thread.
     */
    fluid.defaults("berg.scheduler.workerProxy", {
        gradeNames: [
            "berg.scheduler",
            "berg.postMessageListener",
            "berg.postMessageSender"
        ],

        scriptPath: "../../dist/bergson-all-worker.js",

        remoteSchedulerOptions: {
            components: {
                clock: {
                    type: "berg.clock.setInterval",
                    options: {
                        freq: 1 / 100 // Tick every 10 ms by default.
                    }
                }
            }
        },

        members: {
            eventSpecMap: {},
            worker: "@expand:berg.scheduler.workerProxy.createWorker({that}.options.scriptPath)",
            messageTarget: "{that}.worker",
            messageSource: "{that}.worker"
        },

        components: {
            clock: {
                type: "berg.clock" // The real clock is in the other universe.
            }
        },

        invokers: {
            start: "{that}.postMessage(start)",
            stop: "{that}.postMessage(stop)",
            tick: "fluid.identity()",
            invokeCallback: "berg.scheduler.workerProxy.invokeCallback({arguments}.0, {arguments}.1, {that})",
            scheduleEvent: "berg.scheduler.workerProxy.scheduleEvent({arguments}.0, {that})",
            clear: "{that}.postMessage(clear, {arguments}.0)",
            clearAll: "{that}.postMessage(clearAll)",
            setTimeScale: "{that}.postMessage(setTimeScale, {arguments}.0)"
        },

        listeners: {
            onCreate: [
                {
                    func: "{that}.postMessage",
                    args: ["create", ["berg.scheduler.postMessage", "{that}.options.remoteSchedulerOptions"]]
                }
            ],

            onDestroy: [
                {
                    this: "{that}.worker",
                    method: "terminate"
                }
            ]
        }
    });

    berg.scheduler.workerProxy.createWorker = function (scriptPath) {
        return new Worker(scriptPath);
    };

    berg.scheduler.workerProxy.invokeCallback = function (now, scoreEventSpecFromWorker, that) {
        var localEventSpec = that.eventSpecMap[scoreEventSpecFromWorker.id],
            callback = localEventSpec.callback;

        if (typeof callback === "function") {
            callback(now, scoreEventSpecFromWorker);
        } else {
            that.events.onError.fire("A callback function was not found for score event: " +
                fluid.prettyPrintJSON(localEventSpec));
        }
    };

    berg.scheduler.workerProxy.makeTransferrableCopy = function (eventSpec) {
        var toTransfer = fluid.copy(eventSpec);
        delete toTransfer.callback; // Functions can't survive the journey to the other universe.

        return toTransfer;
    };

    berg.scheduler.workerProxy.scheduleEvent = function (eventSpec, that) {
        berg.scheduler.expandEventSpec(eventSpec);
        that.eventSpecMap[eventSpec.id] = eventSpec;

        var toTransfer = berg.scheduler.workerProxy.makeTransferrableCopy(eventSpec);
        that.postMessage("scheduleEvent", toTransfer);
    };

}());
;/*
 * Bergson requestAnimationFrame Clock
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require, requestAnimationFrame, cancelAnimationFrame, performance*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * The RAF Clock is a realtime clock driven by
     * window.requestAnimationFrame()
     */
    fluid.defaults("berg.clock.raf", {
        gradeNames: ["berg.clock.realtime"],

        freq: 60, // This should be overridden by the user
                  // to match the refresh rate of their display.

        members: {
            requestID: null
        },

        invokers: {
            start: {
                funcName: "berg.clock.raf.requestNextTick",
                args: ["{that}"]
            },

            tick: {
                funcName: "berg.clock.raf.tick",
                args: ["{that}"]
            },

            stop: {
                funcName: "berg.clock.raf.stop",
                args: ["{that}"]
            }
        }
    });

    berg.clock.raf.requestNextTick = function (that) {
        that.requestID = requestAnimationFrame(that.tick);
    };

    berg.clock.raf.tick = function (that) {
        berg.clock.raf.requestNextTick(that);

        var now = performance.now() / 1000;
        that.time = now;
        that.events.onTick.fire(now, that.freq);
    };

    berg.clock.raf.stop = function (that) {
        cancelAnimationFrame(that.requestID);
    };

}());
;/*
 * Bergson setInterval Clock
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    fluid.defaults("berg.clock.setInterval", {
        gradeNames: ["berg.clock.realtime"],

        freq: 10,

        members: {
            intervalID: null
        },

        invokers: {
            start: {
                funcName: "berg.clock.setInterval.start",
                args: ["{that}"]
            },

            stop: {
                funcName: "berg.clock.setInterval.stop",
                args: ["{that}"]
            }
        }
    });

    berg.clock.setInterval.start = function (that) {
        that.intervalID = setInterval(that.tick, 1000 / that.freq);
    };

    berg.clock.setInterval.stop = function (that) {
        clearInterval(that.intervalID);
    };
}());
;/*
 * Bergson Clock Logger
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
 /*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * Interval Logger logs the interval between ticks over time
     * into a typed array that can be used to analyse the realtime
     * performance of a clock instance (e.g. to determine definitively
     * if the clock is dropping frames).
     */
    fluid.defaults("berg.clock.logger", {
        gradeNames: ["fluid.component"],

        numTicksToLog: 60 * 60 * 20, // Twenty minutes at 60 fps by default.

        members: {
            tickCounter: 0,
            lastTickTime: null,
            interval: 0,
            intervalLog: "@expand:berg.clock.logger.initLog({that}.options.numTicksToLog)"
        },

        invokers: {
            log: "berg.clock.logger.log({that})"
        },

        listeners: {
            "{clock}.events.onTick": [
                "{that}.log()"
            ]
        }
    });

    berg.clock.logger.initLog = function (numTicksToLog) {
        return new Float32Array(numTicksToLog);
    };

    berg.clock.logger.log = function (that) {
        if (that.lastTickTime === null) {
            that.lastTickTime = that.time;
            return;
        }

        that.tickCounter++;
        that.interval = that.time - that.lastTickTime;

        if (that.tickCounter < that.options.numTicksToLog) {
            that.intervalLog[that.tickCounter] = that.interval;
        }
    };
}());
;/*
 * Bergson Web Worker-based setInterval Clock
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require, self*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    berg.worker = function (code) {
        var type = typeof code,
            url,
            blob;

        if (type === "function") {
            code = "(" + code.toString() + ")();";
        } else if (type !== "string") {
            throw new Error("A berg.worker must be initialized with a String or a Function.");
        }

        if (window.Blob) {
            blob = new Blob([code], {
                type: "text/javascript"
            });
            url = (window.URL || window.webkitURL).createObjectURL(blob);
        } else {
            url = "data:text/javascript;base64," + window.btoa(code);
        }
        return new Worker(url);
    };

    fluid.defaults("berg.clock.workerSetInterval", {
        gradeNames: [
            "berg.clock.realtime",
            "berg.postMessageListener",
            "berg.postMessageSender"
        ],

        freq: 10,

        members: {
            worker: "@expand:berg.clock.workerSetInterval.createWorker()",
            messageTarget: "{that}.worker",
            messageSource: "{that}.worker"
        },

        invokers: {
            start: "{that}.events.onStart.fire",
            stop: "{that}.events.onStop.fire"
        },

        events: {
            onStart: null,
            onStop: null
        },

        listeners: {
            onStart: [
                {
                    func: "{that}.postMessage",
                    args: ["start", {
                        freq: "{that}.freq"
                    }]
                }
            ],

            onStop: [
                "{that}.postMessage(stop)",
                {
                    this: "{that}.worker",
                    method: "terminate"
                }
            ]
        }
    });

    berg.clock.workerSetInterval.createWorker = function () {
        return berg.worker(berg.clock.workerSetInterval.workerImpl);
    };


    // Note: This function is intended to be invoked as
    // an berg.worker only.
    berg.clock.workerSetInterval.workerImpl = function () {
        "use strict"; // jshint ignore:line

        var berg = {};

        berg.workerClock = function (options) {
            var that = {
                options: options || {},
                intervalID: null
            };

            that.start = function () {
                that.intervalID = setInterval(that.tick, 1000 / that.options.freq);
            };

            that.tick = function () {
                self.postMessage({
                    type: "tick"
                });
            };

            that.stop = function () {
                clearInterval(that.intervalID);
            };

            return that;
        };

        self.addEventListener("message", function (e) {
            if (e.data.type === "start") {
                berg.clock = berg.workerClock({
                    freq: e.data.value
                });
                berg.clock.start();
            } else if (e.data.type === "stop") {
                if (berg.clock) {
                    berg.clock.stop();
                }
                self.close();
            }
        }, false);
    };
}());
;/*
 * Bergson AudioContext Clock
 * http://github.com/colinbdclark/bergson
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */
/*global require*/
var fluid = fluid || require("infusion"),
    berg = fluid.registerNamespace("berg");

(function () {
    "use strict";

    /**
     * AudioContext Clock
     *
     * An AudioContext Clock takes its real time value
     * from a WebAudio API AudioContext instance.
     *
     * An AudioContext instance will created if one is not
     * provided as a member option when instaniating this clock.
     *
     * This clock needs to be ticked manually; you will typically
     * invoke its tick() method in a custom ScriptProcessorNode.onaudioprocess
     * implementation.
     */
    fluid.defaults("berg.clock.audioContext", {
        gradeNames: ["berg.clock.realtime"],

        blockSize: 256,

        mergePolicy: {
            "members.context": "noexpand"
        },

        members: {
            context: "@expand:berg.clock.audioContext.createContext()",
            freq: "@expand:berg.clock.audioContext.calcFreq({that}.context, {that}.options.blockSize)",
            time: "@expand:berg.clock.audioContext.now({that}.context)"
        },

        invokers: {
            tick: {
                funcName: "berg.clock.audioContext.tick",
                args: ["{that}"]
            }
        }
    });

    berg.clock.audioContext.createContext = function () {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        return new AudioContext();
    };

    berg.clock.audioContext.calcFreq = function (context, blockSize) {
        return context.sampleRate / blockSize;
    };

    berg.clock.audioContext.now = function (context) {
        return context.currentTime;
    };

    berg.clock.audioContext.tick = function (that) {
        that.time = that.context.currentTime;
        that.events.onTick.fire(that.time, that.freq);
    };

    /**
     * An AutoAudioContext Clock automatically creates
     * and configures a ScriptProcessorNode to drive the clock.
     */
    fluid.defaults("berg.clock.autoAudioContext", {
        gradeNames: ["berg.clock.audioContext"],

        mergePolicy: {
            "members.scriptNode": "noexpand"
        },

        members: {
            scriptNode: {
                expander: {
                    funcName: "berg.clock.autoAudioContext.createScriptNode",
                    args: ["{that}.context", "{that}.options.blockSize", "{that}.tick"]
                }
            }
        },

        invokers: {
            start: {
                funcName: "berg.clock.autoAudioContext.start",
                args: ["{that}.context", "{that}.scriptNode"]
            },

            stop: {
                funcName: "berg.clock.autoAudioContext.stop",
                args: ["{that}.context", "{that}.scriptNode"]
            }
        }
    });

    berg.clock.autoAudioContext.createScriptNode = function (context, blockSize, tick) {
        var sp = context.createScriptProcessor(blockSize, 1, 1);
        sp.onaudioprocess = tick;
        return sp;
    };

    berg.clock.autoAudioContext.start = function (context, scriptNode) {
        scriptNode.connect(context.destination);
    };

    berg.clock.autoAudioContext.stop = function (context, scriptNode) {
        scriptNode.disconnect(context.destination);
        scriptNode.onaudioprocess = undefined;
    };

}());

/*! Sam Fisher Motion Detector 1.0.0, Copyright 2015 Colin Clark | github.com/colinbdclark/samfisher */
/*
 * Sam Fisher Core
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fisher = fisher || {};

(function () {
    "use strict";

    fisher.countPixels = function (d) {
        return d.height * d.width;
    };

    fisher.buffer = function (numChannels, d) {
        var numPixels = fisher.countPixels(d),
            len = numChannels * numPixels;

        return new Uint8ClampedArray(len);
    };

    fisher.createColourImageBuffer = function (d) {
        var buffer = fisher.buffer(4, d);

        // Set the alpha channel to fully opaque.
        for (var i = 3; i < buffer.length; i += 4) {
            buffer[i] = 255;
        }

        return buffer;
    };


    /**
     * Calculates the luminance of the specified pixel frame.
     *
     * @param Number localOffset the current offset into the buffer
     * @return Number the pixel's luminance
     */
    fisher.luminance = function (i, buffer) {
        return buffer[i] * 0.2126 + buffer[i + 1] * 0.7152 + buffer[i + 2] * 0.0722;
    };

    /**
     * Converts the source buffer to greyscale and copies it into the target buffer.
     *
     * @param Uint8ClampedArray source the buffer to convert to greyscale
     * @param Uint8ClampedArray target the greyscale copy
     */
    fisher.greyscale = function (source, target) {
        for (var i = 0; i < target.length; i++) {
            target[i] = fisher.luminance(i * 4, source);
        }
    };

    /**
     * Subtracts the current pixel from the previous one,
     * returning the absolute difference between them.
     *
     * @param Number offset the current offset
     * @param Uint8ClampedArray currentGrey the current image
     * @param Uint8ClampedArray previousGrey the previous image
     */
    fisher.difference = function (offset, current, previous) {
        return Math.abs(previous[offset] - current[offset]);
    };


    fisher.filter = {};

    fisher.filter.convolve = function (kernel, source, target, d) {
        var kW = Math.sqrt(kernel.length),
            halfKW = Math.floor(kW / 2),
            h = d.height,
            w = d.width,
            accum;

        for (var y = halfKW; y < h - halfKW - 1; y++) {
            for (var x = halfKW; x < w - halfKW - 1; x++) {
                accum = 0;

                // Apply the kernel to the source image.
                for (var kY = 0; kY < kW; kY++) {
                    var sky = y + kY - halfKW;
                    var skw = sky * w;

                    for (var kX = 0; kX < kW; kX++) {
                        var skIdx = skw + (x + kX - halfKW);
                        var kIdx = kY * kW + kX;
                        accum += source[skIdx] * kernel[kIdx];
                    }
                }

                // Output the result of the kernel to the current target pixel.
                var soIdx = (y * w + x);
                target[soIdx] = accum;
            }
        }
    };

    fisher.filter.mean = function (source, target, d) {
        return fisher.filter.convolve(fisher.filter.mean.kernel, source, target, d);
    };

    fisher.filter.mean.kernel = [
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9
    ];
}());

/*
 * Sam Fisher Pixel Extractor
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    fluid.defaults("fisher.frameScheduler", {
        gradeNames: "berg.scheduler",

        freq: 15,

        components: {
            clock: {
                type: "berg.clock.raf"
            }
        }
    });

}());

/*
 * Sam Fisher Canvas
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, $, ImageData*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    fluid.defaults("fisher.canvas", {
        gradeNames: "fluid.component",

        dimensions: {
            height: 240,
            width: 320
        },

        members: {
            element: {
                expander: {
                    funcName: "fisher.canvas.createCanvas",
                    args: ["{that}.options.markup", "{that}.options.dimensions"]
                }
            },

            context: {
                expander: {
                    "this": "{that}.element",
                    method: "getContext",
                    args: "2d"
                }
            }
        },

        invokers: {
            drawElement: "fisher.canvas.drawElement({that}, {arguments}.0)",
            getPixels: "fisher.canvas.getPixels({that})",
            putPixels: "fisher.canvas.putPixels({that}, {arguments}.0, {arguments}.1, {arguments}.2)",
            putMonochromePixels: "fisher.canvas.putMonochromePixels({that}, {arguments}.0, {arguments}.1, {arguments}.2)"
        },

        markup: {
            canvas: "<canvas height='%height' width='%width'></canvas>"
        }
    });

    fisher.canvas.createCanvas = function (markup, dimensions) {
        return $(fluid.stringTemplate(markup.canvas, dimensions))[0];
    };

    fisher.canvas.drawElement = function (that, element) {
        that.context.drawImage(element, 0, 0,
            that.options.dimensions.width, that.options.dimensions.height);
    };

    fisher.canvas.getPixels = function (that) {
        return that.context.getImageData(0, 0,
            that.options.dimensions.width, that.options.dimensions.height).data;
    };

    fisher.canvas.putPixels = function (that, pixels, x, y) {
        var d = that.options.dimensions;
        x = x || 0;
        y = y || 0;

        var id = new ImageData(pixels, d.width, d.height);
        that.context.putImageData(id, x, y);
    };

    fisher.canvas.putMonochromePixels = function (that, pixels, x, y) {
        var rgbaPixels = fisher.canvas.getPixels(that);

        for (var i = 0; i < pixels.length; i++) {
            var rgbaIdx = i * 4,
                pixel = pixels[i];

            rgbaPixels[rgbaIdx] = pixel;
            rgbaPixels[rgbaIdx + 1] = pixel;
            rgbaPixels[rgbaIdx + 2] = pixel;
            rgbaPixels[rgbaIdx + 3] = 255;
        }

        fisher.canvas.putPixels(that, rgbaPixels, x, y);
    };
}());

/*
 * Sam Fisher Video
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require, navigator*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    fluid.defaults("fisher.liveVideo", {
        gradeNames: "fluid.modelComponent",

        constraints: {
            video: true,
            audio: false
        },

        members: {
            element: "@expand:fisher.liveVideo.createVideo()"
        },

        events: {
            onStreamOpen: null,
            onReady: null,
            onError: null
        },

        listeners: {
            onCreate: [
                "fisher.liveVideo.openStream({that})"
            ],

            onStreamOpen: [
                "fisher.liveVideo.connectStreamToVideo({that}, {arguments}.0)",
                "{that}.events.onReady.fire()"
            ]
        }
    });

    fisher.liveVideo.createVideo = function () {
        return document.createElement("video");
    };

    fisher.liveVideo.openStream = function (that) {
        navigator.getMedia(that.options.constraints,
            that.events.onStreamOpen.fire, that.events.onError.fire);
    };

    fisher.liveVideo.connectStreamToVideo = function (that, stream) {
        that.element.src = window.URL.createObjectURL(stream);
        that.element.play();
    };
}());

/*
 * Sam Fisher Tracked Region
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    fluid.defaults("fisher.trackedRegion", {
        gradeNames: "fluid.component",

        frameDimensions: {
            height: 240,
            width: 320
        },

        dimensions: {
            height: 240,
            width: 320,
            xOffset: 0,
            yOffset: 0
        },

        numChannels: 4,

        numPixels: {
            expander: {
                funcName: "fisher.countPixels",
                args: ["{that}.options.dimensions"]
            }
        },

        invokers: {
            motionIndex: {
                funcName: "fisher.trackedRegion.motionIndex",
                args: [
                    "{arguments}.0", // Current frame
                    "{arguments}.1", // Previous frame
                    "{that}.options"
                ]
            }
        }
    });

    /**
     * Calculates the index of motion for this Region
     * by determining the absolute difference between
     * the specified image buffers.
     *
     * @param Uint8ClampedArray current the current frame
     * @param Uint8ClampedArray previous the previous frame
     * @param Object o this region's options
     */
    fisher.trackedRegion.motionIndex = function (current, previous, o) {
        var d = o.dimensions;

        var rowEnd = d.yOffset + d.height,
            numMovedPixels = 0,
            colStart,
            colEnd,
            diff;

        for (var rowIdx = d.yOffset; rowIdx < rowEnd; rowIdx++) {
            colStart = (o.frameDimensions.width * rowIdx) + d.xOffset;
            colEnd = colStart + d.width;

            for (var i = colStart; i < colEnd; i++) {
                // Get the difference between frames.
                diff = fisher.difference(i, current, previous);

                // Count the pixel as showing movement
                // if it has changed more than the threshold amount.
                if (diff >= o.threshold) {
                    numMovedPixels++;
                }
            }
        }

        return numMovedPixels / o.numPixels;
    };

    fluid.defaults("fisher.trackedRegion.leftHalf", {
        gradeNames: "fisher.trackedRegion",

        dimensions: {
            height: 240,
            width: 160,
            xOffset: 0,
            yOffset: 0
        }
    });

    fluid.defaults("fisher.trackedRegion.rightHalf", {
        gradeNames: "fisher.trackedRegion",

        dimensions: {
            height: 240,
            width: 160,
            xOffset: 160,
            yOffset: 0
        }
    });
}());

/*
 * Sam Fisher Motion Tracker
 * Copyright 2015 Colin Clark
 * Distributed under the MIT and GPL2 licenses
 * github.com/colinbdclark/samfisher
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");
var fisher = fisher || {};

(function () {

    "use strict";

    fluid.defaults("fisher.motionTracker", {
        gradeNames: "fluid.modelComponent",

        threshold: Math.round(0.2 * 255),

        dimensions: {
            width: 320,
            height: 240
        },

        members: {
            current: "@expand:fisher.buffer(1, {that}.options.dimensions)",
            previous: "@expand:fisher.buffer(1, {that}.options.dimensions)"
        },

        distributeOptions: [
            {
                target: "{that fisher.trackedRegion}.options.frameDimensions",
                source: "{that}.options.dimensions"
            },
            {
                target: "{that fisher.trackedRegion}.options.threshold",
                source: "{that}.options.threshold"
            }
        ],

        components: {
            scheduler: {
                type: "fisher.frameScheduler"
            },

            streamer: {
                type: "fisher.liveVideo"
            },

            canvas: {
                type: "fisher.canvas",
                options: {
                    dimensions: "{that}.options.dimensions"
                }
            },

            frameTracker: {
                type: "fisher.frameTracker.stereo"
            }
        },

        events: {
            onMotionUpdate: "{frameTracker}.events.onMotionUpdate",
            onNextFrame: null
        },

        listeners: {
            onNextFrame: [
                "{that}.canvas.drawElement({that}.streamer.element)",
                "fisher.motionTracker.track({that})"
            ],

            onCreate: [
                "{scheduler}.start()",
                "{scheduler}.repeat({scheduler}.options.freq, {that}.events.onNextFrame.fire)"
            ]
        }
    });

    fisher.motionTracker.track = function (that) {
        var pixels = that.canvas.getPixels();
        fisher.greyscale(pixels, that.current);
        that.frameTracker.track(that.current, that.previous);
        that.previous.set(that.current);
    };


    fluid.defaults("fisher.frameTracker", {
        gradeNames: "fluid.component",

        invokers: {
            track: {
                funcName: "fluid.notImplemented"
            }
        },

        events: {
            onMotionUpdate: null
        }
    });

    fluid.defaults("fisher.frameTracker.mono", {
        gradenames: "fisher.frameTracker",

        components: {
            region: {
                type: "fisher.trackedRegion"
            }
        },

        invokers: {
            track: {
                funcName: "fisher.frameTracker.mono.track",
                args: ["{that}", "{arguments}.0", "{arguments}.1"]
            }
        }
    });

    fisher.frameTracker.mono.track = function (that, current, previous) {
        var motionIndex = that.region.motionIndex(current, previous);
        that.events.onMotionUpdate.fire(motionIndex);
    };


    fluid.defaults("fisher.frameTracker.stereo", {
        gradeNames: "fisher.frameTracker",

        components: {
            leftRegion: {
                type: "fisher.trackedRegion.leftHalf"
            },

            rightRegion: {
                type: "fisher.trackedRegion.rightHalf"
            }
        },

        invokers: {
            track: {
                funcName: "fisher.frameTracker.stereo.track",
                args: ["{that}", "{arguments}.0", "{arguments}.1"]
            }
        }
    });

    fisher.frameTracker.stereo.track = function (that, current, previous) {
        var l = that.leftRegion.motionIndex(current, previous),
            r = that.rightRegion.motionIndex(current, previous);

        that.events.onMotionUpdate.fire(l, r);
    };
}());
