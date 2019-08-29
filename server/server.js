(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/src/index.js":
/*!***************************!*\
  !*** ./dist/src/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nconst read_config_1 = __webpack_require__(/*! ./read-config */ \"./dist/src/read-config/index.js\");\r\nconst ws_api_1 = __webpack_require__(/*! ./ws-api */ \"./dist/src/ws-api/index.js\");\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst cors = __webpack_require__(/*! cors */ \"./node_modules/cors/lib/index.js\");\r\nconst app = express();\r\napp.use(cors());\r\n// Сообщения в случае ошибок\r\nconst WRONG_FORMAT = \"WRONG_FORMAT\";\r\nconst SYSTEM_ERROR = \"SYSTEM_ERROR\";\r\nconst UNKNOWN_TAG = \"UNKNOWN_TAG\";\r\nconst WRONG_TOKEN = \"WRONG_TOKEN\";\r\nconst BIG_DATA = \"BIG_DATA\";\r\nlet config;\r\ntry {\r\n    config = read_config_1.readConfig(path_1.join(__dirname, \"/config.json\"));\r\n}\r\ncatch (e) {\r\n    console.log(e.stack);\r\n    process.exit(1);\r\n}\r\nconst wsProcessor = new ws_api_1.WSSocketProcessor(config);\r\nfunction error(res, statusCode, errMsg) {\r\n    res.status(statusCode);\r\n    res.send(JSON.stringify({ status: \"error\", error: errMsg }));\r\n}\r\nfunction resultOk(res, data) {\r\n    res.status(200);\r\n    res.send(JSON.stringify({ status: \"ok\", data }));\r\n}\r\napp.get(\"*\", (req, res) => {\r\n    res.send('Server is working. Please post at \"/login\" to submit a message.');\r\n});\r\napp.post(\"/login\", (req, res) => {\r\n    console.log(\"login\");\r\n    const currSessionId = wsProcessor.initializeConnect();\r\n    return resultOk(res, { sessionId: currSessionId });\r\n});\r\napp.post(\"*\", (req, res) => {\r\n    return error(res, 400, WRONG_FORMAT);\r\n});\r\napp.listen(config.httpPort, () => {\r\n    console.log(\"\\x1b[36m\", `Server is listening on ${config.httpPort}\\n`);\r\n});\r\n\n\n//# sourceURL=webpack:///./dist/src/index.js?");

/***/ }),

/***/ "./dist/src/read-config/index.js":
/*!***************************************!*\
  !*** ./dist/src/read-config/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n// читает конфиг модуля из config.json\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst arguard = __webpack_require__(/*! arguard */ \"./node_modules/arguard/index.js\");\r\nfunction readConfig(path) {\r\n    const data = fs.readFileSync(path);\r\n    const conf = JSON.parse(data);\r\n    arguard.object(conf, \"config\");\r\n    arguard.number(conf.httpPort, \"config.httpPort\").positive();\r\n    arguard.number(conf.wsPort, \"config.wsPort\").positive();\r\n    return conf;\r\n}\r\nexports.readConfig = readConfig;\r\n\n\n//# sourceURL=webpack:///./dist/src/read-config/index.js?");

/***/ }),

/***/ "./dist/src/ws-api/index.js":
/*!**********************************!*\
  !*** ./dist/src/ws-api/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst ws_1 = __webpack_require__(/*! ws */ \"ws\");\r\nconst events_1 = __webpack_require__(/*! events */ \"events\");\r\nconst cookie_parser_1 = __webpack_require__(/*! cookie-parser */ \"./node_modules/cookie-parser/index.js\");\r\nconst cookie = __importStar(__webpack_require__(/*! cookie */ \"./node_modules/cookie/index.js\"));\r\nclass WSSocketProcessor extends events_1.EventEmitter {\r\n    constructor(conf) {\r\n        super();\r\n        this.conf = conf;\r\n        this.wss = new ws_1.Server({ port: conf.wsPort });\r\n    }\r\n    initializeConnect() {\r\n        return new Promise((resolve, reject) => {\r\n            this.wss.on(\"connection\", (ws, req) => {\r\n                const sid = cookie_parser_1.signedCookie(cookie.parse(req.headers.cookie)[\"connect.sid\"], \"$eCuRiTy\");\r\n                console.info(\"sid -> \", sid);\r\n                resolve(sid);\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.WSSocketProcessor = WSSocketProcessor;\r\n// exports.createSocket = (conf: IConfig) => {\r\n//     return new WSSocketProcessor(conf);\r\n// };\r\n\n\n//# sourceURL=webpack:///./dist/src/ws-api/index.js?");

/***/ }),

/***/ "./node_modules/arguard/index.js":
/*!***************************************!*\
  !*** ./node_modules/arguard/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar BOOLEAN = 'boolean';\nvar OBJECT = 'object';\nvar NUMBER = 'number';\nvar STRING = 'string';\nvar FUNCTION = 'function';\nvar UNDEFINED = 'undefined';\nvar MUST_BE = ' must be';\nvar PARAM_NAME = 'paramName';\n\nmodule.exports.bool = _bool;\nfunction _bool(param, paramName) {\n    _string(paramName, PARAM_NAME);\n    if (typeof param !== BOOLEAN) {\n        throw new Error(paramName + MUST_BE + ' a ' + BOOLEAN);\n    }\n}\n\nmodule.exports.func = _func;\nfunction _func (param, paramName) {\n    _string(paramName, PARAM_NAME);\n    if (typeof param !== FUNCTION) {\n        throw new Error(paramName + MUST_BE + ' a ' + FUNCTION);\n    }\n}\n\nmodule.exports.object = _object;\nfunction _object (param, paramName) {\n    _string(paramName, PARAM_NAME);\n    if (typeof param !== OBJECT || !param) {\n        throw new Error(paramName + MUST_BE + ' an ' + OBJECT);\n    }\n}\n\nmodule.exports.array = _array;\nfunction _array (param, paramName) {\n    _string(paramName, PARAM_NAME);\n    if (!Array.isArray(param)) {\n        throw new Error(paramName + MUST_BE + ' an array');\n    }\n}\n\nmodule.exports.number = _number;\nfunction _number (param, paramName) {\n    _string(paramName, PARAM_NAME);\n    if (typeof param !== NUMBER || Number.isNaN(param)) {\n        throw new Error(paramName + MUST_BE + ' a ' + NUMBER);\n    }\n    return {\n        positive: function(){\n            if (param <= 0) {\n                throw new Error(paramName + MUST_BE + ' a positive ' + NUMBER);\n            }\n        }\n    };\n}\n\nmodule.exports.string = _string;\nfunction _string (param, paramName) {\n    if (typeof paramName !== STRING){\n        throw new Error(PARAM_NAME + MUST_BE + ' a ' + STRING);\n    }\n    if (typeof param !== STRING) {\n        throw new Error(paramName + MUST_BE + ' a ' + STRING);\n    }\n    return {\n        oneOf: function(arr){\n            _array(arr, '.oneOf() argument');\n            if (arr.length === 0){\n                throw new Error('empty array passed to .oneOf()');\n            }\n            for (var i = 0; i < arr.length; i++){\n                _string(arr[i], '.oneOf()[' + i + ']');\n                if (arr[i] === param){\n                    return;\n                }\n            }\n            throw new Error(paramName + MUST_BE + ' one of ' + JSON.stringify(arr));\n        },\n        nonempty: function(){\n            if (param === ''){\n                throw new Error(paramName + ' must not be empty');\n            }\n        }\n    };\n}\n\nfunction emptyFunc(){\n    return;\n}\n\n//fequently used arg names\nmodule.exports.names = {\n    params: 'params',\n    options: 'options',\n    cb: 'cb',\n};\n\n//allow undefined\nmodule.exports.maybe = {\n    number: function(param, paramName){\n        _string(paramName, PARAM_NAME);\n        if (typeof param === UNDEFINED){\n            return { positive: emptyFunc };\n        }\n        return _number(param, paramName);\n    },\n    string: function(param, paramName){\n        _string(paramName, PARAM_NAME);\n        if (typeof param === UNDEFINED){\n            return { oneOf: emptyFunc, nonempty: emptyFunc };\n        }\n        return _string(param, paramName);\n    },\n    func: function(param, paramName){\n        _string(paramName, PARAM_NAME);\n        if (typeof param !== UNDEFINED){\n            _func(param, paramName);\n        }\n    },\n    bool: function(param, paramName){\n        _string(paramName, PARAM_NAME);\n        if (typeof param !== UNDEFINED){\n            _bool(param, paramName);\n        }\n    },\n};\n\n//# sourceURL=webpack:///./node_modules/arguard/index.js?");

/***/ }),

/***/ "./node_modules/cookie-parser/index.js":
/*!*********************************************!*\
  !*** ./node_modules/cookie-parser/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * cookie-parser\n * Copyright(c) 2014 TJ Holowaychuk\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar cookie = __webpack_require__(/*! cookie */ \"./node_modules/cookie-parser/node_modules/cookie/index.js\")\nvar signature = __webpack_require__(/*! cookie-signature */ \"./node_modules/cookie-signature/index.js\")\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = cookieParser\nmodule.exports.JSONCookie = JSONCookie\nmodule.exports.JSONCookies = JSONCookies\nmodule.exports.signedCookie = signedCookie\nmodule.exports.signedCookies = signedCookies\n\n/**\n * Parse Cookie header and populate `req.cookies`\n * with an object keyed by the cookie names.\n *\n * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).\n * @param {Object} [options]\n * @return {Function}\n * @public\n */\n\nfunction cookieParser (secret, options) {\n  var secrets = !secret || Array.isArray(secret)\n    ? (secret || [])\n    : [secret]\n\n  return function cookieParser (req, res, next) {\n    if (req.cookies) {\n      return next()\n    }\n\n    var cookies = req.headers.cookie\n\n    req.secret = secrets[0]\n    req.cookies = Object.create(null)\n    req.signedCookies = Object.create(null)\n\n    // no cookies\n    if (!cookies) {\n      return next()\n    }\n\n    req.cookies = cookie.parse(cookies, options)\n\n    // parse signed cookies\n    if (secrets.length !== 0) {\n      req.signedCookies = signedCookies(req.cookies, secrets)\n      req.signedCookies = JSONCookies(req.signedCookies)\n    }\n\n    // parse JSON cookies\n    req.cookies = JSONCookies(req.cookies)\n\n    next()\n  }\n}\n\n/**\n * Parse JSON cookie string.\n *\n * @param {String} str\n * @return {Object} Parsed object or undefined if not json cookie\n * @public\n */\n\nfunction JSONCookie (str) {\n  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {\n    return undefined\n  }\n\n  try {\n    return JSON.parse(str.slice(2))\n  } catch (err) {\n    return undefined\n  }\n}\n\n/**\n * Parse JSON cookies.\n *\n * @param {Object} obj\n * @return {Object}\n * @public\n */\n\nfunction JSONCookies (obj) {\n  var cookies = Object.keys(obj)\n  var key\n  var val\n\n  for (var i = 0; i < cookies.length; i++) {\n    key = cookies[i]\n    val = JSONCookie(obj[key])\n\n    if (val) {\n      obj[key] = val\n    }\n  }\n\n  return obj\n}\n\n/**\n * Parse a signed cookie string, return the decoded value.\n *\n * @param {String} str signed cookie string\n * @param {string|array} secret\n * @return {String} decoded value\n * @public\n */\n\nfunction signedCookie (str, secret) {\n  if (typeof str !== 'string') {\n    return undefined\n  }\n\n  if (str.substr(0, 2) !== 's:') {\n    return str\n  }\n\n  var secrets = !secret || Array.isArray(secret)\n    ? (secret || [])\n    : [secret]\n\n  for (var i = 0; i < secrets.length; i++) {\n    var val = signature.unsign(str.slice(2), secrets[i])\n\n    if (val !== false) {\n      return val\n    }\n  }\n\n  return false\n}\n\n/**\n * Parse signed cookies, returning an object containing the decoded key/value\n * pairs, while removing the signed key from obj.\n *\n * @param {Object} obj\n * @param {string|array} secret\n * @return {Object}\n * @public\n */\n\nfunction signedCookies (obj, secret) {\n  var cookies = Object.keys(obj)\n  var dec\n  var key\n  var ret = Object.create(null)\n  var val\n\n  for (var i = 0; i < cookies.length; i++) {\n    key = cookies[i]\n    val = obj[key]\n    dec = signedCookie(val, secret)\n\n    if (val !== dec) {\n      ret[key] = dec\n      delete obj[key]\n    }\n  }\n\n  return ret\n}\n\n\n//# sourceURL=webpack:///./node_modules/cookie-parser/index.js?");

/***/ }),

/***/ "./node_modules/cookie-parser/node_modules/cookie/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/cookie-parser/node_modules/cookie/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * cookie\n * Copyright(c) 2012-2014 Roman Shtylman\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nexports.parse = parse;\nexports.serialize = serialize;\n\n/**\n * Module variables.\n * @private\n */\n\nvar decode = decodeURIComponent;\nvar encode = encodeURIComponent;\nvar pairSplitRegExp = /; */;\n\n/**\n * RegExp to match field-content in RFC 7230 sec 3.2\n *\n * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]\n * field-vchar   = VCHAR / obs-text\n * obs-text      = %x80-FF\n */\n\nvar fieldContentRegExp = /^[\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+$/;\n\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n *\n * @param {string} str\n * @param {object} [options]\n * @return {object}\n * @public\n */\n\nfunction parse(str, options) {\n  if (typeof str !== 'string') {\n    throw new TypeError('argument str must be a string');\n  }\n\n  var obj = {}\n  var opt = options || {};\n  var pairs = str.split(pairSplitRegExp);\n  var dec = opt.decode || decode;\n\n  for (var i = 0; i < pairs.length; i++) {\n    var pair = pairs[i];\n    var eq_idx = pair.indexOf('=');\n\n    // skip things that don't look like key=value\n    if (eq_idx < 0) {\n      continue;\n    }\n\n    var key = pair.substr(0, eq_idx).trim()\n    var val = pair.substr(++eq_idx, pair.length).trim();\n\n    // quoted values\n    if ('\"' == val[0]) {\n      val = val.slice(1, -1);\n    }\n\n    // only assign once\n    if (undefined == obj[key]) {\n      obj[key] = tryDecode(val, dec);\n    }\n  }\n\n  return obj;\n}\n\n/**\n * Serialize data into a cookie header.\n *\n * Serialize the a name value pair into a cookie string suitable for\n * http headers. An optional options object specified cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n *\n * @param {string} name\n * @param {string} val\n * @param {object} [options]\n * @return {string}\n * @public\n */\n\nfunction serialize(name, val, options) {\n  var opt = options || {};\n  var enc = opt.encode || encode;\n\n  if (typeof enc !== 'function') {\n    throw new TypeError('option encode is invalid');\n  }\n\n  if (!fieldContentRegExp.test(name)) {\n    throw new TypeError('argument name is invalid');\n  }\n\n  var value = enc(val);\n\n  if (value && !fieldContentRegExp.test(value)) {\n    throw new TypeError('argument val is invalid');\n  }\n\n  var str = name + '=' + value;\n\n  if (null != opt.maxAge) {\n    var maxAge = opt.maxAge - 0;\n    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');\n    str += '; Max-Age=' + Math.floor(maxAge);\n  }\n\n  if (opt.domain) {\n    if (!fieldContentRegExp.test(opt.domain)) {\n      throw new TypeError('option domain is invalid');\n    }\n\n    str += '; Domain=' + opt.domain;\n  }\n\n  if (opt.path) {\n    if (!fieldContentRegExp.test(opt.path)) {\n      throw new TypeError('option path is invalid');\n    }\n\n    str += '; Path=' + opt.path;\n  }\n\n  if (opt.expires) {\n    if (typeof opt.expires.toUTCString !== 'function') {\n      throw new TypeError('option expires is invalid');\n    }\n\n    str += '; Expires=' + opt.expires.toUTCString();\n  }\n\n  if (opt.httpOnly) {\n    str += '; HttpOnly';\n  }\n\n  if (opt.secure) {\n    str += '; Secure';\n  }\n\n  if (opt.sameSite) {\n    var sameSite = typeof opt.sameSite === 'string'\n      ? opt.sameSite.toLowerCase() : opt.sameSite;\n\n    switch (sameSite) {\n      case true:\n        str += '; SameSite=Strict';\n        break;\n      case 'lax':\n        str += '; SameSite=Lax';\n        break;\n      case 'strict':\n        str += '; SameSite=Strict';\n        break;\n      default:\n        throw new TypeError('option sameSite is invalid');\n    }\n  }\n\n  return str;\n}\n\n/**\n * Try decoding a string using a decoding function.\n *\n * @param {string} str\n * @param {function} decode\n * @private\n */\n\nfunction tryDecode(str, decode) {\n  try {\n    return decode(str);\n  } catch (e) {\n    return str;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/cookie-parser/node_modules/cookie/index.js?");

/***/ }),

/***/ "./node_modules/cookie-signature/index.js":
/*!************************************************!*\
  !*** ./node_modules/cookie-signature/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies.\n */\n\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\n/**\n * Sign the given `val` with `secret`.\n *\n * @param {String} val\n * @param {String} secret\n * @return {String}\n * @api private\n */\n\nexports.sign = function(val, secret){\n  if ('string' != typeof val) throw new TypeError(\"Cookie value must be provided as a string.\");\n  if ('string' != typeof secret) throw new TypeError(\"Secret string must be provided.\");\n  return val + '.' + crypto\n    .createHmac('sha256', secret)\n    .update(val)\n    .digest('base64')\n    .replace(/\\=+$/, '');\n};\n\n/**\n * Unsign and decode the given `val` with `secret`,\n * returning `false` if the signature is invalid.\n *\n * @param {String} val\n * @param {String} secret\n * @return {String|Boolean}\n * @api private\n */\n\nexports.unsign = function(val, secret){\n  if ('string' != typeof val) throw new TypeError(\"Signed cookie string must be provided.\");\n  if ('string' != typeof secret) throw new TypeError(\"Secret string must be provided.\");\n  var str = val.slice(0, val.lastIndexOf('.'))\n    , mac = exports.sign(str, secret);\n  \n  return sha1(mac) == sha1(val) ? str : false;\n};\n\n/**\n * Private\n */\n\nfunction sha1(str){\n  return crypto.createHash('sha1').update(str).digest('hex');\n}\n\n\n//# sourceURL=webpack:///./node_modules/cookie-signature/index.js?");

/***/ }),

/***/ "./node_modules/cookie/index.js":
/*!**************************************!*\
  !*** ./node_modules/cookie/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * cookie\n * Copyright(c) 2012-2014 Roman Shtylman\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nexports.parse = parse;\nexports.serialize = serialize;\n\n/**\n * Module variables.\n * @private\n */\n\nvar decode = decodeURIComponent;\nvar encode = encodeURIComponent;\nvar pairSplitRegExp = /; */;\n\n/**\n * RegExp to match field-content in RFC 7230 sec 3.2\n *\n * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]\n * field-vchar   = VCHAR / obs-text\n * obs-text      = %x80-FF\n */\n\nvar fieldContentRegExp = /^[\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+$/;\n\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n *\n * @param {string} str\n * @param {object} [options]\n * @return {object}\n * @public\n */\n\nfunction parse(str, options) {\n  if (typeof str !== 'string') {\n    throw new TypeError('argument str must be a string');\n  }\n\n  var obj = {}\n  var opt = options || {};\n  var pairs = str.split(pairSplitRegExp);\n  var dec = opt.decode || decode;\n\n  for (var i = 0; i < pairs.length; i++) {\n    var pair = pairs[i];\n    var eq_idx = pair.indexOf('=');\n\n    // skip things that don't look like key=value\n    if (eq_idx < 0) {\n      continue;\n    }\n\n    var key = pair.substr(0, eq_idx).trim()\n    var val = pair.substr(++eq_idx, pair.length).trim();\n\n    // quoted values\n    if ('\"' == val[0]) {\n      val = val.slice(1, -1);\n    }\n\n    // only assign once\n    if (undefined == obj[key]) {\n      obj[key] = tryDecode(val, dec);\n    }\n  }\n\n  return obj;\n}\n\n/**\n * Serialize data into a cookie header.\n *\n * Serialize the a name value pair into a cookie string suitable for\n * http headers. An optional options object specified cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n *\n * @param {string} name\n * @param {string} val\n * @param {object} [options]\n * @return {string}\n * @public\n */\n\nfunction serialize(name, val, options) {\n  var opt = options || {};\n  var enc = opt.encode || encode;\n\n  if (typeof enc !== 'function') {\n    throw new TypeError('option encode is invalid');\n  }\n\n  if (!fieldContentRegExp.test(name)) {\n    throw new TypeError('argument name is invalid');\n  }\n\n  var value = enc(val);\n\n  if (value && !fieldContentRegExp.test(value)) {\n    throw new TypeError('argument val is invalid');\n  }\n\n  var str = name + '=' + value;\n\n  if (null != opt.maxAge) {\n    var maxAge = opt.maxAge - 0;\n    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');\n    str += '; Max-Age=' + Math.floor(maxAge);\n  }\n\n  if (opt.domain) {\n    if (!fieldContentRegExp.test(opt.domain)) {\n      throw new TypeError('option domain is invalid');\n    }\n\n    str += '; Domain=' + opt.domain;\n  }\n\n  if (opt.path) {\n    if (!fieldContentRegExp.test(opt.path)) {\n      throw new TypeError('option path is invalid');\n    }\n\n    str += '; Path=' + opt.path;\n  }\n\n  if (opt.expires) {\n    if (typeof opt.expires.toUTCString !== 'function') {\n      throw new TypeError('option expires is invalid');\n    }\n\n    str += '; Expires=' + opt.expires.toUTCString();\n  }\n\n  if (opt.httpOnly) {\n    str += '; HttpOnly';\n  }\n\n  if (opt.secure) {\n    str += '; Secure';\n  }\n\n  if (opt.sameSite) {\n    var sameSite = typeof opt.sameSite === 'string'\n      ? opt.sameSite.toLowerCase() : opt.sameSite;\n\n    switch (sameSite) {\n      case true:\n        str += '; SameSite=Strict';\n        break;\n      case 'lax':\n        str += '; SameSite=Lax';\n        break;\n      case 'strict':\n        str += '; SameSite=Strict';\n        break;\n      case 'none':\n        str += '; SameSite=None';\n        break;\n      default:\n        throw new TypeError('option sameSite is invalid');\n    }\n  }\n\n  return str;\n}\n\n/**\n * Try decoding a string using a decoding function.\n *\n * @param {string} str\n * @param {function} decode\n * @private\n */\n\nfunction tryDecode(str, decode) {\n  try {\n    return decode(str);\n  } catch (e) {\n    return str;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/cookie/index.js?");

/***/ }),

/***/ "./node_modules/cors/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/cors/lib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function () {\n\n  'use strict';\n\n  var assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n  var vary = __webpack_require__(/*! vary */ \"./node_modules/vary/index.js\");\n\n  var defaults = {\n    origin: '*',\n    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',\n    preflightContinue: false,\n    optionsSuccessStatus: 204\n  };\n\n  function isString(s) {\n    return typeof s === 'string' || s instanceof String;\n  }\n\n  function isOriginAllowed(origin, allowedOrigin) {\n    if (Array.isArray(allowedOrigin)) {\n      for (var i = 0; i < allowedOrigin.length; ++i) {\n        if (isOriginAllowed(origin, allowedOrigin[i])) {\n          return true;\n        }\n      }\n      return false;\n    } else if (isString(allowedOrigin)) {\n      return origin === allowedOrigin;\n    } else if (allowedOrigin instanceof RegExp) {\n      return allowedOrigin.test(origin);\n    } else {\n      return !!allowedOrigin;\n    }\n  }\n\n  function configureOrigin(options, req) {\n    var requestOrigin = req.headers.origin,\n      headers = [],\n      isAllowed;\n\n    if (!options.origin || options.origin === '*') {\n      // allow any origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: '*'\n      }]);\n    } else if (isString(options.origin)) {\n      // fixed origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: options.origin\n      }]);\n      headers.push([{\n        key: 'Vary',\n        value: 'Origin'\n      }]);\n    } else {\n      isAllowed = isOriginAllowed(requestOrigin, options.origin);\n      // reflect origin\n      headers.push([{\n        key: 'Access-Control-Allow-Origin',\n        value: isAllowed ? requestOrigin : false\n      }]);\n      headers.push([{\n        key: 'Vary',\n        value: 'Origin'\n      }]);\n    }\n\n    return headers;\n  }\n\n  function configureMethods(options) {\n    var methods = options.methods;\n    if (methods.join) {\n      methods = options.methods.join(','); // .methods is an array, so turn it into a string\n    }\n    return {\n      key: 'Access-Control-Allow-Methods',\n      value: methods\n    };\n  }\n\n  function configureCredentials(options) {\n    if (options.credentials === true) {\n      return {\n        key: 'Access-Control-Allow-Credentials',\n        value: 'true'\n      };\n    }\n    return null;\n  }\n\n  function configureAllowedHeaders(options, req) {\n    var allowedHeaders = options.allowedHeaders || options.headers;\n    var headers = [];\n\n    if (!allowedHeaders) {\n      allowedHeaders = req.headers['access-control-request-headers']; // .headers wasn't specified, so reflect the request headers\n      headers.push([{\n        key: 'Vary',\n        value: 'Access-Control-Request-Headers'\n      }]);\n    } else if (allowedHeaders.join) {\n      allowedHeaders = allowedHeaders.join(','); // .headers is an array, so turn it into a string\n    }\n    if (allowedHeaders && allowedHeaders.length) {\n      headers.push([{\n        key: 'Access-Control-Allow-Headers',\n        value: allowedHeaders\n      }]);\n    }\n\n    return headers;\n  }\n\n  function configureExposedHeaders(options) {\n    var headers = options.exposedHeaders;\n    if (!headers) {\n      return null;\n    } else if (headers.join) {\n      headers = headers.join(','); // .headers is an array, so turn it into a string\n    }\n    if (headers && headers.length) {\n      return {\n        key: 'Access-Control-Expose-Headers',\n        value: headers\n      };\n    }\n    return null;\n  }\n\n  function configureMaxAge(options) {\n    var maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString()\n    if (maxAge && maxAge.length) {\n      return {\n        key: 'Access-Control-Max-Age',\n        value: maxAge\n      };\n    }\n    return null;\n  }\n\n  function applyHeaders(headers, res) {\n    for (var i = 0, n = headers.length; i < n; i++) {\n      var header = headers[i];\n      if (header) {\n        if (Array.isArray(header)) {\n          applyHeaders(header, res);\n        } else if (header.key === 'Vary' && header.value) {\n          vary(res, header.value);\n        } else if (header.value) {\n          res.setHeader(header.key, header.value);\n        }\n      }\n    }\n  }\n\n  function cors(options, req, res, next) {\n    var headers = [],\n      method = req.method && req.method.toUpperCase && req.method.toUpperCase();\n\n    if (method === 'OPTIONS') {\n      // preflight\n      headers.push(configureOrigin(options, req));\n      headers.push(configureCredentials(options, req));\n      headers.push(configureMethods(options, req));\n      headers.push(configureAllowedHeaders(options, req));\n      headers.push(configureMaxAge(options, req));\n      headers.push(configureExposedHeaders(options, req));\n      applyHeaders(headers, res);\n\n      if (options.preflightContinue) {\n        next();\n      } else {\n        // Safari (and potentially other browsers) need content-length 0,\n        //   for 204 or they just hang waiting for a body\n        res.statusCode = options.optionsSuccessStatus;\n        res.setHeader('Content-Length', '0');\n        res.end();\n      }\n    } else {\n      // actual response\n      headers.push(configureOrigin(options, req));\n      headers.push(configureCredentials(options, req));\n      headers.push(configureExposedHeaders(options, req));\n      applyHeaders(headers, res);\n      next();\n    }\n  }\n\n  function middlewareWrapper(o) {\n    // if options are static (either via defaults or custom options passed in), wrap in a function\n    var optionsCallback = null;\n    if (typeof o === 'function') {\n      optionsCallback = o;\n    } else {\n      optionsCallback = function (req, cb) {\n        cb(null, o);\n      };\n    }\n\n    return function corsMiddleware(req, res, next) {\n      optionsCallback(req, function (err, options) {\n        if (err) {\n          next(err);\n        } else {\n          var corsOptions = assign({}, defaults, options);\n          var originCallback = null;\n          if (corsOptions.origin && typeof corsOptions.origin === 'function') {\n            originCallback = corsOptions.origin;\n          } else if (corsOptions.origin) {\n            originCallback = function (origin, cb) {\n              cb(null, corsOptions.origin);\n            };\n          }\n\n          if (originCallback) {\n            originCallback(req.headers.origin, function (err2, origin) {\n              if (err2 || !origin) {\n                next(err2);\n              } else {\n                corsOptions.origin = origin;\n                cors(corsOptions, req, res, next);\n              }\n            });\n          } else {\n            next();\n          }\n        }\n      });\n    };\n  }\n\n  // can pass either an options hash, an options delegate, or nothing\n  module.exports = middlewareWrapper;\n\n}());\n\n\n//# sourceURL=webpack:///./node_modules/cors/lib/index.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/vary/index.js":
/*!************************************!*\
  !*** ./node_modules/vary/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * vary\n * Copyright(c) 2014-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n */\n\nmodule.exports = vary\nmodule.exports.append = append\n\n/**\n * RegExp to match field-name in RFC 7230 sec 3.2\n *\n * field-name    = token\n * token         = 1*tchar\n * tchar         = \"!\" / \"#\" / \"$\" / \"%\" / \"&\" / \"'\" / \"*\"\n *               / \"+\" / \"-\" / \".\" / \"^\" / \"_\" / \"`\" / \"|\" / \"~\"\n *               / DIGIT / ALPHA\n *               ; any VCHAR, except delimiters\n */\n\nvar FIELD_NAME_REGEXP = /^[!#$%&'*+\\-.^_`|~0-9A-Za-z]+$/\n\n/**\n * Append a field to a vary header.\n *\n * @param {String} header\n * @param {String|Array} field\n * @return {String}\n * @public\n */\n\nfunction append (header, field) {\n  if (typeof header !== 'string') {\n    throw new TypeError('header argument is required')\n  }\n\n  if (!field) {\n    throw new TypeError('field argument is required')\n  }\n\n  // get fields array\n  var fields = !Array.isArray(field)\n    ? parse(String(field))\n    : field\n\n  // assert on invalid field names\n  for (var j = 0; j < fields.length; j++) {\n    if (!FIELD_NAME_REGEXP.test(fields[j])) {\n      throw new TypeError('field argument contains an invalid header name')\n    }\n  }\n\n  // existing, unspecified vary\n  if (header === '*') {\n    return header\n  }\n\n  // enumerate current values\n  var val = header\n  var vals = parse(header.toLowerCase())\n\n  // unspecified vary\n  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {\n    return '*'\n  }\n\n  for (var i = 0; i < fields.length; i++) {\n    var fld = fields[i].toLowerCase()\n\n    // append value (case-preserving)\n    if (vals.indexOf(fld) === -1) {\n      vals.push(fld)\n      val = val\n        ? val + ', ' + fields[i]\n        : fields[i]\n    }\n  }\n\n  return val\n}\n\n/**\n * Parse a vary header into an array.\n *\n * @param {String} header\n * @return {Array}\n * @private\n */\n\nfunction parse (header) {\n  var end = 0\n  var list = []\n  var start = 0\n\n  // gather tokens\n  for (var i = 0, len = header.length; i < len; i++) {\n    switch (header.charCodeAt(i)) {\n      case 0x20: /*   */\n        if (start === end) {\n          start = end = i + 1\n        }\n        break\n      case 0x2c: /* , */\n        list.push(header.substring(start, end))\n        start = end = i + 1\n        break\n      default:\n        end = i + 1\n        break\n    }\n  }\n\n  // final token\n  list.push(header.substring(start, end))\n\n  return list\n}\n\n/**\n * Mark that a request is varied on a header field.\n *\n * @param {Object} res\n * @param {String|Array} field\n * @public\n */\n\nfunction vary (res, field) {\n  if (!res || !res.getHeader || !res.setHeader) {\n    // quack quack\n    throw new TypeError('res argument is required')\n  }\n\n  // get existing header\n  var val = res.getHeader('Vary') || ''\n  var header = Array.isArray(val)\n    ? val.join(', ')\n    : String(val)\n\n  // set new header\n  if ((val = append(header, field))) {\n    res.setHeader('Vary', val)\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vary/index.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ })));