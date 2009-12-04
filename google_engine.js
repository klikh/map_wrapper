function GoogleEngine() {
  this.mapWrapper = null
  this.div = null
  this.map = null
  this.codename = "google"
  this.maxZoom = 17
}

GoogleEngine.prototype = new Engine()

GoogleEngine.prototype.initialize = function() {
  this.map = new GMap2(this.div)
}

GoogleEngine.prototype.setOptions = function(options) {
  if (options["zoomControl"]) { 
    this.map.addControl(new GSmallZoomControl3D())
  }
  if (options["moveControl"]) {
    this.map.addControl(new GLargeMapControl3D())
  }
  if (options["typeControl"]) {
    this.map.addControl(new GMapTypeControl())
  } 
  if (options["scrollToZoom"]) {
    this.map.enableScrollWheelZoom()
  }

  if (options["switchControl"]) {
    if (!this.switchControl) { 
      this._createSwitchControl()
    }
    this.switchControl.container.show()
  }
}
  
GoogleEngine.prototype.addEngineToSwitchControl = function(engine) {
  if (!this.switchControl) { 
    this._createSwitchControl
  }
  this.switchControl.addEngine(engine)
}
  
GoogleEngine.prototype._createSwitchControl = function() {
  this.switchControl = new GoogleSwitchControl(this) 
  this.map.addControl(this.switchControl)
}

GoogleEngine.prototype.getNativeControl = function() {
  return this.map
}
  
GoogleEngine.prototype.getCenter = function() {
  var gp = this.map.getCenter()
  return new GeoPoint(gp.lat(), gp.lng())
}

GoogleEngine.prototype.setCenter = function(geopoint) {
  this.map.setCenter(new GLatLng(geopoint.lat, geopoint.lng))
}
  
GoogleEngine.prototype.getZoom = function() {
  return this.map.getZoom()
}

GoogleEngine.prototype.setZoom = function(zoom) {
  this.map.setZoom(zoom)
}
  
GoogleEngine.prototype.convertGeopoint = function(geopoint) {
  return new GLatLng(geopoint.lat, geopoint.lng)
}
  

function GoogleSwitchControl(engine) {
  this.engine = engine
  this.mapWrapper = this.engine.mapWrapper
  this.container = document.createElement("div")
  this.container.hide()
}

GoogleSwitchControl.prototype = new GControl()

GoogleSwitchControl.prototype.initialize = function(gmap) {
  for (var i = 0; i < this.mapWrapper.engines.length; i++) {
    this._makeDiv(i, this.container)
  }
  gmap.getContainer().appendChild(this.container)
  return this.container
}

GoogleSwitchControl.prototype.addEngine = function(engine) {
  if (this.engine == engine) { return } // don't add control to switch to this engine
  
  var div = document.createElement("div")
  this._setButtonStyle(div)
  this.container.appendChild(div);
  div.appendChild(document.createTextNode(engine.codename));
  var tzc = this
  GEvent.addDomListener(div, "click", function() {
    tzc.mapWrapper.selectEngine(engine)
  });
}

GoogleSwitchControl.prototype._makeDiv = function(engine_index, container) {
  this.addEngine(this.mapWrapper.engines[engine_index])
}

GoogleSwitchControl.prototype.getDefaultPosition = function() {
  return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(220, 7));
}

GoogleSwitchControl.prototype._setButtonStyle = function(button) {
  button.style.textDecoration = "underline";
  button.style.color = "#0000cc";
  button.style.backgroundColor = "white";
  button.style.font = "small Arial";
  button.style.border = "1px solid black";
  button.style.padding = "2px";
  button.style.marginBottom = "3px";
  button.style.textAlign = "center";
  button.style.width = "6em";
  button.style.cursor = "pointer";
}