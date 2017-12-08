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

  this.context.fillStyle = 'rgb(100, 180, 30)';
  this.context.fillRect(1, this.canvas.height - this.height, this.canvas.width, this.canvas.height);

};