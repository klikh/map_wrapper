function YandexSwitchControl(engine) {
  this.engine = engine
  this.mapWrapper = this.engine.mapWrapper
  
  this.container = document.createElement("div")
  this.container.style.position = 'absolute'
  this.container.style.zIndex = '1000'
  
  this.mainButton = document.createElement("div")
  this.otherButtons = document.createElement("div")
  this.container.appendChild(this.mainButton)
  this.container.appendChild(this.otherButtons)
  
  this.engineCount = 0
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
    
  this.position.apply(this.container)
  this.map.getContainer().appendChild(this.container)
}
  
YandexSwitchControl.prototype.onRemoveFromMap = function () {
  if (this.container.parentNode) {
    this.map.getContainer().removeChild(this.container);
  }
  this.map = null;
}

YandexSwitchControl.prototype.addEngine = function(engine) {
  if (this.engine == engine) { return } // don't add control to switch to this engine
  
  var content = document.createElement("span")
  if (engine.icon) {
    var img = document.createElement("img")
    img.setAttribute("src", engine.icon)
    img.setAttribute("alt", "")
    img.style.marginRight = "0.5em"
    content.appendChild(img)
  }
  content.appendChild(document.createTextNode(engine.codename))
  var engineButton = this._makeYandexStyleButton(content)
  
  var _this = this
  if (this.engineCount == 0) {
    this.mainButton.appendChild(engineButton)
  } else {
    this.otherButtons.appendChild(engineButton)
    this.otherButtons.style.visibility = "hidden"
    this.container.onmouseover = function() {
      _this.otherButtons.style.visibility = "visible"
    }
    this.container.onmouseout = function() {
      _this.otherButtons.style.visibility = "hidden"
    }
  }

  engineButton.onclick  = function () {
    _this.mapWrapper.selectEngine(engine)
  }
  this.engineCount++
}

YandexSwitchControl.prototype._makeYandexStyleButton = function(content) {
  var default_button_style = "YMaps-button"
  var button = document.createElement("div")
  button.className = default_button_style
  button.style.clear = "both"  // align other buttons vertically
  button.style.margin = "2px"
  
  var left = document.createElement("i")
  left.className = "YMaps-button-c YMaps-button-l"
  left.appendChild(document.createElement("i"))
  
  var center = document.createElement("i")
  center.className = "YMaps-button-m YMaps-cursor-pointer"
  var caption = document.createElement("span")
  caption.className = "YMaps-button-caption"
  caption.appendChild(content)
  center.appendChild(document.createElement("i"))
  center.appendChild(caption)
  
  var right = document.createElement("i")
  right.className = "YMaps-button-c YMaps-button-r"
  right.appendChild(document.createElement("i"))
  
  button.appendChild(left)
  button.appendChild(center)
  button.appendChild(right)
  
  button.onmouseover = function() {
    button.className = default_button_style + " YMaps-button_hover"
  }
  button.onmouseout = function() {
    button.className = default_button_style
  }
  return button
}