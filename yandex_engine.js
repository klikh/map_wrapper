function YandexEngine() {
  this.map = null
  this.maxZoom = 17
  this.codename = "Yandex"
  this.icon = "http://maps.yandex.ru/favicon.ico"
}

YandexEngine.prototype = new Engine()

YandexEngine.prototype.initialize = function(container) {
  this.map = new YMaps.Map(container)
  return this.map
}
  
YandexEngine.prototype.setOptions = function(options) {
  if (options["zoomControl"]) { 
    this.map.addControl(new YMaps.Zoom)
  }
  if (options["moveControl"]) {
    this.map.addControl(new YMaps.ToolBar())
  }
  if (options["typeControl"]) {
    this.map.addControl(new YMaps.TypeControl())
  }
  if (options["scrollToZoom"]) {
    this.map.enableScrollZoom()
  }
  if (options["switchControl"]) {
    this.addSwitchControl(new YandexSwitchControl(this))
  }
  return this
 }
  
YandexEngine.prototype.getNativeControl = function() {
  return this.map
}
  
YandexEngine.prototype.addSwitchControlOnMap = function(switchControl) {
  this.map.addControl(switchControl)
  return this
}
  
YandexEngine.prototype.removeSwitchControlFromMap = function(switchControl) {
  this.map.removeControl(switchControl)
  return this
}
  
YandexEngine.prototype.getCenter = function() {
  var gp = this.map.getCenter()
  return new GeoPoint(gp.getY(), gp.getX())
}

YandexEngine.prototype.setCenter = function(geopoint) {
  this.map.setCenter(new YMaps.GeoPoint(geopoint.lng, geopoint.lat))
  return this
}

YandexEngine.prototype.getZoom = function() {
  return this.map.getZoom()
}

YandexEngine.prototype.setZoom = function(zoom) {
  this.map.setZoom(zoom)
  return this
}