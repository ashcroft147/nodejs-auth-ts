/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var http = __webpack_require__(1);
	var debug = __webpack_require__(2); // terminal logging을 위한 모듈
	var App_1 = __webpack_require__(3);
	debug('test');
	var port = normalizePort(process.env.PORT || 3000);
	App_1.default.set('port', port);
	var server = http.createServer(App_1.default);
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
	function normalizePort(val) {
	    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
	    if (isNaN(port))
	        return val;
	    else if (port >= 0)
	        return port;
	    else
	        return false;
	}
	function onError(error) {
	    if (error.syscall !== 'listen')
	        throw error;
	    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	    switch (error.code) {
	        case 'EACCES':
	            console.error(bind + " requires elevated privileges");
	            process.exit(1);
	            break;
	        case 'EADDRINUSE':
	            console.error(bind + " is already in use");
	            process.exit(1);
	            break;
	        default:
	            throw error;
	    }
	}
	function onListening() {
	    var addr = server.address();
	    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
	    debug("Listening on " + bind);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var express = __webpack_require__(4);
	var logger = __webpack_require__(5);
	var bodyParser = __webpack_require__(6);
	var HeroRouter_1 = __webpack_require__(7);
	// Creates and configures an ExpressJS web server.
	var App = (function () {
	    //Run configuration methods on the Express instance.
	    function App() {
	        this.express = express();
	        this.middleware();
	        this.routes();
	    }
	    // Configure Express middleware.
	    App.prototype.middleware = function () {
	        this.express.use(logger('dev'));
	        this.express.use(bodyParser.json());
	        this.express.use(bodyParser.urlencoded({ extended: false }));
	    };
	    // Configure API endpoints.
	    App.prototype.routes = function () {
	        /* This is just to get up and running, and to make sure what we've got is
	         * working so far. This function will change when we start to add more
	         * API endpoints */
	        var router = express.Router();
	        // placeholder route handler
	        router.get('/', function (req, res, next) {
	            res.json({
	                message: 'Hello World!'
	            });
	        });
	        this.express.use('/', router);
	        this.express.use('/api/v1/heroes', HeroRouter_1.default);
	    };
	    return App;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new App().express;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var express_1 = __webpack_require__(4);
	var Heroes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../data\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var HeroRouter = (function () {
	    /**
	     * Initialize the HeroRouter
	     */
	    function HeroRouter() {
	        this.router = express_1.Router();
	        this.init();
	    }
	    /**
	     * GET all Heroes.
	     */
	    HeroRouter.prototype.getAll = function (req, res, next) {
	        res.send(Heroes);
	    };
	    /**
	     * GET one hero by id
	     */
	    HeroRouter.prototype.getOne = function (req, res, next) {
	        var query = parseInt(req.params.id);
	        var hero = Heroes.find(function (hero) { return hero.id === query; });
	        if (hero) {
	            res.status(200)
	                .send({
	                message: 'Success',
	                status: res.status,
	                hero: hero
	            });
	        }
	        else {
	            res.status(404)
	                .send({
	                message: 'No hero found with the given id.',
	                status: res.status
	            });
	        }
	    };
	    /**
	     * Take each handler, and attach to one of the Express.Router's
	     * endpoints.
	     */
	    HeroRouter.prototype.init = function () {
	        this.router.get('/', this.getAll);
	        this.router.get('/:id', this.getOne);
	    };
	    return HeroRouter;
	}());
	exports.HeroRouter = HeroRouter;
	// Create the HeroRouter, and export its configured Express.Router
	var heroRoutes = new HeroRouter();
	heroRoutes.init();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = heroRoutes.router;


/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map