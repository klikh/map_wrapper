function GoogleSwitchControl(engine) {
  this.engine = engine
  this.mapWrapper = this.engine.mapWrapper
  this.container = document.createElement("div")
  
  this.mainButton = document.createElement("div")
  this.otherButtons = document.createElement("div")
  this.container.appendChild(this.mainButton)
  this.container.appendChild(this.otherButtons)
  
  this.engineCount = 0
}

GoogleSwitchControl.prototype = new GControl()

GoogleSwitchControl.prototype.initialize = function(gmap) {
  for (var i = 0; i < this.mapWrapper.engines.length; i++) {
    var _this = this
    var func = function(index) {
      _this.addEngine(_this.mapWrapper.engines[index])
    }
    func(i)
  }
  gmap.getContainer().appendChild(this.container)
  return this.container
}

GoogleSwitchControl.prototype.addEngine = function(engine) {
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
  var engineButton = this._makeGoogleStyleButton(content)
  
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
  
  this.engineCount++

  GEvent.addDomListener(engineButton, "click", function() {
    _this.mapWrapper.selectEngine(engine)
  });
}

GoogleSwitchControl.prototype.getDefaultPosition = function() {
  return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(220, 7));
}

GoogleSwitchControl.prototype._makeGoogleStyleButton = function(content) {
  var button = document.createElement("div")
  var style = { 
    marginBottom: '2px',
    whiteSpace: 'nowrap',
    color: 'black',
    backgroundColor: 'white',
    font: 'Arial',
    border: '1px solid black',
    padding: '3px',
    textAlign: 'center',
    cursor: 'pointer' }
  for (var k in style) {
    button.style[k] = style[k]
  }
  button.appendChild(content)
  return button
}