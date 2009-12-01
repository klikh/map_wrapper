function YandexEngine() {}
YandexEngine.prototype = {
  mapWrapper : null,
  div : null,
  map : null,
  maxZoom : 17,
  codename: "yandex",

  initialize : function() {
    this.map = new YMaps.Map(this.div)
    this.switchControl = new YandexSwitchControl(this.mapWrapper)
    this.map.addControl(this.switchControl)
  },
  
  setOptions : function(options) {
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
      this.switchControl.element.show()
    }
  },
  
  getNativeControl : function() {
    return this.map
  },
  
  addSwitchControlFor : function(engine) {
      this.switchControl.addEngine(engine)
  },
  
  getCenter : function() {
    var gp = this.map.getCenter()
    return new GeoPoint(gp.getY(), gp.getX())
  },

  setCenter : function(geopoint) {
    this.map.setCenter(new YMaps.GeoPoint(geopoint.lng, geopoint.lat)) 
  },

  getZoom : function() {
    return this.map.getZoom()
  },

  setZoom : function(zoom) {
    this.map.setZoom(zoom)
  }
  
}

function YandexSwitchControl (mapWrapper) {
  this.mapWrapper = mapWrapper
  this.element = document.createElement("div")
  this.element.style.position = 'absolute'
  this.element.style.zIndex = '1000'
  this.element.style.display = 'none'
}

YandexSwitchControl.prototype = {
  onAddToMap: function (map, position) {
    this.position = position || 
      new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(210, 5))
    for (var i = 0; i < this.mapWrapper.engines.length; i++) {
      this._makeDiv(i)
    }
    this.position.apply(this.element)
    map.getContainer().appendChild(this.element)
  },

  addEngine: function(engine) {
    var div = document.createElement("div")
    this._setButtonStyle(div)
    this.element.appendChild(div)
    div.appendChild(document.createTextNode(engine.codename))
    var _this = this
    div.onclick  = function () {
      _this.mapWrapper.selectEngine(engine)
    };
  },
  
  _makeDiv: function(index) {
    this.addEngine(this.mapWrapper.engines[index])
  },

  _setButtonStyle: function (button) {
    style = {textDecoration: 'underline', 
             color: '#0000cc', 
             backgroundColor: 'white', 
             font: 'small Arial',
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
  
}