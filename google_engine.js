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
  return this.map
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
    this.addSwitchControl(new GoogleSwitchControl(this))
  }
  return this
}
  
GoogleEngine.prototype.getNativeControl = function() {
  return this.map
}
  
GoogleEngine.prototype.addSwitchControlOnMap = function(switchControl) {
  this.map.addControl(switchControl)
}
  
GoogleEngine.prototype.removeSwitchControlFromMap = function(switchControl) {
  this.map.removeControl(switchControl)
}

GoogleEngine.prototype.getCenter = function() {
  var gp = this.map.getCenter()
  return new GeoPoint(gp.lat(), gp.lng())
}

GoogleEngine.prototype.setCenter = function(geopoint) {
  this.map.setCenter(new GLatLng(geopoint.lat, geopoint.lng))
  return this
}
  
GoogleEngine.prototype.getZoom = function() {
  return this.map.getZoom()
}

GoogleEngine.prototype.setZoom = function(zoom) {
  this.map.setZoom(zoom)
  return this
}