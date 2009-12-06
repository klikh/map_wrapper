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