function YandexEngine() {
  this.mapWrapper = null
  this.div = null
  this.map = null
  this.maxZoom = 17
  this.codename = "yandex"
  this.switchControls = []  
}

YandexEngine.prototype = new Engine()

YandexEngine.prototype.initialize = function() {
  this.map = new YMaps.Map(this.div)
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
}
  
YandexEngine.prototype.removeSwitchControlFromMap = function(switchControl) {
  this.map.removeControl(switchControl)
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
  

  
function YandexSwitchControl(engine) {
  this.engine = engine
  this.mapWrapper = this.engine.mapWrapper
  this.element = document.createElement("div")
  this.element.style.position = 'absolute'
  this.element.style.zIndex = '1000'
}

YandexSwitchControl.prototype.onAddToMap = function (map, position) {
  this.map = map
  this.position = position || 
    new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(210, 5))
    
  for (var i = 0; i < this.mapWrapper.engines.length; i++) {
    var _this = this
    var func = function(index) {
      _this.addEngine(_this.mapWrapper.engines[index])
    }
    func(i)
  }
    
  this.position.apply(this.element)
  this.map.getContainer().appendChild(this.element)
}
  
YandexSwitchControl.prototype.onRemoveFromMap = function () {
  if (this.element.parentNode) {
    this.map.getContainer().removeChild(this.element);
  }
  this.map = null;
}

YandexSwitchControl.prototype.addEngine = function(engine) {
  if (this.engine == engine) { return } // don't add control to switch to this engine
  
  var engineButton = document.createElement("div")
  this.element.appendChild(engineButton)
  engineButton.appendChild(document.createTextNode(engine.codename))

  this._setButtonStyle(engineButton)
  var _this = this
  engineButton.onclick  = function () {
    _this.mapWrapper.selectEngine(engine)
  }
}
  
YandexSwitchControl.prototype._setButtonStyle = function (button) {
  style = {textDecoration: 'underline',
           color: 'darkblue', 
           backgroundColor: 'white', 
           font: 'small Verdana',
           border: '1px solid black',
           padding: '2px',
           marginBottom: '3px',
           textAlign: 'center',
           width: '6em',
           cursor: 'pointer'}
  for (var k in style) {
    button.style[k] = style[k]
  }
}