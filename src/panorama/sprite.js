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