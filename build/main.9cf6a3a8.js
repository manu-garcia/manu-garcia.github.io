/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Panorama = __webpack_require__(1);

window.addEventListener("load", function () {
  
  var panorama = new Panorama("panorama-canvas");
  panorama.init();

}, false);



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Ground = __webpack_require__(2);

/**
 * Creates a self contained panoramic view and all its elements using HTML5 canvas.
 * 
 * Use it as:
 * 
 *  var panorama = new Panorama("my-canvas");
 *  panorama.init();
 * 
 * @param {string} canvasID : String ID of the canvas HTML element
 * 
 */
var Panorama = function (canvasID) {

  // Reference to the canvas element
  this.canvas;
  // Reference to canvas context
  this.context;

  // Keeps a reference to the HTML element id for the canvas
  this.canvasID = canvasID;

  /**
   * In order to get speed consistency, we calculate a constant based on when
   * the browser call us to render the next frame. This constant will be applied to
   * movements of the elements of the game, so that all computers, no matter its cpu
   * speed is, will render at similar speeds.
   */
  
  // Speed ratio gets recalculated for each frame, base on the differences of last render 
  // time and current render time.
  // It will be used to multiply the amount of movement of an element in the scene.
  this.speedRatio;

  // Keeps track of the last time the browser call us to render the scene.
  this.lastTimeCalled;

};

/**
 * Initialises the panorama; The canvas and all the elements within the panorama.
 * 
 */
Panorama.prototype.init = function () {

  // Initialise the canvas
  this.initCanvas();

  // Init the elements within the scene: counters, timers, etc.
  this.initScene();

  // Trigger the application loop
  this.run();
};

/**
 * Specifically initilises the HTML5 canvas. Constructor should have received the id 
 * of the canvas HTML tag
 * 
 */
Panorama.prototype.initCanvas = function () {

  // Get a reference to the canvas HTML element
  this.canvas = document.getElementById(this.canvasID);

  if (!this.canvas) {
    throw new Exception("Cannot find canvas HTML element with id ", this.canvasID);
  }

  this.context = this.canvas.getContext("2d");

};

Panorama.prototype.initScene = function () {

  // The browser has not called us quite yet to render the first scene. 
  // So we initialised last time called ourselves
  this.lastTimeCalled = Date.now();

  this.elements = {

    // The ground of the panorama
    ground: new Ground(),

  };

  this.elements.ground.init(this.canvas, this.context);
  
};

/**
 * Updates the scene frame, moving all the elments as necesary.
 * 
 */
Panorama.prototype.update = function () {
  this.elements.ground.update();
};

/**
 * Render the scene frames. Usually called after the scene has been updated.
 * 
 */
Panorama.prototype.render = function () {

  // Clear the canvas
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

  this.elements.ground.render();
};

/**
 * Run the infinite loop of scene update + scene render relaying on the browser to 
 * decide when to run next step in this loop.
 * 
 */
Panorama.prototype.run = function () {

  // Calculate a constant, based on when the browser call us to render the next scene,
  // to create smooth and consistent animations no matter the CPU clock speed.
  this.speedRatio = (this.lastTimeCalled - Date.now()) / 1000.0;

  // Update/Move elements within the scenes
  this.update(this.speedRatio);

  // Render the new scene.
  this.render();

  // Relay on the browser to tell us when we should render the next scene.
  window.requestAnimationFrame(this.run.bind(this));

};

module.exports = Panorama;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Colors = __webpack_require__(3);
var Sprite = __webpack_require__(4);

/**
 * Ground is responsible for drawing the ground in the panorama.
 * 
 * Notice it is extending Sprite to acquire canvas rendering capabilities
 * 
 */
var Ground = function () {

  // Height of the ground
  this.height = 30;

};

// Extends Sprite to acquire canvas rendering capabilities.
Ground.prototype = Object.create(Sprite.prototype);

// After extending Sprite, restore the constructor reference to Ground,
// as it was lost when running Object.create
Ground.prototype.constructor = Ground;

/**
 * Renders the ground in the canvas
 */
Ground.prototype.render = function () {

  this.context.fillStyle = Colors.groundColor;
  this.context.fillRect(1, this.canvas.height - this.height, this.canvas.width, this.canvas.height);


};

module.exports = Ground;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var generalPalette = {

  // Colors defined as the general theme palette
  themingColorBGDark: "#192E5B",
  themingColorBGLight: "#1D65A6",
  themingColorBGLighter: "#72A2C0",
  
  themingColorHighlight: "#F2A1042",
  
  themingColor: "#00743F"

};

var Colors = {
  
  // Panorama colors
  groundColor: generalPalette.themingColor,

};

module.exports = Colors;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Generic class to extend from when creating sprintes on the screen.
 * 
 * Usage:
 * 
 *  // Create your new specific sprite class
 *  var MySprite = function () {
 *  };
 * 
 *  // Extend Sprite base class. Fallback lookups will go to Sprite.
 *  MySprite.prototype = Object.create(Sprite.prototype);
 *  // Restore the constructor after extending Sprite base class
 *  MySprite.prototype.constructor = MySprite;
 * 
 *  // Implement you own render function
 *  MySprite.prototype.render = function () {
 * 
 *    // Notice this.canvas and this.context are alredy there for you to use
 *    this.context.fillStyle = 'rgb(100, 180, 30)';
 *    this.context.fillRect(this.x, this.y, 25, 25);
 * 
 *  };
 * 
 */
var Sprite = function () {

  // Canvas and canvas context references
  this.canvas;
  this.context;

  // Absolute position of the sprite in the canvas
  this.x;
  this.y;
};

/**
 * Common initilisation to all drawable elements in the canvas
 * 
 * @param {*object} canvas: canvas element
 * @param {*object} context: canvas conetxt object
 */
Sprite.prototype.init = function (canvas, context) {
  this.canvas = canvas;
  this.context = context;
};

/**
 * Fallback update methods for all drawable elements in the canvas
 * 
 * @param {*float}: this number dictates how much movement should be applied to an 
 *                  element move quantity, in order to get a smooth animation accross 
 *                  diffenret CPU speeds.
 * 
 */
Sprite.prototype.update = function (speedRatio) {
  
};

/**
 * Fallback render method for all drawable elements in the canvas
 * 
 */
Sprite.prototype.render = function () {

};

module.exports = Sprite;

/***/ })
/******/ ]);