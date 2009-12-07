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

  engineButton.className = "YMaps-button"
  
  var left = document.createElement("i")
  left.className = "YMaps-button-c YMaps-button-l"
  left.appendChild(document.createElement("i"))
  
  var center = document.createElement("i")
  center.className = "YMaps-button-m YMaps-cursor-pointer"
  var span = document.createElement("span")
  span.className = "YMaps-button-caption"
  if (engine.icon) {
    var img = document.createElement("img")
    img.setAttribute("src", engine.icon)
    img.setAttribute("alt", "")
    span.appendChild(img)
  }
  span.appendChild(document.createTextNode(engine.codename))
  center.appendChild(document.createElement("i"))
  center.appendChild(span)
  
  var right = document.createElement("i")
  right.className = "YMaps-button-c YMaps-button-r"
  right.appendChild(document.createElement("i"))
  
  engineButton.appendChild(left)
  engineButton.appendChild(center)
  engineButton.appendChild(right)
  
  
  var _this = this
  engineButton.onclick  = function () {
    _this.mapWrapper.selectEngine(engine)
  }
}