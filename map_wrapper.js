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
  engine.mapWrapper = this
  engine.container = this._makeMapDiv(engine.codename + "_" + Math.random + "_id", this.divID)
  engine.initialize(engine.container)
  
  engine.setCenter(this.initialCenter)
  engine.setZoom(this.zoom)
  engine.setOptions(this.options)
  engine.container.hide()

  // add this engine to the all switch controls of each of previously created engines
  for (var i = 0; i < this.engines.length; i++) {
    for (var j = 0; j < this.engines[i].switchControls.length; j++) {
      this.engines[i].switchControls[j].addEngine(engine)
    }
  }
  
  this.engines.push(engine)
}

MapWrapper.prototype.selectEngine = function(engine) {
  if (this.activeEngine == engine) { return }
  if (!this.engines.contains(engine)) { return }
  
  if (this.activeEngine) { // there's no activeEngine initially
    engine.setCenter(this.activeEngine.getCenter())
    engine.setZoom(this.activeEngine.getZoom())
    this.activeEngine.container.hide()
  }
  
  engine.container.show()
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