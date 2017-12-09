var Panorama = require("./panorama/panorama.js");

window.addEventListener("load", function () {
  
  var panorama = new Panorama("panorama-canvas");
  panorama.init();

}, false);

