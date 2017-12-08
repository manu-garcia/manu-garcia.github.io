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