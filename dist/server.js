/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _routes_notes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/notes.js */ \"./src/server/routes/notes.js\");\n/* harmony import */ var _routes_sharedNotes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/sharedNotes.js */ \"./src/server/routes/sharedNotes.js\");\n/* harmony import */ var _middleware_auth_middleware_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middleware/auth-middleware.js */ \"./src/server/middleware/auth-middleware.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./socket.js */ \"./src/server/socket.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n// src/server/index.js\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_11___default().config();\nvar Pool = (pg__WEBPACK_IMPORTED_MODULE_3___default().Pool);\n\n// ── Express + HTTP + Socket.io ───────────────────────\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar httpServer = (0,http__WEBPACK_IMPORTED_MODULE_1__.createServer)(app);\nvar io = (0,_socket_js__WEBPACK_IMPORTED_MODULE_12__.initIO)(httpServer);\nvar PORT = process.env.PORT || 3002;\nvar __dirname = (0,path__WEBPACK_IMPORTED_MODULE_7__.dirname)((0,url__WEBPACK_IMPORTED_MODULE_8__.fileURLToPath)(\"file:///B:/mobius_lab/CRM-2/src/server/index.js\"));\nvar htmlDir = (0,path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, '../html');\nvar assetsDir = (0,path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, '../assets');\nvar distDir = (0,path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, '../../dist');\n\n// PostgreSQL pool\nvar pool = new Pool({\n  connectionString: process.env.DB_URL\n});\n\n// ── Middlewares ─────────────────────────────────────\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\n\n// ── Archivos públicos ────────────────────────────────\napp.use('/assets', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](assetsDir));\napp.use('/uploads', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"]((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, '../uploads')));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](htmlDir));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](distDir));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_7___default().join(__dirname, 'public')));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](distDir, {\n  setHeaders: function setHeaders(res, filePath) {\n    if ((0,path__WEBPACK_IMPORTED_MODULE_7__.extname)(filePath) === '.css') {\n      res.setHeader('Content-Type', 'text/css');\n    }\n  }\n}));\n\n// ── Rutas de login ───────────────────────────────────\nfunction loginHandler(_x, _x2) {\n  return _loginHandler.apply(this, arguments);\n} // Redirige “/” a login\nfunction _loginHandler() {\n  _loginHandler = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {\n    var _req$body8, username, password, _yield$pool$query12, rows, _rows$, id, full_name, password_hash, role;\n    return _regeneratorRuntime().wrap(function _callee17$(_context17) {\n      while (1) switch (_context17.prev = _context17.next) {\n        case 0:\n          _req$body8 = req.body, username = _req$body8.username, password = _req$body8.password;\n          _context17.prev = 1;\n          _context17.next = 4;\n          return pool.query(\"\\n      SELECT id, username, full_name, password_hash, role\\n        FROM users\\n       WHERE username = $1\\n    \", [username]);\n        case 4:\n          _yield$pool$query12 = _context17.sent;\n          rows = _yield$pool$query12.rows;\n          if (rows.length) {\n            _context17.next = 8;\n            break;\n          }\n          return _context17.abrupt(\"return\", res.json({\n            success: false\n          }));\n        case 8:\n          _rows$ = rows[0], id = _rows$.id, full_name = _rows$.full_name, password_hash = _rows$.password_hash, role = _rows$.role;\n          _context17.next = 11;\n          return bcrypt__WEBPACK_IMPORTED_MODULE_10___default().compare(password, password_hash);\n        case 11:\n          if (_context17.sent) {\n            _context17.next = 13;\n            break;\n          }\n          return _context17.abrupt(\"return\", res.json({\n            success: false\n          }));\n        case 13:\n          return _context17.abrupt(\"return\", res.json({\n            success: true,\n            user: {\n              id: id,\n              username: username,\n              full_name: full_name,\n              role: role\n            }\n          }));\n        case 16:\n          _context17.prev = 16;\n          _context17.t0 = _context17[\"catch\"](1);\n          console.error('Error en loginHandler:', _context17.t0);\n          return _context17.abrupt(\"return\", res.status(500).json({\n            success: false,\n            error: 'Error interno'\n          }));\n        case 20:\n        case \"end\":\n          return _context17.stop();\n      }\n    }, _callee17, null, [[1, 16]]);\n  }));\n  return _loginHandler.apply(this, arguments);\n}\napp.get('/', function (_, res) {\n  return res.redirect('/login');\n});\n// Sirve la página de login\napp.get('/login', function (_, res) {\n  return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, 'login.html'));\n});\n// Endpoint de login\napp.post('/api/login', loginHandler);\n\n// ── RUTAS PROTEGIDAS ─────────────────────────────────\n// Todas requieren header 'x-user-id' válido\napp.use('/api/notes', _middleware_auth_middleware_js__WEBPACK_IMPORTED_MODULE_6__.requireUserId);\napp.use('/api/shared_notes', _middleware_auth_middleware_js__WEBPACK_IMPORTED_MODULE_6__.requireUserId);\napp.use('/api/notes/send', _middleware_auth_middleware_js__WEBPACK_IMPORTED_MODULE_6__.requireUserId);\napp.use('/api/notifications', _middleware_auth_middleware_js__WEBPACK_IMPORTED_MODULE_6__.requireUserId);\n\n// ── CRUD Notas Propias con Socket.IO ────────────────\nvar notesRouterModified = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\n\n// Delegamos GET, PUT, DELETE\nnotesRouterModified.use('/', _routes_notes_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n// POST “/” con emisión de socket\nnotesRouterModified.post('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {\n    var created;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          _context.prev = 0;\n          _context.next = 3;\n          return _routes_notes_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].handle(req, res, function () {});\n        case 3:\n          created = res.locals.createdNote;\n          if (created) io.emit('noteCreated', created);\n          _context.next = 10;\n          break;\n        case 7:\n          _context.prev = 7;\n          _context.t0 = _context[\"catch\"](0);\n          next(_context.t0);\n        case 10:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[0, 7]]);\n  }));\n  return function (_x3, _x4, _x5) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n// Montamos el router modificado\napp.use('/api/notes', notesRouterModified);\n\n// ── Notas Compartidas ───────────────────────────────\napp.post('/api/notes/send', /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {\n    var _req$body, senderId, recipientId, noteContent, x, y, width, height, bg_color, alarm_on, alarm_time, _yield$pool$query, rows, raw, notification;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          _req$body = req.body, senderId = _req$body.senderId, recipientId = _req$body.recipientId, noteContent = _req$body.noteContent, x = _req$body.x, y = _req$body.y, width = _req$body.width, height = _req$body.height, bg_color = _req$body.bg_color, alarm_on = _req$body.alarm_on, alarm_time = _req$body.alarm_time;\n          _context2.prev = 1;\n          _context2.next = 4;\n          return pool.query(\"\\n      INSERT INTO shared_notes\\n        ( sender_id, recipient_id, note_content,\\n          x, y, width, height,\\n          bg_color, alarm_on, alarm_time\\n        )\\n      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)\\n      RETURNING *\\n    \", [senderId, recipientId, noteContent, x, y, width, height, bg_color, alarm_on, alarm_time]);\n        case 4:\n          _yield$pool$query = _context2.sent;\n          rows = _yield$pool$query.rows;\n          raw = rows[0];\n          notification = {\n            id: raw.id,\n            senderId: raw.sender_id,\n            recipientId: raw.recipient_id,\n            content: raw.note_content,\n            x: raw.x,\n            y: raw.y,\n            width: raw.width,\n            height: raw.height,\n            bgColor: raw.bg_color,\n            alarmOn: raw.alarm_on,\n            alarmDateTime: raw.alarm_time,\n            createdAt: raw.created_at\n          };\n          io.emit('noteShared', notification);\n          return _context2.abrupt(\"return\", res.json({\n            success: true,\n            notification: notification\n          }));\n        case 12:\n          _context2.prev = 12;\n          _context2.t0 = _context2[\"catch\"](1);\n          console.error('Error en POST /api/notes/send:', _context2.t0);\n          return _context2.abrupt(\"return\", res.status(500).json({\n            success: false\n          }));\n        case 16:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[1, 12]]);\n  }));\n  return function (_x6, _x7) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n\n// GET /api/shared_notes\napp.use('/api/shared_notes', _routes_sharedNotes_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\n// ── Notificaciones ──────────────────────────────────\napp.get('/api/notifications', /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {\n    var userId, _yield$pool$query2, rows;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          userId = req.userId;\n          _context3.prev = 1;\n          _context3.next = 4;\n          return pool.query(\"\\n      SELECT id, sender_id, note_content, created_at\\n        FROM shared_notes\\n       WHERE recipient_id = $1\\n         AND is_read = false\\n       ORDER BY created_at DESC\\n    \", [userId]);\n        case 4:\n          _yield$pool$query2 = _context3.sent;\n          rows = _yield$pool$query2.rows;\n          res.json(rows);\n          _context3.next = 13;\n          break;\n        case 9:\n          _context3.prev = 9;\n          _context3.t0 = _context3[\"catch\"](1);\n          console.error(_context3.t0);\n          res.status(500).json([]);\n        case 13:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[1, 9]]);\n  }));\n  return function (_x8, _x9) {\n    return _ref3.apply(this, arguments);\n  };\n}());\napp.put('/api/notifications/:id/read', /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {\n    var noteId;\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          noteId = parseInt(req.params.id, 10);\n          _context4.prev = 1;\n          _context4.next = 4;\n          return pool.query(\"UPDATE shared_notes SET is_read = true WHERE id = $1\", [noteId]);\n        case 4:\n          res.json({\n            success: true\n          });\n          _context4.next = 11;\n          break;\n        case 7:\n          _context4.prev = 7;\n          _context4.t0 = _context4[\"catch\"](1);\n          console.error(_context4.t0);\n          res.status(500).json({\n            success: false\n          });\n        case 11:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee4, null, [[1, 7]]);\n  }));\n  return function (_x10, _x11) {\n    return _ref4.apply(this, arguments);\n  };\n}());\napp[\"delete\"]('/api/notifications/:id', /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {\n    var noteId;\n    return _regeneratorRuntime().wrap(function _callee5$(_context5) {\n      while (1) switch (_context5.prev = _context5.next) {\n        case 0:\n          noteId = parseInt(req.params.id, 10);\n          _context5.prev = 1;\n          _context5.next = 4;\n          return pool.query(\"DELETE FROM shared_notes WHERE id = $1\", [noteId]);\n        case 4:\n          res.json({\n            success: true\n          });\n          _context5.next = 11;\n          break;\n        case 7:\n          _context5.prev = 7;\n          _context5.t0 = _context5[\"catch\"](1);\n          console.error('Error al borrar nota compartida:', _context5.t0);\n          res.status(500).json({\n            success: false,\n            error: 'Error interno'\n          });\n        case 11:\n        case \"end\":\n          return _context5.stop();\n      }\n    }, _callee5, null, [[1, 7]]);\n  }));\n  return function (_x12, _x13) {\n    return _ref5.apply(this, arguments);\n  };\n}());\n\n// ── CRUD Usuarios ───────────────────────────────────\napp.get('/api/users', /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_, res) {\n    var _yield$pool$query3, rows;\n    return _regeneratorRuntime().wrap(function _callee6$(_context6) {\n      while (1) switch (_context6.prev = _context6.next) {\n        case 0:\n          _context6.prev = 0;\n          _context6.next = 3;\n          return pool.query(\"\\n      SELECT id, username, email, full_name, role, created_at, updated_at\\n        FROM users\\n       ORDER BY username\\n    \");\n        case 3:\n          _yield$pool$query3 = _context6.sent;\n          rows = _yield$pool$query3.rows;\n          res.json(rows);\n          _context6.next = 12;\n          break;\n        case 8:\n          _context6.prev = 8;\n          _context6.t0 = _context6[\"catch\"](0);\n          console.error(_context6.t0);\n          res.status(500).json({\n            error: 'Error al obtener usuarios'\n          });\n        case 12:\n        case \"end\":\n          return _context6.stop();\n      }\n    }, _callee6, null, [[0, 8]]);\n  }));\n  return function (_x14, _x15) {\n    return _ref6.apply(this, arguments);\n  };\n}());\napp.get('/api/users/:id', /*#__PURE__*/function () {\n  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {\n    var id, _yield$pool$query4, rows;\n    return _regeneratorRuntime().wrap(function _callee7$(_context7) {\n      while (1) switch (_context7.prev = _context7.next) {\n        case 0:\n          id = req.params.id;\n          _context7.prev = 1;\n          _context7.next = 4;\n          return pool.query(\"\\n      SELECT id, username, email, full_name, role, created_at, updated_at\\n        FROM users\\n       WHERE id = $1\\n    \", [id]);\n        case 4:\n          _yield$pool$query4 = _context7.sent;\n          rows = _yield$pool$query4.rows;\n          if (rows.length) {\n            _context7.next = 8;\n            break;\n          }\n          return _context7.abrupt(\"return\", res.status(404).json({\n            error: 'Usuario no encontrado'\n          }));\n        case 8:\n          res.json(rows[0]);\n          _context7.next = 15;\n          break;\n        case 11:\n          _context7.prev = 11;\n          _context7.t0 = _context7[\"catch\"](1);\n          console.error(_context7.t0);\n          res.status(500).json({\n            error: 'Error al obtener usuario'\n          });\n        case 15:\n        case \"end\":\n          return _context7.stop();\n      }\n    }, _callee7, null, [[1, 11]]);\n  }));\n  return function (_x16, _x17) {\n    return _ref7.apply(this, arguments);\n  };\n}());\napp.post('/api/users', /*#__PURE__*/function () {\n  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {\n    var _req$body2, username, email, full_name, role, password, hash, _yield$pool$query5, rows;\n    return _regeneratorRuntime().wrap(function _callee8$(_context8) {\n      while (1) switch (_context8.prev = _context8.next) {\n        case 0:\n          _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, full_name = _req$body2.full_name, role = _req$body2.role, password = _req$body2.password;\n          _context8.prev = 1;\n          _context8.next = 4;\n          return bcrypt__WEBPACK_IMPORTED_MODULE_10___default().hash(password, 10);\n        case 4:\n          hash = _context8.sent;\n          _context8.next = 7;\n          return pool.query(\"\\n      INSERT INTO users (username, email, full_name, role, password_hash)\\n      VALUES ($1, $2, $3, $4, $5)\\n      RETURNING id, username, email, full_name, role, created_at, updated_at\\n    \", [username, email, full_name, role, hash]);\n        case 7:\n          _yield$pool$query5 = _context8.sent;\n          rows = _yield$pool$query5.rows;\n          res.json({\n            success: true,\n            user: rows[0]\n          });\n          _context8.next = 16;\n          break;\n        case 12:\n          _context8.prev = 12;\n          _context8.t0 = _context8[\"catch\"](1);\n          console.error(_context8.t0);\n          res.status(500).json({\n            success: false,\n            error: 'Error al crear usuario'\n          });\n        case 16:\n        case \"end\":\n          return _context8.stop();\n      }\n    }, _callee8, null, [[1, 12]]);\n  }));\n  return function (_x18, _x19) {\n    return _ref8.apply(this, arguments);\n  };\n}());\napp.put('/api/users/:id', /*#__PURE__*/function () {\n  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {\n    var id, _req$body3, username, email, full_name, role, password, query, params, hash, _yield$pool$query6, rows;\n    return _regeneratorRuntime().wrap(function _callee9$(_context9) {\n      while (1) switch (_context9.prev = _context9.next) {\n        case 0:\n          id = req.params.id;\n          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, full_name = _req$body3.full_name, role = _req$body3.role, password = _req$body3.password;\n          _context9.prev = 2;\n          if (!password) {\n            _context9.next = 11;\n            break;\n          }\n          _context9.next = 6;\n          return bcrypt__WEBPACK_IMPORTED_MODULE_10___default().hash(password, 10);\n        case 6:\n          hash = _context9.sent;\n          query = \"\\n        UPDATE users SET\\n          username=$1, email=$2, full_name=$3, role=$4,\\n          password_hash=$5, updated_at=NOW()\\n         WHERE id=$6\\n       RETURNING id, username, email, full_name, role, created_at, updated_at\\n      \";\n          params = [username, email, full_name, role, hash, id];\n          _context9.next = 13;\n          break;\n        case 11:\n          query = \"\\n        UPDATE users SET\\n          username=$1, email=$2, full_name=$3, role=$4, updated_at=NOW()\\n         WHERE id=$5\\n       RETURNING id, username, email, full_name, role, created_at, updated_at\\n      \";\n          params = [username, email, full_name, role, id];\n        case 13:\n          _context9.next = 15;\n          return pool.query(query, params);\n        case 15:\n          _yield$pool$query6 = _context9.sent;\n          rows = _yield$pool$query6.rows;\n          if (rows.length) {\n            _context9.next = 19;\n            break;\n          }\n          return _context9.abrupt(\"return\", res.status(404).json({\n            success: false,\n            error: 'Usuario no encontrado'\n          }));\n        case 19:\n          res.json({\n            success: true,\n            user: rows[0]\n          });\n          _context9.next = 26;\n          break;\n        case 22:\n          _context9.prev = 22;\n          _context9.t0 = _context9[\"catch\"](2);\n          console.error(_context9.t0);\n          res.status(500).json({\n            success: false,\n            error: 'Error al actualizar usuario'\n          });\n        case 26:\n        case \"end\":\n          return _context9.stop();\n      }\n    }, _callee9, null, [[2, 22]]);\n  }));\n  return function (_x20, _x21) {\n    return _ref9.apply(this, arguments);\n  };\n}());\napp[\"delete\"]('/api/users/:id', /*#__PURE__*/function () {\n  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {\n    var id;\n    return _regeneratorRuntime().wrap(function _callee10$(_context10) {\n      while (1) switch (_context10.prev = _context10.next) {\n        case 0:\n          id = req.params.id;\n          _context10.prev = 1;\n          _context10.next = 4;\n          return pool.query('DELETE FROM users WHERE id=$1', [id]);\n        case 4:\n          res.json({\n            success: true\n          });\n          _context10.next = 11;\n          break;\n        case 7:\n          _context10.prev = 7;\n          _context10.t0 = _context10[\"catch\"](1);\n          console.error(_context10.t0);\n          res.status(500).json({\n            success: false,\n            error: 'Error al eliminar usuario'\n          });\n        case 11:\n        case \"end\":\n          return _context10.stop();\n      }\n    }, _callee10, null, [[1, 7]]);\n  }));\n  return function (_x22, _x23) {\n    return _ref10.apply(this, arguments);\n  };\n}());\n\n// ── Turnos (Appointments) ───────────────────────────\napp.get('/api/appointments', /*#__PURE__*/function () {\n  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_, res) {\n    var _yield$pool$query7, rows;\n    return _regeneratorRuntime().wrap(function _callee11$(_context11) {\n      while (1) switch (_context11.prev = _context11.next) {\n        case 0:\n          _context11.prev = 0;\n          _context11.next = 3;\n          return pool.query(\"\\n      SELECT id, client_index, service_id, appointment_date, appointment_time\\n        FROM appointments\\n       ORDER BY appointment_date, appointment_time\\n    \");\n        case 3:\n          _yield$pool$query7 = _context11.sent;\n          rows = _yield$pool$query7.rows;\n          res.json(rows);\n          _context11.next = 12;\n          break;\n        case 8:\n          _context11.prev = 8;\n          _context11.t0 = _context11[\"catch\"](0);\n          console.error(_context11.t0);\n          res.status(500).json({\n            error: 'Error al obtener turnos'\n          });\n        case 12:\n        case \"end\":\n          return _context11.stop();\n      }\n    }, _callee11, null, [[0, 8]]);\n  }));\n  return function (_x24, _x25) {\n    return _ref11.apply(this, arguments);\n  };\n}());\napp.post('/api/appointments', /*#__PURE__*/function () {\n  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {\n    var _req$body4, client_index, service_id, appointment_date, appointment_time, _yield$pool$query8, rows;\n    return _regeneratorRuntime().wrap(function _callee12$(_context12) {\n      while (1) switch (_context12.prev = _context12.next) {\n        case 0:\n          _req$body4 = req.body, client_index = _req$body4.client_index, service_id = _req$body4.service_id, appointment_date = _req$body4.appointment_date, appointment_time = _req$body4.appointment_time;\n          _context12.prev = 1;\n          _context12.next = 4;\n          return pool.query(\"\\n      INSERT INTO appointments (client_index, service_id, appointment_date, appointment_time)\\n      VALUES ($1,$2,$3,$4) RETURNING *\\n    \", [client_index, service_id, appointment_date, appointment_time]);\n        case 4:\n          _yield$pool$query8 = _context12.sent;\n          rows = _yield$pool$query8.rows;\n          res.status(201).json(rows[0]);\n          _context12.next = 13;\n          break;\n        case 9:\n          _context12.prev = 9;\n          _context12.t0 = _context12[\"catch\"](1);\n          console.error(_context12.t0);\n          res.status(500).json({\n            error: 'Error al crear turno'\n          });\n        case 13:\n        case \"end\":\n          return _context12.stop();\n      }\n    }, _callee12, null, [[1, 9]]);\n  }));\n  return function (_x26, _x27) {\n    return _ref12.apply(this, arguments);\n  };\n}());\napp.put('/api/appointments/:id', /*#__PURE__*/function () {\n  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {\n    var id, _req$body5, client_index, service_id, appointment_date, appointment_time, _yield$pool$query9, rows;\n    return _regeneratorRuntime().wrap(function _callee13$(_context13) {\n      while (1) switch (_context13.prev = _context13.next) {\n        case 0:\n          id = req.params.id;\n          _req$body5 = req.body, client_index = _req$body5.client_index, service_id = _req$body5.service_id, appointment_date = _req$body5.appointment_date, appointment_time = _req$body5.appointment_time;\n          _context13.prev = 2;\n          _context13.next = 5;\n          return pool.query(\"\\n      UPDATE appointments\\n         SET client_index=$1, service_id=$2, appointment_date=$3, appointment_time=$4, updated_at=NOW()\\n       WHERE id=$5 RETURNING *\\n    \", [client_index, service_id, appointment_date, appointment_time, id]);\n        case 5:\n          _yield$pool$query9 = _context13.sent;\n          rows = _yield$pool$query9.rows;\n          if (rows.length) {\n            _context13.next = 9;\n            break;\n          }\n          return _context13.abrupt(\"return\", res.status(404).json({\n            error: 'Turno no encontrado'\n          }));\n        case 9:\n          res.json(rows[0]);\n          _context13.next = 16;\n          break;\n        case 12:\n          _context13.prev = 12;\n          _context13.t0 = _context13[\"catch\"](2);\n          console.error(_context13.t0);\n          res.status(500).json({\n            error: 'Error al actualizar turno'\n          });\n        case 16:\n        case \"end\":\n          return _context13.stop();\n      }\n    }, _callee13, null, [[2, 12]]);\n  }));\n  return function (_x28, _x29) {\n    return _ref13.apply(this, arguments);\n  };\n}());\napp[\"delete\"]('/api/appointments/:id', /*#__PURE__*/function () {\n  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {\n    var id;\n    return _regeneratorRuntime().wrap(function _callee14$(_context14) {\n      while (1) switch (_context14.prev = _context14.next) {\n        case 0:\n          id = req.params.id;\n          _context14.prev = 1;\n          _context14.next = 4;\n          return pool.query('DELETE FROM appointments WHERE id = $1', [id]);\n        case 4:\n          res.json({\n            success: true\n          });\n          _context14.next = 11;\n          break;\n        case 7:\n          _context14.prev = 7;\n          _context14.t0 = _context14[\"catch\"](1);\n          console.error(_context14.t0);\n          res.status(500).json({\n            error: 'Error al eliminar turno'\n          });\n        case 11:\n        case \"end\":\n          return _context14.stop();\n      }\n    }, _callee14, null, [[1, 7]]);\n  }));\n  return function (_x30, _x31) {\n    return _ref14.apply(this, arguments);\n  };\n}());\n\n// ── Asignaciones de Material ────────────────────────\napp.get('/api/material_assignments', /*#__PURE__*/function () {\n  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(_, res) {\n    var _yield$pool$query10, rows;\n    return _regeneratorRuntime().wrap(function _callee15$(_context15) {\n      while (1) switch (_context15.prev = _context15.next) {\n        case 0:\n          _context15.prev = 0;\n          _context15.next = 3;\n          return pool.query(\"\\n      SELECT id, client_index, area, bricks, cement, sand, plasticor, iron, assigned_at\\n        FROM material_assignments\\n       ORDER BY assigned_at DESC\\n    \");\n        case 3:\n          _yield$pool$query10 = _context15.sent;\n          rows = _yield$pool$query10.rows;\n          res.json(rows);\n          _context15.next = 12;\n          break;\n        case 8:\n          _context15.prev = 8;\n          _context15.t0 = _context15[\"catch\"](0);\n          console.error(_context15.t0);\n          res.status(500).json({\n            error: 'Error al obtener asignaciones'\n          });\n        case 12:\n        case \"end\":\n          return _context15.stop();\n      }\n    }, _callee15, null, [[0, 8]]);\n  }));\n  return function (_x32, _x33) {\n    return _ref15.apply(this, arguments);\n  };\n}());\napp.post('/api/material_assignments', /*#__PURE__*/function () {\n  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {\n    var _req$body6, client_index, area, bricks, cement, sand, plasticor, iron, _yield$pool$query11, rows;\n    return _regeneratorRuntime().wrap(function _callee16$(_context16) {\n      while (1) switch (_context16.prev = _context16.next) {\n        case 0:\n          _req$body6 = req.body, client_index = _req$body6.client_index, area = _req$body6.area, bricks = _req$body6.bricks, cement = _req$body6.cement, sand = _req$body6.sand, plasticor = _req$body6.plasticor, iron = _req$body6.iron;\n          _context16.prev = 1;\n          _context16.next = 4;\n          return pool.query(\"\\n      INSERT INTO material_assignments (client_index, area, bricks, cement, sand, plasticor, iron)\\n      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *\\n    \", [client_index, area, bricks, cement, sand, plasticor, iron]);\n        case 4:\n          _yield$pool$query11 = _context16.sent;\n          rows = _yield$pool$query11.rows;\n          res.status(201).json(rows[0]);\n          _context16.next = 13;\n          break;\n        case 9:\n          _context16.prev = 9;\n          _context16.t0 = _context16[\"catch\"](1);\n          console.error(_context16.t0);\n          res.status(500).json({\n            error: 'Error al crear asignación'\n          });\n        case 13:\n        case \"end\":\n          return _context16.stop();\n      }\n    }, _callee16, null, [[1, 9]]);\n  }));\n  return function (_x34, _x35) {\n    return _ref16.apply(this, arguments);\n  };\n}());\n\n// ── Actualizar home.html dinámicamente ─────────────\napp.post('/api/update-home', function (req, res) {\n  var _req$body7 = req.body,\n    logoHeader = _req$body7.logoHeader,\n    logoFooter = _req$body7.logoFooter,\n    menuItems = _req$body7.menuItems;\n  var homeFilePath = (0,path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, '../html/home.html');\n  fs__WEBPACK_IMPORTED_MODULE_9___default().readFile(homeFilePath, 'utf8', function (err, data) {\n    if (err) {\n      console.error('Error leyendo home.html:', err);\n      return res.status(500).json({\n        success: false,\n        message: 'Error al leer home.html'\n      });\n    }\n    var updated = data.replace(/<img src=\".*?\" alt=\"Logo de la empresa\" \\/>/, \"<img src=\\\"\".concat(logoHeader, \"\\\" alt=\\\"Logo de la empresa\\\" />\"));\n    updated = updated.replace(/<img src=\".*?\" alt=\"Logo Smarteco\" class=\"footer-logo\" \\/>/, \"<img src=\\\"\".concat(logoFooter, \"\\\" alt=\\\"Logo Smarteco\\\" class=\\\"footer-logo\\\" />\"));\n    updated = updated.replace(/<ul class=\"nav-menu\" id=\"navMenu\">[\\s\\S]*?<\\/ul>/, \"<ul class=\\\"nav-menu\\\" id=\\\"navMenu\\\">\\n        \".concat(menuItems.map(function (item) {\n      return \"<li><a href=\\\"\".concat(item.href, \"\\\">\").concat(item.text, \"</a></li>\");\n    }).join('\\n'), \"\\n      </ul>\"));\n    fs__WEBPACK_IMPORTED_MODULE_9___default().writeFile(homeFilePath, updated, 'utf8', function (writeErr) {\n      if (writeErr) {\n        console.error('Error escribiendo home.html:', writeErr);\n        return res.status(500).json({\n          success: false,\n          message: 'Error al guardar cambios'\n        });\n      }\n      res.json({\n        success: true\n      });\n    });\n  });\n});\n\n// ── Servir HTML específicos ─────────────────────────\napp.use('/html', express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](htmlDir));\nvar htmlPages = ['calendar.html', 'area_tecnica.html', 'chatbot_corrientes.html', 'chatbot_entrerios.html', 'chatbot_mardelplata.html', 'chatbot_neuquen.html', 'chatbot.html', 'clientes.html', 'tablero.html'];\nhtmlPages.forEach(function (page) {\n  return app.get(\"/\".concat(page), function (_, res) {\n    return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, page));\n  });\n});\n\n// Ventas (subrutas bajo /ventas)\napp.get('/ventas/vendedores.html', function (req, res) {\n  return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, 'ventas/vendedores.html'));\n});\napp.get('/ventas/turnos.html', function (req, res) {\n  return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, 'ventas/turnos.html'));\n});\napp.get('/ventas/promociones.html', function (req, res) {\n  return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, 'ventas/promociones.html'));\n});\napp.get('/ventas/venta_nueva.html', function (req, res) {\n  return res.sendFile((0,path__WEBPACK_IMPORTED_MODULE_7__.join)(htmlDir, 'ventas/vendedores/venta_nueva.html'));\n});\n\n// ── Iniciar servidor ────────────────────────────────\nhttpServer.listen(PORT, function () {\n  console.log(\"Servidor escuchando en http://localhost:\".concat(PORT));\n  console.log('Socket.io listo para conexiones en el mismo puerto');\n});\n\n//# sourceURL=webpack://smarteco/./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/auth-middleware.js":
/*!**************************************************!*\
  !*** ./src/server/middleware/auth-middleware.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireUserId: () => (/* binding */ requireUserId)\n/* harmony export */ });\n// src/server/middleware/auth-middleware.js\nfunction requireUserId(req, res, next) {\n  var header = req.header('x-user-id');\n  var userId = parseInt(header, 10);\n  if (!Number.isInteger(userId)) {\n    return res.status(401).json({\n      error: 'No estás autenticado (x-user-id inválido)'\n    });\n  }\n  req.userId = userId;\n  next();\n}\n\n//# sourceURL=webpack://smarteco/./src/server/middleware/auth-middleware.js?");

/***/ }),

/***/ "./src/server/routes/notes.js":
/*!************************************!*\
  !*** ./src/server/routes/notes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! multer */ \"multer\");\n/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\n\n\nvar Pool = (pg__WEBPACK_IMPORTED_MODULE_2___default().Pool);\nvar pool = new Pool({\n  connectionString: process.env.DB_URL\n});\nvar router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\n// Para subir imágenes (opcional, si las tratas aparte)\nvar upload = multer__WEBPACK_IMPORTED_MODULE_1___default()({\n  dest: 'uploads/'\n});\nrouter.post('/upload', upload.single('file'), function (req, res) {\n  res.json({\n    url: \"/uploads/\".concat(req.file.filename)\n  });\n});\n\n// CRUD notas\n// src/server/routes/notes.js  (GET /api/notes)\nrouter.get('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {\n    var userId, _yield$pool$query, rows;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          userId = parseInt(req.header('x-user-id'), 10);\n          _context.next = 3;\n          return pool.query(\"\\n    SELECT\\n      id,\\n      content,\\n      x, y, width, height,\\n      bg_color   AS \\\"bgColor\\\",\\n      alarm_on   AS \\\"alarmOn\\\",\\n      alarm_time AS \\\"alarmDateTime\\\"\\n    FROM notes\\n    WHERE user_id = $1\\n    ORDER BY updated_at DESC\\n  \", [userId]);\n        case 3:\n          _yield$pool$query = _context.sent;\n          rows = _yield$pool$query.rows;\n          res.json(rows);\n        case 6:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee);\n  }));\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n// src/server/routes/notes.js\n\nrouter.post('/', /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {\n    var userId, _req$body, content, x, y, width, height, bg_color, alarm_on, alarm_time, alarm_datetime, bgColor, alarmOn, alarmTime, alarmDateTime, bgColorToSave, alarmOnToSave, alarmTimeToSave, _yield$pool$query2, rows;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          userId = parseInt(req.header('x-user-id'), 10); // Destructuramos TODO en camelCase y snake_case\n          _req$body = req.body, content = _req$body.content, x = _req$body.x, y = _req$body.y, width = _req$body.width, height = _req$body.height, bg_color = _req$body.bg_color, alarm_on = _req$body.alarm_on, alarm_time = _req$body.alarm_time, alarm_datetime = _req$body.alarm_datetime, bgColor = _req$body.bgColor, alarmOn = _req$body.alarmOn, alarmTime = _req$body.alarmTime, alarmDateTime = _req$body.alarmDateTime; // 1) Mapear cualquier convención que venga del cliente:\n          bgColorToSave = bg_color !== null && bg_color !== void 0 ? bg_color : bgColor;\n          alarmOnToSave = alarm_on != null ? alarm_on : alarmOn != null ? alarmOn : false;\n          alarmTimeToSave = alarm_time != null ? alarm_time : alarmTime != null ? alarmTime : alarm_datetime != null ? alarm_datetime : alarmDateTime != null ? alarmDateTime : null; // 2) Validar que el cliente siempre envíe color\n          if (bgColorToSave) {\n            _context2.next = 7;\n            break;\n          }\n          return _context2.abrupt(\"return\", res.status(400).json({\n            error: 'El campo bg_color es obligatorio'\n          }));\n        case 7:\n          _context2.prev = 7;\n          _context2.next = 10;\n          return pool.query(\"INSERT INTO notes\\n         ( user_id, content, x, y, width, height,\\n           bg_color, alarm_on, alarm_time\\n         )\\n       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)\\n       RETURNING *\", [userId, content, x, y, width, height, bgColorToSave, alarmOnToSave, alarmTimeToSave]);\n        case 10:\n          _yield$pool$query2 = _context2.sent;\n          rows = _yield$pool$query2.rows;\n          return _context2.abrupt(\"return\", res.status(201).json(rows[0]));\n        case 15:\n          _context2.prev = 15;\n          _context2.t0 = _context2[\"catch\"](7);\n          console.error('Error creando nota:', _context2.t0);\n          return _context2.abrupt(\"return\", res.status(500).json({\n            error: 'Error interno al crear nota'\n          }));\n        case 19:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[7, 15]]);\n  }));\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}()); // ← Aquí cerramos el router.post\n\n// src/server/routes/notes.js\n\n// Ahora sí arrancamos el router.put\nrouter.put('/:id', /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {\n    var userId, noteId, _req$body2, content, x, y, width, height, bg_color, alarm_on, alarm_time, bgColor, alarmOn, alarmTime, alarmDateTime, bgColorToSave, alarmOnToSave, alarmTimeToSave, _yield$pool$query3, rows;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          userId = parseInt(req.header('x-user-id'), 10);\n          noteId = parseInt(req.params.id, 10); // Destructuramos tanto snake_case como camelCase\n          _req$body2 = req.body, content = _req$body2.content, x = _req$body2.x, y = _req$body2.y, width = _req$body2.width, height = _req$body2.height, bg_color = _req$body2.bg_color, alarm_on = _req$body2.alarm_on, alarm_time = _req$body2.alarm_time, bgColor = _req$body2.bgColor, alarmOn = _req$body2.alarmOn, alarmTime = _req$body2.alarmTime, alarmDateTime = _req$body2.alarmDateTime; // Mapear a valores únicos que nunca sean null\n          bgColorToSave = bg_color !== null && bg_color !== void 0 ? bg_color : bgColor;\n          alarmOnToSave = alarm_on != null ? alarm_on : alarmOn != null ? alarmOn : false;\n          alarmTimeToSave = alarm_time != null ? alarm_time : alarmTime != null ? alarmTime : alarmDateTime != null ? alarmDateTime : null; // Validar que siempre haya color\n          if (bgColorToSave) {\n            _context3.next = 8;\n            break;\n          }\n          return _context3.abrupt(\"return\", res.status(400).json({\n            error: 'El campo bg_color es obligatorio'\n          }));\n        case 8:\n          _context3.prev = 8;\n          _context3.next = 11;\n          return pool.query(\"\\n      UPDATE notes\\n         SET content     = $1,\\n             x           = $2,\\n             y           = $3,\\n             width       = $4,\\n             height      = $5,\\n             bg_color    = $6,\\n             alarm_on    = $7,\\n             alarm_time  = $8,\\n             updated_at  = NOW()\\n       WHERE id = $9 AND user_id = $10\\n       RETURNING *;\\n    \", [content, x, y, width, height, bgColorToSave, alarmOnToSave, alarmTimeToSave, noteId, userId]);\n        case 11:\n          _yield$pool$query3 = _context3.sent;\n          rows = _yield$pool$query3.rows;\n          if (rows.length) {\n            _context3.next = 15;\n            break;\n          }\n          return _context3.abrupt(\"return\", res.status(404).json({\n            error: 'Nota no encontrada'\n          }));\n        case 15:\n          res.json(rows[0]);\n          _context3.next = 22;\n          break;\n        case 18:\n          _context3.prev = 18;\n          _context3.t0 = _context3[\"catch\"](8);\n          console.error('Error actualizando nota:', _context3.t0);\n          res.status(500).json({\n            error: 'Error interno al actualizar nota'\n          });\n        case 22:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[8, 18]]);\n  }));\n  return function (_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}());\n\n// DELETE intacto\nrouter[\"delete\"]('/:id', /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {\n    var userId, noteId;\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) switch (_context4.prev = _context4.next) {\n        case 0:\n          userId = parseInt(req.header('x-user-id'), 10);\n          noteId = parseInt(req.params.id, 10);\n          _context4.next = 4;\n          return pool.query(\"DELETE FROM notes WHERE id=$1 AND user_id=$2\", [noteId, userId]);\n        case 4:\n          res.json({\n            success: true\n          });\n        case 5:\n        case \"end\":\n          return _context4.stop();\n      }\n    }, _callee4);\n  }));\n  return function (_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://smarteco/./src/server/routes/notes.js?");

/***/ }),

/***/ "./src/server/routes/sharedNotes.js":
/*!******************************************!*\
  !*** ./src/server/routes/sharedNotes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket.js */ \"./src/server/socket.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n// src/server/routes/sharedNotes.js\n\n\n\nvar Pool = (pg__WEBPACK_IMPORTED_MODULE_1___default().Pool);\nvar pool = new Pool({\n  connectionString: process.env.DB_URL\n});\nvar router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\n\n/**\r\n * GET /api/shared_notes\r\n * → devolvemos sólo la forma que el front espera (camelCase)\r\n */\n// src/server/routes/sharedNotes.js\nrouter.get('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {\n    var userId, _yield$pool$query, rows, notes;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          userId = parseInt(req.header('x-user-id'), 10);\n          _context.prev = 1;\n          _context.next = 4;\n          return pool.query(\"\\n      SELECT\\n        sn.id,\\n        sn.sender_id,\\n        u.role            AS sender_role,\\n        sn.note_content   AS content,\\n        sn.x,             -- posici\\xF3n X\\n        sn.y,             -- posici\\xF3n Y\\n        sn.width,         -- ancho\\n        sn.height,        -- alto\\n        sn.bg_color,      -- color de fondo\\n        sn.alarm_on,      -- alarma activada\\n        sn.alarm_time,    -- hora de alarma\\n        sn.created_at\\n      FROM shared_notes sn\\n      JOIN users u ON u.id = sn.sender_id\\n      WHERE sn.recipient_id = $1\\n    \", [userId]);\n        case 4:\n          _yield$pool$query = _context.sent;\n          rows = _yield$pool$query.rows;\n          // mapeo a camelCase, etc...\n          notes = rows.map(function (r) {\n            return {\n              id: r.id,\n              senderId: r.sender_id,\n              senderRole: r.sender_role,\n              content: r.content,\n              x: r.x,\n              y: r.y,\n              width: r.width,\n              height: r.height,\n              bgColor: r.bg_color,\n              alarmOn: r.alarm_on,\n              alarmDateTime: r.alarm_time,\n              createdAt: r.created_at,\n              editing: false,\n              shared: true\n            };\n          });\n          return _context.abrupt(\"return\", res.json(notes));\n        case 10:\n          _context.prev = 10;\n          _context.t0 = _context[\"catch\"](1);\n          console.error('Error fetching shared_notes:', _context.t0);\n          return _context.abrupt(\"return\", res.status(500).json([]));\n        case 14:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[1, 10]]);\n  }));\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n/**\r\n * POST /api/shared_notes\r\n * → insertamos y emitimos la nota compartida en camelCase\r\n */\nrouter.post('/', /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {\n    var _req$body, senderId, recipientId, noteContent, x, y, width, height, bg_color, alarm_on, alarm_time, _yield$pool$query2, rows, raw, notification;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          _req$body = req.body, senderId = _req$body.senderId, recipientId = _req$body.recipientId, noteContent = _req$body.noteContent, x = _req$body.x, y = _req$body.y, width = _req$body.width, height = _req$body.height, bg_color = _req$body.bg_color, alarm_on = _req$body.alarm_on, alarm_time = _req$body.alarm_time;\n          _context2.prev = 1;\n          _context2.next = 4;\n          return pool.query(\"\\n      INSERT INTO shared_notes (\\n        sender_id, recipient_id, note_content,\\n        x, y, width, height, bg_color, alarm_on, alarm_time\\n      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)\\n      RETURNING *\\n    \", [senderId, recipientId, noteContent, x, y, width, height, bg_color, alarm_on, alarm_time]);\n        case 4:\n          _yield$pool$query2 = _context2.sent;\n          rows = _yield$pool$query2.rows;\n          raw = rows[0]; // aquí también mapeamos a camelCase\n          notification = {\n            id: raw.id,\n            senderId: raw.sender_id,\n            recipientId: raw.recipient_id,\n            content: raw.note_content,\n            x: raw.x,\n            y: raw.y,\n            width: raw.width,\n            height: raw.height,\n            bgColor: raw.bg_color,\n            alarmOn: raw.alarm_on,\n            alarmDateTime: raw.alarm_time,\n            createdAt: raw.created_at\n          }; // emitimos esa pieza ya mapeada\n          (0,_socket_js__WEBPACK_IMPORTED_MODULE_2__.getIO)().emit('noteShared', notification);\n          return _context2.abrupt(\"return\", res.json({\n            success: true,\n            notification: notification\n          }));\n        case 12:\n          _context2.prev = 12;\n          _context2.t0 = _context2[\"catch\"](1);\n          console.error('Error en POST /api/shared_notes:', _context2.t0);\n          return _context2.abrupt(\"return\", res.status(500).json({\n            success: false\n          }));\n        case 16:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[1, 12]]);\n  }));\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n\n// DELETE /api/shared_notes/:id\nrouter[\"delete\"]('/:id', /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {\n    var noteId, _yield$pool$query3, rows, recipientId;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          noteId = parseInt(req.params.id, 10); // 1) Sacamos el recipient_id\n          _context3.next = 3;\n          return pool.query(\"SELECT recipient_id FROM shared_notes WHERE id = $1\", [noteId]);\n        case 3:\n          _yield$pool$query3 = _context3.sent;\n          rows = _yield$pool$query3.rows;\n          if (rows.length) {\n            _context3.next = 7;\n            break;\n          }\n          return _context3.abrupt(\"return\", res.status(404).json({\n            success: false\n          }));\n        case 7:\n          recipientId = rows[0].recipient_id; // ─── Aquí añade este log ────────────────────────\n          console.log('🔴 [SERVER] emitendo sharedNoteDeleted:', {\n            id: noteId,\n            recipientId: recipientId\n          });\n          // ────────────────────────────────────────────────\n\n          // 2) Emitimos en camelCase\n          (0,_socket_js__WEBPACK_IMPORTED_MODULE_2__.getIO)().emit('sharedNoteDeleted', {\n            id: id,\n            // id de la nota\n            recipientId: recipientId // en camelCase\n          });\n\n          // 3) No borramos de la DB\n          res.json({\n            success: true\n          });\n        case 11:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3);\n  }));\n  return function (_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://smarteco/./src/server/routes/sharedNotes.js?");

/***/ }),

/***/ "./src/server/socket.js":
/*!******************************!*\
  !*** ./src/server/socket.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getIO: () => (/* binding */ getIO),\n/* harmony export */   initIO: () => (/* binding */ initIO)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_0__);\n// src/server/socket.js\n\nvar io;\nfunction initIO(httpServer) {\n  io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(httpServer, {\n    cors: {\n      origin: '*'\n    }\n  });\n  return io;\n}\nfunction getIO() {\n  if (!io) throw new Error('Socket.io no inicializado');\n  return io;\n}\n\n//# sourceURL=webpack://smarteco/./src/server/socket.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d59fea1195c6168cff70")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("@babel/polyfill");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;