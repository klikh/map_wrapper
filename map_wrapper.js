function MapWrapper(divID, lat, lng, zoom, options) {
  MapWrapper.prototype.DEFAULT_CENTER = new GeoPoint(59.93, 30.32)
  MapWrapper.prototype.DEFAULT_ZOOM = 13
  
  this.divID = divID
  lat = lat || this.DEFAULT_CENTER.lat
  lng = lng || this.DEFAULT_CENTER.lng
  this.initialCenter = new GeoPoint(lat, lng)
  this.zoom = zoom || this.DEFAULT_ZOOM
  
  // override default options by the given ones
  this.options = this.DEFAULT_OPTIONS
  for (i in options) {
    this.options[i] = options[i]
  }
    
  this.engines = []
  this.activeEngine = null
}

MapWrapper.prototype.DEFAULT_OPTIONS = {
  "zoomControl": true,
  "moveControl": true,
  "typeControl": true,       // map type: map, satellite, hybrid
  "switchControl": true,     // switching between map engines
  "scrollToZoom": true       // scroll mouse wheel to zoom in/out
}

MapWrapper.prototype.addEngine = function(engine) {
  engine.div = this._makeMapDiv(engine.codename + "_id", this.divID)
  engine.mapWrapper = this
  engine.initialize()

  // add this engine to the switch controls of all previously created engines
  for (var i = 0; i < this.engines.length; i++) {
    this.engines[i].addEngineToSwitchControl(engine)
  }
  
  this.engines.push(engine)
  engine.setCenter(this.initialCenter)
  engine.setZoom(this.zoom)
  engine.setOptions(this.options)
  engine.div.hide()         // NB: hide after initialization, otherwise GMap behaves buggy
}

MapWrapper.prototype.selectEngine = function(engine) {
  if (this.activeEngine == engine) { return }
  if (!this.engines.contains(engine)) { return }
  
  if (this.activeEngine) { // there's no activeEngine initially
    engine.setCenter(this.activeEngine.getCenter())
    engine.setZoom(this.activeEngine.getZoom())
    this.activeEngine.div.hide()
  }
  
  engine.div.show()
  this.activeEngine = engine
}

MapWrapper.prototype.setCenter = function(lat, lng) {
  this.activeEngine.setCenter(new GeoPoint(lat, lng))
}

MapWrapper.prototype.setZoom = function(zoom) {
  this.activeEngine.setZoom(zoom)
}

MapWrapper.prototype._makeMapDiv = function(id, mapID) {
  var div = document.createElement('div')
  div.setAttribute('id', id)
  div.style.width = "100%"
  div.style.height = "100%"
  document.getElementById(mapID).appendChild(div)
  return div
}