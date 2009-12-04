function Engine() {}
Engine.prototype = {

  initialize : function() { 
    // Create the native map object and initialize it here
    // @return native map object
  },
  
  setOptions : function(options) { 
    // Set initial map options: 
    // "zoomControl": "moveControl", "typeControl",  "switchControl", "scrollToZoom"
    // @return this engine
  },
  
  getNativeControl : function() {
    // @return the native map object (YMaps.Map, GMap2, etc.)
  },  
  
  addSwitchControl : function(switchControl) {
    // add custom switch control and put it on the map
    // the engine may have multiple switch controls if needed
    // @return this engine
  },
  
  removeSwitchControl : function(switchControl) {
    // remove the given switch control from the engine and from the map
    // if null is given, then the first added switch control is removed if there is one.
    // @return this engine
  }
  
  getCenter : function() {
    // @return the center coordinates of this map as a GeoPoint object
  },

  setCenter : function(geopoint) {
    // @return this engine
  },
  
  getZoom : function() {
    // @return the current zoom level of this map in percents as a float from 0.0 to 1.0.
  },

  setZoom : function(zoom) {
    // @param zoom Zoom level as a float from 0.0 to 1.0.
    // @return this engine
  },
  
}